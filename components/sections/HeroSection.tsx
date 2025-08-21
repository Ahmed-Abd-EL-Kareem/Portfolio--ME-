"use client";

import { motion } from "framer-motion";
import { Download, Mail, Github, Linkedin, MapPin } from "lucide-react";
import { ProfessionalButton } from "@/components/ui/ProfessionalButton";
import { ThreeScene } from "@/components/3d/ThreeScene";
import Image from "next/image";
import { Translations } from "@/lib/types";
// import heroIcon from "../../app/data/icon.json";
interface HeroSectionProps {
  isDark: boolean;
  language: "en" | "ar";
  mousePosition: { x: number; y: number };
  t: Translations;
}

export function HeroSection({ isDark, language, t }: HeroSectionProps) {
  return (
    <section
      id="hero"
      className="mt-4 min-h-screen relative overflow-hidden flex items-center xl:mx-4"
    >
      {/* 3D Canvas Background */}
      <ThreeScene isDark={isDark} language={language} name={t.hero.name} />

      {/* Hero Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-20 ">
          {/* Left Column - Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="space-y-8 order-2 lg:order-1"
          >
            {/* Greeting */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-center space-x-3"
            >
              <motion.div
                animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
                transition={{
                  duration: 2.5,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatDelay: 3,
                }}
                className="text-2xl"
              >
                👋
              </motion.div>
              <span
                className={`text-xl ${
                  isDark ? "text-slate-300" : "text-indigo-700"
                }`}
              >
                {t.hero.greeting}
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              className={`text-5xl md:text-7xl font-black leading-tight ${
                isDark ? "text-transparent" : "text-transparent"
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              style={{
                backgroundImage: isDark
                  ? "linear-gradient(to right, rgb(125 211 252), rgb(147 197 253), rgb(165 180 252))"
                  : "linear-gradient(to right, rgb(29 78 216), rgb(79 70 229), rgb(124 58 237))",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
              }}
            >
              {t.hero.name}
            </motion.h1>

            {/* Title with animated underline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 }}
              className="relative"
            >
              <h2
                className={`text-2xl md:text-4xl font-light ${
                  isDark ? "text-slate-200" : "text-indigo-800"
                }`}
              >
                {t.hero.title}
              </h2>
              <motion.div
                className={`h-1 bg-gradient-to-r ${
                  isDark
                    ? "from-sky-400 to-indigo-400"
                    : "from-blue-600 to-indigo-600"
                } rounded-full mt-2`}
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ delay: 1.5, duration: 1 }}
              />
            </motion.div>

            {/* Description */}
            <motion.p
              className={`text-lg md:text-xl leading-relaxed max-w-2xl ${
                isDark ? "text-slate-300" : "text-slate-600"
              }`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3 }}
            >
              {t.hero.description}
            </motion.p>

            {/* Status badges */}
            <motion.div
              className="flex flex-wrap gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5 }}
            >
              <motion.div
                className={`flex gap-2 items-center px-4 py-2 rounded-full ${
                  isDark
                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                    : "bg-emerald-100 text-emerald-700 border border-emerald-300"
                } backdrop-blur-sm`}
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  className="w-2 h-2 bg-emerald-400 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                />
                {t.hero.availableForWork}
              </motion.div>
              <motion.div
                className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                  isDark
                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    : "bg-blue-100 text-blue-700 border border-blue-300"
                } backdrop-blur-sm`}
                whileHover={{ scale: 1.05 }}
              >
                <MapPin className="w-4 h-4 " />
                {t.hero.basedIn}
              </motion.div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.7 }}
            >
              <ProfessionalButton
                variant="primary"
                size="lg"
                icon={Download}
                className="group"
                onClick={() =>
                  window.open(
                    "https://drive.google.com/uc?export=download&id=13r5iwDwsmv5_kXdcNMvw0bIsjauV_XCo",
                    "_blank"
                  )
                }
              >
                <span className="mr-2">{t.hero.downloadCV}</span>
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{
                    duration: 1.5,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                  className="mr-4"
                >
                  {`${language === "en" ? "→" : "←"}`}
                </motion.span>
              </ProfessionalButton>
              <ProfessionalButton
                variant="outline"
                size="lg"
                icon={Mail}
                onClick={() =>
                  window.open(
                    "mailto:ahmed.abd.elkareem015@gmail.com",
                    "_blank"
                  )
                }
              >
                {t.hero.hireMe}
              </ProfessionalButton>
            </motion.div>

            {/* Social Links */}
            <motion.div
              className="flex pt-4 gap-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.9 }}
            >
              {[
                {
                  icon: Github,
                  href: "https://github.com/Ahmed-Abd-EL-Kareem",
                  label: "GitHub",
                },
                {
                  icon: Linkedin,
                  href: "https://www.linkedin.com/in/ahmed-ayman-mern/",
                  label: "LinkedIn",
                },
                {
                  icon: Mail,
                  href: "mailto:ahmed.abd.elkareem015@gmail.com",
                  label: "Email",
                },
              ].map((social, index) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  className={`p-3 rounded-full ${
                    isDark
                      ? "bg-slate-800/50 hover:bg-slate-700/50 text-slate-300 hover:text-white border border-slate-700/50"
                      : "bg-white/50 hover:bg-white/80 text-slate-600 hover:text-slate-900 border border-slate-200/50"
                  } backdrop-blur-sm transition-all duration-300 shadow-lg hover:shadow-xl`}
                  whileHover={{ scale: 1.1, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2 + index * 0.1 }}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Enhanced Profile Photo */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="flex justify-center lg:justify-end order-1 lg:order-2 mt-8"
          >
            <div className="relative">
              {/* Main photo container */}
              <motion.div
                className="relative w-80 h-80 md:w-96 md:h-96 rounded-full overflow-hidden"
                whileHover={{ scale: 1.05 }}
                animate={{
                  rotate: [0, 2, -2, 0],
                }}
                transition={{
                  rotate: { duration: 6, repeat: Number.POSITIVE_INFINITY },
                }}
              >
                {/* Animated border */}
                <motion.div
                  className="absolute inset-0 rounded-full p-1"
                  style={{
                    background: isDark
                      ? "linear-gradient(45deg, #0EA5E9, #6366F1, #8B5CF6, #EC4899, #0EA5E9)"
                      : "linear-gradient(45deg, #2563EB, #4F46E5, #7C3AED, #DB2777, #2563EB)",
                  }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Number.POSITIVE_INFINITY,
                  }}
                >
                  <div
                    className={`w-full h-full rounded-full overflow-hidden ${
                      isDark ? "bg-gray-800" : "bg-white"
                    }`}
                  >
                    <Image
                      src="/main.jpg"
                      alt={t.hero.name}
                      width={400}
                      height={400}
                      className="w-full h-full object-cover"
                      priority
                    />
                  </div>
                </motion.div>
              </motion.div>

              {/* Floating elements around photo */}
              {[
                {
                  icon: "💻",
                  color: "from-blue-400 to-cyan-400",
                  position: "top-4 -right-4",
                  delay: 0,
                },
                {
                  icon: "🚀",
                  color: "from-purple-400 to-pink-400",
                  position: "bottom-4 -left-4",
                  delay: 0.5,
                },
                {
                  icon: "</>",
                  color: "from-yellow-400 to-orange-400",
                  position: "top-1/2 -left-8",
                  delay: 1,
                },
                {
                  icon: "🏆",
                  color: "from-green-400 to-emerald-400",
                  position: "top-1/4 -right-8",
                  delay: 1.5,
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  className={`absolute ${item.position} w-14 h-14 bg-gradient-to-r ${item.color} rounded-full flex items-center justify-center text-white shadow-xl backdrop-blur-sm border border-white/20 text-center`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    y: [0, -10, 0],
                    rotate: [0, 5, -5, 0],
                  }}
                  transition={{
                    delay: 2 + item.delay,
                    type: "spring",
                    y: {
                      duration: 3,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.5,
                    },
                    rotate: {
                      duration: 4,
                      repeat: Number.POSITIVE_INFINITY,
                      delay: index * 0.3,
                    },
                  }}
                  whileHover={{ scale: 1.2, rotate: 360 }}
                >
                  <div className="w-7 h-7">{item.icon}</div>
                </motion.div>
              ))}

              {/* Stats floating cards */}
              {[
                {
                  label: "Projects",
                  value: "50+",
                  position: "-top-8 left-8",
                },
                {
                  label: "Clients",
                  value: "25+",
                  position: "-bottom-8 right-8",
                },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className={`absolute ${stat.position} ${
                    isDark
                      ? "bg-slate-800/90 border-slate-700/50"
                      : "bg-white/90 border-slate-200/50"
                  } backdrop-blur-md rounded-xl p-4 border shadow-xl`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2.5 + index * 0.3 }}
                  whileHover={{ scale: 1.05, y: -5 }}
                >
                  <div
                    className={`text-2xl font-bold ${
                      isDark ? "text-sky-400" : "text-blue-600"
                    }`}
                  >
                    {stat.value}
                  </div>
                  <div
                    className={`text-sm ${
                      isDark ? "text-slate-300" : "text-slate-600"
                    }`}
                  >
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5 }}
      >
        <motion.div
          className={`text-sm ${
            isDark ? "text-slate-400" : "text-slate-500"
          } mb-4`}
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          {t.hero.scrollToExplore}
        </motion.div>
        <motion.div
          className={`w-8 h-12 border-2 ${
            isDark ? "border-sky-400" : "border-indigo-500"
          } rounded-full flex justify-center shadow-lg backdrop-blur-sm`}
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
        >
          <motion.div
            className={`w-2 h-4 ${
              isDark ? "bg-cyan-400" : "bg-blue-500"
            } rounded-full mt-2 shadow-lg`}
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
