#!/usr/bin/env node

/**
 * Image Optimization Script
 * Converts large images to WebP format for better performance
 */

const fs = require('fs')
const path = require('path')

console.log('🖼️  Starting image optimization...')

// List of images that need optimization
const imagesToOptimize = [
  'public/download (2).png',
  'public/logo.png',
  'public/main.jpg',
  'public/main1.jpg',
  'public/img/Attendance System for Employees.jpeg',
  'public/img/Chemi-Net Landing Page.png',
  'public/img/Contracting Company Landing Page.png',
  'public/img/E-Commerce Dashboard.jpeg',
  'public/img/E-Commerce Platform.jpeg',
  'public/img/Fast React Pizza.jpeg',
  'public/img/Global Solutions Multi-Languages.png',
  'public/img/Movie Application.jpeg',
  'public/img/Natours.jpeg',
  'public/img/React Blog.jpeg',
  'public/img/React Quiz.jpeg',
  'public/img/Restaurant Website.jpeg',
  'public/img/The World Wise.jpeg',
  'public/img/Use Popcorn.jpeg',
]

function createOptimizedImageList() {
  console.log('📝 Creating optimized image list...')

  const optimizedImages = imagesToOptimize.map(imagePath => {
    const ext = path.extname(imagePath)
    const nameWithoutExt = path.basename(imagePath, ext)
    const dir = path.dirname(imagePath)

    return {
      original: imagePath,
      webp: path.join(dir, `${nameWithoutExt}.webp`),
      optimized: path.join(dir, `${nameWithoutExt}-optimized${ext}`),
    }
  })

  // Create a JSON file with optimization instructions
  const optimizationConfig = {
    images: optimizedImages,
    instructions: {
      webp: {
        quality: 85,
        description: 'Convert to WebP format for better compression',
      },
      jpeg: {
        quality: 85,
        progressive: true,
        description: 'Optimize JPEG images with progressive loading',
      },
      png: {
        quality: 90,
        description: 'Optimize PNG images while maintaining quality',
      },
    },
    commands: {
      webp: 'npx imagemin {input} --plugin=webp --plugin.webp.quality=85 --out-dir={outputDir}',
      jpeg: 'npx imagemin {input} --plugin=mozjpeg --plugin.mozjpeg.quality=85 --plugin.mozjpeg.progressive=true --out-dir={outputDir}',
      png: 'npx imagemin {input} --plugin=pngquant --plugin.pngquant.quality=90 --out-dir={outputDir}',
    },
  }

  fs.writeFileSync(
    path.join(process.cwd(), 'image-optimization-config.json'),
    JSON.stringify(optimizationConfig, null, 2)
  )

  console.log('✅ Created image-optimization-config.json')
  console.log('💡 Run the following commands to optimize images:')
  console.log('')

  // Generate optimization commands
  optimizedImages.forEach(img => {
    const ext = path.extname(img.original).toLowerCase()
    const outputDir = path.dirname(img.original)

    if (ext === '.jpg' || ext === '.jpeg') {
      console.log(
        `npx imagemin "${img.original}" --plugin=mozjpeg --plugin.mozjpeg.quality=85 --plugin.mozjpeg.progressive=true --out-dir="${outputDir}"`
      )
    } else if (ext === '.png') {
      console.log(
        `npx imagemin "${img.original}" --plugin=pngquant --plugin.pngquant.quality=90 --out-dir="${outputDir}"`
      )
    }

    // Also suggest WebP conversion
    console.log(
      `npx imagemin "${img.original}" --plugin=webp --plugin.webp.quality=85 --out-dir="${outputDir}"`
    )
  })

  console.log('')
  console.log('📊 Expected savings:')
  console.log('- WebP conversion: 25-50% size reduction')
  console.log('- JPEG optimization: 10-30% size reduction')
  console.log('- PNG optimization: 20-40% size reduction')
}

function showImageOptimizationTips() {
  console.log('\n🎯 Image Optimization Tips:')
  console.log('1. Use WebP format for modern browsers (85% quality)')
  console.log('2. Use JPEG for photos (85% quality, progressive)')
  console.log('3. Use PNG for graphics with transparency')
  console.log('4. Implement responsive images with srcset')
  console.log('5. Use Next.js Image component for automatic optimization')
  console.log('6. Consider lazy loading for below-the-fold images')
  console.log('7. Use blur placeholders for better UX')
}

// Run optimization
async function runImageOptimization() {
  try {
    createOptimizedImageList()
    showImageOptimizationTips()

    console.log('\n🎉 Image optimization setup completed!')
    console.log('💡 Run the generated commands to optimize your images')
    console.log('📊 This should significantly improve your PageSpeed score')
  } catch (error) {
    console.error('❌ Error during image optimization setup:', error.message)
    process.exit(1)
  }
}

runImageOptimization()
