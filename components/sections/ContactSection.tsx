'use client'

import { motion } from 'framer-motion'
import { Mail, Linkedin, Github } from 'lucide-react'
import { ProfessionalButton } from '@/components/ui/ProfessionalButton'
import type { Translations } from '@/lib/types'

interface ContactSectionProps {
  isDark: boolean
  t: Translations
}

export function ContactSection({ isDark, t }: ContactSectionProps) {
  return (
    <section
      id='contact'
      className={`py-12 sm:py-16 md:py-20 ${
        isDark
          ? 'bg-gradient-to-br from-slate-900/80 via-indigo-950/20 to-violet-900/20'
          : 'bg-gradient-to-br from-indigo-50/80 via-purple-50/80 to-violet-50/80'
      } backdrop-blur-sm`}
    >
      <div className='container mx-auto px-4 sm:px-6 lg:px-8'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='max-w-6xl mx-auto text-center'
        >
          <motion.h2
            className='text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-8 sm:mb-12 md:mb-16 text-transparent'
            style={{
              backgroundImage: isDark
                ? 'linear-gradient(to right, rgb(196 181 253), rgb(232 121 249), rgb(251 113 133))'
                : 'linear-gradient(to right, rgb(124 58 237), rgb(192 38 211), rgb(225 29 72))',
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
            {t.contact.title}
          </motion.h2>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8'>
            {[
              {
                icon: Mail,
                title: 'Email',
                content: 'ahmed.abd.elkareem015@gmail.com',
                color: 'blue',
                gradient: 'from-blue-400 to-cyan-400',
                bgGradient: isDark
                  ? 'from-blue-900/20 to-cyan-900/20'
                  : 'from-indigo-50/90 to-purple-50/90',
                action: () =>
                  window.open('mailto:ahmed.abd.elkareem@gmail.com', '_blank'),
              },
              {
                icon: Linkedin,
                title: 'LinkedIn',
                content: t.contact.linkedin,
                color: 'blue',
                gradient: 'from-blue-500 to-blue-600',
                bgGradient: isDark
                  ? 'from-blue-900/20 to-blue-800/20'
                  : 'from-indigo-50/90 to-purple-50/90',
                action: () =>
                  window.open(
                    'https://www.linkedin.com/in/ahmed-ayman-mern/',
                    '_blank'
                  ),
              },
              {
                icon: Github,
                title: 'GitHub',
                content: t.contact.github,
                color: 'gray',
                gradient: 'from-gray-600 to-gray-800',
                bgGradient: isDark
                  ? 'from-gray-800/20 to-gray-900/20'
                  : 'from-indigo-50/90 to-purple-50/90',
                action: () =>
                  window.open(
                    'https://github.com/Ahmed-Abd-EL-Kareem',
                    '_blank'
                  ),
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 10,
                  boxShadow: isDark
                    ? '0 25px 50px rgba(0, 210, 255, 0.15)'
                    : '0 25px 50px rgba(59, 130, 246, 0.15)',
                }}
                className={`p-4 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl bg-gradient-to-br ${item.bgGradient} border-2 border-transparent hover:border-${item.color}-300/50 transition-all duration-300 backdrop-blur-sm shadow-xl cursor-pointer`}
                onClick={item.action}
              >
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.3, type: 'spring' }}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 bg-gradient-to-r ${item.gradient} rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg`}
                >
                  <item.icon className='h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8 text-white' />
                </motion.div>

                <motion.h3
                  className={`font-bold text-lg sm:text-xl mb-2 sm:mb-4 ${
                    isDark ? 'text-slate-50' : 'text-slate-900'
                  }`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.5 }}
                >
                  {item.title}
                </motion.h3>

                <motion.p
                  className={`text-sm sm:text-base md:text-lg ${
                    isDark ? 'text-slate-300' : 'text-indigo-700'
                  } break-words`}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.2 + 0.7 }}
                >
                  {item.content}
                </motion.p>
              </motion.div>
            ))}
          </div>

          {/* Enhanced Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
            className='mt-8 sm:mt-12 md:mt-16'
          >
            <ProfessionalButton
              variant='primary'
              size='lg'
              icon={Mail}
              className='px-8 sm:px-10 md:px-12 py-3 sm:py-4 text-lg sm:text-xl'
              onClick={() =>
                window.open('mailto:ahmed.abd.elkareem015@gmail.com', '_blank')
              }
            >
              {t.contact.letWorkTogether}
            </ProfessionalButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
