'use client'

import { motion } from 'framer-motion'

interface AnimatedBackgroundProps {
  isDark: boolean
  mousePosition: { x: number; y: number }
}

export function AnimatedBackground({
  isDark,
  mousePosition,
}: AnimatedBackgroundProps) {
  return (
    <div className='fixed inset-0 overflow-hidden pointer-events-none'>
      <motion.div
        className='absolute inset-0 opacity-20'
        style={{
          backgroundImage: isDark
            ? `radial-gradient(circle at ${50 + mousePosition.x * 15}% ${
                50 + mousePosition.y * 15
              }%, #0EA5E9 0%, #6366F1 25%, transparent 70%)`
            : `radial-gradient(circle at ${50 + mousePosition.x * 15}% ${
                50 + mousePosition.y * 15
              }%, #2563EB 0%, #8B5CF6 25%, transparent 70%)`,
        }}
      />

      {/* Minimal floating geometric shapes */}
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute ${
            isDark
              ? 'bg-gradient-to-r from-sky-500/5 to-indigo-500/5'
              : 'bg-gradient-to-r from-blue-500/5 to-violet-500/5'
          } rounded-full blur-xl`}
          style={{
            width: `${60 + i * 15}px`,
            height: `${60 + i * 15}px`,
            left: `${20 + i * 25}%`,
            top: `${15 + i * 20}%`,
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 10 + i * 3,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 2,
          }}
        />
      ))}

      {/* Simple overlay */}
      <div className='absolute inset-0 opacity-30'>
        <div
          className={`w-full h-full ${
            isDark ? 'bg-sky-400/5' : 'bg-blue-600/5'
          }`}
        />
      </div>
    </div>
  )
}
