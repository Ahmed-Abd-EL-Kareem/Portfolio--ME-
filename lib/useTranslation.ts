"use client";

import { useState, useEffect } from "react";
import { translations } from "./translations";
import { Translations } from "./types";

export type Language = "en" | "ar";

export function useTranslation() {
  const [language, setLanguage] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const savedLang = localStorage.getItem("language") as Language;
    if (savedLang) {
      setLanguage(savedLang);
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem("language", language);
      document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
      document.documentElement.lang = language;
    }
  }, [language, mounted]);

  const t: Translations = translations[language];

  const toggleLanguage = () => {
    setLanguage(language === "en" ? "ar" : "en");
  };

  return {
    language,
    t,
    toggleLanguage,
    setLanguage,
    mounted,
  };
}
