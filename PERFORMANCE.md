# دليل الأداء والتحسين

هذا الدليل يوضح كيفية تحسين أداء الموقع ومراقبته.

## 🚀 مقاييس الأداء

### Core Web Vitals

#### 1. Largest Contentful Paint (LCP)
- **الهدف**: < 1.5 ثانية
- **مقبول**: 1.5 - 2.5 ثانية
- **ضعيف**: > 2.5 ثانية

#### 2. First Input Delay (FID)
- **الهدف**: < 100 مللي ثانية
- **مقبول**: 100 - 300 مللي ثانية
- **ضعيف**: > 300 مللي ثانية

#### 3. Cumulative Layout Shift (CLS)
- **الهدف**: < 0.1
- **مقبول**: 0.1 - 0.25
- **ضعيف**: > 0.25

### مقاييس إضافية

#### 4. First Contentful Paint (FCP)
- **الهدف**: < 1.0 ثانية
- **مقبول**: 1.0 - 1.8 ثانية
- **ضعيف**: > 1.8 ثانية

#### 5. Time to Interactive (TTI)
- **الهدف**: < 3.0 ثانية
- **مقبول**: 3.0 - 4.0 ثانية
- **ضعيف**: > 4.0 ثانية

## 🔧 تحسينات الأداء

### تحسين الصور

#### 1. استخدام Next.js Image
```tsx
import Image from 'next/image'

// بدلاً من
<img src="/image.jpg" alt="description" />

// استخدم
<Image
  src="/image.jpg"
  alt="description"
  width={500}
  height={300}
  priority={true}
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

#### 2. تحسين أحجام الصور
```bash
# تحسين الصور تلقائياً
npm run optimize-images

# تحويل إلى WebP
npm run convert-webp

# ضغط الصور
npm run compress-images
```

#### 3. استخدام الصور المتجاوبة
```tsx
<Image
  src="/image.jpg"
  alt="description"
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
  fill
  style={{ objectFit: 'cover' }}
/>
```

### تحسين الخطوط

#### 1. تحميل الخطوط المحلية
```css
/* في globals.css */
@font-face {
  font-family: 'CustomFont';
  src: url('/fonts/CustomFont.woff2') format('woff2');
  font-display: swap;
}
```

#### 2. استخدام font-display
```css
body {
  font-family: 'CustomFont', sans-serif;
  font-display: swap;
}
```

#### 3. تحميل الخطوط المطلوبة فقط
```tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})
```

### تحسين JavaScript

#### 1. تقسيم الكود (Code Splitting)
```tsx
// تحميل مكونات بشكل كسول
const LazyComponent = dynamic(() => import('./LazyComponent'), {
  loading: () => <LoadingSpinner />,
  ssr: false
})
```

#### 2. تحسين المكتبات
```bash
# تحليل الحزمة
npm run analyze

# إزالة التبعيات غير المستخدمة
npm run remove-unused

# تحسين الحزمة
npm run optimize-bundle
```

#### 3. استخدام React.memo
```tsx
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* مكون مكلف */}</div>
})
```

### تحسين CSS

#### 1. تحسين Tailwind CSS
```js
// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
  },
}
```

#### 2. إزالة CSS غير المستخدم
```bash
# فحص CSS غير المستخدم
npm run purge-css

# تحسين CSS
npm run optimize-css
```

#### 3. استخدام CSS-in-JS بكفاءة
```tsx
// استخدام styled-components بكفاءة
const StyledComponent = styled.div`
  color: ${props => props.theme.colors.primary};
`
```

### تحسين الخادم

#### 1. تحسين Next.js
```js
// next.config.js
module.exports = {
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['framer-motion'],
  },
}
```

#### 2. تحسين التخزين المؤقت
```tsx
// إعداد التخزين المؤقت
export async function generateStaticParams() {
  return [
    { slug: 'page-1' },
    { slug: 'page-2' },
  ]
}

export const revalidate = 3600 // ساعة واحدة
```

#### 3. تحسين API Routes
```tsx
// api/example.ts
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // إعداد headers للتخزين المؤقت
  res.setHeader('Cache-Control', 's-maxage=3600, stale-while-revalidate')
  
  // إرجاع البيانات
  res.json({ data: 'example' })
}
```

## 📊 مراقبة الأداء

### أدوات المراقبة

#### 1. Lighthouse
```bash
# تشغيل Lighthouse
npm run lighthouse

# تشغيل في وضع CI
npm run lighthouse:ci
```

#### 2. WebPageTest
```bash
# اختبار الأداء
npm run webpagetest

# مقارنة النتائج
npm run compare-performance
```

#### 3. Core Web Vitals
```bash
# مراقبة Core Web Vitals
npm run monitor-cwv

# تقرير الأداء
npm run performance-report
```

### مراقبة في الوقت الفعلي

#### 1. Google Analytics
```tsx
// إعداد Core Web Vitals
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

function sendToAnalytics(metric) {
  gtag('event', metric.name, {
    value: Math.round(metric.value),
    event_category: 'Web Vitals',
  })
}

