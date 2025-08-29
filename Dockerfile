# استخدام صورة Node.js رسمية كصورة أساسية
FROM node:18-alpine AS base

# تثبيت التبعيات فقط عند الحاجة
FROM base AS deps
# فحص https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine لفهم سبب استخدام libc6-compat
RUN apk add --no-cache libc6-compat
WORKDIR /app

# نسخ ملفات التبعيات
COPY package.json package-lock.json* ./
RUN npm ci --only=production

# إعادة بناء الكود المصدري عند الحاجة
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# إنشاء متغير بيئي للبناء
ENV NEXT_TELEMETRY_DISABLED 1

# بناء التطبيق
RUN npm run build

# مرحلة الإنتاج، نسخ جميع الملفات وتشغيل التطبيق
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
ENV NEXT_TELEMETRY_DISABLED 1

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# نسخ الملفات المبنية
COPY --from=builder /app/public ./public

# تعيين الأذونات الصحيحة للمجلدات
RUN mkdir .next
RUN chown nextjs:nodejs .next

# نسخ الملفات المبنية
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

# تشغيل التطبيق
CMD ["node", "server.js"]
