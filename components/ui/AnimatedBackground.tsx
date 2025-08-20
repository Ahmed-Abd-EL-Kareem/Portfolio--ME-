"use client";

import { motion } from "framer-motion";

interface AnimatedBackgroundProps {
  isDark: boolean;
  mousePosition: { x: number; y: number };
}

export function AnimatedBackground({
  isDark,
  mousePosition,
}: AnimatedBackgroundProps) {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      <motion.div
        className="absolute inset-0 opacity-20"
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

      {/* Floating geometric shapes */}
      {Array.from({ length: 8 }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute ${
            isDark
              ? "bg-gradient-to-r from-sky-500/10 to-indigo-500/10"
              : "bg-gradient-to-r from-blue-500/10 to-violet-500/10"
          } rounded-full blur-xl`}
          style={{
            width: `${80 + i * 20}px`,
            height: `${80 + i * 20}px`,
            left: `${10 + i * 12}%`,
            top: `${5 + i * 10}%`,
          }}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            x: [0, 30 + i * 10, 0],
            y: [0, -20 - i * 5, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 1.5,
          }}
        />
      ))}

      {/* Simple overlay */}
      <div className="absolute inset-0 opacity-30">
        <div
          className={`w-full h-full ${
            isDark ? "bg-sky-400/5" : "bg-blue-600/5"
          }`}
        />
      </div>
    </div>
  );
}
