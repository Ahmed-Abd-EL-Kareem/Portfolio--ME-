# دليل المساهمة

شكراً لاهتمامك بالمساهمة في هذا المشروع! نرحب بجميع المساهمات من المطورين.

## كيفية المساهمة

### 1. الإبلاغ عن الأخطاء

إذا وجدت خطأً، يرجى:
- البحث في Issues الموجودة أولاً
- إنشاء issue جديد مع وصف مفصل للمشكلة
- إرفاق لقطات شاشة إذا كان ذلك مناسباً
- تحديد خطوات إعادة إنتاج المشكلة

### 2. اقتراح ميزات جديدة

لاقتراح ميزة جديدة:
- ابحث في Issues الموجودة أولاً
- أنشئ issue جديد مع وصف مفصل للميزة
- اشرح سبب الحاجة لهذه الميزة
- اقترح كيفية تنفيذها

### 3. إرسال Pull Request

#### خطوات العمل:

1. **Fork المشروع**
   ```bash
   git clone https://github.com/your-username/portfolio-me.git
   cd portfolio-me
   ```

2. **إنشاء فرع جديد**
   ```bash
   git checkout -b feature/your-feature-name
   # أو
   git checkout -b fix/your-bug-fix
   ```

3. **إجراء التغييرات**
   - اكتب الكود
   - أضف الاختبارات إذا لزم الأمر
   - تأكد من أن الكود يتبع معايير المشروع

4. **اختبار التغييرات**
   ```bash
   npm install
   npm run dev
   npm run build
   npm run lint
   npm run test
   ```

5. **Commit التغييرات**
   ```bash
   git add .
   git commit -m "feat: add new feature description"
   ```

6. **Push الفرع**
   ```bash
   git push origin feature/your-feature-name
   ```

7. **إنشاء Pull Request**
   - اذهب إلى GitHub
   - انقر على "New Pull Request"
   - اختر الفرع الخاص بك
   - املأ النموذج بالتفاصيل

## معايير الكود

### 1. تنسيق الكود
- استخدم Prettier للتنسيق التلقائي
- اتبع ESLint rules
- استخدم TypeScript لجميع الملفات الجديدة

### 2. أسماء المتغيرات والدوال
```typescript
// ✅ صحيح
const userName = 'John';
const getUserData = () => {};

// ❌ خطأ
const user_name = 'John';
const get_user_data = () => {};
```

### 3. التعليقات
```typescript
// تعليق مفيد يشرح المنطق المعقد
const calculateTotal = (items: Item[]) => {
  // حساب المجموع مع خصم الضرائب
  return items.reduce((sum, item) => sum + item.price, 0) * 0.9;
};
```

### 4. رسائل Commit
استخدم Conventional Commits:
```
feat: add new contact form
fix: resolve navigation bug
docs: update README
style: format code
refactor: improve performance
test: add unit tests
chore: update dependencies
```

## هيكل المشروع

```
src/
├── app/                 # Next.js App Router
│   ├── components/      # المكونات المشتركة
│   ├── lib/            # المكتبات والوظائف المساعدة
│   ├── styles/         # ملفات CSS
│   └── types/          # تعريفات TypeScript
├── public/             # الملفات الثابتة
└── tests/              # الاختبارات
```

## الاختبارات

### تشغيل الاختبارات
```bash
# تشغيل جميع الاختبارات
npm test

# تشغيل الاختبارات مع التغطية
npm run test:coverage

# تشغيل الاختبارات في وضع المراقبة
npm run test:watch
```

### كتابة الاختبارات
```typescript
import { render, screen } from '@testing-library/react';
import { HomePage } from './HomePage';

describe('HomePage', () => {
  it('should render welcome message', () => {
    render(<HomePage />);
    expect(screen.getByText(/مرحباً/)).toBeInTheDocument();
  });
});
```

## إرشادات Pull Request

### قبل إرسال PR:
- [ ] الكود يتبع معايير المشروع
- [ ] تم اختبار التغييرات محلياً
- [ ] تم تحديث الوثائق إذا لزم الأمر
- [ ] تم إضافة اختبارات للميزات الجديدة
- [ ] رسائل commit واضحة ومفهومة

### وصف PR:
```markdown
## التغييرات
- وصف مختصر للتغييرات

## نوع التغيير
- [ ] إصلاح خطأ
- [ ] ميزة جديدة
- [ ] تحسين الأداء
- [ ] تحديث الوثائق

## الاختبارات
- [ ] تم اختبار التغييرات محلياً
- [ ] تم تشغيل الاختبارات بنجاح

## لقطات شاشة (إذا لزم الأمر)
```

## التواصل

### قنوات التواصل:
- **GitHub Issues**: للأخطاء والميزات
- **GitHub Discussions**: للمناقشات العامة
- **Email**: للاستفسارات الخاصة

### قواعد السلوك:
- كن محترماً ومهذباً
- استخدم لغة واضحة ومفهومة
- ساعد الآخرين عندما تستطيع
- تقبل النقد البناء

## الاعتراف

سيتم إضافة اسمك إلى قائمة المساهمين في:
- ملف CONTRIBUTORS.md
- صفحة GitHub Contributors
- ملف package.json (إذا كان مناسباً)

## الترخيص

بالمساهمة في هذا المشروع، فإنك توافق على أن مساهماتك ستكون مرخصة تحت نفس ترخيص المشروع.

---

شكراً لك على المساهمة! 🎉
