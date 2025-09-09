'use client'

import { useEffect } from 'react'

// Declare gtag function for Google Analytics
declare global {
  function gtag(...args: any[]): void
}

export function PerformanceMonitor() {
  useEffect(() => {
    // Only run in production and in browser
    if (
      typeof window === 'undefined' ||
      process.env.NODE_ENV !== 'production'
    ) {
      return
    }

    // Web Vitals monitoring with error handling
    const reportWebVitals = (metric: any) => {
      // Send to analytics service (replace with your preferred service)
      console.log('Web Vital:', metric)

      // Example: Send to Google Analytics
      if (
        typeof window !== 'undefined' &&
        typeof (window as any).gtag === 'function'
      ) {
        ;(window as any).gtag('event', metric.name, {
          event_category: 'Web Vitals',
          event_label: metric.id,
          value: Math.round(metric.value),
          non_interaction: true,
        })
      }
    }

    // Load web-vitals library dynamically with error handling
    import('web-vitals')
      .then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(reportWebVitals)
        getFID(reportWebVitals)
        getFCP(reportWebVitals)
        getLCP(reportWebVitals)
        getTTFB(reportWebVitals)
      })
      .catch(error => {
        console.warn('Failed to load web-vitals:', error)
      })

    // Performance observer for additional metrics
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver(list => {
          for (const entry of list.getEntries()) {
            if (entry.entryType === 'navigation') {
              const navEntry = entry as PerformanceNavigationTiming
              console.log('Navigation timing:', {
                domContentLoaded:
                  navEntry.domContentLoadedEventEnd -
                  navEntry.domContentLoadedEventStart,
                loadComplete: navEntry.loadEventEnd - navEntry.loadEventStart,
                totalTime: navEntry.loadEventEnd - navEntry.fetchStart,
              })
            }
          }
        })

        observer.observe({ entryTypes: ['navigation', 'paint'] })
      } catch (error) {
        console.warn('PerformanceObserver not supported:', error)
      }
    }

    // Memory usage monitoring (if available)
    if ('memory' in performance) {
      try {
        const memory = (performance as any).memory
        console.log('Memory usage:', {
          used: Math.round(memory.usedJSHeapSize / 1048576) + ' MB',
          total: Math.round(memory.totalJSHeapSize / 1048576) + ' MB',
          limit: Math.round(memory.jsHeapSizeLimit / 1048576) + ' MB',
        })
      } catch (error) {
        console.warn('Memory monitoring not available:', error)
      }
    }
  }, [])

  return null // This component doesn't render anything
}
