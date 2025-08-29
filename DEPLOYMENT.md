# دليل النشر

## النشر على Vercel (موصى به)

### 1. إعداد المشروع
```bash
# تثبيت Vercel CLI
npm i -g vercel

# تسجيل الدخول
vercel login
```

### 2. النشر
```bash
# النشر للمرة الأولى
vercel

# النشر للإنتاج
vercel --prod
```

### 3. إعداد المتغيرات البيئية
أضف هذه المتغيرات في إعدادات Vercel:
- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SITE_NAME`
- `NEXT_PUBLIC_GA_ID` (اختياري)
- `NEXT_PUBLIC_CONTACT_EMAIL` (اختياري)

## النشر على Netlify

### 1. رفع المشروع
```bash
# بناء المشروع
npm run build

# رفع مجلد .next
```

### 2. إعدادات البناء
- Build command: `npm run build`
- Publish directory: `.next`
- Node version: 18

## النشر باستخدام Docker

### 1. بناء الصورة
```bash
docker build -t portfolio-website .
```

### 2. تشغيل الحاوية
```bash
docker run -p 3000:3000 portfolio-website
```

### 3. استخدام Docker Compose
```bash
# تشغيل الخدمات
docker-compose up -d

# إيقاف الخدمات
docker-compose down
```

## النشر الذاتي

### 1. تثبيت PM2
```bash
npm install -g pm2
```

### 2. بناء وتشغيل التطبيق
```bash
# بناء التطبيق
npm run build

# تشغيل مع PM2
pm2 start npm --name "portfolio" -- start

# حفظ الإعدادات
pm2 save

# إعداد التشغيل التلقائي
pm2 startup
```

### 3. إعداد Nginx
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

## مراقبة الأداء

### 1. Google Analytics
أضف معرف GA في المتغيرات البيئية:
```
NEXT_PUBLIC_GA_ID=your-ga-id
```

### 2. مراقبة الأخطاء
أضف Sentry DSN:
```
NEXT_PUBLIC_SENTRY_DSN=your-sentry-dsn
```

## استكشاف الأخطاء

### مشاكل شائعة:
1. **فشل البناء**: تأكد من تثبيت جميع التبعيات
2. **مشاكل المتغيرات البيئية**: تحقق من صحة الأسماء
3. **مشاكل الأداء**: استخدم `npm run analyze` لتحليل الحزمة

### أوامر مفيدة:
```bash
# تنظيف الكاش
rm -rf .next
rm -rf node_modules
npm install

# تحليل الحزمة
npm run analyze

# فحص الأخطاء
npm run lint
```

## الدعم

للمساعدة الإضافية:
- تحقق من ملف README.md
- راجع وثائق Next.js
- اطرح سؤالاً في GitHub Issues
