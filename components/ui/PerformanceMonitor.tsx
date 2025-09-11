'use client'

import { useEffect, useRef } from 'react'

// Declare gtag function for Google Analytics
declare global {
  function gtag(...args: any[]): void
}

export function PerformanceMonitor() {
  const isMonitoring = useRef(false)

  useEffect(() => {
    // Only run in production and in browser
    if (
      typeof window === 'undefined' ||
      process.env.NODE_ENV !== 'production' ||
      isMonitoring.current
    ) {
      return
    }

    isMonitoring.current = true

    // Lightweight Web Vitals monitoring
    const reportWebVitals = (metric: any) => {
      // Only log critical metrics
      if (
        metric.name === 'LCP' ||
        metric.name === 'FID' ||
        metric.name === 'CLS'
      ) {
        console.log('Critical Web Vital:', metric.name, metric.value)
      }
    }

    // Load web-vitals library dynamically with error handling
    import('web-vitals')
      .then(({ getCLS, getFID, getLCP }) => {
        getCLS(reportWebVitals)
        getFID(reportWebVitals)
        getLCP(reportWebVitals)
      })
      .catch(error => {
        console.warn('Failed to load web-vitals:', error)
      })

    // Lightweight performance observer for critical metrics only
    if ('PerformanceObserver' in window) {
      try {
        const observer = new PerformanceObserver(list => {
          for (const entry of list.getEntries()) {
            // Only monitor long tasks that could cause timeouts
            if (entry.entryType === 'longtask' && entry.duration > 50) {
              console.warn('Long task detected:', {
                duration: entry.duration,
                startTime: entry.startTime,
              })
            }
          }
        })

        observer.observe({ entryTypes: ['longtask'] })
      } catch (error) {
        console.warn('PerformanceObserver not supported:', error)
      }
    }
  }, [])

  return null // This component doesn't render anything
}
