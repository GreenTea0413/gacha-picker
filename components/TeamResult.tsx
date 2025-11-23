'use client'

import { useRef, useState } from 'react'
import { useGachaStore } from '@/store/useStore'
import { Trophy, Shuffle, Download } from 'lucide-react'
import { motion } from 'framer-motion'
import { captureAndDownload, generateFilename } from '@/lib/screenshot'
import { soundManager } from '@/lib/sounds'

interface TeamResultProps {
  onReshuffle: () => void
}

export default function TeamResult({ onReshuffle }: TeamResultProps) {
  const { lastTeamResult } = useGachaStore()
  const resultRef = useRef<HTMLDivElement>(null)
  const [isCapturing, setIsCapturing] = useState(false)

  if (!lastTeamResult) {
    return null
  }

  const { teamA, teamB } = lastTeamResult

  const handleScreenshot = async () => {
    if (!resultRef.current || isCapturing) return

    setIsCapturing(true)
    soundManager.playClick()

    try {
      const filename = generateFilename('team-result')
      await captureAndDownload(resultRef.current, filename)
      alert('결과가 저장되었습니다! 📸')
    } catch (error) {
      alert('스크린샷 저장에 실패했습니다.')
      console.error(error)
    } finally {
      setIsCapturing(false)
    }
  }

  return (
    <motion.div
      ref={resultRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-zinc-900/50 backdrop-blur-sm p-6 rounded-xl border border-zinc-800"
    >
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Trophy className="text-yellow-400" size={24} />
          <h3 className="text-xl font-bold text-white">팀 분배 결과</h3>
        </div>
        <button
          onClick={onReshuffle}
          className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-bold transition-all flex items-center gap-2 shadow-lg shadow-emerald-500/30"
        >
          <Shuffle size={18} />
          다시 섞기
        </button>
      </div>

      {/* 팀 결과 */}
      <div className="grid grid-cols-2 gap-6">
        {/* A팀 */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-red-500/10 border-2 border-red-500 rounded-xl p-5"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
            <h4 className="text-2xl font-black text-red-400">A팀</h4>
            <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
          </div>
          <div className="space-y-2">
            {teamA.map((name, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-red-500/20 rounded-lg p-3 text-center"
              >
                <span className="text-white font-bold text-lg">{name}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 text-center text-red-400 font-bold text-sm">
            총 {teamA.length}명
          </div>
        </motion.div>

        {/* B팀 */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-blue-500/10 border-2 border-blue-500 rounded-xl p-5"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
            <h4 className="text-2xl font-black text-blue-400">B팀</h4>
            <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse"></div>
          </div>
          <div className="space-y-2">
            {teamB.map((name, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-blue-500/20 rounded-lg p-3 text-center"
              >
                <span className="text-white font-bold text-lg">{name}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-4 text-center text-blue-400 font-bold text-sm">
            총 {teamB.length}명
          </div>
        </motion.div>
      </div>

      {/* 하단 액션 */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={handleScreenshot}
          disabled={isCapturing}
          className={`px-4 py-2 rounded-lg font-bold transition-all flex items-center gap-2 ${
            isCapturing
              ? 'bg-zinc-800 text-gray-500 cursor-not-allowed'
              : 'bg-zinc-700 hover:bg-zinc-600 text-white'
          }`}
        >
          <Download size={18} className={isCapturing ? 'animate-bounce' : ''} />
          {isCapturing ? '저장 중...' : '결과 저장'}
        </button>
      </div>
    </motion.div>
  )
}
