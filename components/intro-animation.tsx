'use client'

import { useEffect, useState } from 'react'

type IntroAnimationProps = {
  onComplete: () => void
}

const INTRO_KEY = 'paddleph-intro-seen'

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [showIntro, setShowIntro] = useState(false)
  const [skipped, setSkipped] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(INTRO_KEY)) {
      setSkipped(true)
      onComplete()
      return
    }

    sessionStorage.setItem(INTRO_KEY, 'true')
    setShowIntro(true)
    const timer = window.setTimeout(() => {
      setShowIntro(false)
      onComplete()
    }, 3000)

    return () => window.clearTimeout(timer)
  }, [onComplete])

  if (skipped || !showIntro) return null

  return <div className="intro-animation fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#1A2C3E] text-white" role="status" aria-label="Loading PADDLEPH.STORE">
    <div className="intro-paddle" aria-hidden="true">
      <svg viewBox="0 0 180 300" className="h-52 w-32 sm:h-64 sm:w-40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M90 16C48 16 22 49 22 91c0 42 25 76 68 82 43-6 68-40 68-82S132 16 90 16Z" fill="#F7FAFC" />
        <path d="M90 174v72" stroke="#F7FAFC" strokeWidth="18" strokeLinecap="round" />
        <path d="M90 174v72" stroke="#9CA3AF" strokeWidth="4" strokeLinecap="round" />
        <path d="M68 258h44" stroke="#16A34A" strokeWidth="16" strokeLinecap="round" />
        <path d="M52 74c12-17 27-25 45-25 19 0 34 8 46 25" stroke="#1A2C3E" strokeWidth="7" strokeLinecap="round" opacity=".9" />
        <circle cx="62" cy="101" r="6" fill="#2563EB" /><circle cx="90" cy="115" r="6" fill="#16A34A" /><circle cx="118" cy="101" r="6" fill="#2563EB" />
      </svg>
    </div>
    <p className="intro-brand mt-5 font-mono text-2xl font-bold tracking-[0.22em] sm:text-3xl">PADDLEPH</p>
    <p className="intro-tagline mt-3 text-sm tracking-wide text-white/70 sm:text-base">Premium Pickleball Paddles</p>
  </div>
}
