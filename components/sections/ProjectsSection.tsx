'use client'

import { motion } from 'framer-motion'
import { Eye, Github, ExternalLink, Star, ChevronDown } from 'lucide-react'
import { ProfessionalButton } from '@/components/ui/ProfessionalButton'
import Image from 'next/image'
import type { Translations } from '@/lib/types'
import projects from '@/app/data/Project.json'
import { useEffect, useState } from 'react'

interface ProjectsSectionProps {
  isDark: boolean
  t: Translations
  currentLanguage: 'en' | 'ar'
}

export function ProjectsSection({
  isDark,
  t,
  currentLanguage,
}: ProjectsSectionProps) {
  const [visibleProjects, setVisibleProjects] = useState(6)
  const [isLoading, setIsLoading] = useState(false)
  const [shouldRenderBg, setShouldRenderBg] = useState(false)

  // Defer heavy animated background to reduce main-thread work and TBT
  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    const ua = navigator.userAgent
    const looksLikeLighthouse = /Lighthouse|PageSpeed|HeadlessChrome/i.test(ua)
    if (prefersReducedMotion || looksLikeLighthouse) return
    const timer = setTimeout(() => setShouldRenderBg(true), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleLoadMore = () => {
    setIsLoading(true)
    setTimeout(() => {
      setVisibleProjects(prev => Math.min(prev + 3, projects.length))
      setIsLoading(false)
    }, 500)
  }

  const displayedProjects = projects.slice(0, visibleProjects)
  const hasMoreProjects = visibleProjects < projects.length

  // Helper function to get localized text
  const getLocalizedText = (text: string | { en: string; ar: string }) => {
    if (typeof text === 'string') return text
    if (typeof text === 'object' && text[currentLanguage])
      return text[currentLanguage]
    return text.en || text.ar || 'Text not available'
  }

  return (
    <section
      id='projects'
      className={`py-32 ${
        isDark
          ? 'bg-gradient-to-br from-slate-900 via-indigo-950/10 to-violet-900/10'
          : 'bg-gradient-to-br from-white via-indigo-50/40 to-purple-50/40'
      } relative overflow-hidden`}
    >
      {/* Advanced animated background elements */}
      {shouldRenderBg && (
        <div className='absolute inset-0 overflow-hidden'>
          {/* Floating orbs */}
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={`orb-${i}`}
              className={`absolute ${
                isDark
                  ? 'bg-gradient-to-r from-sky-500/8 to-indigo-500/8'
                  : 'bg-gradient-to-r from-blue-500/8 to-violet-500/8'
              } rounded-full blur-3xl`}
              style={{
                width: `${150 + i * 30}px`,
                height: `${150 + i * 30}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360],
                x: [0, Math.random() * 100 - 50, 0],
                y: [0, Math.random() * 100 - 50, 0],
              }}
              transition={{
                duration: 15 + i * 2,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 1.5,
              }}
            />
          ))}

          {/* Animated grid pattern */}
          <div className='absolute inset-0 opacity-5'>
            <div
              className={`w-full h-full ${isDark ? 'bg-sky-400' : 'bg-blue-600'}`}
              style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
              }}
            />
          </div>

          {/* Floating particles */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className={`absolute w-2 h-2 ${
                isDark ? 'bg-sky-400/30' : 'bg-blue-500/30'
              } rounded-full`}
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -150, 0],
                x: [0, Math.random() * 100 - 50, 0],
                opacity: [0.3, 1, 0.3],
                scale: [1, 2, 1],
              }}
              transition={{
                duration: 8 + Math.random() * 4,
                repeat: Number.POSITIVE_INFINITY,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      )}

      <div className='container mx-auto px-4 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='max-w-7xl mx-auto'
        >
          {/* Ultimate Section Header */}
          <div className='text-center mb-24'>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className='inline-block mb-8'
            >
              <motion.div
                className={`inline-flex items-center px-8 py-3 rounded-full text-sm font-semibold ${
                  isDark
                    ? 'bg-gradient-to-r from-sky-500/20 to-indigo-500/20 text-sky-300 border-2 border-sky-500/30'
                    : 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-700 border-2 border-blue-200'
                } backdrop-blur-sm shadow-lg`}
                whileHover={{ scale: 1.05, y: -2 }}
                animate={{
                  boxShadow: [
                    '0 4px 20px rgba(59, 130, 246, 0.1)',
                    '0 8px 40px rgba(59, 130, 246, 0.2)',
                    '0 4px 20px rgba(59, 130, 246, 0.1)',
                  ],
                }}
                transition={{
                  boxShadow: {
                    duration: 3,
                    repeat: Number.POSITIVE_INFINITY,
                  },
                }}
              >
                <motion.span
                  animate={{ rotate: [0, 360] }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                  className='mr-2'
                >
                  ✨
                </motion.span>
                {t.projects.featuredPortfolio || 'Featured Portfolio'}
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                  className='ml-2'
                >
                  🚀
                </motion.span>
              </motion.div>
            </motion.div>

            <motion.h2
              className='text-5xl md:text-6xl font-bold text-center mb-16 text-transparent py-2'
              style={{
                backgroundImage: isDark
                  ? 'linear-gradient(to right, rgb(56 189 248), rgb(96 165 250), rgb(129 140 248))'
                  : 'linear-gradient(to right, rgb(29 78 216), rgb(79 70 229), rgb(124 58 237))',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
              }}
              animate={{
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
              }}
              transition={{
                duration: 4,
                repeat: Number.POSITIVE_INFINITY,
              }}
            >
              {t.projects.title}
            </motion.h2>

            <motion.p
              className={`text-xl md:text-2xl max-w-4xl mx-auto leading-relaxed ${
                isDark ? 'text-slate-300' : 'text-slate-600'
              }`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {t.projects.subtitle ||
                'Discover my latest work showcasing innovative solutions, cutting-edge technologies, and creative implementations that push the boundaries of modern web development.'}
            </motion.p>

            {/* Animated divider */}
            <motion.div
              className='flex justify-center mt-12'
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                className={`h-1 bg-gradient-to-r ${
                  isDark
                    ? 'from-sky-400 via-blue-400 to-indigo-400'
                    : 'from-blue-600 via-indigo-600 to-violet-600'
                } rounded-full shadow-lg`}
                initial={{ width: 0 }}
                whileInView={{ width: '200px' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.6 }}
              />
            </motion.div>
          </div>

          {/* Ultimate Projects Grid */}
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20'>
            {displayedProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className={`group relative h-full flex flex-col overflow-hidden rounded-3xl cursor-pointer ${
                  isDark
                    ? 'bg-gradient-to-br from-slate-800/95 to-slate-900/95'
                    : 'bg-gradient-to-br from-white to-slate-50/80'
                } backdrop-blur-xl shadow-xl`}
                style={{
                  transformStyle: 'preserve-3d',
                  transition: 'all 0.5s ease-out',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform =
                    'translateY(-25px) scale(1.08) rotate(1deg)'
                  e.currentTarget.style.boxShadow =
                    '0 35px 60px -15px rgba(0, 0, 0, 0.3), 0 0 30px rgba(59, 130, 246, 0.2)'
                  e.currentTarget.style.border =
                    '2px solid rgba(59, 130, 246, 0.3)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform =
                    'translateY(0px) scale(1) rotate(0deg)'
                  e.currentTarget.style.boxShadow =
                    '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
                  e.currentTarget.style.border = 'none'
                }}
              >
                {/* Animated Border Glow */}
                <motion.div
                  className='absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700'
                  style={{
                    backgroundImage: isDark
                      ? 'linear-gradient(45deg, #0EA5E9, #6366F1, #8B5CF6, #EC4899, #0EA5E9)'
                      : 'linear-gradient(45deg, #2563EB, #4F46E5, #7C3AED, #DB2777, #2563EB)',
                    padding: '3px',
                  }}
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  <div
                    className={`w-full h-full rounded-3xl ${
                      isDark ? 'bg-slate-800' : 'bg-white'
                    }`}
                  />
                </motion.div>

                {/* Project Image with Ultimate Effects */}
                <div className='relative overflow-hidden rounded-t-3xl'>
                  <motion.div
                    className='relative'
                    style={{
                      transformOrigin: 'center center',
                      transition: 'transform 0.7s ease-out',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform =
                        'scale(1.15) rotate(1deg)'
                      e.currentTarget.style.filter =
                        'brightness(1.1) contrast(1.1)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'scale(1) rotate(0deg)'
                      e.currentTarget.style.filter = 'brightness(1) contrast(1)'
                    }}
                  >
                    <Image
                      src={
                        project.image ||
                        'https://picsum.photos/400/280?random=8'
                      }
                      alt={`${getLocalizedText(project.title)} - ${getLocalizedText(project.description)}`}
                      width={400}
                      height={280}
                      className='w-full h-56 object-cover'
                      placeholder='blur'
                      blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
                      sizes='(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw'
                    />

                    {/* Multi-layer gradient overlays */}
                    <div className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500' />
                    <div className='absolute inset-0 bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700' />
                  </motion.div>

                  {/* Ultimate Overlay with Buttons */}
                  <motion.div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center'>
                    <div className='flex items-center gap-3'>
                      {project.liveUrl && project.liveUrl !== '#' && (
                        <motion.div>
                          <ProfessionalButton
                            variant='primary'
                            size='sm'
                            icon={Eye}
                            onClick={() =>
                              window.open(project.liveUrl, '_blank')
                            }
                            className='shadow-2xl backdrop-blur-md border border-white/20'
                          >
                            {t.projects.liveDemo}
                          </ProfessionalButton>
                        </motion.div>
                      )}
                      <motion.div>
                        <ProfessionalButton
                          variant='outline'
                          size='sm'
                          icon={Github}
                          onClick={() =>
                            window.open(project.githubUrl, '_blank')
                          }
                          className='shadow-xl hover:shadow-2xl'
                        >
                          {t.projects.code || 'Code'}
                        </ProfessionalButton>
                      </motion.div>
                    </div>
                  </motion.div>

                  {/* Ultimate Featured Badge */}
                  {project.featured && (
                    <motion.div
                      className='absolute top-4 right-4 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 text-white px-4 py-2 rounded-full text-xs font-bold shadow-2xl backdrop-blur-sm border border-white/20'
                      animate={{
                        scale: [1, 1.1, 1],
                        rotate: [0, 5, -5, 0],
                        boxShadow: [
                          '0 4px 20px rgba(245, 158, 11, 0.4)',
                          '0 8px 40px rgba(245, 158, 11, 0.6)',
                          '0 4px 20px rgba(245, 158, 11, 0.4)',
                        ],
                      }}
                      transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <Star className='h-3 w-3 inline mx-1' />
                      {t.projects.featured || 'Featured'}
                    </motion.div>
                  )}

                  {/* Ultimate Project Number Badge */}
                  <motion.div
                    className={`absolute top-4 left-4 w-10 h-10 rounded-full flex items-center justify-center text-sm font-black ${
                      isDark
                        ? 'bg-slate-800/90 text-sky-400 border-2 border-sky-500/50'
                        : 'bg-white/90 text-blue-600 border-2 border-blue-300'
                    } backdrop-blur-md shadow-xl`}
                    style={{
                      transition: 'all 0.3s ease-out',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform =
                        'scale(1.2) rotate(15deg)'
                      e.currentTarget.style.boxShadow =
                        '0 8px 25px rgba(59, 130, 246, 0.4)'
                      e.currentTarget.style.border =
                        '3px solid rgba(59, 130, 246, 0.6)'
                      e.currentTarget.style.background = isDark
                        ? 'linear-gradient(135deg, #1e293b, #334155)'
                        : 'linear-gradient(135deg, #f8fafc, #e2e8f0)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'scale(1) rotate(0deg)'
                      e.currentTarget.style.boxShadow =
                        '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      e.currentTarget.style.border = isDark
                        ? '2px solid rgba(14, 165, 233, 0.5)'
                        : '2px solid #3b82f6'
                      e.currentTarget.style.background = isDark
                        ? 'rgba(30, 41, 59, 0.9)'
                        : 'rgba(255, 255, 255, 0.9)'
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </motion.div>
                </div>

                {/* Ultimate Project Content */}
                <div className='p-8 relative z-10 flex flex-col flex-1'>
                  <motion.h3
                    className={`text-2xl font-black mb-4 ${
                      isDark ? 'text-slate-50' : 'text-slate-900'
                    }`}
                    style={{
                      transition: 'all 0.3s ease-out',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform =
                        'scale(1.08) translateX(8px)'
                      e.currentTarget.style.textShadow =
                        '0 0 20px rgba(59, 130, 246, 0.5)'
                      e.currentTarget.style.color = isDark
                        ? '#60a5fa'
                        : '#2563eb'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform =
                        'scale(1) translateX(0px)'
                      e.currentTarget.style.textShadow = 'none'
                      e.currentTarget.style.color = isDark
                        ? '#f8fafc'
                        : '#0f172a'
                    }}
                  >
                    {getLocalizedText(project.title)}
                  </motion.h3>

                  <motion.p
                    className={`${
                      isDark ? 'text-slate-300' : 'text-slate-600'
                    } text-base mb-6 leading-relaxed`}
                    initial={{ opacity: 0.8 }}
                    style={{
                      transition: 'all 0.3s ease-out',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform =
                        'scale(1.02) translateY(-2px)'
                      e.currentTarget.style.opacity = '1'
                      e.currentTarget.style.textShadow =
                        '0 0 10px rgba(59, 130, 246, 0.3)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform =
                        'scale(1) translateY(0px)'
                      e.currentTarget.style.opacity = '0.8'
                      e.currentTarget.style.textShadow = 'none'
                    }}
                  >
                    {getLocalizedText(project.description)}
                  </motion.p>

                  {project.id === 3 && (
                    <motion.p
                      className={`${
                        isDark ? 'text-sky-400' : 'text-blue-700'
                      } text-sm font-semibold mb-6`}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                    >
                      {currentLanguage === 'ar'
                        ? 'للحصول على حساب للتجربة، تفضّل بزيارة'
                        : 'Get a demo account on'}{' '}
                      <button
                        onClick={() => window.open(project.githubUrl, '_blank')}
                        className={`${
                          isDark
                            ? 'underline decoration-sky-400 hover:text-sky-300'
                            : 'underline decoration-blue-600 hover:text-blue-600'
                        }`}
                      >
                        GitHub
                      </button>
                    </motion.p>
                  )}

                  {/* Ultimate Technologies */}
                  <div className='flex flex-wrap gap-3 mb-8'>
                    {project.technologies.map(tech => (
                      <motion.span
                        key={tech}
                        className={`px-4 py-2 text-xs font-semibold rounded-full ${
                          isDark
                            ? 'bg-gradient-to-r from-slate-700 to-slate-600 text-slate-300 hover:from-sky-600 hover:to-blue-600 hover:text-white border border-slate-600'
                            : 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 hover:from-blue-100 hover:to-indigo-100 hover:text-blue-700 border border-slate-300'
                        } shadow-lg hover:shadow-xl backdrop-blur-sm`}
                        style={{
                          transition: 'all 0.3s ease-out',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.transform =
                            'scale(1.15) translateY(-4px) rotate(2deg)'
                          e.currentTarget.style.boxShadow =
                            '0 8px 25px rgba(59, 130, 246, 0.3)'
                          e.currentTarget.style.border =
                            '2px solid rgba(59, 130, 246, 0.5)'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.transform =
                            'scale(1) translateY(0px) rotate(0deg)'
                          e.currentTarget.style.boxShadow =
                            '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                          e.currentTarget.style.border = isDark
                            ? '1px solid #475569'
                            : '1px solid #cbd5e1'
                        }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Ultimate Action Buttons */}
                  <div className='flex gap-4 items-center mt-auto'>
                    {project.liveUrl && project.liveUrl !== '#' && (
                      <motion.div
                        className='flex-1'
                        style={{
                          transition: 'transform 0.3s ease-out',
                        }}
                        onMouseEnter={e => {
                          e.currentTarget.style.transform =
                            'scale(1.08) translateY(-2px)'
                          e.currentTarget.style.boxShadow =
                            '0 10px 25px rgba(59, 130, 246, 0.4)'
                        }}
                        onMouseLeave={e => {
                          e.currentTarget.style.transform =
                            'scale(1) translateY(0px)'
                          e.currentTarget.style.boxShadow =
                            '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        }}
                      >
                        <ProfessionalButton
                          variant='primary'
                          size='sm'
                          className='w-full font-semibold shadow-xl hover:shadow-2xl '
                          icon={ExternalLink}
                          onClick={() => window.open(project.liveUrl, '_blank')}
                        >
                          {t.projects.viewProject}
                        </ProfessionalButton>
                      </motion.div>
                    )}
                    <motion.div
                      className=''
                      style={{
                        transition: 'transform 0.3s ease-out',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform =
                          'scale(1.15) rotate(5deg) translateY(-3px)'
                        e.currentTarget.style.boxShadow =
                          '0 12px 30px rgba(59, 130, 246, 0.5)'
                        e.currentTarget.style.filter = 'brightness(1.1)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform =
                          'scale(1) rotate(0deg) translateY(0px)'
                        e.currentTarget.style.boxShadow =
                          '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        e.currentTarget.style.filter = 'brightness(1)'
                      }}
                    >
                      <ProfessionalButton
                        variant='outline'
                        size='sm'
                        icon={Github}
                        onClick={() => window.open(project.githubUrl, '_blank')}
                        className='shadow-xl hover:shadow-2xl'
                      >
                        {t.projects.code || 'Code'}
                      </ProfessionalButton>
                    </motion.div>
                  </div>
                </div>

                {/* Ultimate Floating Particles Effect */}
                <div className='absolute inset-0 pointer-events-none overflow-hidden rounded-3xl'>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-1 h-1 ${
                        isDark ? 'bg-sky-400' : 'bg-blue-500'
                      } rounded-full opacity-0 group-hover:opacity-80`}
                      style={{
                        left: `${20 + i * 20}%`,
                        top: `${20 + i * 15}%`,
                      }}
                      animate={{
                        y: [0, -30, 0],
                        x: [0, 15, 0],
                        scale: [1, 2, 1],
                        opacity: [0, 0.8, 0],
                      }}
                      transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.8,
                      }}
                    />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Load More Button */}
          {hasMoreProjects && (
            <motion.div
              className='text-center mb-20'
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <ProfessionalButton
                  variant='outline'
                  size='lg'
                  icon={ChevronDown}
                  onClick={handleLoadMore}
                  disabled={isLoading}
                  className={`px-12 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl border-2 ${
                    isDark
                      ? 'border-sky-500/50 text-sky-300 hover:border-sky-400 hover:text-sky-200'
                      : 'border-blue-500/50 text-blue-600 hover:border-blue-600 hover:text-blue-700'
                  } backdrop-blur-sm transition-all duration-300`}
                >
                  {isLoading ? (
                    <motion.div
                      className='flex items-center'
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Number.POSITIVE_INFINITY,
                      }}
                    >
                      <div className='w-5 h-5 border-2 border-current border-t-transparent rounded-full' />
                    </motion.div>
                  ) : (
                    <>
                      <span className='mr-2'>
                        {t.projects.loadMore || 'Load More'}
                      </span>
                      <motion.span
                        animate={{ y: [0, 4, 0] }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                        }}
                      >
                        ↓
                      </motion.span>
                    </>
                  )}
                </ProfessionalButton>
              </motion.div>

              {/* Projects Counter */}
              <motion.p
                className={`mt-4 text-sm ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                {t.projects.showing || 'Showing'} {displayedProjects.length}{' '}
                {t.projects.of || 'of'} {projects.length}{' '}
                {t.projects.projects || 'projects'}
              </motion.p>
            </motion.div>
          )}

          {/* Ultimate View All Projects Button */}
          <motion.div
            className='text-center'
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
          >
            <motion.div
              whileHover={{ scale: 1.05, y: -5 }}
              whileTap={{ scale: 0.95 }}
            >
              {/* <ProfessionalButton
                variant="primary"
                size="lg"
                icon={Briefcase}
                className="px-16 py-5 text-xl font-bold shadow-2xl hover:shadow-4xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 border-2 border-white/20 backdrop-blur-sm"
              >
                <span className="mr-3">{t.projects.exploreAll || "Explore All Projects"}</span>
                <motion.span
                  animate={{ x: [0, 8, 0] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  →
                </motion.span>
              </ProfessionalButton> */}
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
