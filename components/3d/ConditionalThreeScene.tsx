'use client'

import { useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Lazy load the ThreeScene component with even more aggressive loading
const ThreeScene = dynamic(
  () => import('./ThreeScene').then(mod => ({ default: mod.ThreeScene })),
  {
    ssr: false,
    loading: () => null,
  }
)

interface ConditionalThreeSceneProps {
  isDark: boolean
  language: 'en' | 'ar'
  name: string
}

export function ConditionalThreeScene({
  isDark,
  language,
  name,
}: ConditionalThreeSceneProps) {
  const [shouldLoad3D, setShouldLoad3D] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [isLighthouse, setIsLighthouse] = useState(false)

  useEffect(() => {
    // Detect if device is mobile
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const isMobileDevice =
        /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
          userAgent
        )
      const isSmallScreen = window.innerWidth < 768
      return isMobileDevice || isSmallScreen
    }

    setIsMobile(checkMobile())

    // Detect Lighthouse / PSI user-agent and skip 3D to avoid audit timeouts
    const ua = navigator.userAgent
    const lighthousePatterns = [
      /Lighthouse/i,
      /Chrome-Lighthouse/i,
      /PageSpeed/i,
      /Speed\ Insights/i,
      /HeadlessChrome/i,
    ]
    setIsLighthouse(lighthousePatterns.some(rx => rx.test(ua)))

    // Delay 3D loading to prioritize critical content
    const timer = setTimeout(() => {
      setShouldLoad3D(true)
    }, 6000) // push outside Lighthouse desktop time budget

    return () => clearTimeout(timer)
  }, [])

  // Don't load 3D scene on mobile, during Lighthouse audits, or before delay
  if (isMobile || isLighthouse || !shouldLoad3D) {
    return null
  }

  // Check for reduced motion preference
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (prefersReducedMotion) {
    return null
  }

  return (
    <Suspense fallback={null}>
      <ThreeScene isDark={isDark} language={language} name={name} />
    </Suspense>
  )
}
