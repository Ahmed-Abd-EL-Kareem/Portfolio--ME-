'use client'

import dynamic from 'next/dynamic'
import { Suspense } from 'react'

// Lazy load the ThreeScene component to reduce initial bundle size
const ThreeScene = dynamic(
  () => import('./ThreeScene').then(mod => ({ default: mod.ThreeScene })),
  {
    ssr: false,
    loading: () => null, // No loading component to avoid layout shift
  }
)

interface LazyThreeSceneProps {
  isDark: boolean
  language: 'en' | 'ar'
  name: string
}

export function LazyThreeScene({
  isDark,
  language,
  name,
}: LazyThreeSceneProps) {
  return (
    <Suspense fallback={null}>
      <ThreeScene isDark={isDark} language={language} name={name} />
    </Suspense>
  )
}



