'use client';

import Link from 'next/link';
import { ProfessionalButton } from '@/components/ui/ProfessionalButton';
import { Home, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50/30 to-purple-50/50 dark:from-slate-900 dark:via-indigo-950/30 dark:to-violet-900/20">
      <div className="text-center space-y-8 p-8">
        <div className="space-y-4">
          <h1 className="text-8xl font-bold text-blue-500">404</h1>
          <h2 className="text-3xl font-semibold text-gray-800 dark:text-gray-200">
            الصفحة غير موجودة
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-md">
            عذراً، الصفحة التي تبحث عنها غير موجودة أو تم نقلها إلى مكان آخر.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/">
            <ProfessionalButton
              variant="primary"
              icon={Home}
            >
              العودة للرئيسية
            </ProfessionalButton>
          </Link>
          
          <ProfessionalButton
            variant="outline"
            icon={ArrowLeft}
            onClick={() => window.history.back()}
          >
            العودة للخلف
          </ProfessionalButton>
        </div>
        
        <div className="mt-8">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            يمكنك أيضاً زيارة:
          </p>
          <div className="flex flex-wrap justify-center gap-4 mt-4">
            {[
              { href: '/#about', label: 'نبذة عني' },
              { href: '/#projects', label: 'المشاريع' },
              { href: '/#skills', label: 'المهارات' },
              { href: '/#contact', label: 'التواصل' },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
