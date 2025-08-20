import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ahmed Abd EL Kareem - Full Stack Web Developer",
  description:
    "Professional portfolio of Ahmed Abd EL Kareem, a full stack web developer specializing in React, Next.js, Node.js, and modern web technologies.",
  keywords:
    "web developer, full stack, React, Next.js, Node.js, JavaScript, portfolio",
  authors: [{ name: "Ahmed Abd EL Kareem" }],
  openGraph: {
    title: "Ahmed Abd EL Kareem - Full Stack Web Developer",
    description:
      "Professional portfolio showcasing modern web development skills",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.className} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
