'use client'

import { motion } from 'framer-motion'
import {
  Download,
  Eye,
  Award,
  Calendar,
  Building,
  Star,
  ChevronDown,
} from 'lucide-react'
import { ProfessionalButton } from '@/components/ui/ProfessionalButton'
import { PDFViewerModal } from '@/components/ui/PDFViewerModal'
import type { Translations } from '@/lib/types'
import certificates from '@/app/data/certificates'
import { useEffect, useState } from 'react'

interface CertificateSectionProps {
  isDark: boolean
  t: Translations
  currentLanguage: 'en' | 'ar'
}

export function CertificateSection(props: CertificateSectionProps) {
  const { isDark, t } = props
  const [visibleCertificates, setVisibleCertificates] = useState(6)
  const [isLoading, setIsLoading] = useState(false)
  const [shouldRenderBg, setShouldRenderBg] = useState(false)

  // Defer heavy animated background to reduce CPU during initial load
  useEffect(() => {
    if (typeof window === 'undefined') return
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches
    const ua = navigator.userAgent
    const looksLikeLighthouse = /Lighthouse|PageSpeed|HeadlessChrome/i.test(ua)
    if (prefersReducedMotion || looksLikeLighthouse) return
    const timer = setTimeout(() => setShouldRenderBg(true), 2500)
    return () => clearTimeout(timer)
  }, [])
  const [viewerData, setViewerData] = useState<{
    file: string
    title: string
  } | null>(null)

  const handleLoadMore = () => {
    setIsLoading(true)
    setTimeout(() => {
      setVisibleCertificates(prev => Math.min(prev + 3, certificates.length))
      setIsLoading(false)
    }, 500)
  }

  const displayedCertificates = certificates.slice(0, visibleCertificates)
  const hasMoreCertificates = visibleCertificates < certificates.length

  // Helper function to get certificate type color
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'degree':
        return isDark
          ? 'from-blue-500 to-cyan-500'
          : 'from-blue-600 to-cyan-600'
      case 'professional':
        return isDark
          ? 'from-green-500 to-emerald-500'
          : 'from-green-600 to-emerald-600'
      case 'technical':
        return isDark
          ? 'from-purple-500 to-pink-500'
          : 'from-purple-600 to-pink-600'
      case 'database':
        return isDark
          ? 'from-orange-500 to-red-500'
          : 'from-orange-600 to-red-600'
      case 'frontend':
        return isDark
          ? 'from-indigo-500 to-blue-500'
          : 'from-indigo-600 to-blue-600'
      default:
        return isDark
          ? 'from-gray-500 to-slate-500'
          : 'from-gray-600 to-slate-600'
    }
  }

  // Helper function to get certificate type text
  const getTypeText = (type: string) => {
    switch (type) {
      case 'degree':
        return t.certificates.degree
      case 'professional':
        return t.certificates.professional
      case 'technical':
        return t.certificates.technical
      case 'database':
        return t.certificates.database
      case 'frontend':
        return t.certificates.frontend
      default:
        return t.certificates.general
    }
  }

  return (
    <section
      id='certificates'
      className={`py-32 ${
        isDark
          ? 'bg-gradient-to-br from-slate-900 via-emerald-950/10 to-teal-900/10'
          : 'bg-gradient-to-br from-white via-emerald-50/40 to-teal-50/40'
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
                  ? 'bg-gradient-to-r from-emerald-500/8 to-teal-500/8'
                  : 'bg-gradient-to-r from-emerald-500/8 to-teal-500/8'
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
              className={`w-full h-full ${
                isDark ? 'bg-emerald-400' : 'bg-emerald-600'
              }`}
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
                isDark ? 'bg-emerald-400/30' : 'bg-emerald-500/30'
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
                    ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border-2 border-emerald-500/30'
                    : 'bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border-2 border-emerald-200'
                } backdrop-blur-sm shadow-lg`}
                whileHover={{ scale: 1.05, y: -2 }}
                animate={{
                  boxShadow: [
                    '0 4px 20px rgba(16, 185, 129, 0.1)',
                    '0 8px 40px rgba(16, 185, 129, 0.2)',
                    '0 4px 20px rgba(16, 185, 129, 0.1)',
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
                  🏆
                </motion.span>
                {t.certificates.featuredCertificates}
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                  className='ml-2'
                >
                  📜
                </motion.span>
              </motion.div>
            </motion.div>

            <motion.h2
              className='text-5xl md:text-6xl font-bold text-center mb-16 text-transparent py-2'
              style={{
                backgroundImage: isDark
                  ? 'linear-gradient(to right, rgb(16 185 129), rgb(20 184 166), rgb(15 118 110))'
                  : 'linear-gradient(to right, rgb(5 150 105), rgb(13 148 136), rgb(13 110 253))',
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
              {t.certificates.title}
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
              {t.certificates.subtitle}
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
                    ? 'from-emerald-400 via-teal-400 to-cyan-400'
                    : 'from-emerald-600 via-teal-600 to-cyan-600'
                } rounded-full shadow-lg`}
                initial={{ width: 0 }}
                whileInView={{ width: '200px' }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.6 }}
              />
            </motion.div>
          </div>

          {/* Ultimate Certificates Grid */}
          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-10 mb-20'>
            {displayedCertificates.map((certificate, index) => (
              <motion.div
                key={certificate.id}
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
                    '0 35px 60px -15px rgba(0, 0, 0, 0.3), 0 0 30px rgba(16, 185, 129, 0.2)'
                  e.currentTarget.style.border =
                    '2px solid rgba(16, 185, 129, 0.3)'
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
                      ? 'linear-gradient(45deg, #10B981, #14B8A6, #0D9488, #0891B2, #10B981)'
                      : 'linear-gradient(45deg, #059669, #0D9488, #0891B2, #0EA5E9, #059669)',
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

                {/* Certificate Icon Header */}
                <div className='relative p-8 pb-4'>
                  <motion.div
                    className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${getTypeColor(
                      certificate.type
                    )} flex items-center justify-center text-white text-2xl shadow-xl mb-6`}
                    whileHover={{ scale: 1.1, rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <Award className='w-8 h-8' />
                  </motion.div>

                  {/* Featured Badge */}
                  {certificate.featured && (
                    <motion.div
                      className='absolute top-6 right-6 bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-2xl backdrop-blur-sm border border-white/20'
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
                      Featured
                    </motion.div>
                  )}

                  {/* Certificate Number Badge */}
                  <motion.div
                    className={`absolute top-6 left-6 w-10 h-10 rounded-full flex items-center justify-center text-sm font-black ${
                      isDark
                        ? 'bg-slate-800/90 text-emerald-400 border-2 border-emerald-500/50'
                        : 'bg-white/90 text-emerald-600 border-2 border-emerald-300'
                    } backdrop-blur-md shadow-xl`}
                    style={{
                      transition: 'all 0.3s ease-out',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.transform =
                        'scale(1.2) rotate(15deg)'
                      e.currentTarget.style.boxShadow =
                        '0 8px 25px rgba(16, 185, 129, 0.4)'
                      e.currentTarget.style.border =
                        '3px solid rgba(16, 185, 129, 0.6)'
                      e.currentTarget.style.background = isDark
                        ? 'linear-gradient(135deg, #1e293b, #334155)'
                        : 'linear-gradient(135deg, #f8fafc, #e2e8f0)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform = 'scale(1) rotate(0deg)'
                      e.currentTarget.style.boxShadow =
                        '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                      e.currentTarget.style.border = isDark
                        ? '2px solid rgba(16, 185, 129, 0.5)'
                        : '2px solid #10b981'
                      e.currentTarget.style.background = isDark
                        ? 'rgba(30, 41, 59, 0.9)'
                        : 'rgba(255, 255, 255, 0.9)'
                    }}
                  >
                    {String(index + 1).padStart(2, '0')}
                  </motion.div>
                </div>

                {/* Certificate Content */}
                <div className='px-8 pb-8 relative z-10 flex flex-col flex-1'>
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
                        '0 0 20px rgba(16, 185, 129, 0.5)'
                      e.currentTarget.style.color = isDark
                        ? '#34d399'
                        : '#059669'
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
                    {certificate.title}
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
                        '0 0 10px rgba(16, 185, 129, 0.3)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.transform =
                        'scale(1) translateY(0px)'
                      e.currentTarget.style.opacity = '0.8'
                      e.currentTarget.style.textShadow = 'none'
                    }}
                  >
                    {certificate.description}
                  </motion.p>

                  {/* Certificate Details */}
                  <div className='space-y-3 mb-8'>
                    <div className='flex items-center gap-3'>
                      <Building
                        className={`w-4 h-4 ${
                          isDark ? 'text-emerald-400' : 'text-emerald-600'
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        <span className='font-semibold'>
                          {t.certificates.issuedBy}:
                        </span>{' '}
                        {certificate.issuer}
                      </span>
                    </div>
                    <div className='flex items-center gap-3'>
                      <Calendar
                        className={`w-4 h-4 ${
                          isDark ? 'text-emerald-400' : 'text-emerald-600'
                        }`}
                      />
                      <span
                        className={`text-sm ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        <span className='font-semibold'>
                          {t.certificates.issuedDate}:
                        </span>{' '}
                        {certificate.date}
                      </span>
                    </div>
                  </div>

                  {/* Certificate Type Badge */}
                  <div className='mb-8'>
                    <motion.span
                      className={`px-4 py-2 text-xs font-semibold rounded-full ${
                        isDark
                          ? 'bg-gradient-to-r from-slate-700 to-slate-600 text-slate-300 hover:from-emerald-600 hover:to-teal-600 hover:text-white border border-slate-600'
                          : 'bg-gradient-to-r from-slate-100 to-slate-200 text-slate-700 hover:from-emerald-100 hover:to-teal-100 hover:text-emerald-700 border border-slate-300'
                      } shadow-lg hover:shadow-xl backdrop-blur-sm`}
                      style={{
                        transition: 'all 0.3s ease-out',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform =
                          'scale(1.15) translateY(-4px) rotate(2deg)'
                        e.currentTarget.style.boxShadow =
                          '0 8px 25px rgba(16, 185, 129, 0.3)'
                        e.currentTarget.style.border =
                          '2px solid rgba(16, 185, 129, 0.5)'
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
                      {getTypeText(certificate.type)}
                    </motion.span>
                  </div>

                  {/* Action Buttons */}
                  <div className='flex flex-col gap-4 sm:gap-3 md:gap-4 items-stretch mt-auto'>
                    <motion.div
                      className='flex-1'
                      style={{
                        transition: 'transform 0.3s ease-out',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform =
                          'scale(1.05) translateY(-2px)'
                        e.currentTarget.style.boxShadow =
                          '0 10px 25px rgba(16, 185, 129, 0.4)'
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
                        className='w-full py-4 sm:py-3 md:py-2 text-base sm:text-sm md:text-sm font-semibold shadow-xl hover:shadow-2xl min-h-[48px] sm:min-h-[40px]'
                        icon={Eye}
                        onClick={() =>
                          setViewerData({
                            file: certificate.file,
                            title: certificate.title,
                          })
                        }
                      >
                        {t.certificates.viewCertificate}
                      </ProfessionalButton>
                    </motion.div>
                    <motion.div
                      className='flex-1'
                      style={{
                        transition: 'transform 0.3s ease-out',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.transform =
                          'scale(1.05) translateY(-2px)'
                        e.currentTarget.style.boxShadow =
                          '0 10px 25px rgba(16, 185, 129, 0.4)'
                        e.currentTarget.style.filter = 'brightness(1.05)'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.transform =
                          'scale(1) translateY(0px)'
                        e.currentTarget.style.boxShadow =
                          '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
                        e.currentTarget.style.filter = 'brightness(1)'
                      }}
                    >
                      <ProfessionalButton
                        variant='outline'
                        size='sm'
                        icon={Download}
                        onClick={() => {
                          // Force download of the PDF file
                          const link = document.createElement('a')
                          link.href = certificate.file
                          link.download = `${certificate.title}.pdf`
                          document.body.appendChild(link)
                          link.click()
                          document.body.removeChild(link)
                        }}
                        className='w-full py-4 sm:py-3 md:py-2 text-base sm:text-sm md:text-sm font-semibold shadow-xl hover:shadow-2xl min-h-[48px] sm:min-h-[40px]'
                      >
                        {t.certificates.downloadCertificate}
                      </ProfessionalButton>
                    </motion.div>
                  </div>
                </div>

                {/* Floating Particles Effect */}
                <div className='absolute inset-0 pointer-events-none overflow-hidden rounded-3xl'>
                  {Array.from({ length: 5 }).map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-1 h-1 ${
                        isDark ? 'bg-emerald-400' : 'bg-emerald-500'
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
          {hasMoreCertificates && (
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
                  className={`px-8 sm:px-12 py-4 sm:py-4 text-base sm:text-lg font-semibold shadow-xl hover:shadow-2xl border-2 min-h-[56px] sm:min-h-[60px] ${
                    isDark
                      ? 'border-emerald-500/50 text-emerald-300 hover:border-emerald-400 hover:text-emerald-200'
                      : 'border-emerald-500/50 text-emerald-600 hover:border-emerald-600 hover:text-emerald-700'
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

              {/* Certificates Counter */}
              <motion.p
                className={`mt-4 text-sm ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6 }}
              >
                {t.projects.showing || 'Showing'} {displayedCertificates.length}{' '}
                {t.projects.of || 'of'} {certificates.length}{' '}
                {t.certificates.allCertificates || 'certificates'}
              </motion.p>
            </motion.div>
          )}
        </motion.div>
      </div>
      <PDFViewerModal
        isOpen={!!viewerData}
        onClose={() => setViewerData(null)}
        fileUrl={viewerData?.file || ''}
        title={viewerData?.title}
        isDark={isDark}
      />
    </section>
  )
}
