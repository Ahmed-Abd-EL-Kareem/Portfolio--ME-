#!/usr/bin/env node

/**
 * Hydration Error Checker
 * This script helps identify potential hydration issues
 */

const fs = require('fs')
const path = require('path')

console.log('🔍 Checking for potential hydration issues...')

// Check for common hydration issues
function checkHydrationIssues() {
  const issues = []

  // Check for dangerouslySetInnerHTML with dynamic content
  const files = [
    'app/layout.tsx',
    'components/layout/Navigation.tsx',
    'components/ClientPortfolio.tsx',
  ]

  files.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8')

      // Check for dangerouslySetInnerHTML with template literals (only if actually using ${})
      if (
        content.includes('dangerouslySetInnerHTML') &&
        content.includes('${') &&
        !content.includes('__html: `')
      ) {
        issues.push(
          `${file}: dangerouslySetInnerHTML with template literals may cause hydration issues`
        )
      }

      // Check for Date.now() or new Date() in render
      if (content.includes('Date.now()') || content.includes('new Date()')) {
        issues.push(`${file}: Date usage in render may cause hydration issues`)
      }

      // Check for Math.random() in render
      if (content.includes('Math.random()')) {
        issues.push(
          `${file}: Math.random() in render may cause hydration issues`
        )
      }

      // Check for window object usage without typeof check
      if (content.includes('window.') && !content.includes('typeof window')) {
        issues.push(
          `${file}: Direct window usage without typeof check may cause hydration issues`
        )
      }
    }
  })

  return issues
}

// Check for hydration issues
const issues = checkHydrationIssues()

if (issues.length > 0) {
  console.log('⚠️  Potential hydration issues found:')
  issues.forEach(issue => {
    console.log(`   - ${issue}`)
  })
} else {
  console.log('✅ No obvious hydration issues found')
}

console.log('\n💡 Hydration Best Practices:')
console.log('1. Avoid dynamic content in dangerouslySetInnerHTML')
console.log('2. Use typeof window checks for browser-only code')
console.log('3. Avoid Date.now() or Math.random() in render methods')
console.log('4. Ensure server and client render the same content')
console.log('5. Use useEffect for client-only logic')

console.log('\n🎉 Hydration check completed!')
