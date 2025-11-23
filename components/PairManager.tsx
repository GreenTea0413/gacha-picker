'use client'

import { useState, useRef } from 'react'
import { useGachaStore } from '@/store/useStore'
import { Plus, X, Users2 } from 'lucide-react'

export default function PairManager() {
  const { pairs, addPair, removePair, updatePair, teamSize } = useGachaStore()
  const [newPerson1, setNewPerson1] = useState('')
  const [newPerson2, setNewPerson2] = useState('')
  const firstInputRef = useRef<HTMLInputElement>(null)

  const handleAddPair = () => {
    const trimmed1 = newPerson1.trim()
    const trimmed2 = newPerson2.trim()

    if (!trimmed1 || !trimmed2) {
      alert('두 사람의 이름을 모두 입력해주세요!')
      return
    }

    if (trimmed1 === trimmed2) {
      alert('같은 사람을 짝으로 설정할 수 없습니다!')
      return
    }

    // 중복 체크
    const allNames = pairs.flatMap(p => [p.person1, p.person2])
    if (allNames.includes(trimmed1)) {
      alert(`${trimmed1}는 이미 다른 짝에 포함되어 있습니다!`)
      return
    }
    if (allNames.includes(trimmed2)) {
      alert(`${trimmed2}는 이미 다른 짝에 포함되어 있습니다!`)
      return
    }

    addPair({
      id: Date.now().toString(),
      person1: trimmed1,
      person2: trimmed2,
    })

    setNewPerson1('')
    setNewPerson2('')

    // 첫 번째 입력창으로 포커스 이동
    setTimeout(() => {
      firstInputRef.current?.focus()
    }, 0)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddPair()
    }
  }

  return (
    <div className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-800">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Users2 className="text-cyan-400" size={24} />
          <h3 className="text-xl font-bold text-white">
            짝 관리 ({pairs.length}/{teamSize})
          </h3>
        </div>
      </div>

      {/* 짝 추가 입력 */}
      <div className="mb-6">
        <div className="flex gap-2">
          <input
            ref={firstInputRef}
            type="text"
            value={newPerson1}
            onChange={(e) => setNewPerson1(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="첫 번째 사람"
            className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
          />
          <span className="flex items-center text-gray-400 font-bold text-xl">↔</span>
          <input
            type="text"
            value={newPerson2}
            onChange={(e) => setNewPerson2(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="두 번째 사람"
            className="flex-1 px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
          />
          <button
            onClick={handleAddPair}
            className="px-4 py-3 bg-cyan-500 hover:bg-cyan-600 text-white rounded-lg font-bold transition-all flex items-center gap-2 shadow-lg shadow-cyan-500/30"
          >
            <Plus size={20} />
            추가
          </button>
        </div>
        <p className="text-xs text-gray-400 mt-2">
          ⚡ Tip: 두 번째 입력창에서 Enter를 누르면 바로 추가됩니다
        </p>
      </div>

      {/* 짝 목록 */}
      <div className="space-y-3">
        {pairs.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <Users2 size={48} className="mx-auto mb-3 opacity-50" />
            <p>아직 추가된 짝이 없습니다</p>
            <p className="text-sm mt-1">위에서 짝을 추가해주세요</p>
          </div>
        ) : (
          pairs.map((pair, index) => (
            <div
              key={pair.id}
              className="bg-zinc-800/50 border border-zinc-700 rounded-lg p-4 flex items-center gap-4 group hover:border-cyan-400/50 transition-all"
            >
              {/* 번호 */}
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center text-black font-bold text-sm">
                {index + 1}
              </div>

              {/* 이름들 */}
              <div className="flex-1 flex items-center gap-3">
                <input
                  type="text"
                  value={pair.person1}
                  onChange={(e) => updatePair(pair.id, e.target.value, pair.person2)}
                  className="flex-1 px-3 py-2 bg-zinc-700/50 border border-zinc-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                />
                <span className="text-gray-400 font-bold">↔</span>
                <input
                  type="text"
                  value={pair.person2}
                  onChange={(e) => updatePair(pair.id, pair.person1, e.target.value)}
                  className="flex-1 px-3 py-2 bg-zinc-700/50 border border-zinc-600 rounded text-white focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:border-transparent"
                />
              </div>

              {/* 삭제 버튼 */}
              <button
                onClick={() => removePair(pair.id)}
                className="flex-shrink-0 p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all"
                title="삭제"
              >
                <X size={20} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* 짝이 많을 때 스크롤 힌트 */}
      {pairs.length > 5 && (
        <div className="mt-4 text-center text-sm text-gray-500">
          스크롤하여 모든 짝을 확인하세요
        </div>
      )}
    </div>
  )
}
