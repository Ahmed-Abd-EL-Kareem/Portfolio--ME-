'use client'

import { motion } from 'framer-motion'
import { AnimatedCounter } from '@/components/ui/AnimatedCounter'
import type { Translations } from '@/lib/types'

interface StatsSectionProps {
  isDark: boolean
  t: Translations
}

export function StatsSection({ isDark, t }: StatsSectionProps) {
  const stats = [
    {
      label: t.stats.yearsExp,
      value: 3,
      suffix: '+',
      color: 'from-blue-400 to-cyan-400',
    },
    {
      label: t.stats.projectsCompleted,
      value: 50,
      suffix: '+',
      color: 'from-green-400 to-emerald-400',
    },
    {
      label: t.stats.happyClients,
      value: 25,
      suffix: '+',
      color: 'from-purple-400 to-pink-400',
    },
    {
      label: t.stats.linesOfCode,
      value: 100000,
      suffix: '+',
      color: 'from-orange-400 to-red-400',
    },
  ]

  return (
    <section
      className={`py-12 sm:py-16 md:py-20 ${
        isDark
          ? 'bg-gradient-to-r from-slate-900/50 via-indigo-950/20 to-violet-900/20'
          : 'bg-gradient-to-r from-indigo-50/80 via-white to-purple-50/70'
      } backdrop-blur-sm relative overflow-hidden`}
    >
      {/* Background decoration */}
      <div className='absolute inset-0 overflow-hidden'>
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className={`absolute w-96 h-96 ${
              isDark
                ? 'bg-gradient-to-r from-sky-500/5 to-indigo-500/5'
                : 'bg-gradient-to-r from-indigo-500/5 to-purple-500/5'
            } rounded-full blur-3xl`}
            style={{
              left: `${20 + i * 30}%`,
              top: `${10 + i * 20}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20 + i * 5,
              repeat: Number.POSITIVE_INFINITY,
              delay: i * 2,
            }}
          />
        ))}
      </div>

      <div className='container mx-auto px-4 sm:px-6 relative z-10'>
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className='grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8'
        >
          {stats.map((stat, index) => (
            <motion.div
              key={`stat-${index}`}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              whileHover={{ scale: 1.05, rotateY: 10 }}
              className={`text-center p-4 sm:p-6 md:p-8 ${
                isDark
                  ? 'bg-gradient-to-br from-slate-800/80 to-slate-900/80 border border-slate-700/50'
                  : 'bg-gradient-to-br from-white/95 to-indigo-50/95 border border-indigo-200/50'
              } rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 backdrop-blur-sm group`}
            >
              <motion.div
                className={`text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-2 sm:mb-3 md:mb-4`}
                whileInView={{ scale: [0.5, 1.2, 1] }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 + 0.5, duration: 0.6 }}
              >
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
              </motion.div>
              <p
                className={`${
                  isDark ? 'text-slate-300' : 'text-slate-600'
                } font-medium text-sm md:text-base group-hover:text-current transition-colors`}
              >
                {stat.label}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
