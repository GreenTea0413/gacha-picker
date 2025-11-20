"use client"

import { motion } from "framer-motion"
import { useState, useEffect, useRef } from "react"

interface CapsuleProps {
  color: string
  index: number
  isShaking?: boolean
}

/**
 * ⚠️ 캡슐 디자인 - 절대 변경 금지! ⚠️
 * - 크기: 40px × 40px (고정)
 * - 모양: 완벽한 원형 (rounded-full)
 * - 색상: 위쪽 반(컬러) + 아래쪽 반(흰색)
 * - 경계선: 중간에 회색 라인
 */
const Capsule = ({ color, index, isShaking }: CapsuleProps) => {
  return (
    <motion.div
      className="absolute w-10 h-10"
      // 여기가 레버 눌렀을 때 공 랜덤 흔들리는 애니메이션 부분입니다.
      animate={
        isShaking
          ? {
              x: [0, -15, 15, -10, 10, -5, 5, 0],
              y: [0, -10, 10, -15, 15, -5, 5, 0],
              rotate: [0, -10, 10, -5, 5, 0],
            }
          : {}
      }
      transition={{
        duration: 0.8,
        repeat: isShaking ? Number.POSITIVE_INFINITY : 0,
        delay: index * 0.1,
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
            boxShadow: '0 2px 6px rgba(0,0,0,0.2)',
          }}
        />
        
        {/* 반사광 효과 (왼쪽 위) */}
        <div className="absolute top-2 left-2 w-3 h-3 rounded-full bg-white opacity-40 blur-sm" />
      </div>
    </motion.div>
  )
}

interface PhysicsCapsule {
  x: number
  y: number
  vx: number
  vy: number
  radius: number
  color: string
  index: number
  element?: HTMLDivElement
}

interface GachaMachineBoxProps {
  isShaking: boolean
  names: string[]
}

const GRAVITY = 0.8
const DAMPING = 0.98
const BOUNCE = 0.6
const FRICTION = 0.02
const BOX_WIDTH = 280
const BOX_HEIGHT = 320

