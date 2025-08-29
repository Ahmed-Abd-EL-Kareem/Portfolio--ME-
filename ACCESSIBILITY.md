# دليل إمكانية الوصول

هذا الدليل يوضح كيفية جعل الموقع متاحاً لجميع المستخدمين، بمن فيهم ذوي الاحتياجات الخاصة.

## 🎯 مبادئ إمكانية الوصول

### المبادئ الأربعة الأساسية

#### 1. قابل للإدراك (Perceivable)
- المعلومات والواجهة يجب أن تكون قابلة للإدراك من قبل المستخدمين
- لا يمكن أن تكون مخفية عن جميع حواسهم

#### 2. قابل للتشغيل (Operable)
- واجهة المستخدم والمكونات يجب أن تكون قابلة للتشغيل
- لا يمكن أن تتطلب تفاعلاً لا يستطيع المستخدم تنفيذه

#### 3. قابل للفهم (Understandable)
- المعلومات وتشغيل واجهة المستخدم يجب أن تكون قابلة للفهم
- المحتوى أو التشغيل لا يمكن أن يكون معقداً جداً للمستخدم

#### 4. قوي (Robust)
- المحتوى يجب أن يكون قوياً بما يكفي ليتم تفسيره بواسطة مجموعة واسعة من برامج المستخدم
- بما في ذلك التقنيات المساعدة

## 🔧 تنفيذ إمكانية الوصول

### إعدادات HTML الأساسية

#### 1. هيكل الصفحة
```html
<!DOCTYPE html>
<html lang="ar" dir="rtl">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>عنوان الصفحة</title>
</head>
<body>
  <header role="banner">
    <nav role="navigation" aria-label="القائمة الرئيسية">
      <!-- محتوى القائمة -->
    </nav>
  </header>
  
  <main role="main">
    <h1>العنوان الرئيسي</h1>
    <!-- المحتوى الرئيسي -->
  </main>
  
  <footer role="contentinfo">
    <!-- معلومات التذييل -->
  </footer>
</body>
</html>
```

#### 2. العناوين والهيكل
```tsx
// استخدام العناوين بشكل صحيح
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

### إمكانية الوصول للصور

#### 1. النص البديل
```tsx
// إضافة نص بديل للصور
<Image
  src="/image.jpg"
  alt="وصف مفصل للصورة"
  width={500}
  height={300}
/>

// للصور التزيينية
<Image
  src="/decorative.jpg"
  alt=""
  role="presentation"
  aria-hidden="true"
/>
```

#### 2. الصور المعقدة
```tsx
// للرسوم البيانية المعقدة
<figure>
  <Image
    src="/chart.jpg"
    alt="رسم بياني يوضح إحصائيات المبيعات"
    width={800}
    height={400}
  />
  <figcaption>
    رسم بياني يوضح إحصائيات المبيعات لعام 2024
  </figcaption>
</figure>
```

### إمكانية الوصول للنماذج

#### 1. تسميات الحقول
```tsx
// ربط التسميات بالحقول
const ContactForm = () => (
  <form>
    <div>
      <label htmlFor="name">الاسم:</label>
      <input
        type="text"
        id="name"
        name="name"
        required
        aria-describedby="name-help"
      />
      <div id="name-help">أدخل اسمك الكامل</div>
    </div>
    
    <div>
      <label htmlFor="email">البريد الإلكتروني:</label>
      <input
        type="email"
        id="email"
        name="email"
        required
        aria-describedby="email-error"
        aria-invalid="false"
      />
      <div id="email-error" role="alert"></div>
    </div>
  </form>
)
```

#### 2. رسائل الخطأ
```tsx
// عرض رسائل الخطأ بشكل صحيح
const FormField = ({ error, ...props }) => (
  <div>
    <input
      {...props}
      aria-describedby={`${props.id}-error`}
      aria-invalid={!!error}
    />
    {error && (
      <div
        id={`${props.id}-error`}
        role="alert"
        className="error-message"
      >
        {error}
      </div>
    )}
  </div>
)
```

### إمكانية الوصول للروابط

#### 1. نص الروابط
```tsx
// استخدام نص وصفي للروابط
// بدلاً من
<a href="/project">انقر هنا</a>

