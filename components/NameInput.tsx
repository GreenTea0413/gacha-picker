'use client'

import { useState } from 'react'
import { useGachaStore } from '@/store/useStore'
import { X } from 'lucide-react'

export default function NameInput() {
  const [inputValue, setInputValue] = useState('')
  const { names, addName, removeName, clearNames } = useGachaStore()

  const handleAddName = () => {
    const trimmedName = inputValue.trim()
    
    if (!trimmedName) {
      alert('이름을 입력해주세요!')
      return
    }

    // 쉼표로 구분된 경우 처리
    const entries = trimmedName.split(',').map(e => e.trim()).filter(e => e)
    
    entries.forEach(entry => {
      // 패턴 체크: 이름*숫자
      const match = entry.match(/^(.+)\*(\d+)$/)
      if (match) {
        const [, name, countStr] = match
        const count = parseInt(countStr)
        if (count > 0 && count <= 100) {
          for (let i = 0; i < count; i++) {
            addName(name.trim())
          }
        }
      } else {
        addName(entry)
      }
    })

    setInputValue('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddName()
    }
  }

  return (
    <div className="space-y-6">
      {/* 입력 섹션 */}
      <div className="space-y-3">
        <label className="block text-sm font-medium text-gray-300 uppercase tracking-wide">
          참가자 추가
        </label>
        
        <div className="flex gap-3">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="이름 입력 (예: ooo*10,xxx*5)"
            className="flex-1 px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-white text-white placeholder-gray-500 transition-colors"
          />
          <button
            onClick={handleAddName}
            className="px-8 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            추가
          </button>
        </div>

        <div className="text-xs bg-gradient-to-r from-cyan-400 via-emerald-400 to-lime-400 bg-clip-text text-transparent">
          Tip: 쉼표로 구분하여 여러 명 추가 가능 (예: ooo*10,xxx*5)
        </div>
      </div>

      {/* 참가자 리스트 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-3">
          <label className="block text-sm font-medium text-gray-300 uppercase tracking-wide">
            참가자 목록 ({names.length}명)
          </label>
          {names.length > 0 && (
            <button
              onClick={clearNames}
              className="text-sm text-gray-400 hover:text-red-400 font-medium transition-colors"
            >
              전체 삭제
            </button>
          )}
        </div>

        {names.length === 0 ? (
          <div className="text-center py-12 text-gray-500 border-2 border-dashed border-zinc-800 rounded-lg">
            참가자를 추가해주세요
          </div>
        ) : (
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {Object.entries(
              names.reduce((acc, name) => {
                acc[name] = (acc[name] || 0) + 1
                return acc
              }, {} as Record<string, number>)
            ).map(([name, count]) => (
              <div
                key={name}
                className="flex items-center justify-between px-4 py-3 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <span className="font-medium text-white">
                  {name} - {count}명
                </span>
                <button
                  onClick={() => {
                    // 해당 이름 전부 삭제
                    const indices = names.map((n, i) => n === name ? i : -1).filter(i => i !== -1).reverse()
                    indices.forEach(i => removeName(i))
                  }}
                  className="text-gray-500 hover:text-red-400 transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 안내 메시지 */}
      {names.length > 0 && names.length < 2 && (
        <div className="text-sm text-yellow-400 bg-yellow-500/10 px-3 py-2 rounded-lg border border-yellow-500/20">
          ⚠️ 최소 2명 이상의 참가자가 필요합니다
        </div>
      )}
    </div>
  )
}