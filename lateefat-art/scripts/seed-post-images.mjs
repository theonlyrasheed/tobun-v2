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

// Picsum Photos — always reliable, deterministic seeds, high-quality 1600×900
// Seeds chosen to surface varied, artistically relevant tones
const POST_IMAGES = [
  {
    postId: 'post-in-between-cultures',
    url: 'https://picsum.photos/seed/cultures/1600/900',
    alt: 'Abstract textures representing layered cultural identity',
  },
  {
    postId: 'post-ori-inu-the-silent-companion',
    url: 'https://picsum.photos/seed/oriinu/1600/900',
    alt: 'Meditative portrait — light and shadow in quiet reflection',
  },
  {
    postId: 'post-the-faces-we-outgrow',
    url: 'https://picsum.photos/seed/faces/1600/900',
    alt: 'Layered portrait exploring identity and transformation',
  },
  {
    postId: 'post-what-generative-art-taught-me-about-control',
    url: 'https://picsum.photos/seed/generative/1600/900',
    alt: 'Vibrant flowing algorithmic patterns — generative digital art',
  },
  {
    postId: 'post-colour-as-language',
    url: 'https://picsum.photos/seed/colour/1600/900',
    alt: 'Vivid colour field — ochre, indigo and gold interplay',
  },
  {
    postId: 'post-on-making-things-by-hand',
    url: 'https://picsum.photos/seed/handcraft/1600/900',
    alt: 'Artist\'s hands at work — textured paint on canvas',
  },
  {
    postId: 'post-digital-couture-when-fashion-meets-algorithm',
    url: 'https://picsum.photos/seed/couture/1600/900',
    alt: 'Digital fashion silhouette — vibrant colour and flowing form',
  },
  {
    postId: 'post-bradford-streets-my-canvas',
    url: 'https://picsum.photos/seed/bradford/1600/900',
    alt: 'Community mural on a Bradford street — unity and resilience in colour',
  },
  {
    postId: 'post-what-economics-taught-me-about-art',
    url: 'https://picsum.photos/seed/economics/1600/900',
    alt: 'Geometric abstract composition — structure meeting creative expression',
  },
  {
    postId: 'post-roots-of-radiance-making',
    url: 'https://picsum.photos/seed/radiance/1600/900',
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
