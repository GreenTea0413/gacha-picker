'use client'

import { useGachaStore } from '@/store/useStore'
import { History, TrendingUp, Users, Download } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMemo, useRef, useState } from 'react'
import { captureAndDownload, generateFilename } from '@/lib/screenshot'
import { soundManager } from '@/lib/sounds'

export default function ResultDisplay() {
  const { history, clearHistory } = useGachaStore()
  const resultRef = useRef<HTMLDivElement>(null)
  const [isCapturing, setIsCapturing] = useState(false)

  // 통계 계산
  const stats = useMemo(() => {
    const pickCount: { [key: string]: number } = {}
    
    history.forEach(name => {
      pickCount[name] = (pickCount[name] || 0) + 1
    })

    const mostPicked = Object.entries(pickCount).sort((a, b) => b[1] - a[1])[0]

    return {
      totalPicks: history.length,
      uniquePeople: Object.keys(pickCount).length,
      mostPicked: mostPicked ? { name: mostPicked[0], count: mostPicked[1] } : null,
      pickCount,
    }
  }, [history])

  const handleScreenshot = async () => {
    if (!resultRef.current || isCapturing) return

    setIsCapturing(true)
    soundManager.playClick()

    try {
      const filename = generateFilename('gacha-result')
      await captureAndDownload(resultRef.current, filename)
      alert('결과가 저장되었습니다! 📸')
    } catch (error) {
      alert('스크린샷 저장에 실패했습니다.')
      console.error(error)
    } finally {
      setIsCapturing(false)
    }
  }

  if (history.length === 0) {
    return null
  }

  return (
    <div ref={resultRef} className="space-y-4">
      {/* 통계 카드 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid grid-cols-3 gap-4"
      >
        <div className="bg-zinc-900 rounded-lg p-4 text-center">
          <div className="text-gray-400 mb-1">
            <TrendingUp size={20} className="mx-auto" />
          </div>
          <div className="text-2xl font-bold text-white">{stats.totalPicks}</div>
          <div className="text-xs text-gray-400">총 뽑기 횟수</div>
        </div>

        <div className="bg-zinc-900 rounded-lg p-4 text-center">
          <div className="text-gray-400 mb-1">
            <Users size={20} className="mx-auto" />
          </div>
          <div className="text-2xl font-bold text-white">{stats.uniquePeople}</div>
          <div className="text-xs text-gray-400">뽑힌 사람 수</div>
        </div>

        <div className="bg-zinc-900 rounded-lg p-4 text-center">
          <div className="text-gray-400 mb-1">🏆</div>
          <div className="text-lg font-bold text-white truncate">
            {stats.mostPicked?.name || '-'}
          </div>
          <div className="text-xs text-gray-400">
            최다 당첨 ({stats.mostPicked?.count || 0}회)
          </div>
        </div>
      </motion.div>

      {/* 히스토리 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-zinc-900 rounded-lg p-6"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <History size={20} className="text-gray-400" />
            <h3 className="font-bold text-white">뽑기 히스토리</h3>
            <span className="text-sm text-gray-400">
              (최근 {history.length}명)
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleScreenshot}
              disabled={isCapturing}
              className={`text-sm font-medium transition-colors flex items-center gap-1 ${
                isCapturing
                  ? 'text-gray-600 cursor-not-allowed'
                  : 'text-gray-400 hover:text-cyan-400'
              }`}
            >
              <Download size={16} className={isCapturing ? 'animate-bounce' : ''} />
              {isCapturing ? '저장 중...' : '저장'}
            </button>
            <button
              onClick={clearHistory}
              className="text-sm text-gray-400 hover:text-red-400 font-medium transition-colors"
            >
              초기화
            </button>
          </div>
        </div>

        <div className="space-y-2 max-h-64 overflow-y-auto">
          <AnimatePresence>
            {history.map((name, index) => {
              const pickCount = stats.pickCount[name] || 1
              
              return (
                <motion.div
                  key={`${name}-${index}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.05 }}
                  className="flex items-center gap-3 px-4 py-3 bg-zinc-800 rounded-lg hover:bg-zinc-700 transition-colors"
                >
                  <div className="flex items-center justify-center w-7 h-7 bg-white text-black rounded-full text-xs font-bold">
                    {index + 1}
                  </div>
                  
                  <div className="flex-1">
                    <div className="font-semibold text-white">{name}</div>
                    <div className="text-xs text-gray-400">
                      {index === 0 ? '방금 전' : `${index}번째 전`}
                    </div>
                  </div>

                  {pickCount > 1 && (
                    <div className="bg-white text-black px-2 py-1 rounded-full text-xs font-semibold">
                      {pickCount}회
                    </div>
                  )}
                </motion.div>
              )
            })}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  )
}