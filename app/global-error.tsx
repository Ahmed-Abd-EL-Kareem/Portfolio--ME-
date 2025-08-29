'use client';

import { useEffect } from 'react';
import { ProfessionalButton } from '@/components/ui/ProfessionalButton';
import { RefreshCw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-50 via-red-100/30 to-red-200/50 dark:from-red-900 dark:via-red-800/30 dark:to-red-700/20">
          <div className="text-center space-y-8 p-8">
            <div className="space-y-4">
              <h1 className="text-6xl font-bold text-red-600">خطأ عام</h1>
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                حدث خطأ غير متوقع في التطبيق
              </h2>
              <p className="text-gray-600 dark:text-gray-400 max-w-md">
                عذراً، حدث خطأ غير متوقع في التطبيق. يرجى المحاولة مرة أخرى أو إعادة تحميل الصفحة.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <ProfessionalButton
                variant="primary"
                icon={RefreshCw}
                onClick={reset}
              >
                المحاولة مرة أخرى
              </ProfessionalButton>
              
              <ProfessionalButton
                variant="outline"
                icon={Home}
                onClick={() => window.location.href = '/'}
              >
                العودة للرئيسية
              </ProfessionalButton>
            </div>
            
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-8 text-left max-w-md mx-auto">
                <summary className="cursor-pointer text-sm text-gray-500 dark:text-gray-400">
                  تفاصيل الخطأ (التطوير فقط)
                </summary>
                <pre className="mt-2 text-xs text-red-500 bg-red-50 dark:bg-red-900/20 p-4 rounded-lg overflow-auto">
                  {error.message}
                </pre>
              </details>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
