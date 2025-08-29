"use client";

import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import type { Translations } from "@/lib/types";

interface EducationSectionProps {
  isDark: boolean;
  t: Translations;
}

export function EducationSection({ isDark, t }: EducationSectionProps) {
  return (
    <section
      id="education"
      className={`py-20 ${
        isDark
          ? "bg-gradient-to-br from-blue-950/20 via-indigo-950/20 to-violet-900/20"
          : "bg-gradient-to-br from-indigo-50/80 via-purple-50/80 to-violet-50/80"
      } backdrop-blur-sm`}
    >
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold mb-16 text-transparent"
            style={{
              backgroundImage: isDark
                ? "linear-gradient(to right, rgb(52 211 153), rgb(96 165 250), rgb(129 140 248))"
                : "linear-gradient(to right, rgb(5 150 105), rgb(37 99 235), rgb(79 70 229))",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 4,
              repeat: Number.POSITIVE_INFINITY,
            }}
          >
            {t.education.title}
          </motion.h2>

          <motion.div
            whileInView={{ scale: [0.8, 1.05, 1] }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Card
              className={`p-12 ${
                isDark
                  ? "bg-gradient-to-r from-slate-800/90 to-indigo-900/50 border-2 border-blue-500/30"
                  : "bg-gradient-to-r from-white/95 to-indigo-50/90 border-2 border-indigo-200/50"
              } shadow-2xl hover:shadow-3xl transition-all duration-500 backdrop-blur-sm`}
            >
              <CardContent className="space-y-8">
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, type: "spring" }}
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full flex items-center justify-center shadow-2xl"
                >
                  <GraduationCap className="h-10 w-10 text-white" />
                </motion.div>

                <motion.h3
                  className={`text-3xl font-bold ${
                    isDark ? "text-slate-50" : "text-slate-900"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  {t.education.text}
                </motion.h3>

                <motion.p
                  className={`text-xl ${
                    isDark ? "text-slate-300" : "text-indigo-700"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                >
                  {t.education.degree}
                </motion.p>

                <motion.p
                  className={`text-lg font-semibold ${
                    isDark ? "text-cyan-400" : "text-indigo-600"
                  }`}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.7 }}
                >
                  {t.education.text}
                </motion.p>

                {/* Animated decorative elements */}
                <div className="flex justify-center gap-4 mt-8">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className={`w-3 h-3 rounded-full ${
                        isDark ? "bg-cyan-400" : "bg-indigo-500"
                      }`}
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
