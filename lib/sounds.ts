// Web Audio API를 사용한 간단한 효과음 생성
// 실제 사운드 파일 없이 브라우저에서 직접 생성

class SoundManager {
  private audioContext: AudioContext | null = null
  private enabled: boolean = true

  constructor() {
    if (typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || (window as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext
      this.audioContext = AudioContextClass ? new AudioContextClass() : null
      // localStorage에서 사운드 설정 불러오기
      const savedSoundState = localStorage.getItem('gacha-picker-sound')
      this.enabled = savedSoundState !== 'false'
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled
    if (typeof window !== 'undefined') {
      localStorage.setItem('gacha-picker-sound', enabled ? 'true' : 'false')
    }
  }

  isEnabled(): boolean {
    return this.enabled
  }

  // 레버 당기기 소리 (짧은 클릭음)
  playLever() {
    if (!this.enabled || !this.audioContext) return

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.frequency.value = 800
    oscillator.type = 'square'

    gainNode.gain.setValueAtTime(0.3, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1)

    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + 0.1)
  }

  // 캡슐 떨어지는 소리 (통통)
  playDrop() {
    if (!this.enabled || !this.audioContext) return

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.frequency.setValueAtTime(600, this.audioContext.currentTime)
    oscillator.frequency.exponentialRampToValueAtTime(200, this.audioContext.currentTime + 0.3)
    oscillator.type = 'sine'

    gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.3)

    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + 0.3)
  }

  // 성공 팡파레 (밝은 소리)
  playSuccess() {
    if (!this.enabled || !this.audioContext) return

    const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6
    const baseTime = this.audioContext.currentTime

    notes.forEach((freq, index) => {
      const oscillator = this.audioContext!.createOscillator()
      const gainNode = this.audioContext!.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext!.destination)

      oscillator.frequency.value = freq
      oscillator.type = 'sine'

      const startTime = baseTime + index * 0.1
      gainNode.gain.setValueAtTime(0.15, startTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.3)

      oscillator.start(startTime)
      oscillator.stop(startTime + 0.3)
    })
  }

  // 섞는 소리 (빠른 톤 변화)
  playShuffle() {
    if (!this.enabled || !this.audioContext) return

    for (let i = 0; i < 5; i++) {
      const oscillator = this.audioContext.createOscillator()
      const gainNode = this.audioContext.createGain()

      oscillator.connect(gainNode)
      gainNode.connect(this.audioContext.destination)

      const freq = 400 + Math.random() * 400
      oscillator.frequency.value = freq
      oscillator.type = 'sawtooth'

      const startTime = this.audioContext.currentTime + i * 0.05
      gainNode.gain.setValueAtTime(0.1, startTime)
      gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.08)

      oscillator.start(startTime)
      oscillator.stop(startTime + 0.08)
    }
  }

  // 버튼 클릭 소리 (짧고 가벼운)
  playClick() {
    if (!this.enabled || !this.audioContext) return

    const oscillator = this.audioContext.createOscillator()
    const gainNode = this.audioContext.createGain()

    oscillator.connect(gainNode)
    gainNode.connect(this.audioContext.destination)

    oscillator.frequency.value = 1000
    oscillator.type = 'sine'

    gainNode.gain.setValueAtTime(0.2, this.audioContext.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.05)

    oscillator.start(this.audioContext.currentTime)
    oscillator.stop(this.audioContext.currentTime + 0.05)
  }
}

// 싱글톤 인스턴스
export const soundManager = new SoundManager()
