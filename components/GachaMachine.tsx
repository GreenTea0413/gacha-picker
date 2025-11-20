'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGachaStore } from '@/store/useStore'
import GachaMachineBox from '@/components/GachaMachineBox'
import FallingCapsule from '@/components/FallingCapsule'
import GachaLever from '@/components/GachaLever'

export default function GachaMachine() {
  const { names, history, addToHistory } = useGachaStore()
  const [phase, setPhase] = useState<'idle' | 'shaking' | 'falling' | 'result'>('idle')
  const [result, setResult] = useState<string | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  /**
   * 🔒 레이아웃 완전 고정! 🔒
   * - 가챠머신 박스: 280px (고정)
   * - 레버 위치: 박스 베이스 중앙 (bottom-8, z-10)
   * - 배출구: 박스 베이스 오른쪽 아래
   * ⚠️ 앞으로 기능만 수정, 레이아웃/크기/위치 변경 금지! ⚠️
   */

  // 클라이언트에서만 렌더링
  useEffect(() => {
    setIsMounted(true)
  }, [])

  const handlePick = async () => {
    if (names.length === 0) {
      alert('뽑을 수 있는 사람이 없어요!')
      return
    }

    // 1단계: 캡슐들이 섞이기 (3초)
    setPhase('shaking')
    
    // 랜덤으로 당첨자 선택
    const randomIndex = Math.floor(Math.random() * names.length)
    const picked = names[randomIndex]

    // 2단계: 캡슐 떨어지기 (3초 후)
    setTimeout(() => {
      setResult(picked)
      setPhase('falling')
    }, 3000)
  }

  const handleCapsuleComplete = () => {
    // 3단계: 최종 결과 표시
    setPhase('result')
    if (result) {
      addToHistory(result)
      triggerConfetti()
    }
  }

  const triggerConfetti = async () => {
    // Dynamic import로 브라우저에서만 로드
    const confetti = (await import('canvas-confetti')).default
    
    const duration = 3000
    const animationEnd = Date.now() + duration
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 }

    const randomInRange = (min: number, max: number) => {
      return Math.random() * (max - min) + min
    }

    const interval = setInterval(() => {
      const timeLeft = animationEnd - Date.now()

      if (timeLeft <= 0) {
        return clearInterval(interval)
      }

      const particleCount = 50 * (timeLeft / duration)

      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      })
      confetti({
        ...defaults,
        particleCount,
        origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      })
    }, 250)
  }

  const handleReset = () => {
    setResult(null)
    setPhase('idle')
  }

  return (
    <div className="space-y-6">
      {/* 가챠머신 + 레버 영역 */}
      <div className="bg-zinc-900 rounded-lg p-8 min-h-[480px] flex items-center justify-center relative overflow-hidden">
        {/* 배경 장식 - 클라이언트에서만 렌더링 */}
        {isMounted && (
          <div className="absolute inset-0 opacity-5">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -20, 0],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 2 + Math.random() * 2,
                  repeat: Infinity,
                  delay: Math.random() * 2,
                }}
              />
            ))}
          </div>
        )}

        {/* 메인 콘텐츠 */}
        <div className="relative z-10 w-full">
          <AnimatePresence mode="wait">
            {phase === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="flex flex-col items-center justify-center"
              >
                {/* 가챠머신 + 레버 통합 */}
                <div className="relative">
                  <GachaMachineBox isShaking={false} names={names} />
                  
                  {/* 레버 (베이스 중앙에 absolute 배치) */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
                    <GachaLever
                      onPull={handlePick}
                      disabled={names.length === 0}
                      isPulling={false}
                    />
                  </div>
                </div>

                {/* 텍스트 */}
                <div className="text-center mt-4">
                  <div className="text-2xl font-bold text-white mb-1">
                    준비 완료!
                  </div>
                  <div className="text-gray-400 text-sm">
                    레버를 돌려주세요
                  </div>
                </div>
              </motion.div>
            )}

            {phase === 'shaking' && (
              <motion.div
                key="shaking"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center"
              >
                {/* 가챠머신 + 레버 통합 */}
                <div className="relative">
                  <GachaMachineBox isShaking={true} names={names} />
                  
                  {/* 레버 (베이스 중앙에 absolute 배치, 회전 중) */}
                  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
                    <GachaLever
                      onPull={() => {}}
                      disabled={true}
                      isPulling={true}
                    />
                  </div>
                </div>

                {/* 텍스트 */}
                <div className="text-center mt-4">
                  <div className="text-2xl font-bold text-white mb-2">
                    섞는 중...
                  </div>
                  <div className="flex gap-2 justify-center">
                    {[...Array(3)].map((_, i) => (
                      <motion.div
                        key={i}
                        className="w-3 h-3 bg-white rounded-full"
                        animate={{ 
                          scale: [1, 1.5, 1],
                          opacity: [0.5, 1, 0.5]
                        }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          delay: i * 0.2,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {phase === 'falling' && result && (
              <motion.div
                key="falling"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full h-[400px] flex items-center justify-center"
              >
                <FallingCapsule 
                  name={result} 
                  onComplete={handleCapsuleComplete}
                />
              </motion.div>
            )}

            {phase === 'result' && result && (
              <motion.div
                key="result"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center gap-8"
              >
                {/* 결과 표시 */}
                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                    className="text-7xl mb-4"
                  >
                    🎉
                  </motion.div>
                  
                  <div className="bg-white rounded-2xl px-10 py-8 shadow-2xl inline-block">
                    <div className="text-sm text-gray-500 mb-2 uppercase tracking-wider">당첨!</div>
                    <div className="text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-pink-500 mb-3">
                      {result}
                    </div>
                    <div className="text-sm text-gray-600">님이 선택되었습니다!</div>
                  </div>
                </div>
                
                {/* 다시 뽑기 버튼 - 형광 네온 스타일 */}
                <motion.button
                  onClick={handleReset}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="relative px-12 py-4 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white rounded-xl font-bold text-lg hover:from-cyan-400 hover:to-emerald-400 transition-all active:scale-95 overflow-hidden group"
                  style={{
                    boxShadow: '0 0 20px rgba(6, 182, 212, 0.5), 0 0 40px rgba(16, 185, 129, 0.3)',
                  }}
                >
                  {/* 형광 글로우 효과 */}
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-emerald-400 opacity-0 group-hover:opacity-30 transition-opacity blur-xl" />
                  
                  {/* 텍스트 */}
                  <span className="relative z-10 drop-shadow-lg">다시 뽑기</span>
                  
                  {/* 반짝이는 효과 */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"
                    animate={{
                      x: ['-100%', '200%'],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                    }}
                  />
                </motion.button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* 정보 표시 */}
      <div className="text-center text-sm text-gray-400">
        참가자: <span className="font-bold text-white">{names.length}명</span>
      </div>
    </div>
  )
}