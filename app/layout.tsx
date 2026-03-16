import React from "react"
import type { Metadata, Viewport } from 'next'
import { DM_Sans, Playfair_Display } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { CartProvider } from '@/components/lemon/cart-context'
import { LemonOrchestrator } from '@/components/lemon/lemon-orchestrator'
import { BottomNav } from '@/components/lemon/bottom-nav'
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
  title: 'Lemondol — Fresh & Vibrant Girls Store',
  description: 'A curated selection of high-quality products at affordable prices. Experience the fresh squeeze of style with Lemondol.',
  generator: 'v0.app',
  keywords: ['fashion', 'girls', 'accessories', 'lifestyle', 'affordable', 'lemondol'],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${playfairDisplay.variable} font-sans antialiased bg-slate-100 lg:bg-slate-200`}>
        <div className="mx-auto min-h-screen max-w-none lg:max-w-md bg-background shadow-2xl relative flex flex-col pb-24 lg:pb-0">
          <CartProvider>
            <LemonOrchestrator />
            <main className="flex-1">
              {children}
            </main>
            <BottomNav />
          </CartProvider>
        </div>
        <Analytics />
      </body>
    </html>
  )
}
