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

    // Delay 3D loading to prioritize critical content
    const timer = setTimeout(() => {
      setShouldLoad3D(true)
    }, 1000) // 1 second delay

    return () => clearTimeout(timer)
  }, [])

  // Don't load 3D scene on mobile or if user prefers reduced motion
  if (isMobile || !shouldLoad3D) {
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
