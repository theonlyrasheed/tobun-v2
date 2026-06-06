/**
 * Uploads hero images to Sanity for each blog post.
 * Images sourced from Unsplash (free to use under Unsplash License).
 * Run: SANITY_TOKEN=xxx node scripts/seed-post-images.mjs
 */
import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'f5jgmo2u',
  dataset: 'production',
  apiVersion: '2026-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

// Unsplash direct CDN links — each chosen to match the post's theme
const POST_IMAGES = [
  {
    postId: 'post-in-between-cultures',
    url: 'https://images.unsplash.com/photo-1578301978-405574dc67e4?w=1600&q=85&auto=format&fit=crop',
    alt: 'Colourful layered fabric textures representing cultural identity',
  },
  {
    postId: 'post-ori-inu-the-silent-companion',
    url: 'https://images.unsplash.com/photo-1513364776-537808165f1c?w=1600&q=85&auto=format&fit=crop',
    alt: 'Meditative portrait — light and shadow on a face in quiet reflection',
  },
  {
    postId: 'post-the-faces-we-outgrow',
    url: 'https://images.unsplash.com/photo-1596557407523-61e1fe6b07ee?w=1600&q=85&auto=format&fit=crop',
    alt: 'Layered abstract portrait exploring identity and transformation',
  },
  {
    postId: 'post-what-generative-art-taught-me-about-control',
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85&auto=format&fit=crop',
    alt: 'Vibrant generative digital art — flowing colourful algorithmic patterns',
  },
  {
    postId: 'post-colour-as-language',
    url: 'https://images.unsplash.com/photo-1499892477493-f52cc080a3dc?w=1600&q=85&auto=format&fit=crop',
    alt: 'Bright acrylic paint palette — ochre, indigo and gold colour swatches',
  },
  {
    postId: 'post-on-making-things-by-hand',
    url: 'https://images.unsplash.com/photo-1452860851-c94d0ef40f14?w=1600&q=85&auto=format&fit=crop',
    alt: 'Artist\'s hands working with textured paint on canvas',
  },
  {
    postId: 'post-digital-couture-when-fashion-meets-algorithm',
    url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1600&q=85&auto=format&fit=crop&crop=entropy&sig=2',
    alt: 'Digital fashion illustration — vibrant colour and flowing silhouette',
  },
  {
    postId: 'post-bradford-streets-my-canvas',
    url: 'https://images.unsplash.com/photo-1541701494-ba19a39b11f4?w=1600&q=85&auto=format&fit=crop',
    alt: 'Colourful community mural on a Bradford street — unity and resilience',
  },
  {
    postId: 'post-what-economics-taught-me-about-art',
    url: 'https://images.unsplash.com/photo-1509631928351-0cc8e7c1e895?w=1600&q=85&auto=format&fit=crop',
    alt: 'Geometric abstract art — structure and pattern meeting creative expression',
  },
  {
    postId: 'post-roots-of-radiance-making',
    url: 'https://images.unsplash.com/photo-1524508762-1c78bc636e88?w=1600&q=85&auto=format&fit=crop',
    alt: 'Layered patterned fabric — ankara print textile art in warm tones',
  },
]

async function uploadImageFromUrl(url, alt) {
  console.log(`  Downloading: ${url.slice(0, 60)}...`)
  const res = await fetch(url)
  if (!res.ok) throw new Error(`Failed to fetch image: ${res.status} ${url}`)
  const buffer = Buffer.from(await res.arrayBuffer())

  const asset = await client.assets.upload('image', buffer, {
    filename: `${alt.slice(0, 40).replace(/[^a-z0-9]/gi, '-').toLowerCase()}.jpg`,
    contentType: 'image/jpeg',
  })

  console.log(`  ✓ Uploaded asset: ${asset._id}`)
  return { _type: 'image', asset: { _type: 'reference', _ref: asset._id }, alt }
}

async function run() {
  console.log(`Seeding images for ${POST_IMAGES.length} posts...\n`)

  for (const { postId, url, alt } of POST_IMAGES) {
    console.log(`[${postId}]`)
    try {
      const image = await uploadImageFromUrl(url, alt)
      await client
        .patch(postId)
        .set({ main_image: image })
        .commit()
      console.log(`  ✓ Patched post\n`)
    } catch (err) {
      console.error(`  ✗ Failed: ${err.message}\n`)
    }
  }

  console.log('Done.')
}

run().catch(err => { console.error(err); process.exit(1) })
