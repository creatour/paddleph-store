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
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#1A2C3E',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`bg-background ${inter.variable} ${plexMono.variable}`}><body className="antialiased">{children}{process.env.NODE_ENV === 'production' && <Analytics />}</body></html>
}
