# دليل تحسين محركات البحث (SEO)

هذا الدليل يوضح كيفية تحسين الموقع لمحركات البحث وتحسين ظهوره في نتائج البحث.

## 🎯 أساسيات SEO

### ما هو SEO؟

تحسين محركات البحث (Search Engine Optimization) هو عملية تحسين الموقع لتحسين ظهوره في نتائج البحث العضوية لمحركات البحث مثل Google.

### أهمية SEO

- **زيادة الزيارات**: المزيد من الزيارات العضوية
- **تحسين المصداقية**: الموقع يبدو أكثر موثوقية
- **تحسين التحويلات**: زيارات عالية الجودة
- **تحسين الأداء**: تحسين سرعة الموقع

## 🔧 تحسينات SEO الأساسية

### إعدادات Next.js

#### 1. تكوين next.config.js
```js
// next.config.js
module.exports = {
  // تحسين الأداء
  compress: true,
  poweredByHeader: false,
  
  // تحسين الصور
  images: {
    domains: ['your-domain.com'],
    formats: ['image/webp', 'image/avif'],
  },
  
  // تحسين التخزين المؤقت
  generateEtags: false,
  
  // تحسين الروابط
  trailingSlash: false,
  
  // تحسين التصدير
  output: 'export',
}
```

#### 2. إعدادات metadata
```tsx
// app/layout.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    default: 'اسم الموقع',
    template: '%s | اسم الموقع'
  },
  description: 'وصف مفصل للموقع',
  keywords: ['كلمة مفتاحية 1', 'كلمة مفتاحية 2'],
  authors: [{ name: 'اسم المؤلف' }],
  creator: 'اسم المؤلف',
  publisher: 'اسم الناشر',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://your-domain.com'),
  alternates: {
    canonical: '/',
    languages: {
      'ar': '/ar',
      'en': '/en',
    },
  },
  openGraph: {
    title: 'اسم الموقع',
    description: 'وصف الموقع',
    url: 'https://your-domain.com',
    siteName: 'اسم الموقع',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'صورة الموقع',
      },
    ],
    locale: 'ar_SA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'اسم الموقع',
    description: 'وصف الموقع',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
    yahoo: 'yahoo-verification-code',
  },
}
```

### تحسين الصفحات

#### 1. صفحة رئيسية محسنة
```tsx
// app/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'الرئيسية',
  description: 'موقع شخصي لمطور الويب - عرض المشاريع والمهارات',
  keywords: ['مطور ويب', 'React', 'Next.js', 'TypeScript'],
  openGraph: {
    title: 'الرئيسية - موقع شخصي',
    description: 'موقع شخصي لمطور الويب',
  },
}

export default function HomePage() {
  return (
    <main>
      <h1>مرحباً، أنا مطور ويب</h1>
      <p>أطور تطبيقات ويب حديثة ومتجاوبة</p>
      {/* باقي المحتوى */}
    </main>
  )
}
```

#### 2. صفحة المشاريع
```tsx
// app/projects/page.tsx
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'المشاريع',
  description: 'عرض مشاريعي في تطوير الويب والتطبيقات',
  keywords: ['مشاريع', 'تطوير ويب', 'React', 'Node.js'],
}

export default function ProjectsPage() {
  return (
    <main>
      <h1>مشاريعي</h1>
      <section>
        <h2>مشاريع حديثة</h2>
        {/* قائمة المشاريع */}
      </section>
    </main>
  )
}
```

### تحسين الروابط

#### 1. هيكل الروابط
```
/
├── /
├── /about
├── /projects
│   ├── /projects
│   └── /projects/[slug]
├── /skills
├── /experience
├── /contact
└── /blog
    ├── /blog
    └── /blog/[slug]
```