// استخدم
<a href="/project">عرض مشروع تطوير الويب</a>
```

#### 2. الروابط الخارجية
```tsx
// إشارة للروابط الخارجية
const ExternalLink = ({ href, children }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={`${children} (يفتح في نافذة جديدة)`}
  >
    {children}
    <span aria-hidden="true">↗</span>
  </a>
)
```

### إمكانية الوصول للقوائم

#### 1. قوائم التنقل
```tsx
// قائمة تنقل واضحة
const Navigation = () => (
  <nav aria-label="القائمة الرئيسية">
    <ul>
      <li><a href="/">الرئيسية</a></li>
      <li><a href="/about">حولي</a></li>
      <li><a href="/projects">المشاريع</a></li>
      <li><a href="/contact">اتصل بي</a></li>
    </ul>
  </nav>
)
```

#### 2. القوائم المنسدلة
```tsx
// قوائم منسدلة متاحة
const DropdownMenu = () => {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <div>
      <button
        aria-expanded={isOpen}
        aria-haspopup="true"
        onClick={() => setIsOpen(!isOpen)}
      >
        القائمة المنسدلة
      </button>
      {isOpen && (
        <ul role="menu">
          <li role="menuitem">
            <a href="/option1">الخيار الأول</a>
          </li>
          <li role="menuitem">
            <a href="/option2">الخيار الثاني</a>
          </li>
        </ul>
      )}
    </div>
  )
}
```

### إمكانية الوصول للجداول

#### 1. الجداول البسيطة
```tsx
// جدول مع headers واضحة
const SimpleTable = () => (
  <table>
    <caption>قائمة المشاريع</caption>
    <thead>
      <tr>
        <th scope="col">اسم المشروع</th>
        <th scope="col">التقنيات المستخدمة</th>
        <th scope="col">الحالة</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">موقع شخصي</th>
        <td>React, Next.js</td>
        <td>مكتمل</td>
      </tr>
    </tbody>
  </table>
)
```

#### 2. الجداول المعقدة
```tsx
// جدول مع headers متعددة
const ComplexTable = () => (
  <table>
    <caption>إحصائيات المشاريع</caption>
    <thead>
      <tr>
        <th scope="col" rowSpan={2}>المشروع</th>
        <th scope="colgroup" colSpan={2}>التقنيات</th>
        <th scope="col" rowSpan={2}>الحالة</th>
      </tr>
      <tr>
        <th scope="col">Frontend</th>
        <th scope="col">Backend</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">موقع شخصي</th>
        <td>React</td>
        <td>Node.js</td>
        <td>مكتمل</td>
      </tr>
    </tbody>
  </table>
)
```

### إمكانية الوصول للوسائط

#### 1. الفيديو
```tsx
// فيديو مع ترجمة
const VideoPlayer = () => (
  <video controls>
    <source src="/video.mp4" type="video/mp4" />
    <track
      kind="subtitles"
      src="/subtitles-ar.vtt"
      srcLang="ar"
      label="العربية"
    />
    <track
      kind="subtitles"
      src="/subtitles-en.vtt"
      srcLang="en"
      label="English"
    />
    <p>
      متصفحك لا يدعم تشغيل الفيديو.
      <a href="/video.mp4">تحميل الفيديو</a>
    </p>
  </video>
)
```

#### 2. الصوت
```tsx
// ملف صوتي مع نص بديل
const AudioPlayer = () => (
  <div>
    <audio controls>
      <source src="/audio.mp3" type="audio/mpeg" />
      متصفحك لا يدعم تشغيل الصوت.
    </audio>
    <div>
      <h3>نص المحتوى الصوتي:</h3>
      <p>هذا هو النص الكامل للمحتوى الصوتي...</p>
    </div>
  </div>
)
```

## 🎨 إمكانية الوصول للتصميم

### الألوان والتباين

#### 1. نسب التباين
```css
/* تباين عالي للنص المهم */
.important-text {
  color: #000000;
  background-color: #ffffff;
  /* نسبة تباين 21:1 */
}

