'use client'

import { motion } from 'framer-motion'
import { Hand } from 'lucide-react'

interface GachaLeverProps {
  onPull: () => void
  disabled: boolean
  isPulling: boolean
}

/**
 * 🔒 레버 디자인 - 완전 고정! 절대 변경 금지! 🔒
 * - 크기: 80px × 80px (고정)
 * - 레버 막대: 원을 가로지름 (64px)
 * - 회전: 수평(-) → 수직(|) 90도
 * - 형광 손 아이콘 (Hand from lucide-react)
 * - 위치: 베이스 중앙 (bottom-8)
 * ⚠️ 기능만 수정 가능, 외형/크기/위치 변경 금지! ⚠️
 */
export default function GachaLever({ onPull, disabled, isPulling }: GachaLeverProps) {
  const handleClick = () => {
    if (!disabled && !isPulling) {
      onPull()
    }
  }

  return (
    <div className="relative flex flex-col items-center">
      {/* 원형 레버 컨테이너 */}
      <motion.div
        className="relative w-20 h-20 cursor-pointer"
        onClick={handleClick}
        whileHover={!disabled ? { scale: 1.05 } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
      >
        {/* 외부 원형 베이스 (고정) */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900"
          style={{
            boxShadow: '0 3px 8px rgba(0,0,0,0.5), inset 0 2px 6px rgba(255,255,255,0.05)',
          }}
        >
          {/* 외곽 테두리 */}
          <div className="absolute inset-1.5 rounded-full border-2 border-zinc-700" />
          
          {/* 중앙 구멍 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 rounded-full bg-black"
              style={{
                boxShadow: 'inset 0 2px 3px rgba(0,0,0,0.8)',
              }}
            />
          </div>
        </div>

        {/* 회전하는 레버 막대 */}
        <motion.div
          className="absolute inset-0"
          animate={isPulling ? {
            rotate: [0, -90, 0]
          } : {
            rotate: 0
          }}
          transition={isPulling ? {
            duration: 0.8,
            times: [0, 0.5, 1],
            ease: "easeInOut"
          } : {
            duration: 0.5
          }}
        >
          {/* 중앙 고정축 */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-5 h-5 rounded-full bg-zinc-600"
              style={{
                boxShadow: '0 2px 3px rgba(0,0,0,0.5), inset 0 -1px 2px rgba(255,255,255,0.2)',
              }}
            />
          </div>

          {/* 굵은 막대 (원을 가로지름 - -> 수직 |) */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-2 w-16 bg-gradient-to-r from-zinc-400 via-zinc-500 to-zinc-600 rounded-full"
              style={{
                boxShadow: '0 2px 4px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.2)',
              }}
            >
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* 형광 손 아이콘 (레버 아래에서 둥둥) */}
      {!disabled && !isPulling && (
        <motion.div
          className="absolute -bottom-12 left-1/2 -translate-x-1/2"
          animate={{
            y: [0, -8, 0],
            rotate: [-10, 10, -10],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Hand 
            size={32}
            className="text-white"
            style={{
              filter: 'drop-shadow(0 0 12px rgba(34, 211, 238, 0.9)) drop-shadow(0 0 20px rgba(16, 185, 129, 0.7))',
            }}
          />
        </motion.div>
      )}

      {/* 회전 중에는 손 아이콘 숨김 */}
    </div>
  )
}