"use client";

import { motion } from "framer-motion";
import {
  MapPin,
  Mail,
  Phone,
  Github,
  Linkedin,
  Code,
  Zap,
  Star,
  Rocket,
} from "lucide-react";
import { ProfessionalButton } from "@/components/ui/ProfessionalButton";
import Image from "next/image";
import { Translations } from "@/lib/types";

interface AboutSectionProps {
  isDark: boolean;
  t: Translations;
  language?: "en" | "ar";
}

export function AboutSection({ isDark, t }: AboutSectionProps) {
  return (
    <section
      id="about"
      className={`py-20 ${
        isDark
          ? "bg-gradient-to-br from-slate-800/50 via-indigo-950/20 to-violet-900/20"
          : "bg-gradient-to-br from-white/95 via-indigo-50/60 to-purple-50/60"
      } relative overflow-hidden backdrop-blur-sm`}
    >
      {/* Animated Background Elements */}
      {Array.from({ length: 4 }).map((_, i) => (
        <motion.div
          key={i}
          className={`absolute w-32 h-32 ${
            isDark
              ? "bg-gradient-to-r from-sky-500/10 to-indigo-500/10"
              : "bg-gradient-to-r from-indigo-500/10 to-purple-500/10"
          } rounded-full blur-2xl`}
          style={{
            left: `${10 + i * 20}%`,
            top: `${15 + i * 15}%`,
          }}
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8 + i * 2,
            repeat: Number.POSITIVE_INFINITY,
            delay: i * 1.5,
          }}
        />
      ))}

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-6xl mx-auto"
        >
          <motion.h2
            className="text-5xl md:text-6xl font-bold text-center mb-16 text-transparent"
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
            {t.about.title}
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8 w-fit m-auto md:m-0"
            >
              <div className="relative group">
                <motion.div
                  className="relative w-80 h-80 mx-auto md:mx-0 rounded-full overflow-hidden border-4 border-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 p-1 shadow-2xl"
                  whileHover={{ scale: 1.05 }}
                  animate={{
                    rotate: [0, 5, -5, 0],
                    boxShadow: [
                      "0 0 0 rgba(59, 130, 246, 0)",
                      "0 0 50px rgba(59, 130, 246, 0.3)",
                      "0 0 0 rgba(59, 130, 246, 0)",
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
                      isDark ? "bg-gray-800" : "bg-white"
                    }`}
                  >
                    <Image
                      src="/main1.jpg"
                      alt={`${t.hero.name} - About section photo`}
                      fill
                      className="object-cover"
                      placeholder="blur"
                      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                      sizes="(max-width: 768px) 320px, 320px"
                    />
                  </div>
                </motion.div>

                {/* Enhanced Floating Icons around photo */}
                {[
                  {
                    icon: Code,
                    color: "from-blue-400 to-cyan-400",
                    position: "top-3 -right-4",
                  },
                  {
                    icon: Zap,
                    color: "from-purple-400 to-pink-400",
                    position: "bottom-2 -left-4",
                  },
                  {
                    icon: Star,
                    color: "from-green-400 to-emerald-400",
                    position: "top-1/2 -left-6",
                  },
                  {
                    icon: Rocket,
                    color: "from-orange-400 to-red-400",
                    position: "top-1/3 -right-8",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className={`absolute ${item.position} w-12 h-12 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center text-white shadow-lg`}
                    animate={{
                      y: [0, -15, 0],
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{
                      y: {
                        duration: 2,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: index * 0.5,
                      },
                      rotate: {
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: index * 0.3,
                      },
                      scale: {
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: index * 0.7,
                      },
                    }}
                  >
                    <item.icon className="h-6 w-6" />
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <motion.p
                className={`text-xl leading-relaxed ${
                  isDark ? "text-slate-300" : "text-slate-600"
                }`}
                whileInView={{ opacity: [0, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                {t.about.text}
              </motion.p>

              <div className="space-y-6">
                {[
                  {
                    icon: MapPin,
                    text: t.about.location,
                    color: "from-blue-400 to-cyan-400",
                  },
                  {
                    icon: Mail,
                    text: t.about.email,
                    color: "from-green-400 to-emerald-400",
                  },
                  {
                    icon: Phone,
                    text: t.about.phone,
                    color: "from-purple-400 to-pink-400",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    whileHover={{ x: 15, scale: 1.02 }}
                    className={`flex items-center gap-4 p-4 rounded-xl ${
                      isDark
                        ? "hover:bg-gray-800/50 border border-gray-700/30"
                        : "hover:bg-gray-50/80 border border-gray-200/30"
                    } transition-all duration-300 backdrop-blur-sm`}
                  >
                    <motion.div
                      className={`p-2 rounded-lg bg-gradient-to-r ${item.color} shadow-lg`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <item.icon className="h-5 w-5 text-white" />
                    </motion.div>
                    <span
                      className={isDark ? "text-slate-300" : "text-slate-600"}
                    >
                      {item.text}
                    </span>
                  </motion.div>
                ))}
              </div>

              <motion.div
                className="flex gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
              >
                <ProfessionalButton
                  variant="outline"
                  size="sm"
                  icon={Github}
                  onClick={() =>
                    window.open(
                      "https://github.com/Ahmed-Abd-EL-Kareem",
                      "_blank"
                    )
                  }
                >
                  GitHub
                </ProfessionalButton>
                <ProfessionalButton
                  variant="outline"
                  size="sm"
                  icon={Linkedin}
                  onClick={() =>
                    window.open(
                      "https://www.linkedin.com/in/ahmed-ayman-mern/",
                      "_blank"
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
  );
}
