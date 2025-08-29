"use client";

import { useState, useEffect, Suspense } from "react";
import { useTranslation } from "@/lib/useTranslation";
import { Navigation } from "@/components/layout/Navigation";
import { HeroSection } from "@/components/sections/HeroSection";
import { StatsSection } from "@/components/sections/StatsSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { CertificateSection } from "@/components/sections/CertificateSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";
import { AnimatedBackground } from "@/components/ui/AnimatedBackground";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { LoadingSpinner } from "@/components/ui/LoadingSpinner";

// Dynamic imports للمكونات الثقيلة
const ProjectsSection = dynamic(() => import("@/components/sections/ProjectsSection").then(mod => ({ default: mod.ProjectsSection })), {
  ssr: false,
  loading: () => <div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>
});

const ThreeScene = dynamic(() => import("@/components/3d/ThreeScene").then(mod => ({ default: mod.ThreeScene })), {
  ssr: false,
  loading: () => null
});

// تحسين استيراد dynamic
import dynamic from 'next/dynamic';

export default function Portfolio() {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const {
    language,
    t,
    toggleLanguage,
    mounted: translationMounted,
  } = useTranslation();

  useEffect(() => {
    setMounted(true);
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setIsDark(savedTheme === "dark");

    // Mouse tracking for parallax effects
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("theme", isDark ? "dark" : "light");
      document.documentElement.classList.toggle("dark", isDark);
    }
  }, [isDark, mounted]);

  const toggleTheme = () => setIsDark(!isDark);
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  if (!mounted || !translationMounted) {
    return <LoadingSpinner />;
  }

  return (
    <div
      className={`min-h-screen transition-all duration-500  ${
        isDark
          ? "dark bg-gradient-to-br from-slate-900 via-indigo-950/30 to-violet-900/20"
          : "bg-gradient-to-br from-blue-50 via-indigo-50/30 to-purple-50/50"
      }`}
    >
      {/* Animated Background */}
      <Suspense fallback={null}>
        <AnimatedBackground isDark={isDark} mousePosition={mousePosition} />
      </Suspense>

      {/* Progress Bar */}
      <ProgressBar />

      {/* Navigation */}
      <Navigation
        isDark={isDark}
        language={language}
        isMenuOpen={isMenuOpen}
        onToggleTheme={toggleTheme}
        onToggleLanguage={toggleLanguage}
        onToggleMenu={toggleMenu}
        t={t}
      />

      {/* Hero Section */}
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>}>
        <HeroSection
          isDark={isDark}
          language={language}
          mousePosition={mousePosition}
          t={t}
        />
      </Suspense>

      {/* Stats Section */}
      <StatsSection isDark={isDark} t={t} />

      {/* Projects Section */}
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>}>
        <ProjectsSection isDark={isDark} t={t} currentLanguage={language} />
      </Suspense>

      {/* About Section */}
      <AboutSection isDark={isDark} t={t} language={language} />

      {/* Skills Section */}
      <SkillsSection isDark={isDark} t={t} />

      {/* Certificates Section */}
      <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><LoadingSpinner /></div>}>
        <CertificateSection isDark={isDark} t={t} currentLanguage={language} />
      </Suspense>

      {/* Education Section */}
      <EducationSection isDark={isDark} t={t} />

      {/* Contact Section */}
      <ContactSection isDark={isDark} t={t} />

      {/* Footer */}
      <Footer isDark={isDark} t={t} />
    </div>
  );
}
