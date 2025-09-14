'use client'

import { useState, useEffect, Suspense, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { useTranslation } from '@/lib/useTranslation'
import { Navigation } from '@/components/layout/Navigation'
import { HeroSection } from '@/components/sections/HeroSection'
import { StatsSection } from '@/components/sections/StatsSection'
import { AboutSection } from '@/components/sections/AboutSection'
// Removed static imports - now using dynamic imports for better performance
import { Footer } from '@/components/layout/Footer'
import { AnimatedBackground } from '@/components/ui/AnimatedBackground'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'
import { ErrorBoundary } from '@/components/ui/ErrorBoundary'

// Dynamic imports for heavy components with better loading strategies
const ProjectsSection = dynamic(
  () =>
    import('@/components/sections/ProjectsSection').then(mod => ({
      default: mod.ProjectsSection,
    })),
  {
    ssr: false,
    loading: () => (
      <div className='min-h-screen flex items-center justify-center'>
        <LoadingSpinner />
      </div>
    ),
  }
)

// Lazy load heavy sections that are below the fold
const SkillsSection = dynamic(
  () =>
    import('@/components/sections/SkillsSection').then(mod => ({
      default: mod.SkillsSection,
    })),
  {
    ssr: false,
    loading: () => (
      <div className='h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg' />
    ),
  }
)

const CertificateSection = dynamic(
  () =>
    import('@/components/sections/CertificateSection').then(mod => ({
      default: mod.CertificateSection,
    })),
  {
    ssr: false,
    loading: () => (
      <div className='h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg' />
    ),
  }
)

const EducationSection = dynamic(
  () =>
    import('@/components/sections/EducationSection').then(mod => ({
      default: mod.EducationSection,
    })),
  {
    ssr: false,
    loading: () => (
      <div className='h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg' />
    ),
  }
)

const ContactSection = dynamic(
  () =>
    import('@/components/sections/ContactSection').then(mod => ({
      default: mod.ContactSection,
    })),
  {
    ssr: false,
    loading: () => (
      <div className='h-96 bg-gray-100 dark:bg-gray-800 animate-pulse rounded-lg' />
    ),
  }
)

export default function ClientPortfolio() {
  const [isDark, setIsDark] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const {
    language,
    t,
    toggleLanguage,
    mounted: translationMounted,
  } = useTranslation()

  // Optimized useEffect with better performance
  useEffect(() => {
    setMounted(true)

    // Get theme from localStorage with fallback
    const savedTheme =
      typeof window !== 'undefined' ? localStorage.getItem('theme') : null
    if (savedTheme) setIsDark(savedTheme === 'dark')

    // Throttled mouse tracking for better performance
    let rafId: number
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) cancelAnimationFrame(rafId)
      rafId = requestAnimationFrame(() => {
        setMousePosition({
          x: (e.clientX / window.innerWidth) * 2 - 1,
          y: -(e.clientY / window.innerHeight) * 2 + 1,
        })
      })
    }

    if (typeof window !== 'undefined') {
      window.addEventListener('mousemove', handleMouseMove, { passive: true })
    }

    return () => {
      if (typeof window !== 'undefined') {
        window.removeEventListener('mousemove', handleMouseMove)
      }
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  // Optimized theme effect
  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      localStorage.setItem('theme', isDark ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', isDark)
    }
  }, [isDark, mounted])

  // Memoized functions to prevent unnecessary re-renders
  const toggleTheme = useCallback(() => setIsDark(prev => !prev), [])
  const toggleMenu = useCallback(() => setIsMenuOpen(prev => !prev), [])

  // Show loading state only when necessary
  if (!mounted || !translationMounted) {
    return <LoadingSpinner />
  }

  return (
    <ErrorBoundary>
      <div
        className={`min-h-screen transition-all duration-500  ${
          isDark
            ? 'dark bg-gradient-to-br from-slate-900 via-indigo-950/30 to-violet-900/20'
            : 'bg-gradient-to-br from-blue-50 via-indigo-50/30 to-purple-50/50'
        }`}
      >
        {/* Animated Background */}
        <Suspense fallback={null}>
          <AnimatedBackground isDark={isDark} mousePosition={mousePosition} />
        </Suspense>

        {/* Progress Bar */}
        <ProgressBar />

        {/* Navigation */}
        <Navigation
          isDark={isDark}
          language={language}
          isMenuOpen={isMenuOpen}
          onToggleTheme={toggleTheme}
          onToggleLanguage={toggleLanguage}
          onToggleMenu={toggleMenu}
          t={t}
        />

        {/* Hero Section */}
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className='min-h-screen flex items-center justify-center'>
                <LoadingSpinner />
              </div>
            }
          >
            <HeroSection
              isDark={isDark}
              language={language}
              mousePosition={mousePosition}
              t={t}
            />
          </Suspense>
        </ErrorBoundary>

        {/* Stats Section */}
        <StatsSection isDark={isDark} t={t} />

        {/* Projects Section */}
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className='min-h-screen flex items-center justify-center'>
                <LoadingSpinner />
              </div>
            }
          >
            <ProjectsSection isDark={isDark} t={t} currentLanguage={language} />
          </Suspense>
        </ErrorBoundary>

        {/* About Section */}
        <AboutSection isDark={isDark} t={t} language={language} />

        {/* Skills Section */}
        <SkillsSection isDark={isDark} t={t} />

        {/* Certificates Section */}
        <ErrorBoundary>
          <Suspense
            fallback={
              <div className='min-h-screen flex items-center justify-center'>
                <LoadingSpinner />
              </div>
            }
          >
            <CertificateSection
              isDark={isDark}
              t={t}
              currentLanguage={language}
            />
          </Suspense>
        </ErrorBoundary>

        {/* Education Section */}
        <EducationSection isDark={isDark} t={t} />

        {/* Contact Section */}
        <ContactSection isDark={isDark} t={t} />

        {/* Footer */}
        <Footer isDark={isDark} t={t} />
      </div>
    </ErrorBoundary>
  )
}