getCLS(sendToAnalytics)
getFID(sendToAnalytics)
getFCP(sendToAnalytics)
getLCP(sendToAnalytics)
getTTFB(sendToAnalytics)
```

#### 2. Sentry Performance
```tsx
// إعداد Sentry
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 1.0,
  integrations: [new Sentry.BrowserTracing()],
})
```

## 🎯 تحسينات محددة

### تحسين الصفحة الرئيسية

#### 1. تحميل أولي سريع
```tsx
// تحميل المكونات المهمة أولاً
const Hero = dynamic(() => import('./Hero'), {
  ssr: true,
  priority: true,
})

const Projects = dynamic(() => import('./Projects'), {
  ssr: false,
  loading: () => <ProjectsSkeleton />,
})
```

#### 2. تحسين الرسوم المتحركة
```tsx
// استخدام Framer Motion بكفاءة
const MotionComponent = motion.div

// تحسين الرسوم المتحركة
<MotionComponent
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ duration: 0.3 }}
  layout
/>
```

### تحسين صفحات المشاريع

#### 1. تحميل الصور بشكل كسول
```tsx
// تحميل الصور عند الحاجة
const ProjectImage = ({ src, alt }) => (
  <Image
    src={src}
    alt={alt}
    loading="lazy"
    placeholder="blur"
    blurDataURL="data:image/jpeg;base64,..."
  />
)
```

#### 2. تحسين البيانات
```tsx
// تحميل البيانات بشكل كسول
const ProjectData = dynamic(() => import('./ProjectData'), {
  ssr: false,
  loading: () => <DataSkeleton />,
})
```

### تحسين نموذج الاتصال

#### 1. تحسين التحقق
```tsx
// تحسين التحقق من صحة البيانات
const validateForm = (data) => {
  const errors = {}
  
  if (!data.email) errors.email = 'البريد الإلكتروني مطلوب'
  if (!data.message) errors.message = 'الرسالة مطلوبة'
  
  return errors
}
```

#### 2. تحسين الإرسال
```tsx
// تحسين إرسال النموذج
const handleSubmit = async (data) => {
  try {
    const response = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    
    if (response.ok) {
      // نجح الإرسال
    }
  } catch (error) {
    // معالجة الخطأ
  }
}
```

## 🔍 تحليل الأداء

### تحليل الحزمة

```bash
# تحليل حجم الحزمة
npm run analyze

# فحص التبعيات
npm run bundle-analyzer

# تحسين الحزمة
npm run optimize-bundle
```

### تحليل الشبكة

```bash
# فحص طلبات الشبكة
npm run network-analyzer

# تحليل الأداء
npm run performance-analyzer

# تقرير مفصل
npm run detailed-report
```

### تحليل الذاكرة

```bash
# فحص استخدام الذاكرة
npm run memory-analyzer

# تحليل تسريب الذاكرة
npm run memory-leak-detector

# تحسين الذاكرة
npm run optimize-memory
```

## 📈 أهداف التحسين

### أهداف قصيرة المدى (شهر واحد)

- [ ] تحسين Core Web Vitals
- [ ] تقليل حجم الحزمة بنسبة 20%
- [ ] تحسين تحميل الصور
- [ ] تحسين الخطوط

### أهداف متوسطة المدى (3 أشهر)

- [ ] تحسين الأداء على الأجهزة المحمولة
- [ ] تحسين التخزين المؤقت
- [ ] تحسين API Routes
- [ ] إضافة مراقبة الأداء

### أهداف طويلة المدى (6 أشهر)

- [ ] تطبيق PWA
- [ ] تحسين SEO
- [ ] تحسين إمكانية الوصول
- [ ] تحسين الأمان

## 🛠️ أدوات مفيدة

### أدوات التحليل
- **Lighthouse**: تحليل شامل للأداء
- **WebPageTest**: اختبار الأداء المتقدم
- **GTmetrix**: تحليل سريع للأداء
- **PageSpeed Insights**: تحليل من Google

### أدوات المراقبة
- **Google Analytics**: مراقبة المستخدمين
- **Sentry**: مراقبة الأخطاء والأداء
- **New Relic**: مراقبة شاملة
- **Datadog**: مراقبة البنية التحتية

### أدوات التحسين
- **Webpack Bundle Analyzer**: تحليل الحزمة
- **PurgeCSS**: إزالة CSS غير المستخدم
- **ImageOptim**: تحسين الصور
- **TinyPNG**: ضغط الصور

## 📋 قائمة فحص الأداء

### قبل النشر
- [ ] فحص Core Web Vitals
- [ ] تحليل الحزمة
- [ ] تحسين الصور
- [ ] فحص الأداء على الأجهزة المحمولة
- [ ] اختبار سرعة التحميل

### بعد النشر
- [ ] مراقبة الأداء في الوقت الفعلي
- [ ] فحص Core Web Vitals
- [ ] مراقبة الأخطاء
- [ ] تحليل سلوك المستخدمين
- [ ] تحسين بناءً على البيانات

---

**ملاحظة**: الأداء هو عملية مستمرة. راقب الأداء بانتظام وقم بالتحسينات بناءً على البيانات.
