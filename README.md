# 🎲 가챠픽 (GachaPick)

> 재미있는 랜덤 뽑기 & 공정한 팀 나누기 도구

[![Demo](https://img.shields.io/badge/Demo-Live-success)](https://gacha-picker.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-16.0-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)

학교, 회사, 동호회에서 사용하는 공정한 랜덤 선택 도구!
발표자 선정, 벌칙자 뽑기, 팀 나누기를 가챠머신 애니메이션과 함께 즐겁게!

🔗 **[https://gacha-picker.vercel.app/](https://gacha-picker.vercel.app/)**

---

## 📋 목차

- [주요 기능](#-주요-기능)
- [화면 구성](#-화면-구성)
- [기술 스택](#-기술-스택)
- [시작하기](#-시작하기)
- [프로젝트 구조](#-프로젝트-구조)
- [기여하기](#-기여하기)
- [라이선스](#-라이선스)

---

## ✨ 주요 기능

### 🎯 N명 뽑기 모드
- **랜덤 선택**: 입력된 이름 중에서 N명을 공정하게 무작위로 선택
- **가챠머신 애니메이션**: 실제 가챠머신처럼 캡슐이 떨어지는 재미있는 애니메이션
- **결과 저장**: 이전 뽑기 결과를 히스토리로 저장 및 다운로드
- **이름 복사**: 엑셀이나 텍스트에서 이름을 한번에 복사해서 붙여넣기 가능
- **사운드 효과**: 클릭음과 결과음으로 더욱 생동감 있는 경험

### 👥 팀 나누기 모드
- **공정한 팀 분배**: 설정한 팀 개수에 따라 자동으로 균등 분배
- **짝 설정**: 함께 있어야 하거나 떨어져야 하는 사람들을 미리 설정
- **중복 확인**: 같은 팀에 속한 적이 있는 사람들을 자동으로 체크
- **팀 썩기 기능**: 이전 팀 조합을 기억하여 최대한 다른 사람들과 팀 구성
- **결과 이미지 다운로드**: 팀 나누기 결과를 이미지로 저장

### 🎨 디자인 & UX
- **다크 모드**: 눈에 편안한 검은 배경
- **형광 네온 효과**: 사이버펑크 느낌의 세련된 UI
- **반응형 디자인**: 모바일, 태블릿, PC 모두 최적화
- **부드러운 애니메이션**: Framer Motion을 활용한 자연스러운 전환

---

## 📱 화면 구성

| N명 뽑기 | 팀 나누기 |
|------|------|
| <img width="499" height="804" alt="N명 뽑기 화면" src="https://github.com/user-attachments/assets/fa32a2a8-46b8-46d9-8e5b-ff2cb2c14b05" />| <img width="499" height="804" alt="팀 나누기 화면" src="https://github.com/user-attachments/assets/8cad3864-393c-46d4-9e19-34e39fa2e674" />|

---

## 🛠 기술 스택

### Frontend
- **[Next.js 16](https://nextjs.org/)** - React 프레임워크
- **[TypeScript](https://www.typescriptlang.org/)** - 타입 안정성
- **[Tailwind CSS 4](https://tailwindcss.com/)** - 유틸리티 CSS 프레임워크
- **[Framer Motion](https://www.framer.com/motion/)** - 애니메이션 라이브러리

### 상태 관리 & 로직
- **[Zustand](https://zustand-demo.pmnd.rs/)** - 경량 상태 관리
- **[Canvas Confetti](https://github.com/catdad/canvas-confetti)** - 축하 효과

### 배포 & SEO
- **[Vercel](https://vercel.com/)** - 자동 배포 및 호스팅
- **구글 서치콘솔** - 검색 엔진 최적화
- **네이버 웹마스터** - 한국 검색 최적화
- **카카오 AdFit** - 광고 수익화

---

## 🚀 시작하기

### 필수 요구사항
- Node.js 20.x 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 저장소 클론
git clone https://github.com/GreenTea0413/gacha-picker.git
cd gacha-picker

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 브라우저에서 열기
open http://localhost:3000
```

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

### 환경변수 설정

`.env.local` 파일을 생성하고 다음 변수를 추가하세요:

```env
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

---

## 📂 프로젝트 구조

```
gacha-picker/
├── app/
│   ├── components/        # React 컴포넌트
│   │   ├── GachaMachine.tsx
│   │   ├── TeamDivider.tsx
│   │   ├── KakaoAds.tsx
│   │   └── ...
│   ├── lib/              # 유틸리티 & 로직
│   │   └── sounds.ts
│   ├── store/            # Zustand 스토어
│   │   ├── useGachaStore.ts
│   │   └── useTeamStore.ts
│   ├── layout.tsx        # 루트 레이아웃
│   ├── page.tsx          # 메인 페이지
│   ├── sitemap.ts        # 사이트맵 생성
│   ├── robots.ts         # robots.txt 생성
│   ├── opengraph-image.tsx  # OG 이미지 생성
│   └── icon.tsx          # 파비콘 생성
├── public/               # 정적 파일
└── package.json
```

---

## 🤝 기여하기

기여는 언제나 환영합니다!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

---

## 👨‍💻 개발자

**GreenTea** - [@GreenTea0413](https://github.com/GreenTea0413)

프로젝트 링크: [https://github.com/GreenTea0413/gacha-picker](https://github.com/GreenTea0413/gacha-picker)

---

<div align="center">

Made with ❤️ by GreenTea

⭐️ 이 프로젝트가 마음에 드셨다면 Star를 눌러주세요!

</div>

