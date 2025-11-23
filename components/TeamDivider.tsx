'use client'

import { useState, useEffect } from 'react'
import { useGachaStore, Pair } from '@/store/useStore'
import { Shuffle } from 'lucide-react'
import confetti from 'canvas-confetti'
import TeamResult from './TeamResult'
import { soundManager } from '@/lib/sounds'

export default function TeamDivider() {
  const { pairs, teamSize, setTeamResult, lastTeamResult } = useGachaStore()
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    setIsReady(pairs.length === teamSize && teamSize > 0)
  }, [pairs.length, teamSize])

  // 팀 분배 알고리즘
  const divideTeams = () => {
    if (!isReady) {
      alert('팀을 나누기 전에 필요한 짝을 모두 입력해주세요!')
      return
    }

    // 섞는 소리
    soundManager.playShuffle()

    const teamA: string[] = []
    const teamB: string[] = []

    // 각 짝에서 랜덤으로 한 명씩 A팀, B팀에 배정
    pairs.forEach((pair: Pair) => {
      if (Math.random() > 0.5) {
        teamA.push(pair.person1)
        teamB.push(pair.person2)
      } else {
        teamA.push(pair.person2)
        teamB.push(pair.person1)
      }
    })

    // 결과 저장
    setTeamResult(teamA, teamB)

    // 성공 팡파레 소리
    soundManager.playSuccess()

    // 축포 효과
    fireConfetti()
  }

  // 축포 효과
  const fireConfetti = () => {
    const duration = 3000
    const end = Date.now() + duration

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.6 },
        colors: ['#ef4444', '#3b82f6', '#10b981', '#f59e0b'],
      })
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.6 },
        colors: ['#ef4444', '#3b82f6', '#10b981', '#f59e0b'],
      })

      if (Date.now() < end) {
        requestAnimationFrame(frame)
      }
    }

    frame()
  }

  const handleReshuffle = () => {
    divideTeams()
  }

  return (
    <div className="space-y-6">
      {/* 팀 나누기 버튼 */}
      {!lastTeamResult && (
        <div className="text-center">
          <button
            onClick={divideTeams}
            disabled={!isReady}
            className={`px-8 py-4 rounded-xl font-black text-xl transition-all shadow-lg ${
              isReady
                ? 'bg-gradient-to-r from-red-500 via-purple-500 to-blue-500 text-white hover:scale-105 hover:shadow-2xl animate-gradient cursor-pointer'
                : 'bg-zinc-700 text-zinc-400 cursor-not-allowed'
            }`}
            style={{
              filter: isReady
                ? 'drop-shadow(0 0 20px rgba(139, 92, 246, 0.6))'
                : 'none',
            }}
          >
            <div className="flex items-center gap-3">
              <Shuffle size={24} />
              <span>팀 나누기 시작!</span>
            </div>
          </button>

          {!isReady && (
            <p className="text-yellow-400 text-sm mt-4">
              ⚠️ 모든 짝을 입력한 후 팀을 나눌 수 있습니다
            </p>
          )}
        </div>
      )}

      {/* 결과 표시 */}
      {lastTeamResult && <TeamResult onReshuffle={handleReshuffle} />}
    </div>
  )
}
