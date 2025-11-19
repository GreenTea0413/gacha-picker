'use client'

import { useState } from 'react'
import { useGachaStore } from '@/store/useStore'
import { X, Plus, Trash2 } from 'lucide-react'

export default function NameInput() {
  const [inputValue, setInputValue] = useState('')
  const { names, addName, removeName, clearNames } = useGachaStore()

  const handleAddName = () => {
    const trimmedName = inputValue.trim()
    
    if (!trimmedName) {
      alert('이름을 입력해주세요!')
      return
    }

    // 중복 체크 제거 - 항상 추가 가능
    addName(trimmedName)
    setInputValue('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddName()
    }
  }

  const handleBulkAdd = () => {
    const bulkText = prompt('이름들을 입력해주세요 (쉼표, 줄바꿈으로 구분):')
    if (!bulkText) return

    // 쉼표 또는 줄바꿈으로 분리
    const newNames = bulkText
      .split(/[,\n]/)
      .map(name => name.trim())
      .filter(name => name.length > 0)

    // 중복 체크 없이 모두 추가
    newNames.forEach(name => {
      addName(name)
    })
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
            placeholder="이름을 입력하세요"
            className="flex-1 px-4 py-3 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-white text-white placeholder-gray-500 transition-colors"
          />
          <button
            onClick={handleAddName}
            className="px-8 py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-medium"
          >
            추가
          </button>
        </div>

        {/* 빠른 추가 버튼 */}
        <button
          onClick={handleBulkAdd}
          className="text-sm text-gray-400 hover:text-white transition-colors"
        >
          📋 여러 명 한번에 추가하기
        </button>
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
            {names.map((name, index) => (
              <div
                key={`${name}-${index}`}
                className="flex items-center justify-between px-4 py-3 bg-zinc-900 rounded-lg hover:bg-zinc-800 transition-colors"
              >
                <span className="font-medium text-white">
                  {index + 1}. {name}
                </span>
                <button
                  onClick={() => removeName(index)}
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