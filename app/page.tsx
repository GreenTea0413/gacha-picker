'use client'

import { useState, useEffect } from 'react'
import { Sparkles, Dices, Volume2, VolumeX } from 'lucide-react'
import NameInput from '@/components/NameInput'
import GachaMachine from '@/components/GachaMachine'
import ResultDisplay from '@/components/ResultDisplay'
import TeamSettings from '@/components/TeamSettings'
import PairManager from '@/components/PairManager'
import TeamDivider from '@/components/TeamDivider'
import { soundManager } from '@/lib/sounds'

export default function Home() {
  const [mode, setMode] = useState<'single' | 'team'>('single')
  const [mounted, setMounted] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)

  // 클라이언트 마운트 후 localStorage에서 모드 불러오기
  useEffect(() => {
    setMounted(true)
    const savedMode = localStorage.getItem('gacha-picker-mode')
    if (savedMode === 'single' || savedMode === 'team') {
      setMode(savedMode)
    }
    // 사운드 설정 불러오기
    setSoundEnabled(soundManager.isEnabled())
  }, [])

  // 모드 변경 시 저장
  const handleModeChange = (newMode: 'single' | 'team') => {
    setMode(newMode)
    localStorage.setItem('gacha-picker-mode', newMode)
  }

  // 사운드 토글
  const toggleSound = () => {
    const newState = !soundEnabled
    setSoundEnabled(newState)
    soundManager.setEnabled(newState)
    // 피드백 클릭 소리
    if (newState) {
      soundManager.playClick()
    }
  }

  // 마운트 전에는 로딩 표시 (hydration 깜빡임 방지)
  if (!mounted) {
    return (
      <main className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          {/* 형광 가챠머신 SVG */}
          <div className="relative inline-block mb-6">
            <svg
              width="120"
              height="140"
              viewBox="0 0 120 140"
              className="animate-pulse"
              style={{
                filter: 'drop-shadow(0 0 20px rgba(34, 211, 238, 0.8)) drop-shadow(0 0 40px rgba(16, 185, 129, 0.6))'
              }}
            >
              {/* 상단 돔 */}
              <ellipse
                cx="60"
                cy="35"
                rx="40"
                ry="35"
                fill="url(#gradient1)"
                opacity="0.3"
              />
              <ellipse
                cx="60"
                cy="35"
                rx="40"
                ry="35"
                fill="none"
                stroke="url(#gradient1)"
                strokeWidth="3"
              />

              {/* 메인 박스 */}
              <rect
                x="20"
                y="60"
                width="80"
                height="60"
                rx="8"
                fill="url(#gradient2)"
                opacity="0.3"
              />
              <rect
                x="20"
                y="60"
                width="80"
                height="60"
                rx="8"
                fill="none"
                stroke="url(#gradient2)"
                strokeWidth="3"
              />

              {/* 캡슐 */}
              <circle
                cx="60"
                cy="90"
                r="12"
                fill="url(#gradient3)"
                className="animate-bounce"
              />

              {/* 출구 */}
              <rect
                x="45"
                y="115"
                width="30"
                height="10"
                rx="2"
                fill="url(#gradient1)"
              />

              {/* 그라데이션 정의 */}
              <defs>
                <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="50%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#a3e635" />
                </linearGradient>
                <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#a3e635" />
                  <stop offset="50%" stopColor="#10b981" />
                  <stop offset="100%" stopColor="#22d3ee" />
                </linearGradient>
                <linearGradient id="gradient3" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#22d3ee" />
                  <stop offset="100%" stopColor="#10b981" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* 로딩 텍스트 */}
          <p
            className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-emerald-400 to-lime-400 font-bold text-xl"
            style={{
              filter: 'drop-shadow(0 0 10px rgba(34, 211, 238, 0.5))'
            }}
          >
            로딩 중...
          </p>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-8">
        {/* 헤더 */}
        <header className="text-center mb-8 relative">
          {/* 사운드 토글 버튼 - 우측 상단 */}
          <button
            onClick={toggleSound}
            className="absolute top-0 right-4 p-3 rounded-full bg-zinc-900/50 border border-zinc-700 hover:bg-zinc-800 hover:border-cyan-400 transition-all group"
            title={soundEnabled ? '소리 끄기' : '소리 켜기'}
          >
            {soundEnabled ? (
              <Volume2 className="text-cyan-400 group-hover:scale-110 transition-transform" size={24} />
            ) : (
              <VolumeX className="text-gray-500 group-hover:scale-110 transition-transform" size={24} />
            )}
          </button>

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
              onClick={() => handleModeChange('single')}
              className={`p-6 rounded-lg transition-all ${
                mode === 'single'
                  ? 'bg-white text-black'
                  : 'bg-zinc-900 text-gray-300 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              <div className="text-4xl mb-2">🎲</div>
              <div className="font-bold text-lg">N명 뽑기</div>
              <div className="text-sm opacity-70 mt-1">
                발표자, 벌칙자 선정
              </div>
            </button>

            <button
              onClick={() => handleModeChange('team')}
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
                    🎲 N명 뽑기 모드
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
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-bold mb-2 text-white">
                    👥 팀 나누기 모드
                  </h3>
                  <p className="text-gray-400">
                    짝을 설정하고 공정하게 팀을 나눠보세요!
                  </p>
                </div>

                {/* 팀 설정 */}
                <TeamSettings />

                {/* 짝 관리 */}
                <PairManager />

                {/* 팀 나누기 & 결과 */}
                <TeamDivider />
              </div>
            )}
          </div>
        </div>

      </div>
    </main>
  )
}