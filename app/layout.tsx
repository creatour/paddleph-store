import { Analytics } from '@vercel/analytics/next'
import { Inter, IBM_Plex_Mono } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const plexMono = IBM_Plex_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-plex-mono' })

export const metadata: Metadata = {
  title: 'PADDLEPH.STORE | Premium Pickleball Paddles in Leyte',
  description: 'Shop premium pickleball paddles from PADDLEPH.STORE. Local delivery in Leyte, Philippines, with shipping via LBC and J&T.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: '16x16 32x32', type: 'image/x-icon' },
      { url: '/icon-192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: { url: '/apple-icon.png', sizes: '180x180', type: 'image/png' },
  },
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#1A2C3E',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`bg-background ${inter.variable} ${plexMono.variable}`}><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
