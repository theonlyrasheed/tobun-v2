/**
 * Uploads real artwork images to Sanity for each gallery item.
 * Images sourced directly from tobunlateefat.com/wp-content/uploads/.
 * Run: SANITY_TOKEN=xxx node scripts/seed-gallery-images.mjs
 */
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'f5jgmo2u',
  dataset: 'production',
  apiVersion: '2026-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const BASE = 'https://tobunlateefat.com/wp-content/uploads'

const GALLERY_IMAGES = [
  // ── Painting ─────────────────────────────────────────────────────────────
  {
    id: 'gallery-ironu',
    url: `${BASE}/2025/12/ART.zip-Ironu.jpeg`,
    alt: 'Ironu — expressive painting exploring emotion and inner life',
  },
  {
    id: 'gallery-oju-aye',
    url: `${BASE}/2025/12/ART.zip-Oju-Aye-1024x788.jpeg`,
    alt: 'Oju Aye — layered acrylic on canvas, saturated colour field',
  },
  {
    id: 'gallery-the-weight-of-tenderness',
    url: `${BASE}/2025/12/ART.zip-The-Weight-of-Tenderness-1024x788.jpeg`,
    alt: 'The Weight of Tenderness — soft warm tones on canvas',
  },
  {
    id: 'gallery-lonely-reflections',
    url: `${BASE}/2025/12/ART.zip-Lonely-Reflections-1024x788.png`,
    alt: 'Lonely Reflections — muted blues and greys, meditative mood',
  },
  {
    id: 'gallery-silent-chaos',
    url: `${BASE}/2025/12/ART.zip-Silent-chaos-1024x805.jpeg`,
    alt: 'Silent Chaos — dynamic brushwork and colliding colour',
  },
  {
    id: 'gallery-in-your-arms',
    url: `${BASE}/2025/12/CDA7719E-F5D1-4C1D-80E1-DC7A11D2349E-1024x788.jpeg`,
    alt: 'In Your Arms — intimate figurative painting in warm ochres',
  },
  {
    id: 'gallery-undecided',
    url: `${BASE}/2025/12/ART.zip-21-1024x788.jpeg`,
    alt: 'Undecided — abstract figure suspended in fluid colour',
  },
  {
    id: 'gallery-silenced',
    url: `${BASE}/2025/12/531698b8-b4c5-4bd2-bd4f-6844570ff1b0.jpeg`,
    alt: 'Silenced — muted portrait study, deep shadow and restrained palette',
  },

  // ── Digital Art ───────────────────────────────────────────────────────────
  {
    id: 'gallery-the-weight-we-carry',
    url: `${BASE}/2025/12/8c1b1a21-7f8a-4e11-a6f0-1dfa051df25d.jpeg`,
    alt: 'The Weight We Carry — digital illustration, layered expressive forms',
  },
  {
    id: 'gallery-dancing-mirage',
    url: `${BASE}/2025/12/25b9d0f7-584d-4ffc-9560-5366b436814c.jpeg`,
    alt: 'Dancing Mirage — vivid digital composition in motion',
  },
  {
    id: 'gallery-mending-the-gap',
    url: `${BASE}/2025/12/7f8ef859-9224-4449-a9a3-3b7a66070977.jpeg`,
    alt: 'Mending the Gap — digital collage bridging form and colour',
  },
  {
    id: 'gallery-silent-realities',
    url: `${BASE}/2025/10/ART.zip-Igboya-4-1024x788.jpeg`,
    alt: 'Silent Realities — digital art exploring quiet tension',
  },
  {
    id: 'gallery-celestial-bloom',
    url: `${BASE}/2025/12/ART.zip-Igboya-2-1024x788.jpeg`,
    alt: 'Celestial Bloom — digital illustration, cosmic floral forms',
  },
  {
    id: 'gallery-electric-calm',
    url: `${BASE}/2025/09/voices.png`,
    alt: 'Electric Calm — bold digital composition, vibrant contrast',
  },
  {
    id: 'gallery-voices-in-color',
    url: `${BASE}/2025/10/ART.zip-Igboya-5.jpeg`,
    alt: 'Voices in Color — vivid digital artwork celebrating expression',
  },

  // ── Textile Art ───────────────────────────────────────────────────────────
  {
    id: 'gallery-roots-of-radiance',
    url: `${BASE}/2025/12/IMG_4291-1024x1024.jpeg`,
    alt: 'Roots of Radiance — textile art in warm ankara print tones',
  },

  // ── Generative Art ────────────────────────────────────────────────────────
  {
    id: 'gallery-chromatic-flow',
    url: `${BASE}/2025/12/1-683x1024.png`,
    alt: 'Chromatic Flow — algorithm-driven colour gradients in motion',
  },
  {
    id: 'gallery-algorithmic-bloom',
    url: `${BASE}/2025/12/3-1-683x1024.png`,
    alt: 'Algorithmic Bloom — generative floral patterns from code',
  },
  {
    id: 'gallery-quiet-inspirations',
    url: `${BASE}/2025/12/4.png`,
    alt: 'Quiet Inspirations — soft generative composition, pastel palette',
  },
  {
    id: 'gallery-fragment-of-light',
    url: `${BASE}/2025/12/2-683x1024.png`,
    alt: 'Fragment of Light — generative art exploring luminescence',
  },
  {
    id: 'gallery-spectrum-pulse',
    url: `${BASE}/2025/12/3-2-683x1024.png`,
    alt: 'Spectrum Pulse — rhythmic generative colour field',
  },

  // ── Murals ────────────────────────────────────────────────────────────────
  {
    id: 'gallery-stronger-together',
    url: `${BASE}/2025/12/IMG_4229-768x1024.jpeg`,
    alt: 'Stronger Together — community mural celebrating unity and resilience',
  },
]

function contentTypeFromUrl(url) {
  if (url.endsWith('.png')) return 'image/png'
  if (url.endsWith('.webp')) return 'image/webp'
  return 'image/jpeg'
}

function filenameFromUrl(url) {
  return url.split('/').pop() ?? 'artwork.jpg'
}

async function uploadImageFromUrl(url, alt) {
  console.log(`  Downloading: ${url.split('/').pop()}`)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch image: ${res.status} ${url}`)
  const buffer = Buffer.from(await res.arrayBuffer())

  const contentType = contentTypeFromUrl(url)
  const asset = await client.assets.upload('image', buffer, {
    filename: filenameFromUrl(url),
    contentType,
  })

  console.log(`  ✓ Uploaded asset: ${asset._id}`)
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id }, alt }
}

async function run() {
  console.log(`Seeding real artwork images for ${GALLERY_IMAGES.length} gallery items...\n`)

  for (const { id, url, alt } of GALLERY_IMAGES) {
    console.log(`[${id}]`)
    try {
      const image = await uploadImageFromUrl(url, alt)
      await client
        .patch(id)
        .set({ main_image: image })
        .commit()
      console.log(`  ✓ Patched gallery item\n`)
    } catch (err) {
      console.error(`  ✗ Failed: ${err.message}\n`)
    }
  }

  console.log('Done.')
}

run().catch(err => { console.error(err); process.exit(1) })