#### 2. الروابط الداخلية
```tsx
// استخدام Link من Next.js
import Link from 'next/link'

const Navigation = () => (
  <nav>
    <Link href="/" aria-label="الرئيسية">
      الرئيسية
    </Link>
    <Link href="/about" aria-label="حولي">
      حولي
    </Link>
    <Link href="/projects" aria-label="المشاريع">
      المشاريع
    </Link>
  </nav>
)
```

## 📊 تحسينات متقدمة

### تحسين الصور

#### 1. تحسين صور Next.js
```tsx
import Image from 'next/image'

const OptimizedImage = () => (
  <Image
    src="/hero-image.jpg"
    alt="صورة رئيسية للموقع"
    width={1200}
    height={600}
    priority={true}
    placeholder="blur"
    blurDataURL="data:image/jpeg;base64,..."
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  />
)
```

#### 2. تحسين الصور للشبكات الاجتماعية
```tsx
// إضافة صور مخصصة للشبكات الاجتماعية
export const metadata: Metadata = {
  openGraph: {
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'صورة الموقع للشبكات الاجتماعية',
      },
    ],
  },
  twitter: {
    images: ['/twitter-image.jpg'],
  },
}
```

### تحسين المحتوى

#### 1. هيكل العناوين
```tsx
const PageStructure = () => (
  <div>
    <h1>العنوان الرئيسي</h1>
    <section>
      <h2>قسم فرعي</h2>
      <article>
        <h3>مقال فرعي</h3>
        <p>محتوى المقال</p>
      </article>
    </section>
  </div>
)
```

#### 2. الكلمات المفتاحية
```tsx
// استخدام الكلمات المفتاحية بشكل طبيعي
const ProjectCard = ({ project }) => (
  <article>
    <h3>{project.title}</h3>
    <p>{project.description}</p>
    <div>
      <span>التقنيات المستخدمة: {project.technologies}</span>
    </div>
  </article>
)
```

### تحسين الأداء

#### 1. تحسين التحميل
```tsx
// تحميل مكونات بشكل كسول
import dynamic from 'next/dynamic'

const LazyComponent = dynamic(() => import('./LazyComponent'), {
  loading: () => <LoadingSpinner />,
  ssr: false,
})
```

#### 2. تحسين التخزين المؤقت
```tsx
// إعداد التخزين المؤقت
export const revalidate = 3600 // ساعة واحدة

// أو استخدام generateStaticParams
export async function generateStaticParams() {
  return [
    { slug: 'project-1' },
    { slug: 'project-2' },
  ]
}
```

## 🔍 أدوات تحليل SEO

### أدوات Google

#### 1. Google Search Console
```bash
# إضافة الموقع إلى Search Console
# 1. اذهب إلى https://search.google.com/search-console
# 2. أضف موقعك
# 3. تحقق من الملكية
# 4. أرسل sitemap
```

#### 2. Google Analytics
```tsx
// إعداد Google Analytics
import Script from 'next/script'

const Analytics = () => (
  <>
    <Script
      src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      strategy="afterInteractive"
    />
    <Script id="google-analytics" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
      `}
    </Script>
  </>
)
```

### أدوات خارجية

#### 1. Lighthouse
```bash
# تشغيل Lighthouse
npm run lighthouse

# تشغيل في وضع CI
npm run lighthouse:ci
```

#### 2. PageSpeed Insights
```bash
# اختبار سرعة الصفحة
npm run pagespeed

# تقرير مفصل
npm run pagespeed:detailed
```

## 📋 ملفات مهمة

### robots.txt
```txt
# public/robots.txt
User-agent: *
Allow: /

# منع الوصول لملفات معينة
Disallow: /api/
Disallow: /admin/
Disallow: /private/

