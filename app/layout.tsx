import type React from "react";
import type { Metadata, Viewport } from "next";
import { Inter, Poppins, Noto_Sans_Arabic } from "next/font/google";
import { PerformanceMonitor } from "@/components/ui/PerformanceMonitor";
import "./globals.css";

// تحسين تحميل الخطوط
const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({ 
  subsets: ["latin"],
  weight: ['300', '400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-poppins',
});

const arabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  display: 'swap',
  variable: '--font-arabic',
});

export const metadata: Metadata = {
  title: {
    default: "Ahmed Abd EL Kareem - Full Stack Web Developer",
    template: "%s | Ahmed Abd EL Kareem"
  },
  description:
    "Professional portfolio of Ahmed Abd EL Kareem, a full stack web developer specializing in React, Next.js, Node.js, and modern web technologies. Based in Cairo, Egypt. View my projects, skills, and experience.",
  keywords: [
    "web developer",
    "full stack developer", 
    "React developer",
    "Next.js developer",
    "Node.js developer",
    "JavaScript developer",
    "TypeScript developer",
    "portfolio",
    "Cairo",
    "Egypt",
    "frontend developer",
    "backend developer",
    "MERN stack",
    "web development",
    "software engineer",
    "freelance developer",
    "React portfolio",
    "Next.js portfolio",
    "web design",
    "responsive design"
  ],
  authors: [{ name: "Ahmed Abd EL Kareem", url: "https://ahmed-abd-el-kareem.vercel.app" }],
  creator: "Ahmed Abd EL Kareem",
  publisher: "Ahmed Abd EL Kareem",
  metadataBase: new URL(process.env['NEXT_PUBLIC_SITE_URL'] || 'https://ahmed-abd-el-kareem.vercel.app'),
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Ahmed Abd EL Kareem - Full Stack Web Developer",
    description: "Professional portfolio showcasing modern web development skills and projects. Specializing in React, Next.js, Node.js, and full-stack development.",
    url: "https://ahmed-abd-el-kareem.vercel.app",
    siteName: "Ahmed Abd EL Kareem Portfolio",
    type: "website",
    locale: "en_US",
    countryName: "Egypt",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Ahmed Abd EL Kareem - Full Stack Web Developer Portfolio",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ahmed Abd EL Kareem - Full Stack Web Developer",
    description: "Professional portfolio showcasing modern web development skills and projects.",
    images: ["/og-image.jpg"],
    creator: "@ahmed_abd_el_kareem",
    site: "@ahmed_abd_el_kareem",
  },
  alternates: {
    canonical: "https://ahmed-abd-el-kareem.vercel.app",
    languages: {
      'en-US': 'https://ahmed-abd-el-kareem.vercel.app',
      'ar-EG': 'https://ahmed-abd-el-kareem.vercel.app?lang=ar',
    },
  },
  category: "technology",
  classification: "Portfolio Website",
  verification: {
    google: "your-google-verification-code",
    yandex: "your-yandex-verification-code",
    yahoo: "your-yahoo-verification-code",
  },
  other: {
    "theme-color": "#3B82F6",
    "msapplication-TileColor": "#3B82F6",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "default",
    "apple-mobile-web-app-title": "Ahmed Portfolio",
    "mobile-web-app-capable": "yes",
    "application-name": "Ahmed Portfolio",
    "msapplication-tooltip": "Ahmed Abd EL Kareem Portfolio",
    "msapplication-starturl": "/",
    "msapplication-navbutton-color": "#3B82F6",
    "msapplication-TileImage": "/logo.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3B82F6" },
    { media: "(prefers-color-scheme: dark)", color: "#1E293B" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Preconnect to external domains - optimized for performance */}
        <link rel="preconnect" href="https://picsum.photos" />
        <link rel="preconnect" href="https://images.unsplash.com" />
        
        {/* DNS Prefetch for external resources */}
        <link rel="dns-prefetch" href="https://github.com" />
        <link rel="dns-prefetch" href="https://linkedin.com" />
        <link rel="dns-prefetch" href="https://drive.google.com" />
        
        {/* Preload critical resources */}
        <link rel="preload" href="/main.jpg" as="image" type="image/jpeg" />
        <link rel="preload" href="/logo.png" as="image" type="image/png" />
        
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Ahmed Abd EL Kareem",
              "jobTitle": "Full Stack Web Developer",
              "description": "Professional full stack web developer specializing in React, Next.js, Node.js, and modern web technologies.",
              "url": "https://ahmed-abd-el-kareem.vercel.app",
              "image": "https://ahmed-abd-el-kareem.vercel.app/main.jpg",
              "sameAs": [
                "https://github.com/Ahmed-Abd-EL-Kareem",
                "https://www.linkedin.com/in/ahmed-ayman-mern/"
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Cairo",
                "addressCountry": "Egypt"
              },
              "knowsAbout": [
                "React",
                "Next.js", 
                "Node.js",
                "JavaScript",
                "TypeScript",
                "MongoDB",
                "Web Development",
                "Full Stack Development"
              ],
              "worksFor": {
                "@type": "Organization",
                "name": "Freelance"
              }
            })
          }}
        />
      </head>
      <body
        className={`${inter.variable} ${poppins.variable} ${arabic.variable} antialiased`}
        suppressHydrationWarning
      >
        <PerformanceMonitor />
        {children}
      </body>
    </html>
  );
}
