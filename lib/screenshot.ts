import html2canvas from 'html2canvas-pro'

/**
 * HTML 요소를 캡처하여 이미지로 다운로드
 * @param element - 캡처할 HTML 요소
 * @param filename - 저장할 파일명 (확장자 제외)
 */
export async function captureAndDownload(element: HTMLElement, filename: string): Promise<void> {
  try {
    // html2canvas로 요소 캡처
    const canvas = await html2canvas(element, {
      backgroundColor: '#000000', // 검은 배경
      scale: 2, // 2배 해상도 (고화질)
      logging: false, // 콘솔 로그 끄기
      useCORS: true, // 외부 리소스 허용
    })

    // Canvas를 Blob으로 변환
    canvas.toBlob((blob) => {
      if (!blob) {
        throw new Error('Failed to create blob')
      }

      // 다운로드 링크 생성
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `${filename}.png`

      // 다운로드 트리거
      document.body.appendChild(link)
      link.click()

      // 정리
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    }, 'image/png')
  } catch (error) {
    console.error('Screenshot failed:', error)
    throw error
  }
}

/**
 * 현재 날짜/시간 기반 파일명 생성
 * @param prefix - 파일명 접두사
 * @returns YYYYMMDD-HHMMSS 형식의 파일명
 */
export function generateFilename(prefix: string): string {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const hours = String(now.getHours()).padStart(2, '0')
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  return `${prefix}-${year}${month}${day}-${hours}${minutes}${seconds}`
}
