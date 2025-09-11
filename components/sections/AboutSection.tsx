'use client'

import { motion } from 'framer-motion'
import {
  MapPin,
  Mail,
  Phone,
  Github,
  Linkedin,
  Rocket,
  Star,
  Zap,
  Code,
} from 'lucide-react'
import { ProfessionalButton } from '@/components/ui/ProfessionalButton'
import Image from 'next/image'
import type { Translations } from '@/lib/types'

interface AboutSectionProps {
  isDark: boolean
  t: Translations
  language?: 'en' | 'ar'
}

export function AboutSection({ isDark, t }: AboutSectionProps) {
  return (
    <section
      id='about'
      className={`py-12 sm:py-16 md:py-20 lg:py-24 ${
        isDark
          ? 'bg-gradient-to-br from-slate-800/50 via-indigo-950/20 to-violet-900/20'
          : 'bg-gradient-to-br from-white/95 via-indigo-50/60 to-purple-50/60'
      } relative overflow-hidden backdrop-blur-sm`}
    >
      {/* Minimal Background Elements */}
      {Array.from({ length: 1 }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-16 h-16 sm:w-20 sm:h-20 ${
            isDark
              ? 'bg-gradient-to-r from-sky-500/5 to-indigo-500/5'
              : 'bg-gradient-to-r from-indigo-500/5 to-purple-500/5'
          } rounded-full blur-2xl`}
          style={{
            left: '30%',
            top: '30%',
          }}
          animate={{
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
          }}
        />
      ))}

      <div className='container mx-auto px-3 sm:px-4 md:px-6 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='max-w-6xl mx-auto'
        >
          <motion.h2
            className='text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-center mb-8 sm:mb-10 md:mb-12 lg:mb-16 px-4 sm:px-0 text-transparent'
            style={{
              backgroundImage: isDark
                ? 'linear-gradient(to right, rgb(52 211 153), rgb(96 165 250), rgb(129 140 248))'
                : 'linear-gradient(to right, rgb(5 150 105), rgb(37 99 235), rgb(79 70 229))',
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
            {t.about.title}
          </motion.h2>

          <div className='grid md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 items-center'>
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className='space-y-6 sm:space-y-8 md:space-y-10 w-fit m-auto md:m-0'
            >
              <div className='relative group'>
                <motion.div
                  className='relative w-48 h-48 xs:w-56 xs:h-56 sm:w-64 sm:h-64 md:w-72 md:h-72 lg:w-80 lg:h-80 mx-auto md:mx-0 rounded-full overflow-hidden border-4 border-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 p-1 shadow-2xl'
                  whileHover={{ scale: 1.05 }}
                  animate={{
                    rotate: [0, 5, -5, 0],
                    boxShadow: [
                      '0 0 0 rgba(59, 130, 246, 0)',
                      '0 0 50px rgba(59, 130, 246, 0.3)',
                      '0 0 0 rgba(59, 130, 246, 0)',
                    ],
                  }}
                  transition={{
                    rotate: { duration: 4, repeat: Number.POSITIVE_INFINITY },
                    boxShadow: {
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                    },
                  }}
                >
                  <div
                    className={`w-full h-full rounded-full overflow-hidden ${
                      isDark ? 'bg-gray-800' : 'bg-white'
                    }`}
                  >
                    <Image
                      src='/main1.jpg'
                      alt={`${t.hero.name} - About section photo`}
                      fill
                      className='object-cover'
                      placeholder='blur'
                      blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=='
                      sizes='(max-width: 640px) 224px, (max-width: 768px) 256px, (max-width: 1024px) 288px, 320px'
                      quality={85}
                      loading='lazy'
                    />
                  </div>
                </motion.div>

                {/* Floating Icons around photo */}
                {[
                  {
                    icon: Code,
                    color: 'from-blue-400 to-cyan-400',
                    position: 'top-2 -right-2 sm:top-3 sm:-right-4',
                  },
                  {
                    icon: Rocket,
                    color: 'from-orange-400 to-red-400',
                    position: 'top-1/2 -right-2 sm:top-1/2 sm:-right-4',
                  },
                  {
                    icon: Star,
                    color: 'from-green-400 to-emerald-400',
                    position: 'top-1/2 -left-2 sm:top-1/2 sm:-left-4',
                  },
                  {
                    icon: Zap,
                    color: 'from-pink-400 to-purple-400',
                    position: 'bottom-2 -left-2 sm:bottom-3 sm:-left-4',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className={`absolute ${item.position} w-10 h-10 xs:w-10 xs:h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center text-white shadow-lg`}
                    animate={{
                      y: [0, -5, 0],
                    }}
                    transition={{
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.5,
                    }}
                  >
                    <item.icon className='h-4 w-4 xs:h-5 xs:w-5 sm:h-6 sm:w-6 md:h-7 md:w-7' />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className='space-y-6 sm:space-y-8 md:space-y-10'
            >
              <motion.p
                className={`text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed max-w-lg mx-auto md:mx-0 px-2 sm:px-0 ${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                }`}
                whileInView={{ opacity: [0, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                {t.about.text}
              </motion.p>

              <div className='space-y-4 sm:space-y-5 md:space-y-6'>
                {[
                  {
                    icon: MapPin,
                    text: t.about.location,
                    color: 'from-blue-400 to-cyan-400',
                  },
                  {
                    icon: Mail,
                    text: t.about.email,
                    color: 'from-green-400 to-emerald-400',
                  },
                  {
                    icon: Phone,
                    text: t.about.phone,
                    color: 'from-purple-400 to-pink-400',
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ x: 15, scale: 1.02 }}
                    className={`flex items-center gap-2 sm:gap-3 md:gap-4 p-2 sm:p-3 md:p-4 rounded-xl sm:rounded-2xl mx-2 sm:mx-0 ${
                      isDark
                        ? 'hover:bg-gray-800/50 border border-gray-700/30'
                        : 'hover:bg-gray-50/80 border border-gray-200/30'
                    } transition-all duration-300 backdrop-blur-sm`}
                  >
                    <motion.div
                      className={`p-1.5 sm:p-2 md:p-2.5 rounded-lg sm:rounded-xl bg-gradient-to-r ${item.color} shadow-lg`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <item.icon className='h-4 w-4 sm:h-4 sm:w-4 md:h-5 md:w-5 text-white' />
                    </motion.div>
                    <span
                      className={`text-xs sm:text-sm md:text-base font-medium ${isDark ? 'text-slate-300' : 'text-slate-600'}`}
                    >
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className='flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6 px-2 sm:px-0'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                <ProfessionalButton
                  variant='outline'
                  size='sm'
                  icon={Github}
                  className='w-full sm:w-auto py-3 sm:py-2 text-sm sm:text-base font-medium'
                  onClick={() =>
                    window.open(
                      'https://github.com/Ahmed-Abd-EL-Kareem',
                      '_blank'
                    )
                  }
                >
                  GitHub
                </ProfessionalButton>
                <ProfessionalButton
                  variant='outline'
                  size='sm'
                  icon={Linkedin}
                  className='w-full sm:w-auto py-3 sm:py-2 text-sm sm:text-base font-medium'
                  onClick={() =>
                    window.open(
                      'https://www.linkedin.com/in/ahmed-ayman-mern/',
                      '_blank'
                    )
                  }
                >
                  LinkedIn
                </ProfessionalButton>
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
