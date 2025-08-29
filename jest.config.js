const nextJest = require('next/jest')

const createJestConfig = nextJest({
  // مسار إلى تطبيق Next.js لتحميل next.config.js وملفات .env
  dir: './',
})

// تكوين Jest مخصص
const customJestConfig = {
  // إعدادات الاختبار
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  
  // بيئة الاختبار
  testEnvironment: 'jsdom',
  
  // مسارات الاختبار
  testMatch: [
    '<rootDir>/__tests__/**/*.{js,jsx,ts,tsx}',
    '<rootDir>/src/**/*.{test,spec}.{js,jsx,ts,tsx}',
    '<rootDir>/components/**/*.{test,spec}.{js,jsx,ts,tsx}',
  ],
  
  // استثناءات
  testPathIgnorePatterns: [
    '<rootDir>/.next/',
    '<rootDir>/node_modules/',
    '<rootDir>/out/',
    '<rootDir>/dist/',
  ],
  
  // تحويلات
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': ['babel-jest', { presets: ['next/babel'] }],
  },
  
  // تحويلات إضافية
  transformIgnorePatterns: [
    '/node_modules/',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  
  // محاكيات
  moduleNameMapping: {
    // معالجة استيراد CSS
    '^.+\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    
    // معالجة استيراد الصور
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    
    // معالجة استيراد الملفات
    '^.+\\.(pdf|doc|docx|xls|xlsx|ppt|pptx)$':
      '<rootDir>/__mocks__/fileMock.js',
  },
  
  // إعدادات التغطية
  collectCoverageFrom: [
    'app/**/*.{js,jsx,ts,tsx}',
    'components/**/*.{js,jsx,ts,tsx}',
    'lib/**/*.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/.next/**',
    '!**/out/**',
    '!**/dist/**',
  ],
  
  // إعدادات التغطية
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  
  // إعدادات التقارير
  coverageReporters: ['text', 'lcov', 'html'],
  
  // إعدادات الأداء
  maxWorkers: '50%',
  
  // إعدادات الوقت
  testTimeout: 10000,
  
  // إعدادات إضافية
  verbose: true,
  clearMocks: true,
  restoreMocks: true,
  
  // إعدادات للاختبارات المتوازية
  maxConcurrency: 1,
  
  // إعدادات للاختبارات التفاعلية
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}

// تصدير التكوين
module.exports = createJestConfig(customJestConfig)
