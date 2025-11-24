import { ImageResponse } from 'next/og'

// 이미지 메타데이터
export const alt = '가챠픽 - 재미있는 랜덤 뽑기 & 팀 나누기'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

// 이미지 생성
export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#000000',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'system-ui',
          position: 'relative',
        }}
      >
        {/* 배경 그라데이션 블러 효과 */}
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            background: 'radial-gradient(circle, rgba(34, 211, 238, 0.3) 0%, rgba(16, 185, 129, 0.2) 50%, transparent 70%)',
            filter: 'blur(80px)',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* 가챠머신 SVG */}
        <svg
          width="280"
          height="320"
          viewBox="0 0 120 140"
          style={{
            marginBottom: '40px',
            filter: 'drop-shadow(0 0 40px rgba(34, 211, 238, 0.9)) drop-shadow(0 0 80px rgba(16, 185, 129, 0.7))',
          }}
        >
          {/* 상단 돔 */}
          <ellipse
            cx="60"
            cy="35"
            rx="40"
            ry="35"
            fill="rgba(34, 211, 238, 0.2)"
          />
          <ellipse
            cx="60"
            cy="35"
            rx="40"
            ry="35"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="4"
          />

          {/* 메인 박스 */}
          <rect
            x="20"
            y="60"
            width="80"
            height="60"
            rx="8"
            fill="rgba(16, 185, 129, 0.2)"
          />
          <rect
            x="20"
            y="60"
            width="80"
            height="60"
            rx="8"
            fill="none"
            stroke="#10b981"
            strokeWidth="4"
          />

          {/* 캡슐들 */}
          <circle cx="45" cy="85" r="8" fill="#22d3ee" />
          <circle cx="60" cy="95" r="8" fill="#10b981" />
          <circle cx="75" cy="85" r="8" fill="#a3e635" />

          {/* 출구 */}
          <rect
            x="45"
            y="115"
            width="30"
            height="12"
            rx="3"
            fill="#a3e635"
          />
        </svg>

        {/* 타이틀 */}
        <div
          style={{
            fontSize: 80,
            fontWeight: 900,
            background: 'linear-gradient(to right, #22d3ee, #10b981, #a3e635)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            color: 'transparent',
            textAlign: 'center',
            letterSpacing: '-2px',
            marginBottom: '20px',
          }}
        >
          GACHAPICK
        </div>

        {/* 서브타이틀 */}
        <div
          style={{
            fontSize: 32,
            color: '#d1d5db',
            textAlign: 'center',
            fontWeight: 600,
          }}
        >
          재미있는 랜덤 뽑기 & 팀 나누기
        </div>

        {/* 하단 뱃지들 */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
            marginTop: '40px',
            fontSize: 20,
            color: '#9ca3af',
          }}
        >
          <span>⚡ 빠른 추첨</span>
          <span>•</span>
          <span>🎯 공정한 팀 나누기</span>
          <span>•</span>
          <span>🎉 재미있는 애니메이션</span>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
