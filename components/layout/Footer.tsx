"use client";

import { motion } from "framer-motion";
import type { Translations } from "@/lib/types";

interface FooterProps {
  isDark: boolean;
  t: Translations;
}

export function Footer({ isDark, t }: FooterProps) {
  return (
    <motion.footer
      className={`py-12 ${
        isDark
          ? "bg-gradient-to-r from-slate-900 via-indigo-900/50 to-violet-900/50"
          : "bg-gradient-to-r from-indigo-800 via-purple-800 to-violet-800"
      } text-white text-center relative overflow-hidden`}
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      {/* Enhanced animated background */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 4 + Math.random() * 3,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10">
        <motion.p
          animate={{ opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
          className="text-lg mb-4"
        >
          &copy; 2024 {t.hero.name}. All rights reserved.
        </motion.p>

        <motion.div
          className="text-sm text-gray-300"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {t.footer.madeWith}
        </motion.div>
      </div>
    </motion.footer>
  );
}
