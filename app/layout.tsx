import type React from "react"
import type { Metadata } from "next"
import { Geist_Mono, Archivo } from "next/font/google"
import localFont from "next/font/local"
import { Analytics } from "@vercel/analytics/next"
import { AudioPlayerProvider } from "@/contexts/audio-player-context"
import { VideoPlayerProvider } from "@/contexts/video-player-context"
import { FloatingAudioPlayer } from "@/components/floating-audio-player"
import { FloatingVideoPlayer } from "@/components/floating-video-player"
import { OrganizationStructuredData } from "@/components/structured-data"
import { ScrollToTop } from "@/components/scroll-to-top"
import { ScrollToTopButton } from "@/components/scroll-to-top-button"
import { LayoutWrapper } from "@/components/layout-wrapper"
import "./globals.css"

const aspekta = localFont({
  src: "../public/fonts/aspekta/variable/AspektaVF.woff2",
  variable: "--font-sans",
  weight: "100 900",
})
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" })
const archivo = Archivo({ subsets: ["latin"], variable: "--font-archivo" })

// Updated metadata with more keywords and better descriptions for LLM discoverability
export const metadata: Metadata = {
  metadataBase: new URL("https://airesearchcentre.aircwou.com"), // Update with your actual domain
  title: {
    default: "AI Research Centre - Woxsen University",
    template: "%s | AI Research Centre",
  },
  description:
    "Pioneering AI Research Centre specializing in AI, machine learning, quantum computing, and sustainable technology. We publish cutting-edge research papers, develop innovative products, offer professional bootcamps, and host expert podcasts. Join our community of researchers, engineers, and innovators.",
  generator: "Next.js",
  applicationName: "University AI Research Center",
  keywords: [
    "AI Research Center",
    "artificial intelligence",
    "machine learning",
    "quantum computing",
    "sustainable technology",
    "research papers",
    "scientific publications",
    "bootcamp",
    "professional training",
    "technology education",
    "innovation",
    "university research",
    "AI products",
    "open source",
    "academic research",
  ],
  authors: [{ name: "AI Research Centre Team", url: "https://airesearchcentre.aircwou.com/teams" }],
  creator: "University AI Research Center",
  publisher: "University AI Research Center",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://airesearchcentre.aircwou.com",
    siteName: "AI Research Centre - Woxsen University",
    title: "AI Research Centre - Woxsen University",
    description:
      "Pioneering research, cutting-edge products, and transformative bootcamps at the intersection of technology and discovery.",
    images: [
      {
        url: "/api/og?title=AI Research Centre&subtitle=Woxsen University&description=Pioneering Machine Intelligence & Quantum Research",
        width: 1200,
        height: 630,
        alt: "AI Research Centre - Woxsen University",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Research Centre - Woxsen University",
    description: "Pioneering research, cutting-edge products, and transformative bootcamps.",
    creator: "@universitylab",
    images: ["/api/og?title=AI Research Centre&subtitle=Woxsen University&description=Pioneering Machine Intelligence & Quantum Research"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    types: {
      "application/rss+xml": [
        { url: "/api/rss", title: "AI Research Centre Insights RSS Feed" },
        { url: "/api/podcast-rss", title: "AI Research Centre Podcast RSS Feed" },
      ],
    },
  },
  icons: {
    icon: [
      {
        url: "/airc-logo-3d-latest.PNG",
        sizes: "any",
      },
    ],
    apple: "/airc-logo-3d-latest.PNG",
    shortcut: "/airc-logo-3d-latest.PNG",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${aspekta.variable} ${geistMono.variable} ${archivo.variable}`}>
      <head>
        <OrganizationStructuredData />
        <link rel="alternate" type="application/rss+xml" title="AI Research Center Insights" href="/api/rss" />
        <link rel="alternate" type="application/rss+xml" title="AI Research Center Podcast" href="/api/podcast-rss" />
      </head>
      <body className={`font-sans antialiased bg-white min-h-screen`}>
        {/* Global Background Textures */}
        {/* <div className="fixed inset-0 bg-noise opacity-20 pointer-events-none z-0"></div>
        <div className="fixed left-0 top-0 bottom-0 w-[400px] bg-diagonal-hatch opacity-30 [mask-image:linear-gradient(to_right,black,transparent)] pointer-events-none z-0"></div>
        <div className="fixed right-0 top-0 bottom-0 w-[400px] bg-diagonal-hatch opacity-30 [mask-image:linear-gradient(to_left,black,transparent)] pointer-events-none z-0"></div> */}

        <LayoutWrapper>
          <AudioPlayerProvider>
            <VideoPlayerProvider>
              <ScrollToTop />
              <ScrollToTopButton />
              {children}
              <FloatingAudioPlayer />
              <FloatingVideoPlayer />
            </VideoPlayerProvider>
          </AudioPlayerProvider>
        </LayoutWrapper>
        <Analytics />
      </body>
    </html>
  )
}
