import { ImageResponse } from 'next/og'

// 아이콘 메타데이터
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// 아이콘 생성
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 24,
          background: 'black',
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          style={{
            filter: 'drop-shadow(0 0 3px rgba(34, 211, 238, 0.8))',
          }}
        >
          {/* 간단한 가챠머신 아이콘 */}
          <ellipse
            cx="16"
            cy="10"
            rx="10"
            ry="8"
            fill="none"
            stroke="#22d3ee"
            strokeWidth="2"
          />
          <rect
            x="6"
            y="16"
            width="20"
            height="12"
            rx="2"
            fill="none"
            stroke="#10b981"
            strokeWidth="2"
          />
          <circle cx="16" cy="22" r="2" fill="#a3e635" />
        </svg>
      </div>
    ),
    {
      ...size,
    }
  )
}
