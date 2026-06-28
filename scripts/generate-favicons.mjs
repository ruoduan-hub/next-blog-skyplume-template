import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { readFileSync, writeFileSync, mkdirSync } from 'fs'
import sharp from 'sharp'

const __dirname = dirname(fileURLToPath(import.meta.url))
const ROOT = join(__dirname, '..')
const LOGO = join(ROOT, 'data', 'logo.svg')
const OUT_DIR = join(ROOT, 'public', 'static', 'favicons')

mkdirSync(OUT_DIR, { recursive: true })

const logoBuffer = readFileSync(LOGO)
const pngSizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'android-chrome-96x96.png', size: 96 },
  { name: 'android-chrome-192x192.png', size: 192 },
  { name: 'android-chrome-512x512.png', size: 512 },
  { name: 'apple-touch-icon.png', size: 180 },
  { name: 'mstile-150x150.png', size: 150 },
]

await Promise.all(
  pngSizes.map(async ({ name, size }) => {
    await sharp(logoBuffer)
      .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(join(OUT_DIR, name))
    console.log(`  generated ${name} (${size}x${size})`)
  })
)

await sharp(logoBuffer)
  .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .toFile(join(OUT_DIR, 'favicon.ico'))
console.log('  generated favicon.ico')

writeFileSync(join(OUT_DIR, 'favicon.svg'), logoBuffer)

const manifest = {
  name: 'Skyplume Blog',
  short_name: 'Skyplume',
  icons: [
    { src: '/static/favicons/android-chrome-192x192.png', sizes: '192x192', type: 'image/png' },
    { src: '/static/favicons/android-chrome-512x512.png', sizes: '512x512', type: 'image/png' },
    {
      src: '/static/favicons/android-chrome-96x96.png',
      sizes: '96x96',
      type: 'image/png',
      purpose: 'any maskable',
    },
  ],
  theme_color: '#111827',
  background_color: '#ffffff',
  display: 'standalone',
}

writeFileSync(join(OUT_DIR, 'site.webmanifest'), JSON.stringify(manifest, null, 2) + '\n')
console.log('Done: favicons regenerated for Skyplume.')
