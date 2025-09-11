'use client'

import React from 'react'

interface ErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface ErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>
}

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error }
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo)

    // Log to performance monitoring service if available
    if (typeof window !== 'undefined' && 'performance' in window) {
      try {
        // Log error to performance API
        performance.mark('error-boundary-catch')
        performance.measure('error-boundary-duration', 'error-boundary-catch')
      } catch (e) {
        console.warn('Could not log error to performance API:', e)
      }
    }
  }

  resetError = () => {
    this.setState({ hasError: false })
  }

  override render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback || DefaultErrorFallback
      const props: { error?: Error; resetError: () => void } = {
        resetError: this.resetError,
      }
      if (this.state.error) {
        props.error = this.state.error
      }
      return <FallbackComponent {...props} />
    }

    return this.props.children
  }
}

function DefaultErrorFallback({
  error,
  resetError,
}: {
  error?: Error
  resetError: () => void
}) {
  return (
    <div className='min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900'>
      <div className='max-w-md w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6'>
        <div className='flex items-center justify-center w-12 h-12 mx-auto bg-red-100 dark:bg-red-900 rounded-full'>
          <svg
            className='w-6 h-6 text-red-600 dark:text-red-400'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z'
            />
          </svg>
        </div>
        <div className='mt-4 text-center'>
          <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
            Something went wrong
          </h3>
          <p className='mt-2 text-sm text-gray-500 dark:text-gray-400'>
            We're sorry, but something unexpected happened. Please try
            refreshing the page.
          </p>
          {process.env.NODE_ENV === 'development' && error && (
            <details className='mt-4 text-left'>
              <summary className='cursor-pointer text-sm font-medium text-gray-700 dark:text-gray-300'>
                Error Details
              </summary>
              <pre className='mt-2 text-xs text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 p-2 rounded overflow-auto'>
                {error.message}
                {error.stack}
              </pre>
            </details>
          )}
          <div className='mt-6'>
            <button
              onClick={resetError}
              className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500'
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
