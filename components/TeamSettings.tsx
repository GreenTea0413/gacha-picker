'use client'

import { useGachaStore } from '@/store/useStore'
import { Users } from 'lucide-react'

export default function TeamSettings() {
  const { teamSize, setTeamSize, pairs } = useGachaStore()

  const quickPresets = [3, 5, 6, 11]
  const totalNeeded = teamSize * 2
  const currentPairs = pairs.length

  return (
    <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-800">
      {/* 헤더 */}
      <div className="flex items-center gap-3 mb-6">
        <Users className="text-emerald-400" size={24} />
        <h3 className="text-xl font-bold text-white">팀 설정</h3>
      </div>

      {/* 한 팀당 인원수 입력 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          한 팀당 인원수
        </label>
        <div className="flex items-center gap-4">
          <input
            type="number"
            min="1"
            max="20"
            value={teamSize}
            onChange={(e) => setTeamSize(Number(e.target.value))}
            className="w-24 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-center text-xl font-bold focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:border-transparent"
          />
          <span className="text-gray-400">명</span>
        </div>
      </div>

      {/* 빠른 선택 버튼 */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-300 mb-3">
          빠른 선택
        </label>
        <div className="grid grid-cols-4 gap-2">
          {quickPresets.map((preset) => (
            <button
              key={preset}
              onClick={() => setTeamSize(preset)}
              className={`px-4 py-2 rounded-lg font-bold transition-all ${
                teamSize === preset
                  ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/50'
                  : 'bg-zinc-800 text-gray-400 hover:bg-zinc-700 hover:text-white'
              }`}
            >
              {preset}명
            </button>
          ))}
        </div>
      </div>

      {/* 총 필요 인원 표시 */}
      <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">총 필요 인원</span>
          <span className="text-white font-bold text-lg">{totalNeeded}명</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-gray-400">필요한 짝</span>
          <span className="text-white font-bold text-lg">{teamSize}짝</span>
        </div>
        <div className="flex items-center justify-between text-sm mt-2">
          <span className="text-gray-400">현재 입력된 짝</span>
          <span className={`font-bold text-lg ${
            currentPairs === teamSize
              ? 'text-emerald-400'
              : currentPairs < teamSize
                ? 'text-yellow-400'
                : 'text-red-400'
          }`}>
            {currentPairs}짝 {currentPairs === teamSize && '✓'}
          </span>
        </div>
      </div>

      {/* 안내 메시지 */}
      {currentPairs < teamSize && (
        <div className="mt-4 text-sm text-yellow-400 flex items-center gap-2">
          <span>⚠️</span>
          <span>{teamSize - currentPairs}개의 짝이 더 필요합니다</span>
        </div>
      )}
      {currentPairs > teamSize && (
        <div className="mt-4 text-sm text-red-400 flex items-center gap-2">
          <span>⚠️</span>
          <span>{currentPairs - teamSize}개의 짝이 초과되었습니다</span>
        </div>
      )}
      {currentPairs === teamSize && currentPairs > 0 && (
        <div className="mt-4 text-sm text-emerald-400 flex items-center gap-2">
          <span>✓</span>
          <span>모든 짝이 입력되었습니다!</span>
        </div>
      )}
    </div>
  )
}
