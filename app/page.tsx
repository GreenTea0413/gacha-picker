'use client'

import { useState } from 'react'
import { Sparkles, Dices } from 'lucide-react'
import NameInput from '@/components/NameInput'
import GachaMachine from '@/components/GachaMachine'
import ResultDisplay from '@/components/ResultDisplay'

export default function Home() {
  const [mode, setMode] = useState<'single' | 'team'>('single')

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <header className="text-center mb-8 relative">
          {/* 배경 장식 */}
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob"></div>
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-blob animation-delay-2000"></div>
          </div>

          {/* 메인 타이틀 - 형광 네온 효과 */}
          <div className="mb-6">
            <h1 className="text-7xl md:text-8xl font-black mb-3 relative inline-flex items-center justify-center gap-4">
              {/* 왼쪽 아이콘 - 흰색 + 형광 효과 */}
              <Sparkles 
                size={80}
                className="text-white"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(34, 211, 238, 0.9)) drop-shadow(0 0 40px rgba(16, 185, 129, 0.7))'
                }}
              />
              
              {/* 타이틀 */}
              <span className="relative inline-block">
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-emerald-400 to-lime-400 blur-2xl opacity-50"></span>
                <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-lime-400 animate-gradient drop-shadow-[0_0_30px_rgba(34,211,238,0.5)]">
                  GACHAPICK
                </span>
              </span>
              
              {/* 오른쪽 아이콘 - 흰색 + 형광 효과 */}
              <Dices
                size={80}
                className="text-white"
                style={{
                  filter: 'drop-shadow(0 0 20px rgba(163, 230, 53, 0.9)) drop-shadow(0 0 40px rgba(16, 185, 129, 0.7))'
                }}
              />
            </h1>
          </div>

          {/* 서브 타이틀 */}
          <p className="text-gray-300 text-xl font-bold mb-6">
            재미있는 랜덤 뽑기 & 팀 나누기
          </p>
          
          {/* 뱃지들 */}
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <span className="text-gray-400 text-sm font-bold">⚡ 빠른 추첨</span>
            <span className="text-gray-700">•</span>
            <span className="text-gray-400 text-sm font-bold">🎯 공정한 팀 나누기</span>
            <span className="text-gray-700">•</span>
            <span className="text-gray-400 text-sm font-bold">🎉 재미있는 애니메이션</span>
          </div>
        </header>

        {/* 모드 선택 */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="grid grid-cols-2 gap-6">
            <button
              onClick={() => setMode('single')}
              className={`p-6 rounded-lg transition-all ${
                mode === 'single'
                  ? 'bg-white text-black'
                  : 'bg-zinc-900 text-gray-300 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              <div className="text-4xl mb-2">🎲</div>
              <div className="font-bold text-lg">1명 뽑기</div>
              <div className="text-sm opacity-70 mt-1">
                발표자, 벌칙자 선정
              </div>
            </button>

            <button
              onClick={() => setMode('team')}
              className={`p-6 rounded-lg transition-all ${
                mode === 'team'
                  ? 'bg-white text-black'
                  : 'bg-zinc-900 text-gray-300 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              <div className="text-4xl mb-2">👥</div>
              <div className="font-bold text-lg">팀 나누기</div>
              <div className="text-sm opacity-70 mt-1">
                공정한 팀 구성
              </div>
            </button>
          </div>
        </div>

        {/* 선택된 모드 표시 */}
        <div className="max-w-2xl mx-auto">
          <div className="space-y-8">
            {mode === 'single' ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    🎲 1명 뽑기 모드
                  </h3>
                  <p className="text-gray-400">
                    이름을 입력하고 랜덤으로 한 명을 뽑아보세요!
                  </p>
                </div>

                {/* 이름 입력 */}
                <NameInput />

                {/* 가챠머신 */}
                <GachaMachine />

                {/* 결과 및 히스토리 */}
                <ResultDisplay />
              </div>
            ) : (
              <div>
                <h3 className="text-2xl font-bold mb-2 text-white">
                  👥 팀 나누기 모드
                </h3>
                <p className="text-gray-400">
                  짝을 설정하고 공정하게 팀을 나눠보세요!
                </p>
                <div className="text-center py-12 text-gray-400">
                  🚧 개발 중...
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  )
}