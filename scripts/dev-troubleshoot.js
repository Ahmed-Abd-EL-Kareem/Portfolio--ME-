#!/usr/bin/env node

/**
 * Development Server Troubleshooting Script
 * Helps diagnose and fix common Next.js development issues
 */

const fs = require('fs')
const path = require('path')
const { execSync } = require('child_process')

console.log('🔧 Next.js Development Server Troubleshooting')
console.log('='.repeat(50))

function checkPort() {
  try {
    const result = execSync('netstat -an | findstr :3000', { encoding: 'utf8' })
    if (result.includes('LISTENING')) {
      console.log('✅ Port 3000 is in use')
      return true
    }
  } catch (error) {
    console.log('❌ Port 3000 is not in use')
    return false
  }
}

function checkNextConfig() {
  const configPath = 'next.config.js'
  if (fs.existsSync(configPath)) {
    console.log('✅ next.config.js exists')

    const content = fs.readFileSync(configPath, 'utf8')

    // Check for common issues
    if (content.includes('experimental.optimizeCss')) {
      console.log('⚠️  optimizeCss is enabled - this can cause build issues')
    }

    if (
      content.includes('require.*critters') ||
      content.includes('import.*critters') ||
      content.includes('CrittersPlugin')
    ) {
      console.log(
        '⚠️  critters plugin detected - this can cause hydration issues'
      )
    }

    return true
  } else {
    console.log('❌ next.config.js not found')
    return false
  }
}

function checkPackageJson() {
  if (fs.existsSync('package.json')) {
    console.log('✅ package.json exists')

    const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'))

    if (pkg.scripts && pkg.scripts.dev) {
      console.log('✅ dev script found')
    } else {
      console.log('❌ dev script not found')
    }

    return true
  } else {
    console.log('❌ package.json not found')
    return false
  }
}

function checkNodeModules() {
  if (fs.existsSync('node_modules')) {
    console.log('✅ node_modules exists')
    return true
  } else {
    console.log('❌ node_modules not found - run npm install')
    return false
  }
}

function suggestFixes() {
  console.log('\n🛠️  Suggested Fixes:')
  console.log('1. Kill all Node processes: taskkill /f /im node.exe')
  console.log(
    '2. Clear Next.js cache: Remove-Item -Recurse -Force .next (if possible)'
  )
  console.log('3. Restart development server: npm run dev')
  console.log('4. Check browser console for specific errors')
  console.log('5. Try incognito/private browsing mode')
  console.log('6. Clear browser cache and hard refresh (Ctrl+Shift+R)')
}

function main() {
  console.log('\n📋 Running Diagnostics...\n')

  const checks = [
    { name: 'Port 3000', fn: checkPort },
    { name: 'Next.js Config', fn: checkNextConfig },
    { name: 'Package.json', fn: checkPackageJson },
    { name: 'Node Modules', fn: checkNodeModules },
  ]

  let allPassed = true

  checks.forEach(check => {
    console.log(`\n🔍 Checking ${check.name}...`)
    if (!check.fn()) {
      allPassed = false
    }
  })

  if (allPassed) {
    console.log('\n✅ All basic checks passed!')
    console.log("If you're still having issues, try the suggested fixes below.")
  } else {
    console.log('\n❌ Some issues found. Please address them and try again.')
  }

  suggestFixes()

  console.log('\n💡 Additional Tips:')
  console.log('- Check the terminal output for specific error messages')
  console.log('- Look for hydration mismatch errors in browser console')
  console.log('- Ensure all imports are correct and files exist')
  console.log('- Try building the project first: npm run build')
}

main()
