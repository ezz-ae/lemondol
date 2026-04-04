import React from "react"
import type { Metadata, Viewport } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/components/lemon/cart-context'
import { LemonOrchestrator } from '@/components/lemon/lemon-orchestrator'
import { BottomNav } from '@/components/lemon/bottom-nav'
import { Header } from '@/components/lemon/header'
import { Toaster } from '@/components/ui/toaster'
import { StructuredData } from '@/components/seo/structured-data'
import { absoluteUrl, getOrganizationSchema, getWebsiteSchema, siteConfig } from '@/lib/seo'
import { getNeonData } from '@/lib/neon-data'
import './globals.css'

const dmSans = DM_Sans({ 
  subsets: ["latin"],
  variable: '--font-dm-sans',
  weight: ['300', '400', '500', '600']
});

const playfairDisplay = Playfair_Display({ 
  subsets: ["latin"],
  variable: '--font-playfair',
  weight: ['400', '500', '600', '700']
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  referrer: 'origin-when-cross-origin',
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: 'fashion',
  manifest: '/manifest.webmanifest',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: 'website',
    images: [
      {
        url: absoluteUrl('/opengraph-image'),
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} open graph image`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: siteConfig.title,
    description: siteConfig.description,
    images: [absoluteUrl('/twitter-image')],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export const viewport: Viewport = {
  themeColor: '#F8E231',
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const neonData = await getNeonData()

  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${playfairDisplay.variable} min-h-dvh overflow-x-hidden bg-slate-50 font-sans antialiased`}>
        <StructuredData data={[getOrganizationSchema(), getWebsiteSchema()]} />
        <CartProvider>
          <div className="relative flex min-h-dvh flex-col bg-background">
            <Header />
            <LemonOrchestrator hasNeonData={neonData.available} />
            <main className="flex-1 pb-[calc(7rem+env(safe-area-inset-bottom))]">
              {children}
            </main>
            <BottomNav />
          </div>
          <Toaster />
        </CartProvider>
        <Analytics />
      </body>
    </html>
  )
}
