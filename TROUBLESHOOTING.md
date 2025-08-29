# دليل استكشاف الأخطاء وإصلاحها

هذا الدليل يساعدك في حل المشاكل الشائعة التي قد تواجهها أثناء تطوير أو تشغيل المشروع.

## 🚨 مشاكل شائعة

### مشاكل التثبيت

#### 1. خطأ في تثبيت التبعيات

**المشكلة**: `npm install` يفشل مع أخطاء

**الحلول**:
```bash
# حذف node_modules و package-lock.json
rm -rf node_modules package-lock.json

# تنظيف ذاكرة التخزين المؤقت
npm cache clean --force

# إعادة تثبيت التبعيات
npm install

# أو استخدام yarn
yarn install
```

#### 2. مشاكل إصدار Node.js

**المشكلة**: خطأ "Node.js version not supported"

**الحلول**:
```bash
# التحقق من إصدار Node.js
node --version

# تثبيت إصدار متوافق (18+)
nvm install 18
nvm use 18

# أو استخدام n
n 18
```

#### 3. مشاكل TypeScript

**المشكلة**: أخطاء TypeScript compilation

**الحلول**:
```bash
# إعادة بناء TypeScript
npm run build

# فحص الأخطاء
npx tsc --noEmit

# تحديث TypeScript
npm update typescript
```

### مشاكل التشغيل

#### 1. خطأ "Port already in use"

**المشكلة**: المنفذ 3000 مشغول

**الحلول**:
```bash
# العثور على العملية التي تستخدم المنفذ
lsof -i :3000

# إنهاء العملية
kill -9 <PID>

# أو استخدام منفذ مختلف
npm run dev -- -p 3001
```

#### 2. خطأ "Module not found"

**المشكلة**: لا يمكن العثور على وحدة

**الحلول**:
```bash
# إعادة تثبيت التبعيات
npm install

# فحص package.json
cat package.json

# حذف .next وإعادة البناء
rm -rf .next
npm run build
```

#### 3. مشاكل الذاكرة

**المشكلة**: خطأ "JavaScript heap out of memory"

**الحلول**:
```bash
# زيادة حد الذاكرة
export NODE_OPTIONS="--max-old-space-size=4096"

# أو في package.json
"scripts": {
  "dev": "NODE_OPTIONS='--max-old-space-size=4096' next dev"
}
```

### مشاكل البناء

#### 1. خطأ في البناء

**المشكلة**: `npm run build` يفشل

**الحلول**:
```bash
# تنظيف البناء
rm -rf .next

# إعادة البناء
npm run build

# فحص الأخطاء بالتفصيل
npm run build --verbose
```

#### 2. مشاكل التصدير

**المشكلة**: خطأ في `npm run export`

**الحلول**:
```bash
# التأكد من next.config.js
cat next.config.js

# إعادة البناء أولاً
npm run build

# ثم التصدير
npm run export
```

### مشاكل الأداء

#### 1. بطء التحميل

**المشكلة**: الموقع بطيء في التحميل

**الحلول**:
```bash
# تحليل الحزمة
npm run analyze

# تحسين الصور
npm run optimize-images

# فحص Core Web Vitals
npm run lighthouse
```

#### 2. مشاكل الذاكرة

**المشكلة**: استهلاك ذاكرة عالي

**الحلول**:
```bash
# مراقبة الذاكرة
node --inspect npm run dev

# تحسين الكود
npm run lint
npm run type-check
```

### مشاكل التصميم

#### 1. مشاكل CSS

**المشكلة**: التصميم لا يظهر بشكل صحيح

**الحلول**:
```bash
# إعادة بناء CSS
npm run build:css

# فحص Tailwind
npx tailwindcss --help

# تنظيف ذاكرة التخزين المؤقت
npm run clean
```

#### 2. مشاكل الرسوم المتحركة

**المشكلة**: الرسوم المتحركة لا تعمل

**الحلول**:
```bash
# فحص Framer Motion
npm list framer-motion

# إعادة تثبيت
npm install framer-motion

# فحص التكوين
cat framer.config.js
```

### مشاكل SEO

#### 1. مشاكل البيانات الوصفية

**المشكلة**: البيانات الوصفية لا تظهر

**الحلول**:
```bash
# فحص metadata
npm run check-seo

# تحديث sitemap
npm run generate-sitemap

# فحص robots.txt
cat public/robots.txt
```

#### 2. مشاكل الروابط

