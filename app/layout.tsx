import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
  title: "가챠픽 (GachaPick) - 재미있는 랜덤 뽑기 & 팀 나누기",
  description: "학교, 회사, 동호회에서 사용하는 공정한 랜덤 선택 도구! 발표자 선정, 벌칙자 뽑기, 팀 나누기를 가챠머신 애니메이션과 함께 즐겁게!",
  keywords: ["랜덤 뽑기", "팀 나누기", "가챠", "추첨", "발표자 선정", "공정한 선택", "랜덤 선택"],
  authors: [{ name: "GachaPick" }],
  openGraph: {
    title: "가챠픽 - 재미있는 랜덤 뽑기 & 팀 나누기",
    description: "공정하고 재미있는 랜덤 선택 도구! 가챠머신 애니메이션과 함께하는 스마트한 추첨",
    type: "website",
    locale: "ko_KR",
  },
  twitter: {
    card: "summary_large_image",
    title: "가챠픽 - 재미있는 랜덤 뽑기 & 팀 나누기",
    description: "공정하고 재미있는 랜덤 선택 도구! 가챠머신 애니메이션과 함께하는 스마트한 추첨",
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
        {children}
      </body>
    </html>
  );
}
