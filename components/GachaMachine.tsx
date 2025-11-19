'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useGachaStore } from '@/store/useStore'
import { Share, Sparkles } from 'lucide-react'

export default function GachaMachine() {
  const { names, history, addToHistory } = useGachaStore()
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [isMounted, setIsMounted] = useState(false)
  const [currentDisplay, setCurrentDisplay] = useState<string>('')

  // 클라이언트에서만 렌더링
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // 항상 모든 이름 사용 가능 (중복 허용)
  const availableNames = names

  const handlePick = async () => {
    if (names.length === 0) {
      alert('뽑을 수 있는 사람이 없어요!')
      return
    }

    setIsSpinning(true)
    setShowResult(false)
    setResult(null)

    // 최종 결과 미리 선택
    const randomIndex = Math.floor(Math.random() * availableNames.length)
    const picked = availableNames[randomIndex]

    // 룰렛 애니메이션: 이름들이 빠르게 바뀜
    const duration = 3000 // 총 지속 시간 (3초)
    const startTime = Date.now()
    let currentIndex = 0

    const animate = () => {
      const elapsed = Date.now() - startTime
      const progress = elapsed / duration
      
      if (progress >= 1) {
        // 애니메이션 종료
        setResult(picked)
        addToHistory(picked)
        setIsSpinning(false)
        
        // 결과 표시
        setTimeout(() => {
          setShowResult(true)
          triggerConfetti()
        }, 300)
        return
      }

      // 다음 이름 표시
      currentIndex = (currentIndex + 1) % availableNames.length
      setCurrentDisplay(availableNames[currentIndex])

      // easeOut 곡선: 처음엔 빠르고(30ms) 나중엔 느리게(300ms)
      const minDelay = 30
      const maxDelay = 300
      const delay = minDelay + (maxDelay - minDelay) * Math.pow(progress, 2)

      // 다음 프레임 예약
      setTimeout(animate, delay)
    }

    // 애니메이션 시작
    animate()
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
    setShowResult(false)
  }

  return (
    <div className="space-y-6">
      {/* 가챠머신 영역 */}
      <div className="bg-zinc-900 rounded-lg p-8 min-h-[300px] flex items-center justify-center relative overflow-hidden">
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
        <AnimatePresence mode="wait">
          {!result ? (
            <motion.div
              key="idle"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="text-center z-10"
            >
              {isSpinning ? (
                <div className="space-y-6">
                  {/* 룰렛 디스플레이 */}
                  <div className="relative">
                    <motion.div
                      key={currentDisplay}
                      initial={{ scale: 0.8, opacity: 0, y: 20 }}
                      animate={{ scale: 1, opacity: 1, y: 0 }}
                      exit={{ scale: 1.2, opacity: 0, y: -20 }}
                      transition={{ duration: 0.15 }}
                      className="bg-black rounded-xl px-8 py-6 border-2 border-white"
                    >
                      <div className="text-5xl font-black text-white">
                        {currentDisplay || '?'}
                      </div>
                    </motion.div>
                    
                    {/* 화살표 효과 */}
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <div className="text-4xl animate-bounce">👇</div>
                    </div>
                  </div>

                  {/* 로딩 텍스트 */}
                  <div className="text-xl font-bold text-white">
                    뽑는 중...
                  </div>

                  {/* 로딩 도트 */}
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
              ) : (
                <div className="space-y-4">
                  <div className="text-6xl">🎰</div>
                  <div className="text-2xl font-bold text-white">
                    준비 완료!
                  </div>
                  <div className="text-gray-400">
                    버튼을 눌러 뽑아보세요
                  </div>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="text-center z-10"
            >
              {showResult && (
                <>
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [0, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                    className="mb-4"
                  >
                    <div className="text-6xl mb-2">🎉</div>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white rounded-lg p-6 text-black"
                  >
                    <div className="text-sm text-gray-600 mb-2">당첨!</div>
                    <div className="text-4xl font-bold mb-2">
                      {result}
                    </div>
                    <div className="text-sm text-gray-600">님이 선택되었습니다!</div>
                  </motion.div>
                </>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 버튼 영역 */}
      <div className="flex gap-3">
        {!result ? (
          <button
            onClick={handlePick}
            disabled={availableNames.length === 0 || isSpinning}
            className="flex-1 py-4 bg-white text-black rounded-lg font-bold text-lg hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Sparkles size={24} />
            {isSpinning ? '뽑는 중...' : '뽑기!'}
          </button>
        ) : (
          <>
            <button
              onClick={handleReset}
              className="flex-1 py-4 bg-white text-black rounded-lg font-bold text-lg hover:bg-gray-200 transition-all"
            >
              다시 뽑기
            </button>
            <button
              onClick={() => {
                alert('공유 기능은 곧 추가됩니다!')
              }}
              className="px-6 py-4 bg-zinc-800 text-gray-300 rounded-lg font-bold hover:bg-zinc-700 hover:text-white transition-all"
            >
              <Share />
            </button>
          </>
        )}
      </div>

      {/* 정보 표시 */}
      <div className="text-center text-sm text-gray-400">
        참가자: <span className="font-bold text-white">{names.length}명</span>
      </div>
    </div>
  )
}