**المشكلة**: الروابط لا تعمل

**الحلول**:
```bash
# فحص الروابط
npm run check-links

# إعادة بناء الروابط
npm run build

# فحص next.config.js
cat next.config.js
```

### مشاكل النشر

#### 1. مشاكل Vercel

**المشكلة**: النشر على Vercel يفشل

**الحلول**:
```bash
# فحص التكوين
cat vercel.json

# إعادة النشر
vercel --prod

# فحص السجلات
vercel logs
```

#### 2. مشاكل Netlify

**المشكلة**: النشر على Netlify يفشل

**الحلول**:
```bash
# فحص netlify.toml
cat netlify.toml

# إعادة البناء محلياً
npm run build

# فحص مجلد البناء
ls -la .next
```

### مشاكل الاختبار

#### 1. فشل الاختبارات

**المشكلة**: الاختبارات تفشل

**الحلول**:
```bash
# تشغيل الاختبارات مع تفاصيل
npm test -- --verbose

# تشغيل اختبار واحد
npm test -- --testNamePattern="test name"

# فحص التكوين
cat jest.config.js
```

#### 2. مشاكل Coverage

**المشكلة**: تغطية الاختبارات منخفضة

**الحلول**:
```bash
# تشغيل coverage
npm run test:coverage

# فحص التقرير
open coverage/lcov-report/index.html

# إضافة اختبارات
npm run test:watch
```

## 🔧 أدوات التشخيص

### أدوات مفيدة

```bash
# فحص النظام
node --version
npm --version
git --version

# فحص التبعيات
npm outdated
npm audit

# فحص الأداء
npm run lighthouse
npm run analyze

# فحص الأخطاء
npm run lint
npm run type-check
```

### أوامر مفيدة

```bash
# تنظيف شامل
npm run clean

# إعادة تشغيل كامل
npm run reset

# فحص الصحة
npm run health-check

# تحديث التبعيات
npm update
```

## 📞 الحصول على المساعدة

### إذا لم تحل المشكلة

1. **ابحث في الوثائق**
   - [README.md](README.md)
   - [CONTRIBUTING.md](CONTRIBUTING.md)
   - [SUPPORT.md](SUPPORT.md)

2. **ابحث في Issues**
   - [GitHub Issues](https://github.com/your-username/portfolio-me/issues)
   - استخدم البحث للعثور على مشاكل مشابهة

3. **أنشئ Issue جديد**
   - وصف مفصل للمشكلة
   - خطوات إعادة الإنتاج
   - معلومات النظام
   - لقطات شاشة

4. **اطلب المساعدة**
   - [GitHub Discussions](https://github.com/your-username/portfolio-me/discussions)
   - [Discord Server](https://discord.gg/your-server)
   - [Email Support](mailto:support@your-domain.com)

## 📋 قائمة فحص استكشاف الأخطاء

### قبل إنشاء Issue

- [ ] بحثت في الوثائق
- [ ] بحثت في Issues الموجودة
- [ ] جربت الحلول المقترحة
- [ ] جمعت معلومات النظام
- [ ] أعدت إنتاج المشكلة
- [ ] التقطت لقطات شاشة

### معلومات مطلوبة

- **نظام التشغيل**: Windows/Mac/Linux
- **إصدار Node.js**: `node --version`
- **إصدار npm**: `npm --version`
- **المتصفح**: Chrome/Firefox/Safari
- **رسالة الخطأ**: النص الكامل
- **خطوات إعادة الإنتاج**: خطوات مفصلة

## 🎯 نصائح عامة

### أفضل الممارسات

1. **احتفظ بنسخة احتياطية**
   ```bash
   git commit -m "backup before changes"
   ```

2. **استخدم بيئة افتراضية**
   ```bash
   nvm use 18
   ```

3. **راقب الأداء**
   ```bash
   npm run monitor
   ```

4. **اختبر بانتظام**
   ```bash
   npm run test
   npm run build
   ```

5. **حدث التبعيات**
   ```bash
   npm update
   npm audit fix
   ```

### تجنب المشاكل

1. **لا تحذف node_modules يدوياً**
2. **لا تعدل package-lock.json يدوياً**
3. **لا تنسخ .env.local**
4. **لا تهمل رسائل الخطأ**
5. **لا تتجاهل الاختبارات**

---

**ملاحظة**: إذا لم تجد حلاً لمشكلتك هنا، يرجى إنشاء issue جديد مع معلومات مفصلة.
