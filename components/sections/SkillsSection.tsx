'use client'

import { motion } from 'framer-motion'
import { Card, CardContent } from '@/components/ui/card'
import type { Translations } from '@/lib/types'
import skills from '../../app/data/skills'
interface SkillsSectionProps {
  isDark: boolean
  t: Translations
}

export function SkillsSection({ isDark, t }: SkillsSectionProps) {
  // const skills =
  return (
    <section
      id='skills'
      className={`py-20 ${
        isDark
          ? 'bg-gradient-to-br from-slate-900 via-indigo-950/10 to-violet-900/10'
          : 'bg-gradient-to-br from-white via-indigo-50/40 to-purple-50/40'
      } relative overflow-hidden`}
    >
      {/* Enhanced animated background grid */}
      <div className='absolute inset-0 opacity-10'>
        <div className='grid grid-cols-12 gap-4 h-full'>
          {Array.from({ length: 144 }).map((_, i) => (
            <motion.div
              key={i}
              className={isDark ? 'bg-cyan-400' : 'bg-indigo-500'}
              animate={{ opacity: [0.1, 0.5, 0.1] }}
              transition={{
                duration: 3,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.05,
              }}
            />
          ))}
        </div>
      </div>

      <div className='container mx-auto px-4 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='max-w-6xl mx-auto'
        >
          <motion.h2
            className='text-5xl md:text-6xl font-bold text-center mb-16 text-transparent'
            style={{
              backgroundImage: isDark
                ? 'linear-gradient(to right, rgb(251 191 36), rgb(251 146 60), rgb(251 113 133))'
                : 'linear-gradient(to right, rgb(217 119 6), rgb(234 88 12), rgb(225 29 72))',
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
            {t.skills.title}
          </motion.h2>

          <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 50, rotateX: -90 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{
                  scale: 1.05,
                  rotateY: 10,
                  boxShadow: isDark
                    ? '0 25px 50px rgba(0, 210, 255, 0.2)'
                    : '0 25px 50px rgba(59, 130, 246, 0.2)',
                }}
                className={`p-8 rounded-2xl transition-all duration-300 ${
                  isDark
                    ? 'bg-gradient-to-br from-slate-800/90 to-slate-900/90 border border-slate-700/50'
                    : 'bg-gradient-to-br from-white/90 to-slate-50/90 border border-slate-200/50'
                } backdrop-blur-sm shadow-xl hover:shadow-2xl`}
              >
                <Card className='bg-transparent shadow-none border-none'>
                  <CardContent className='space-y-6 p-0'>
                    <div className='flex justify-between items-center'>
                      <div className='flex items-center gap-3'>
                        <motion.div
                          className={`w-12 h-12 rounded-xl bg-gradient-to-r ${skill.color} flex items-center justify-center text-white text-xl shadow-lg`}
                          whileHover={{ scale: 1.1, rotate: 360 }}
                          transition={{ duration: 0.6 }}
                        >
                          {skill.icon}
                        </motion.div>
                        <motion.h3
                          className={`font-bold text-xl ${
                            isDark ? 'text-slate-50' : 'text-slate-900'
                          }`}
                          whileHover={{ scale: 1.1 }}
                        >
                          {skill.name}
                        </motion.h3>
                      </div>
                      <motion.span
                        className={`text-lg font-semibold ${
                          isDark ? 'text-cyan-400' : 'text-blue-600'
                        }`}
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{
                          duration: 2,
                          repeat: Number.POSITIVE_INFINITY,
                          delay: index * 0.2,
                        }}
                      >
                        {skill.level}%
                      </motion.span>
                    </div>

                    <div className='relative'>
                      <div
                        className={`w-full ${
                          isDark ? 'bg-gray-700' : 'bg-gray-200'
                        } rounded-full h-3 overflow-hidden`}
                      >
                        <motion.div
                          className={`h-3 rounded-full bg-gradient-to-r ${skill.color} relative shadow-lg`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{
                            duration: 1.5,
                            delay: index * 0.1,
                            ease: 'easeOut',
                          }}
                        >
                          <motion.div
                            className='absolute inset-0 bg-white/30 rounded-full'
                            animate={{ x: ['-100%', '100%'] }}
                            transition={{
                              duration: 2,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: index * 0.3,
                            }}
                          />
                        </motion.div>
                      </div>
                    </div>

                    {/* Enhanced skill level indicator */}
                    <motion.div
                      className='flex justify-center'
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + 1 }}
                    >
                      <div className='flex gap-1'>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <motion.div
                            key={i}
                            className={`w-2 h-2 rounded-full ${
                              i < Math.floor(skill.level / 20)
                                ? `bg-gradient-to-r ${skill.color}`
                                : isDark
                                  ? 'bg-gray-600'
                                  : 'bg-gray-300'
                            }`}
                            animate={{ scale: [1, 1.3, 1] }}
                            transition={{
                              duration: 1,
                              repeat: Number.POSITIVE_INFINITY,
                              delay: i * 0.1 + index * 0.05,
                            }}
                          />
                        ))}
                      </div>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
