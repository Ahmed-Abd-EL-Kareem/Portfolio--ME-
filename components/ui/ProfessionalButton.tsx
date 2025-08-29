"use client";

import { motion } from "framer-motion";
import type React from "react";

interface ProfessionalButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "glass";
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
  className?: string;
  icon?: React.ElementType;
  [key: string]: unknown;
}

export function ProfessionalButton({
  children,
  variant = "primary",
  size = "md",
  onClick,
  className = "",
  icon: Icon,
  ...props
}: ProfessionalButtonProps) {
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg hover:shadow-xl border border-blue-500/20",
    secondary:
      "bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl",
    outline:
      "border-2 border-indigo-600 text-indigo-600 dark:text-indigo-400 hover:bg-gradient-to-r hover:from-indigo-600 hover:to-purple-600 hover:text-white bg-transparent backdrop-blur-sm",
    glass:
      "bg-white/10 backdrop-blur-md border border-white/20 dark:text-white text-slate-800 hover:bg-white/20 shadow-lg hover:shadow-xl",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  return (
    <motion.button
      className={`inline-flex items-center justify-center rounded-xl font-medium transition-all duration-300 ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.02, y: -2 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {Icon && <Icon className="h-5 w-5 mx-2" />}
      {children}
    </motion.button>
  );
}
