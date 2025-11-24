'use client'

import { useEffect, useState } from 'react'

export default function KakaoAds() {
  const [isLargeScreen, setIsLargeScreen] = useState(false)

  useEffect(() => {
    // 화면 크기 체크
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024)
    }

    // 초기 체크
    checkScreenSize()

    // 리사이즈 이벤트 리스너
    window.addEventListener('resize', checkScreenSize)

    return () => {
      window.removeEventListener('resize', checkScreenSize)
    }
  }, [])

  useEffect(() => {
    // 큰 화면일 때만 스크립트 로드
    if (!isLargeScreen) return

    const script = document.createElement('script')
    script.src = '//t1.daumcdn.net/kas/static/ba.min.js'
    script.async = true
    document.body.appendChild(script)

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [isLargeScreen])

  // 큰 화면이 아니면 아예 렌더링하지 않음
  if (!isLargeScreen) {
    return null
  }

  return (
    <>
      {/* 왼쪽 사이드 광고 */}
      <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40">
        <ins
          className="kakao_ad_area"
          data-ad-unit="DAN-bBS8ul3kcSuWTTE4"
          data-ad-width="160"
          data-ad-height="600"
        />
      </div>

      {/* 오른쪽 사이드 광고 */}
      <div className="fixed right-0 top-1/2 -translate-y-1/2 z-40">
        <ins
          className="kakao_ad_area"
          data-ad-unit="DAN-J5xEfW6r0Ly25iKQ"
          data-ad-width="160"
          data-ad-height="600"
        />
      </div>
    </>
  )
}