/* تباين متوسط للنص العادي */
.normal-text {
  color: #333333;
  background-color: #ffffff;
  /* نسبة تباين 12:1 */
}
```

#### 2. عدم الاعتماد على اللون فقط
```tsx
// استخدام رموز إضافية مع الألوان
const StatusIndicator = ({ status }) => (
  <span>
    <span
      className={`status-dot ${status}`}
      aria-hidden="true"
    />
    <span className="sr-only">
      الحالة: {status === 'success' ? 'نجح' : 'فشل'}
    </span>
  </span>
)
```

### إمكانية الوصول للتفاعل

#### 1. التركيز المرئي
```css
/* مؤشر تركيز واضح */
:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}

/* إخفاء المؤشر عند النقر */
:focus:not(:focus-visible) {
  outline: none;
}
```

#### 2. أحجام الأهداف
```css
/* أهداف كبيرة بما يكفي */
.button, .link {
  min-height: 44px;
  min-width: 44px;
  padding: 12px 16px;
}
```

## 🔍 اختبار إمكانية الوصول

### أدوات الاختبار

#### 1. أدوات التطوير
```bash
# فحص إمكانية الوصول
npm run test:a11y

# فحص التباين
npm run test:contrast

# فحص التنقل بالكيبورد
npm run test:keyboard
```

#### 2. أدوات المتصفح
- **Chrome DevTools**: فحص إمكانية الوصول
- **Firefox Accessibility Inspector**: فحص العناصر
- **Safari Web Inspector**: فحص الأدوار

#### 3. أدوات خارجية
- **axe DevTools**: فحص شامل
- **WAVE**: تقرير مفصل
- **Lighthouse**: تقرير إمكانية الوصول

### اختبار التنقل بالكيبورد

#### 1. ترتيب التبويب
```tsx
// ترتيب منطقي للتبويب
const Form = () => (
  <form>
    <input tabIndex={1} />
    <input tabIndex={2} />
    <button tabIndex={3}>إرسال</button>
  </form>
)
```

#### 2. التنقل المخصص
```tsx
// تنقل مخصص للقوائم
const CustomNavigation = () => {
  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        // الانتقال للعنصر التالي
        break
      case 'ArrowUp':
        // الانتقال للعنصر السابق
        break
      case 'Enter':
      case ' ':
        // تفعيل العنصر
        break
    }
  }
  
  return (
    <div onKeyDown={handleKeyDown}>
      {/* عناصر القائمة */}
    </div>
  )
}
```

## 📱 إمكانية الوصول للأجهزة المحمولة

### التصميم المتجاوب

#### 1. أحجام الخطوط
```css
/* خطوط قابلة للتكبير */
body {
  font-size: 16px;
  line-height: 1.5;
}

/* دعم تكبير النص */
@media (max-width: 768px) {
  body {
    font-size: 18px;
  }
}
```

#### 2. المسافات والهوامش
```css
/* مسافات كافية بين العناصر */
.button {
  margin: 8px;
  padding: 12px 16px;
}

/* هوامش كافية لللمس */
.touch-target {
  min-height: 48px;
  min-width: 48px;
}
```

## 🎯 أهداف إمكانية الوصول

### أهداف قصيرة المدى

- [ ] تطبيق WCAG 2.1 AA
- [ ] اختبار التنقل بالكيبورد
- [ ] تحسين نسب التباين
- [ ] إضافة النصوص البديلة

### أهداف متوسطة المدى

- [ ] اختبار مع قارئات الشاشة
- [ ] تحسين تجربة المستخدم
- [ ] إضافة دعم RTL محسن
- [ ] تحسين الأداء

### أهداف طويلة المدى

- [ ] تطبيق WCAG 2.1 AAA
- [ ] اختبار مع مستخدمين حقيقيين
- [ ] تحسين مستمر
- [ ] توثيق شامل

## 📋 قائمة فحص إمكانية الوصول

### فحص أساسي
- [ ] جميع الصور لها نص بديل
- [ ] جميع الروابط لها نص وصفي
- [ ] جميع النماذج لها تسميات
- [ ] نسب التباين مناسبة
- [ ] التنقل بالكيبورد يعمل

### فحص متقدم
- [ ] اختبار مع قارئ الشاشة
- [ ] اختبار مع مستخدمين حقيقيين
- [ ] فحص الأداء
- [ ] فحص التوافق
- [ ] فحص الأمان

---

**ملاحظة**: إمكانية الوصول هي حق أساسي لجميع المستخدمين. تأكد من اختبار موقعك بانتظام مع أدوات مختلفة ومستخدمين حقيقيين.
