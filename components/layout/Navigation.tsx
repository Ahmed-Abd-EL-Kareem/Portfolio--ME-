"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Sun, Moon, Globe, Menu, X } from "lucide-react";
import Image from "next/image";
import { useState, useEffect } from "react";
import { ProfessionalButton } from "@/components/ui/ProfessionalButton";
import { Translations } from "@/lib/types";

interface NavigationProps {
  isDark: boolean;
  language: "en" | "ar";
  isMenuOpen: boolean;
  onToggleTheme: () => void;
  onToggleLanguage: () => void;
  onToggleMenu: () => void;
  t: Translations;
}

export function Navigation({
  isDark,
  language,
  isMenuOpen,
  onToggleTheme,
  onToggleLanguage,
  onToggleMenu,
  t,
}: NavigationProps) {
  const [activeSection, setActiveSection] = useState("hero");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      // حساب الموقع مع مراعاة ارتفاع الهيدر
      const headerHeight = 80; // ارتفاع تقريبي للهيدر
      const elementPosition = element.offsetTop - headerHeight;

      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
    // إغلاق القائمة على الهاتف المحمول بعد تأخير قصير
    if (isMenuOpen) {
      setTimeout(() => {
        onToggleMenu();
      }, 300);
    }
  };

  // تتبع القسم النشط أثناء التمرير
  useEffect(() => {
    const handleScroll = () => {
      const sections = [
        "hero",
        "projects",
        "about",
        "skills",
        "certificates",
        "education",
        "contact",
      ];
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (
            scrollPosition >= offsetTop &&
            scrollPosition < offsetTop + offsetHeight
          ) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { id: "hero", label: t.common.home },
    { id: "projects", label: t.common.projects },
    { id: "about", label: t.common.about },
    { id: "skills", label: t.common.skills },
    { id: "certificates", label: t.certificates.title },
    { id: "education", label: t.common.education },
    { id: "contact", label: t.common.contact },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 w-full z-40 ${
        isDark
          ? "bg-slate-900/80 border-slate-700/50"
          : "bg-white/95 border-indigo-200/50"
      } backdrop-blur-xl border-b shadow-lg`}
    >
      <div className="container mx-auto px-4 py-4 flex justify-between items-center gap-4">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{
            scale: 1.05,
            rotate: [0, -5, 5, 0],
            transition: { duration: 0.3 },
          }}
          whileTap={{ scale: 0.95 }}
          className="cursor-pointer relative group"
          onClick={() => scrollToSection("hero")}
        >
          <div className="relative">
            <Image
              src="/logo.png"
              alt="Ahmed Abd EL Kareem Portfolio Logo"
              width={50}
              height={50}
              className={`w-12 h-12 object-contain transition-all duration-300 group-hover:drop-shadow-lg ${
                isDark ? "invert" : ""
              }`}
              priority
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
            />
            {/* تأثير التوهج عند التحويم */}
            <motion.div
              className={`absolute inset-0 rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity duration-300 ${
                isDark ? "bg-sky-400" : "bg-indigo-600"
              }`}
              initial={{ scale: 0.8 }}
              whileHover={{ scale: 1.2 }}
            />
          </div>
          {/* مؤشر النص عند التحويم */}
          <motion.div
            className={`absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 rounded text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
              isDark
                ? "bg-slate-800 text-sky-400 border border-sky-400/30"
                : "bg-white text-indigo-600 border border-indigo-200 shadow-lg"
            }`}
            initial={{ y: 5 }}
            whileHover={{ y: 0 }}
          >
            {t.common.home}
          </motion.div>
        </motion.div>

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center justify-center gap-4">
          {navLinks.map((link) => (
            <motion.button
              key={link.id}
              whileHover={{
                scale: 1.05,
                y: -2,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => scrollToSection(link.id)}
              className={`relative mx-4 text-sm font-medium transition-all duration-300 ${
                activeSection === link.id
                  ? isDark
                    ? "text-sky-400"
                    : "text-indigo-600"
                  : isDark
                  ? "text-gray-300 hover:text-sky-400"
                  : "text-gray-700 hover:text-indigo-600"
              }`}
            >
              {link.label}
              {activeSection === link.id && (
                <motion.div
                  layoutId="activeIndicator"
                  className={`absolute -bottom-1 left-0 right-0 h-0.5 rounded-full ${
                    isDark ? "bg-sky-400" : "bg-indigo-600"
                  }`}
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              {/* تأثير التوهج عند التحويم */}
              <motion.div
                className={`absolute inset-0 rounded-lg opacity-0 transition-opacity duration-300 ${
                  isDark ? "bg-sky-400/10" : "bg-indigo-600/10"
                }`}
                whileHover={{ opacity: 1 }}
              />
            </motion.button>
          ))}
        </div>

        {/* Desktop Theme & Language Controls */}
        <div className="hidden md:flex items-center gap-4">
          <ProfessionalButton
            variant="glass"
            size="sm"
            onClick={onToggleTheme}
            icon={isDark ? Sun : Moon}
          >
            {isDark ? t.nav.light : t.nav.dark}
          </ProfessionalButton>
          <ProfessionalButton
            variant="glass"
            size="sm"
            onClick={onToggleLanguage}
            icon={Globe}
          >
            {language === "en" ? t.nav.arabic : t.nav.english}
          </ProfessionalButton>
        </div>

        {/* Mobile Menu Button */}
        <ProfessionalButton
          variant="glass"
          size="sm"
          className="md:hidden"
          onClick={onToggleMenu}
          icon={isMenuOpen ? X : Menu}
        >
          {isMenuOpen ? t.nav.close : t.nav.menu}
        </ProfessionalButton>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden ${
              isDark ? "bg-gray-900/95" : "bg-white/95"
            } border-t border-gray-200/50 dark:border-gray-700/50 backdrop-blur-xl`}
          >
            <div className="container mx-auto px-4 py-4 space-y-4">
              {/* Mobile Navigation Links */}
              <div className="space-y-2">
                {navLinks.map((link) => (
                  <motion.button
                    key={link.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => scrollToSection(link.id)}
                    className={`w-full text-left py-2 px-3 rounded-lg transition-colors duration-200 ${
                      activeSection === link.id
                        ? isDark
                          ? "text-sky-400 bg-gray-800/50"
                          : "text-indigo-600 bg-gray-100/50"
                        : isDark
                        ? "text-gray-300 hover:text-sky-400 hover:bg-gray-800/50"
                        : "text-gray-700 hover:text-indigo-600 hover:bg-gray-100/50"
                    }`}
                  >
                    {link.label}
                  </motion.button>
                ))}
              </div>

              {/* Mobile Theme & Language Controls */}
              <div className="pt-2 border-t border-gray-200/50 dark:border-gray-700/50 space-y-2">
                <ProfessionalButton
                  variant="glass"
                  onClick={onToggleTheme}
                  className="w-full"
                  icon={isDark ? Sun : Moon}
                >
                  {isDark ? t.nav.lightMode : t.nav.darkMode}
                </ProfessionalButton>
                <ProfessionalButton
                  variant="glass"
                  onClick={onToggleLanguage}
                  className="w-full"
                  icon={Globe}
                >
                  {language === "en" ? t.nav.arabic : t.nav.english}
                </ProfessionalButton>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
