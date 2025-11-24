import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: "가챠픽 (GachaPick) - 재미있는 랜덤 뽑기 & 팀 나누기",
  description: "학교, 회사, 동호회에서 사용하는 공정한 랜덤 선택 도구! 발표자 선정, 벌칙자 뽑기, 팀 나누기를 가챠머신 애니메이션과 함께 즐겁게!",
  keywords: ["랜덤 뽑기", "팀 나누기", "가챠", "추첨", "발표자 선정", "공정한 선택", "랜덤 선택", "가챠머신", "팀 분배", "랜덤 추첨", "온라인 추첨", "무작위 선택"],
  authors: [{ name: "GachaPick" }],
  creator: "GachaPick",
  publisher: "GachaPick",
  applicationName: "가챠픽",
  category: "웹 도구",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "가챠픽 - 재미있는 랜덤 뽑기 & 팀 나누기",
    description: "공정하고 재미있는 랜덤 선택 도구! 가챠머신 애니메이션과 함께하는 스마트한 추첨",
    type: "website",
    locale: "ko_KR",
    siteName: "가챠픽 (GachaPick)",
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: '가챠픽 - 재미있는 랜덤 뽑기 & 팀 나누기',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "가챠픽 - 재미있는 랜덤 뽑기 & 팀 나누기",
    description: "공정하고 재미있는 랜덤 선택 도구! 가챠머신 애니메이션과 함께하는 스마트한 추첨",
    images: ['/opengraph-image'],
  },
  alternates: {
    canonical: "/",
  },
  verification: {
    google: "lcnJKA7vmJdAeeH_r_Sj_uWnJt-qj0_kyd5Om9o3imA",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {/* 왼쪽 사이드 광고 */}
        <div className="hidden lg:block fixed left-0 top-1/2 -translate-y-1/2 z-40">
          <ins
            className="kakao_ad_area"
            data-ad-unit="DAN-bBS8ul3kcSuWTTE4"
            data-ad-width="160"
            data-ad-height="600"
          />
        </div>

        {/* 오른쪽 사이드 광고 */}
        <div className="hidden lg:block fixed right-0 top-1/2 -translate-y-1/2 z-40">
          <ins
            className="kakao_ad_area"
            data-ad-unit="DAN-J5xEfW6r0Ly25iKQ"
            data-ad-width="160"
            data-ad-height="600"
          />
        </div>

        {children}

        {/* JSON-LD 구조화된 데이터 */}
        <Script
          id="json-ld"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "가챠픽 (GachaPick)",
              applicationCategory: "UtilityApplication",
              description: "학교, 회사, 동호회에서 사용하는 공정한 랜덤 선택 도구! 발표자 선정, 벌칙자 뽑기, 팀 나누기를 가챠머신 애니메이션과 함께 즐겁게!",
              operatingSystem: "All",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "KRW",
              },
              browserRequirements: "Requires JavaScript. Requires HTML5.",
              inLanguage: "ko-KR",
            }),
          }}
        />

        {/* 카카오 광고 스크립트 */}
        <Script
          src="//t1.daumcdn.net/kas/static/ba.min.js"
          strategy="afterInteractive"
          async
        />
      </body>
    </html>
  );
}
