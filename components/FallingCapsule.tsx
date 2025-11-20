'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

interface FallingCapsuleProps {
  name: string
  onComplete: () => void
}

/**
 * ⚠️ 떨어지는 캡슐 - 디자인 절대 변경 금지! ⚠️
 * - 크기: 40px × 40px (고정)
 * - 모양: 완벽한 원형
 * - 색상: 위쪽 반(핑크) + 아래쪽 반(흰색)
 */
export default function FallingCapsule({ name, onComplete }: FallingCapsuleProps) {
  const [phase, setPhase] = useState<'falling' | 'opening'>('falling')
  const color = '#FF6B9D' // 핑크 캡슐

  useEffect(() => {
    // 떨어지는 애니메이션 (1.5초)
    const fallingTimer = setTimeout(() => {
      setPhase('opening')
    }, 1500)

    // 열리는 애니메이션 후 바로 완료 (2초 후)
    const completeTimer = setTimeout(() => {
      onComplete()
    }, 2000)

    return () => {
      clearTimeout(fallingTimer)
      clearTimeout(completeTimer)
    }
  }, [onComplete])

  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {phase === 'falling' && (
        <motion.div
          className="relative w-[40px] h-[40px]"
          initial={{ y: -300, rotate: 0 }}
          animate={{ 
            y: 0,
            rotate: [0, 360, 720],
          }}
          transition={{
            duration: 1.5,
            ease: "easeOut",
          }}
        >
          {/* 캡슐 - 위:컬러, 아래:흰색 (40px 원형) */}
          <div className="absolute inset-0 rounded-full overflow-hidden">
            {/* 상단 반구 (컬러) */}
            <div
              className="absolute top-0 left-0 right-0 h-1/2"
              style={{
                background: `linear-gradient(135deg, ${color}, ${color}dd)`,
                boxShadow: 'inset -2px -2px 4px rgba(255,255,255,0.3), inset 2px 2px 4px rgba(0,0,0,0.3)',
              }}
            />
            
            {/* 하단 반구 (흰색) */}
            <div
              className="absolute bottom-0 left-0 right-0 h-1/2 bg-white"
              style={{
                boxShadow: 'inset -2px -2px 4px rgba(255,255,255,0.5), inset 2px 2px 4px rgba(0,0,0,0.2)',
              }}
            />
            
            {/* 중간 경계선 */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 transform -translate-y-1/2" />
            
            {/* 전체 원형 테두리 */}
            <div 
              className="absolute inset-0 rounded-full"
              style={{
                boxShadow: '0 4px 12px rgba(255,107,157,0.6)',
              }}
            />
            
            {/* 반사광 효과 */}
            <div className="absolute top-2 left-2 w-4 h-4 rounded-full bg-white opacity-40 blur-sm" />
          </div>
        </motion.div>
      )}

      {phase === 'opening' && (
        <div className="relative w-[40px] h-[40px]">
          {/* 위쪽 반구 (뚜껑) - 위로 올라가며 열림 */}
          <motion.div
            className="absolute inset-0 rounded-full overflow-hidden"
            style={{
              clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)',
            }}
            animate={{
              y: -60,
              rotate: -45,
              opacity: 0,
            }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            {/* 상단 (컬러) */}
            <div
              className="absolute top-0 left-0 right-0 h-1/2"
              style={{
                background: `linear-gradient(135deg, ${color}, ${color}dd)`,
              }}
            />
            {/* 하단 (흰색) */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-white" />
            {/* 경계선 */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 transform -translate-y-1/2" />
          </motion.div>
          
          {/* 아래쪽 반구 - 그대로 유지 */}
          <motion.div
            className="absolute inset-0 rounded-full overflow-hidden"
            style={{
              clipPath: 'polygon(0 50%, 100% 50%, 100% 100%, 0 100%)',
            }}
            animate={{
              y: 0,
              opacity: 0.3,
            }}
            transition={{ duration: 0.5 }}
          >
            {/* 상단 (컬러) */}
            <div
              className="absolute top-0 left-0 right-0 h-1/2"
              style={{
                background: `linear-gradient(135deg, ${color}, ${color}dd)`,
              }}
            />
            {/* 하단 (흰색) */}
            <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-white" />
            {/* 경계선 */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-300 transform -translate-y-1/2" />
          </motion.div>
        </div>
      )}
    </div>
  )
}