export default function GachaMachineBox({ isShaking, names }: GachaMachineBoxProps) {
  const colors = [
    "#FF6B9D",
    "#FFA502",
    "#26DE81",
    "#4ECDC4",
    "#A29BFE",
    "#FF6348",
    "#FFD93D",
    "#6BCB77",
    "#4D96FF",
    "#DA70D6",
    "#FF8A65",
    "#FFD54F",
    "#81C784",
    "#64B5F6",
    "#BA68C8",
  ]

  const [capsuleList, setCapsuleList] = useState<PhysicsCapsule[]>([])
  const capsulesRef = useRef<PhysicsCapsule[]>([])
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  const elementsRef = useRef<Map<number, HTMLDivElement>>(new Map())
  const initRef = useRef(false)

  useEffect(() => {
    if (initRef.current && capsulesRef.current.length === names.length) return

    const newCapsules: PhysicsCapsule[] = Array.from({ length: names.length }).map((_, i) => ({
      x: 20 + (i % 4) * 60 + Math.random() * 10,
      y: 20 + Math.floor(i / 4) * 60 + Math.random() * 10,
      vx: 0,
      vy: 0,
      radius: 20,
      color: colors[i % colors.length],
      index: i,
    }))

    capsulesRef.current = newCapsules
    elementsRef.current.clear()
    initRef.current = true
    setTimeout(() => setCapsuleList(newCapsules), 0)
  }, [names.length])

  useEffect(() => {
    if (isShaking || names.length === 0) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
      return
    }

    const simulate = () => {
      const capsules = capsulesRef.current

      for (let i = 0; i < capsules.length; i++) {
        const c = capsules[i]
        c.vy += GRAVITY
        c.vx *= DAMPING
        c.vy *= DAMPING
        c.x += c.vx
        c.y += c.vy

        // 벽 충돌
        if (c.x - c.radius < 0) {
          c.x = c.radius
          c.vx *= -BOUNCE
        }
        if (c.x + c.radius > BOX_WIDTH) {
          c.x = BOX_WIDTH - c.radius
          c.vx *= -BOUNCE
        }

        // 바닥 충돌
        if (c.y + c.radius > BOX_HEIGHT) {
          c.y = BOX_HEIGHT - c.radius
          c.vy *= -BOUNCE
          c.vx *= 1 - FRICTION
        }

        // 천장 충돌
        if (c.y - c.radius < 0) {
          c.y = c.radius
          c.vy *= -BOUNCE
        }

        // DOM 업데이트
        const el = elementsRef.current.get(i)
        if (el) {
          el.style.left = `${c.x - c.radius}px`
          el.style.top = `${c.y - c.radius}px`
        }
      }

      // 캡슐 충돌
      for (let i = 0; i < capsules.length; i++) {
        for (let j = i + 1; j < capsules.length; j++) {
          const c1 = capsules[i]
          const c2 = capsules[j]
          const dx = c2.x - c1.x
          const dy = c2.y - c1.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          const minDist = c1.radius + c2.radius

          if (dist < minDist && dist > 0) {
            const nx = dx / dist
            const ny = dy / dist
            const overlap = minDist - dist
            c1.x -= (nx * overlap) / 2
            c1.y -= (ny * overlap) / 2
            c2.x += (nx * overlap) / 2
            c2.y += (ny * overlap) / 2

            const dvx = c2.vx - c1.vx
            const dvy = c2.vy - c1.vy
            const dvn = dvx * nx + dvy * ny

            if (dvn < 0) {
              const impulse = dvn / 2
              c1.vx += impulse * nx
              c1.vy += impulse * ny
              c2.vx -= impulse * nx
              c2.vy -= impulse * ny
            }
          }
        }
      }

      animationRef.current = requestAnimationFrame(simulate)
    }

    animationRef.current = requestAnimationFrame(simulate)
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [isShaking, names.length])

  return (
    <div className="relative w-[280px] mx-auto mt-12">
      <div
        className="absolute -top-8 left-0 right-0 h-8 bg-gradient-to-b from-red-600 to-red-700 rounded-t-xl"
        style={{
          boxShadow: "0 -2px 10px rgba(220, 38, 38, 0.5), inset 0 -2px 5px rgba(0,0,0,0.3)",
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-b from-red-400 to-transparent rounded-t-xl" />
      </div>

      <div
        className="relative h-[320px] bg-white/5 backdrop-blur-sm border-2 border-white/20 overflow-hidden"
        ref={containerRef}
        style={{
          boxShadow: "0 8px 32px 0 rgba(255, 255, 255, 0.1), inset 0 0 20px rgba(255,255,255,0.05)",
        }}
      >
        {capsuleList.map((capsule) => (
          <div
            key={`capsule-${capsule.index}`}
            ref={(el) => {
              if (el) elementsRef.current.set(capsule.index, el)
            }}
            className="absolute"
            style={{
              left: `${capsule.x - capsule.radius}px`,
              top: `${capsule.y - capsule.radius}px`,
              width: `${capsule.radius * 2}px`,
              height: `${capsule.radius * 2}px`,
            }}
          >
            <Capsule color={capsule.color} index={capsule.index} isShaking={isShaking} />
          </div>
        ))}

        {names.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center text-white/30 text-sm">
            참가자를 추가하세요
          </div>
        )}

      </div>

      <div
        className="relative mt-0 h-24 bg-gradient-to-b from-red-700 to-red-800 rounded-b-xl overflow-visible"
        style={{
          boxShadow: "0 4px 15px rgba(220, 38, 38, 0.5), inset 0 2px 5px rgba(0,0,0,0.3)",
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-b from-red-500 to-transparent" />
        <div className="absolute top-0 left-2 right-2 h-0.5 bg-zinc-400 opacity-40" />
        <div
          className="absolute bottom-2 right-2 w-20 h-16 bg-white rounded-lg"
          style={{
            boxShadow: "inset 0 2px 4px rgba(0,0,0,0.2), 0 2px 4px rgba(0,0,0,0.3)",
          }}
        >
          <div className="absolute inset-2 bg-gradient-to-b from-gray-100 to-gray-200 rounded" />
        </div>
      </div>
    </div>
  )
}