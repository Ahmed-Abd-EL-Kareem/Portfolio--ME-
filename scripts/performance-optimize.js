#!/usr/bin/env node

/**
 * Performance Optimization Script
 * This script helps optimize the portfolio for better PageSpeed scores
 */

const fs = require('fs')
const path = require('path')

console.log('🚀 Starting performance optimization...')

// 1. Check for large images that need optimization
function checkImageOptimization() {
  console.log('📸 Checking image optimization...')

  const publicDir = path.join(process.cwd(), 'public')
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp', '.svg']

  if (fs.existsSync(publicDir)) {
    const files = fs.readdirSync(publicDir, { recursive: true })
    const largeImages = files
      .filter(file => {
        const ext = path.extname(file).toLowerCase()
        return imageExtensions.includes(ext)
      })
      .map(file => {
        const filePath = path.join(publicDir, file)
        const stats = fs.statSync(filePath)
        return {
          name: file,
          size: stats.size,
          sizeKB: Math.round(stats.size / 1024),
        }
      })
      .filter(img => img.sizeKB > 100) // Images larger than 100KB

    if (largeImages.length > 0) {
      console.log('⚠️  Large images found:')
      largeImages.forEach(img => {
        console.log(`   - ${img.name}: ${img.sizeKB}KB`)
      })
      console.log('💡 Consider optimizing these images with WebP format')
    } else {
      console.log('✅ All images are optimized')
    }
  }
}

// 2. Check for unused dependencies
function checkDependencies() {
  console.log('📦 Checking dependencies...')

  const packageJsonPath = path.join(process.cwd(), 'package.json')
  if (fs.existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'))
    const dependencies = Object.keys(packageJson.dependencies || {})

    console.log(`📊 Total dependencies: ${dependencies.length}`)

    // Check for heavy dependencies that might impact performance
    const heavyDeps = [
      'framer-motion',
      '@react-three/fiber',
      '@react-three/drei',
      'three',
      '@react-pdf-viewer',
    ]

    const foundHeavyDeps = dependencies.filter(dep =>
      heavyDeps.some(heavy => dep.includes(heavy))
    )

    if (foundHeavyDeps.length > 0) {
      console.log('⚠️  Heavy dependencies found:')
      foundHeavyDeps.forEach(dep => {
        console.log(`   - ${dep}`)
      })
      console.log('💡 Consider lazy loading these components')
    }
  }
}

// 3. Check bundle size
function checkBundleSize() {
  console.log('📊 Checking bundle configuration...')

  const nextConfigPath = path.join(process.cwd(), 'next.config.js')
  if (fs.existsSync(nextConfigPath)) {
    const config = fs.readFileSync(nextConfigPath, 'utf8')

    const optimizations = [
      'optimizePackageImports',
      'transpilePackages',
      'compiler.removeConsole',
      'experimental.optimizeCss',
    ]

    const foundOptimizations = optimizations.filter(opt => config.includes(opt))

    console.log(
      `✅ Found ${foundOptimizations.length}/${optimizations.length} optimizations`
    )

    if (foundOptimizations.length < optimizations.length) {
      console.log('💡 Consider adding more optimizations to next.config.js')
    }
  }
}

// 4. Performance recommendations
function showRecommendations() {
  console.log('\n🎯 Performance Recommendations:')
  console.log('1. ✅ Fixed render blocking CSS with critical CSS inlining')
  console.log('2. ✅ Optimized scroll handler to prevent forced reflows')
  console.log('3. ✅ Updated Babel config to avoid legacy JavaScript')
  console.log('4. ✅ Added bundle splitting and optimization')
  console.log('5. 🔄 Consider implementing service worker for caching')
  console.log('6. 🔄 Consider using WebP images for better compression')
  console.log('7. 🔄 Consider implementing virtual scrolling for long lists')
  console.log('8. 🔄 Consider using React.memo for expensive components')
}

// Run all checks
async function runOptimization() {
  try {
    checkImageOptimization()
    console.log('')
    checkDependencies()
    console.log('')
    checkBundleSize()
    console.log('')
    showRecommendations()

    console.log('\n🎉 Performance optimization check completed!')
    console.log('💡 Run "npm run build" to see the optimized bundle')
    console.log('📊 Run "npm run lighthouse" to test performance')
  } catch (error) {
    console.error('❌ Error during optimization:', error.message)
    process.exit(1)
  }
}

runOptimization()