# موقع sitemap
Sitemap: https://your-domain.com/sitemap.xml
```

### sitemap.xml
```tsx
// app/sitemap.ts
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://your-domain.com',
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://your-domain.com/about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: 'https://your-domain.com/projects',
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: 'https://your-domain.com/contact',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]
}
```

### manifest.json
```json
{
  "name": "اسم الموقع",
  "short_name": "الاسم المختصر",
  "description": "وصف الموقع",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/icon-192x192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512x512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

## 🎯 استراتيجيات SEO

### SEO المحلي

#### 1. تحسين المحتوى المحلي
```tsx
// إضافة معلومات محلية
export const metadata: Metadata = {
  openGraph: {
    locale: 'ar_SA',
    siteName: 'اسم الموقع',
  },
  other: {
    'geo.region': 'SA',
    'geo.placename': 'الرياض',
    'geo.position': '24.7136;46.6753',
    'ICBM': '24.7136, 46.6753',
  },
}
```

#### 2. إضافة Schema.org
```tsx
// إضافة بيانات منظمة
const PersonSchema = () => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{
      __html: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "اسم الشخص",
        "jobTitle": "مطور ويب",
        "url": "https://your-domain.com",
        "sameAs": [
          "https://github.com/username",
          "https://linkedin.com/in/username"
        ]
      })
    }}
  />
)
```

### SEO التقني

#### 1. تحسين Core Web Vitals
```tsx
// تحسين LCP
const HeroSection = () => (
  <section>
    <Image
      src="/hero-image.jpg"
      alt="صورة رئيسية"
      priority={true}
      width={1200}
      height={600}
    />
  </section>
)

// تحسين CLS
const StableLayout = () => (
  <div style={{ minHeight: '400px' }}>
    {/* محتوى ثابت */}
  </div>
)
```

#### 2. تحسين FID
```tsx
// تقليل JavaScript غير الضروري
const OptimizedComponent = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  
  useEffect(() => {
    // تحميل البيانات بشكل كسول
    const loadData = async () => {
      const data = await fetch('/api/data')
      setIsLoaded(true)
    }
    
    loadData()
  }, [])
  
  return isLoaded ? <Content /> : <Loading />
}
```

## 📊 مراقبة SEO

### مقاييس الأداء

#### 1. Core Web Vitals
- **LCP**: < 1.5 ثانية
- **FID**: < 100 مللي ثانية
- **CLS**: < 0.1

#### 2. مقاييس SEO
- **سرعة التحميل**: < 2 ثانية
- **حجم الصفحة**: < 2 ميجابايت
- **عدد الطلبات**: < 50 طلب

### أدوات المراقبة

#### 1. Google Search Console
- مراقبة الظهور في البحث
- تحليل الكلمات المفتاحية
- مراقبة الأخطاء

#### 2. Google Analytics
- تحليل الزيارات
- تحليل سلوك المستخدمين
- تحليل التحويلات

## 🎯 أهداف SEO

### أهداف قصيرة المدى

- [ ] تحسين Core Web Vitals
- [ ] إضافة sitemap.xml
- [ ] تحسين robots.txt
- [ ] إضافة Schema.org

### أهداف متوسطة المدى

- [ ] تحسين المحتوى
- [ ] إضافة مدونة
- [ ] تحسين الروابط الداخلية
- [ ] تحسين الصور

### أهداف طويلة المدى

- [ ] الظهور في الصفحة الأولى
- [ ] زيادة الزيارات العضوية
- [ ] تحسين التحويلات
- [ ] بناء سلطة الموقع

## 📋 قائمة فحص SEO

### فحص أساسي
- [ ] عنوان الصفحة محسن
- [ ] وصف الصفحة موجود
- [ ] الكلمات المفتاحية موجودة
- [ ] الصور لها alt text
- [ ] الروابط تعمل

### فحص متقدم
- [ ] Core Web Vitals محسنة
- [ ] sitemap.xml موجود
- [ ] robots.txt محسن
- [ ] Schema.org مضاف
- [ ] أداء الموقع جيد

---

**ملاحظة**: SEO هو عملية مستمرة تتطلب تحسيناً مستمراً ومراقبة منتظمة للأداء.
