const sharp = require('sharp')
const fs = require('fs')
const path = require('path')

const inputDir = path.join(__dirname, '../public')
const outputDir = path.join(__dirname, '../public/optimized')

// Ensure output directory exists
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true })
}

// Image optimization function
async function optimizeImage(inputPath, outputPath, options = {}) {
  try {
    const {
      width = 1920,
      height = 1080,
      quality = 85,
      format = 'webp',
    } = options

    await sharp(inputPath)
      .resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true,
      })
      .toFormat(format, { quality })
      .toFile(outputPath)

    console.log(
      `✅ Optimized: ${path.basename(inputPath)} -> ${path.basename(outputPath)}`
    )
  } catch (error) {
    console.error(`❌ Error optimizing ${inputPath}:`, error.message)
  }
}

// Main optimization function
async function optimizeImages() {
  const imageExtensions = ['.jpg', '.jpeg', '.png', '.webp']
  const files = fs.readdirSync(inputDir)

  const imageFiles = files.filter(file => {
    const ext = path.extname(file).toLowerCase()
    return imageExtensions.includes(ext)
  })

  console.log(`Found ${imageFiles.length} images to optimize...`)

  for (const file of imageFiles) {
    const inputPath = path.join(inputDir, file)
    const ext = path.extname(file)
    const name = path.basename(file, ext)

    // Create multiple optimized versions
    const optimizations = [
      {
        suffix: '_webp',
        format: 'webp',
        quality: 85,
        width: 1920,
      },
      {
        suffix: '_avif',
        format: 'avif',
        quality: 80,
        width: 1920,
      },
      {
        suffix: '_mobile_webp',
        format: 'webp',
        quality: 80,
        width: 768,
      },
    ]

    for (const opt of optimizations) {
      const outputPath = path.join(
        outputDir,
        `${name}${opt.suffix}.${opt.format}`
      )
      await optimizeImage(inputPath, outputPath, opt)
    }
  }

  console.log('🎉 Image optimization complete!')
}

// Run optimization
if (require.main === module) {
  optimizeImages().catch(console.error)
}

module.exports = { optimizeImages, optimizeImage }
