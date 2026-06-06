import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'f5jgmo2u',
  dataset: 'production',
  apiVersion: '2026-01-01',
  token: process.env.SANITY_TOKEN,
  useCdn: false,
})

const documents = [
  /* ── Site Settings (singleton) ─────────────────────────────── */
  {
    _id: 'siteSettings',
    _type: 'siteSettings',
    artistName: 'Lateefat Tobun',
    tagline: 'Multidisciplinary Artist & Digital Couturier',
    bio: 'I am a multidisciplinary artist and digital couturier working across painting, textile art, digital illustration, generative systems and digital fashion. My practice explores the transformation of materials, identities and ideas moving fluidly between physical and digital spaces. With an educational background spanning economics, artificial intelligence, and data analytics, my work is shaped by both intuition and systems thinking. I\'m drawn to how structure and unpredictability coexist, and how technology can expand creative expression rather than limit it. At the heart of my practice is a curiosity about how ideas evolve across media. I work with canvas, fabric, colour, code and digital form, allowing each material to guide the outcome in different ways. My process is experimental and layered, rooted in the hand-made yet open to technological transformation, themes of identity, migration, intuition, emotional resilience and becoming run quietly through my work. Whether through public murals, digital couture, generative art or intimate journal writing, I\'m interested in the invisible inner shifts that shape who we are and how we move through the world. Art, for me, is not static. It is a living conversation between past and future, material and machine, self and society.',
    email: 'hello@tobunlateefat.com',
    phone: '+44 7846 002310',
    location: 'Bradford, United Kingdom',
    seoTitle: 'Lateefat Tobun — Multidisciplinary Artist & Digital Couturier',
    seoDescription: 'Multidisciplinary artist working across painting, textile art, digital illustration, generative systems and digital fashion. Based in Bradford, UK.',
  },

  /* ── Gallery Albums ─────────────────────────────────────────── */
  {
    _id: 'album-painting',
    _type: 'gallery_album',
    title: 'Painting',
    slug: { _type: 'slug', current: 'painting' },
    description: 'A curated collection of canvas works shaped by intuition, colour play and expressive mark-making. Selected acrylic pieces exploring gesture, depth and visual storytelling.',
  },
  {
    _id: 'album-digital-art',
    _type: 'gallery_album',
    title: 'Digital Art',
    slug: { _type: 'slug', current: 'digital-art' },
    description: 'Explorations in colour, form and contemporary visual expression. Blends bold colour, geometric structure, and expressive composition exploring identity, expression and movement.',
  },
  {
    _id: 'album-textile-art',
    _type: 'gallery_album',
    title: 'Textile Art',
    slug: { _type: 'slug', current: 'textile-art' },
    description: 'Artworks in cloth, thread and tactile form. Explorations of how colour, texture and pattern can hold memory, identity and emotion.',
  },
  {
    _id: 'album-fabric-painting',
    _type: 'gallery_album',
    title: 'Fabric Painting',
    slug: { _type: 'slug', current: 'fabric-painting' },
    description: 'Where fabric becomes a canvas for colour, story and transformation. Each piece begins with raw textile, open to whatever form the colour chooses to take.',
  },
  {
    _id: 'album-generative-art',
    _type: 'gallery_album',
    title: 'Generative Art',
    slug: { _type: 'slug', current: 'generative-art' },
    description: 'Art created through algorithms and creative intuition, where technology becomes a collaborator. Guided colour palettes, form, mood and conceptual direction.',
  },
  {
    _id: 'album-murals',
    _type: 'gallery_album',
    title: 'Murals',
    slug: { _type: 'slug', current: 'murals' },
    description: 'Community-centred art created to inspire connection, resilience and collective wellbeing.',
  },
  {
    _id: 'album-digital-couture',
    _type: 'gallery_album',
    title: 'Digital Couture',
    slug: { _type: 'slug', current: 'digital-couture' },
    description: 'Where love for colour, illustration and textile expression meets the possibilities of emerging technology. Bridging the tactile world and the digital one.',
  },
  {
    _id: 'album-coloring',
    _type: 'gallery_album',
    title: 'Coloring',
    slug: { _type: 'slug', current: 'coloring' },
    description: 'Expressive coloring works exploring emotion, movement and visual storytelling through colour.',
  },

  /* ── Gallery Items ──────────────────────────────────────────── */
  // Painting
  {
    _id: 'gallery-ironu',
    _type: 'gallery',
    title: 'Ironu',
    slug: { _type: 'slug', current: 'ironu' },
    album: { _type: 'reference', _ref: 'album-painting' },
    variant: 'default',
    created_at: '2025-01-01',
    featured: true,
    availability: 'available',
  },
  {
    _id: 'gallery-oju-aye',
    _type: 'gallery',
    title: 'Oju Aye',
    slug: { _type: 'slug', current: 'oju-aye' },
    album: { _type: 'reference', _ref: 'album-painting' },
    variant: 'default',
    created_at: '2025-01-01',
    featured: true,
    availability: 'available',
  },
  {
    _id: 'gallery-the-weight-of-tenderness',
    _type: 'gallery',
    title: 'The Weight of Tenderness',
    slug: { _type: 'slug', current: 'the-weight-of-tenderness' },
    album: { _type: 'reference', _ref: 'album-painting' },
    variant: 'light',
    created_at: '2025-01-01',
    featured: false,
    availability: 'available',
  },
  {
    _id: 'gallery-lonely-reflections',
    _type: 'gallery',
    title: 'Lonely Reflections',
    slug: { _type: 'slug', current: 'lonely-reflections' },
    album: { _type: 'reference', _ref: 'album-painting' },
    variant: 'default',
    created_at: '2025-01-01',
    featured: false,
    availability: 'available',
  },
  {
    _id: 'gallery-silent-chaos',
    _type: 'gallery',
    title: 'Silent Chaos',
    slug: { _type: 'slug', current: 'silent-chaos' },
    album: { _type: 'reference', _ref: 'album-painting' },
    variant: 'ochre',
    created_at: '2025-01-01',
    featured: false,
    availability: 'available',
  },
  // Digital Art
  {
    _id: 'gallery-the-weight-we-carry',
    _type: 'gallery',
    title: 'The Weight We Carry',
    slug: { _type: 'slug', current: 'the-weight-we-carry' },
    album: { _type: 'reference', _ref: 'album-digital-art' },
    variant: 'default',
    created_at: '2025-01-01',
    featured: true,
    availability: 'not_for_sale',
  },
  {
    _id: 'gallery-dancing-mirage',
    _type: 'gallery',
    title: 'Dancing Mirage',
    slug: { _type: 'slug', current: 'dancing-mirage' },
    album: { _type: 'reference', _ref: 'album-digital-art' },
    variant: 'default',
    created_at: '2025-01-01',
    featured: false,
    availability: 'not_for_sale',
  },
  {
    _id: 'gallery-mending-the-gap',
    _type: 'gallery',
    title: 'Mending the Gap',
    slug: { _type: 'slug', current: 'mending-the-gap' },
    album: { _type: 'reference', _ref: 'album-digital-art' },
    variant: 'light',
    created_at: '2025-01-01',
    featured: false,
    availability: 'not_for_sale',
  },
  {
    _id: 'gallery-silent-realities',
    _type: 'gallery',
    title: 'Silent Realities',
    slug: { _type: 'slug', current: 'silent-realities' },
    album: { _type: 'reference', _ref: 'album-digital-art' },
    variant: 'default',
    created_at: '2025-01-01',
    featured: false,
    availability: 'not_for_sale',
  },
  {
    _id: 'gallery-celestial-bloom',
    _type: 'gallery',
    title: 'Celestial Bloom',
    slug: { _type: 'slug', current: 'celestial-bloom' },
    album: { _type: 'reference', _ref: 'album-digital-art' },
    variant: 'ochre',
    created_at: '2025-01-01',
    featured: false,
    availability: 'not_for_sale',
  },
  {
    _id: 'gallery-electric-calm',
    _type: 'gallery',
    title: 'Electric Calm',
    slug: { _type: 'slug', current: 'electric-calm' },
    album: { _type: 'reference', _ref: 'album-digital-art' },
    variant: 'light',
    created_at: '2025-01-01',
    featured: false,
    availability: 'not_for_sale',
  },
  // Textile Art
  {
    _id: 'gallery-roots-of-radiance',
    _type: 'gallery',
    title: 'Roots of Radiance',
    slug: { _type: 'slug', current: 'roots-of-radiance' },
    album: { _type: 'reference', _ref: 'album-textile-art' },
    variant: 'ochre',
    created_at: '2025-01-01',
    featured: true,
    availability: 'available',
  },
  // Generative Art
  {
    _id: 'gallery-chromatic-flow',
    _type: 'gallery',
    title: 'Chromatic Flow',
    slug: { _type: 'slug', current: 'chromatic-flow' },
    album: { _type: 'reference', _ref: 'album-generative-art' },
    variant: 'default',
    created_at: '2025-01-01',
    featured: true,
    availability: 'not_for_sale',
  },
  {
    _id: 'gallery-algorithmic-bloom',
    _type: 'gallery',
    title: 'Algorithmic Bloom',
    slug: { _type: 'slug', current: 'algorithmic-bloom' },
    album: { _type: 'reference', _ref: 'album-generative-art' },
    variant: 'light',
    created_at: '2025-01-01',
    featured: false,
    availability: 'not_for_sale',
  },
  {
    _id: 'gallery-quiet-inspirations',
    _type: 'gallery',
    title: 'Quiet Inspirations',
    slug: { _type: 'slug', current: 'quiet-inspirations' },
    album: { _type: 'reference', _ref: 'album-generative-art' },
    variant: 'default',
    created_at: '2025-01-01',
    featured: false,
    availability: 'not_for_sale',
  },
  {
    _id: 'gallery-fragment-of-light',
    _type: 'gallery',
    title: 'Fragment of Light',
    slug: { _type: 'slug', current: 'fragment-of-light' },
    album: { _type: 'reference', _ref: 'album-generative-art' },
    variant: 'light',
    created_at: '2025-01-01',
    featured: false,
    availability: 'not_for_sale',
  },
  {
    _id: 'gallery-spectrum-pulse',
    _type: 'gallery',
    title: 'Spectrum Pulse',
    slug: { _type: 'slug', current: 'spectrum-pulse' },
    album: { _type: 'reference', _ref: 'album-generative-art' },
    variant: 'ochre',
    created_at: '2025-01-01',
    featured: false,
    availability: 'not_for_sale',
  },
  // Murals
  {
    _id: 'gallery-stronger-together',
    _type: 'gallery',
    title: 'Stronger Together',
    slug: { _type: 'slug', current: 'stronger-together' },
    album: { _type: 'reference', _ref: 'album-murals' },
    variant: 'default',
    created_at: '2025-01-01',
    featured: true,
    availability: 'not_for_sale',
  },
  // Homepage featured
  {
    _id: 'gallery-in-your-arms',
    _type: 'gallery',
    title: 'In Your Arms',
    slug: { _type: 'slug', current: 'in-your-arms' },
    album: { _type: 'reference', _ref: 'album-painting' },
    variant: 'default',
    created_at: '2025-01-01',
    featured: true,
    availability: 'available',
  },
  {
    _id: 'gallery-undecided',
    _type: 'gallery',
    title: 'Undecided',
    slug: { _type: 'slug', current: 'undecided' },
    album: { _type: 'reference', _ref: 'album-painting' },
    variant: 'light',
    created_at: '2025-01-01',
    featured: true,
    availability: 'available',
  },
  {
    _id: 'gallery-voices-in-color',
    _type: 'gallery',
    title: 'Voices in Color',
    slug: { _type: 'slug', current: 'voices-in-color' },
    album: { _type: 'reference', _ref: 'album-digital-art' },
    variant: 'ochre',
    created_at: '2025-01-01',
    featured: true,
    availability: 'available',
  },
  {
    _id: 'gallery-silenced',
    _type: 'gallery',
    title: 'Silenced',
    slug: { _type: 'slug', current: 'silenced' },
    album: { _type: 'reference', _ref: 'album-painting' },
    variant: 'default',
    created_at: '2025-01-01',
    featured: false,
    availability: 'available',
  },

  /* ── Events ─────────────────────────────────────────────────── */
  {
    _id: 'event-colour-to-digital-couture',
    _type: 'event',
    title: 'Colour to Digital Couture',
    slug: { _type: 'slug', current: 'colour-to-digital-couture' },
    badge: 'Workshop',
    date: '2025-10-18',
    location: 'Bradford, United Kingdom',
    desc: 'A hands-on workshop inviting the community to explore creativity at the intersection of traditional making and emerging technology. Participants design fashion outfits on croquis using illustration and colouring with real fabrics, then transform them into digital artworks using AI. The session includes creativity activities, connection opportunities, take-home souvenirs and light refreshments.',
    featured: true,
  },
  {
    _id: 'event-mindful-hues',
    _type: 'event',
    title: 'Mindful Hues — Colour to Calm',
    slug: { _type: 'slug', current: 'mindful-hues-colour-to-calm' },
    badge: 'Workshop',
    date: '2025-11-19',
    location: 'Bradford, United Kingdom',
    desc: 'A creative mindfulness workshop designed to support student wellbeing through artistic expression. Participants colour expressive figure outlines that mirror emotion and movement, guided by mindful breathing prompts and soft ambient music. Completed artwork becomes digital wearable-art visuals, offering a grounding experience that combines creativity with calm.',
    featured: true,
  },

  /* ── Services ───────────────────────────────────────────────── */
  {
    _id: 'service-painting',
    _type: 'service',
    title: 'Painting',
    description: 'Expressive acrylic works on canvas exploring gesture, depth and visual storytelling. Available as original pieces or commissioned works tailored to your space and vision.',
    tags: ['Acrylic', 'Canvas', 'Original', 'Commission'],
    order: 1,
  },
  {
    _id: 'service-digital-art',
    _type: 'service',
    title: 'Digital Art',
    description: 'Bold digital illustration blending geometric structure and expressive composition. Exploring identity, expression and movement through contemporary visual language.',
    tags: ['Digital', 'Illustration', 'Print', 'Commission'],
    order: 2,
  },
  {
    _id: 'service-textile-art',
    _type: 'service',
    title: 'Textile Art',
    description: 'Artworks in cloth, thread and tactile form. Bespoke textile pieces that hold memory, identity and emotion — wall-mounted sculptures and fabric installations.',
    tags: ['Textile', 'Fabric', 'Handmade', 'Installation'],
    order: 3,
  },
  {
    _id: 'service-digital-couture',
    _type: 'service',
    title: 'Digital Couture',
    description: 'Virtual fashion concepts bridging the tactile world and the digital one. Wearable digital art, AI-assisted design and creative technology collaborations.',
    tags: ['Fashion', 'AI', 'Digital', 'Wearable'],
    order: 4,
  },
  {
    _id: 'service-generative-art',
    _type: 'service',
    title: 'Generative Art',
    description: 'Algorithmic art where technology becomes a collaborator. Guided colour palettes, form and mood create unique works that sit at the edge of craft and code.',
    tags: ['Algorithm', 'Code', 'Generative', 'Print'],
    order: 5,
  },
  {
    _id: 'service-murals',
    _type: 'service',
    title: 'Murals',
    description: 'Community-centred public art created to inspire connection, resilience and collective wellbeing. Available for public spaces, organisations and community projects.',
    tags: ['Public Art', 'Community', 'Large-scale', 'Commission'],
    order: 6,
  },
  {
    _id: 'service-workshops',
    _type: 'service',
    title: 'Workshops',
    description: 'Hands-on creative workshops where participants explore art-making at the intersection of traditional craft and emerging technology. Available for communities, schools and organisations.',
    tags: ['Education', 'Community', 'Wellbeing', 'Hands-on'],
    order: 7,
  },
  {
    _id: 'service-photography',
    _type: 'service',
    title: 'Photography',
    description: 'Nature photography that finds beauty and pattern in the world around us. Prints available; bespoke shoots for editorial, product and event coverage.',
    tags: ['Photography', 'Nature', 'Print', 'Editorial'],
    order: 8,
  },

  /* ── FAQs ───────────────────────────────────────────────────── */
  {
    _id: 'faq-commission-process',
    _type: 'faq',
    question: 'How does the commission process work?',
    answer: [
      {
        _type: 'block',
        _key: 'block1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span1',
            text: 'Every commission begins with a conversation. Get in touch via the contact page with your idea, preferred medium, size and any references. I\'ll share a proposal and timeline, and we\'ll work together from there. A 50% deposit secures the project before work begins.',
          },
        ],
      },
    ],
    order: 1,
  },
  {
    _id: 'faq-original-vs-print',
    _type: 'faq',
    question: 'Do you sell originals or prints?',
    answer: [
      {
        _type: 'block',
        _key: 'block1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span1',
            text: 'Both. Original works are available where marked in the gallery. Limited edition prints are available for selected paintings and digital works. Each print is produced on archival-quality paper and signed. Get in touch to enquire about a specific piece.',
          },
        ],
      },
    ],
    order: 2,
  },
  {
    _id: 'faq-collaboration',
    _type: 'faq',
    question: 'Are you open to collaborations and exhibitions?',
    answer: [
      {
        _type: 'block',
        _key: 'block1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span1',
            text: 'Yes. I am open to gallery exhibitions, artist residencies, editorial collaborations, and community projects. If you\'re curating a show, running an initiative or looking for a creative partner, please reach out with the details.',
          },
        ],
      },
    ],
    order: 3,
  },
  {
    _id: 'faq-workshops',
    _type: 'faq',
    question: 'Can I book a workshop for my school or organisation?',
    answer: [
      {
        _type: 'block',
        _key: 'block1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span1',
            text: 'Absolutely. I run creative workshops that blend traditional art-making with emerging technology — suitable for community groups, schools and corporate wellbeing programmes. Sessions can be tailored to your audience, goals and timeframe. Contact me to discuss availability.',
          },
        ],
      },
    ],
    order: 4,
  },
  {
    _id: 'faq-shipping',
    _type: 'faq',
    question: 'Do you ship internationally?',
    answer: [
      {
        _type: 'block',
        _key: 'block1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span1',
            text: 'Yes, original works and prints can be shipped internationally. All work is carefully packaged to ensure safe delivery. Shipping costs and timelines vary by destination and will be confirmed at the time of purchase or commission.',
          },
        ],
      },
    ],
    order: 5,
  },
  {
    _id: 'faq-digital-couture',
    _type: 'faq',
    question: 'What is digital couture and how can I get involved?',
    answer: [
      {
        _type: 'block',
        _key: 'block1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span1',
            text: 'Digital couture sits at the intersection of fashion, illustration and technology. I create virtual garments and wearable digital art using AI and illustration tools. If you\'re interested in a personalised digital fashion piece, a brand collaboration or a creative technology project, I\'d love to hear from you.',
          },
        ],
      },
    ],
    order: 6,
  },

  /* ── Legal Pages ─────────────────────────────────────────────── */
  {
    _id: 'legal-privacy-policy',
    _type: 'legalPage',
    title: 'Privacy Policy',
    slug: { _type: 'slug', current: 'privacy-policy' },
    effectiveDate: '2026-01-01',
    lastUpdated: '2026-06-01',
    body: [
      {
        _type: 'block', _key: 'h1', style: 'h2',
        children: [{ _type: 'span', _key: 's1', text: 'Who We Are' }],
      },
      {
        _type: 'block', _key: 'p1', style: 'normal',
        children: [{ _type: 'span', _key: 's2', text: 'This website is operated by Lateefat Tobun, a multidisciplinary artist based in Bradford, United Kingdom. When you use this website or contact us, we may collect and process personal data. This policy explains how.' }],
      },
      {
        _type: 'block', _key: 'h2', style: 'h2',
        children: [{ _type: 'span', _key: 's3', text: 'What Data We Collect' }],
      },
      {
        _type: 'block', _key: 'p2', style: 'normal',
        children: [{ _type: 'span', _key: 's4', text: 'We collect information you voluntarily provide when using the contact form: your name, email address, telephone number (optional) and message content. If you sign up for our newsletter, we collect your email address.' }],
      },
      {
        _type: 'block', _key: 'h3', style: 'h2',
        children: [{ _type: 'span', _key: 's5', text: 'How We Use Your Data' }],
      },
      {
        _type: 'block', _key: 'p3', style: 'normal',
        children: [{ _type: 'span', _key: 's6', text: 'Your data is used solely to respond to your enquiry, process a commission or send newsletter updates you have opted into. We do not sell, rent or share your personal data with third parties for marketing purposes.' }],
      },
      {
        _type: 'block', _key: 'h4', style: 'h2',
        children: [{ _type: 'span', _key: 's7', text: 'Data Retention' }],
      },
      {
        _type: 'block', _key: 'p4', style: 'normal',
        children: [{ _type: 'span', _key: 's8', text: 'Enquiry data is retained for up to 24 months. Newsletter subscribers may unsubscribe at any time and their data will be removed promptly.' }],
      },
      {
        _type: 'block', _key: 'h5', style: 'h2',
        children: [{ _type: 'span', _key: 's9', text: 'Your Rights' }],
      },
      {
        _type: 'block', _key: 'p5', style: 'normal',
        children: [{ _type: 'span', _key: 's10', text: 'Under UK GDPR you have the right to access, correct or delete your personal data at any time. To exercise these rights, contact us at hello@tobunlateefat.com.' }],
      },
      {
        _type: 'block', _key: 'h6', style: 'h2',
        children: [{ _type: 'span', _key: 's11', text: 'Cookies' }],
      },
      {
        _type: 'block', _key: 'p6', style: 'normal',
        children: [{ _type: 'span', _key: 's12', text: 'This website uses minimal cookies necessary for basic functionality. No third-party advertising cookies are used. Analytics, if present, are used only to understand broad site usage patterns.' }],
      },
      {
        _type: 'block', _key: 'h7', style: 'h2',
        children: [{ _type: 'span', _key: 's13', text: 'Contact' }],
      },
      {
        _type: 'block', _key: 'p7', style: 'normal',
        children: [{ _type: 'span', _key: 's14', text: 'For any privacy-related questions, write to hello@tobunlateefat.com or by post to Bradford, United Kingdom.' }],
      },
    ],
  },
  {
    _id: 'legal-terms-of-service',
    _type: 'legalPage',
    title: 'Terms of Service',
    slug: { _type: 'slug', current: 'terms-of-service' },
    effectiveDate: '2026-01-01',
    lastUpdated: '2026-06-01',
    body: [
      {
        _type: 'block', _key: 'h1', style: 'h2',
        children: [{ _type: 'span', _key: 's1', text: 'Acceptance of Terms' }],
      },
      {
        _type: 'block', _key: 'p1', style: 'normal',
        children: [{ _type: 'span', _key: 's2', text: 'By accessing or using tobunlateefat.com you agree to be bound by these terms. If you do not agree, please do not use this site.' }],
      },
      {
        _type: 'block', _key: 'h2', style: 'h2',
        children: [{ _type: 'span', _key: 's3', text: 'Intellectual Property' }],
      },
      {
        _type: 'block', _key: 'p2', style: 'normal',
        children: [{ _type: 'span', _key: 's4', text: 'All artworks, images, text and other content on this site are the intellectual property of Lateefat Tobun unless otherwise stated. You may not reproduce, distribute or use any content without express written permission.' }],
      },
      {
        _type: 'block', _key: 'h3', style: 'h2',
        children: [{ _type: 'span', _key: 's5', text: 'Commissions and Purchases' }],
      },
      {
        _type: 'block', _key: 'p3', style: 'normal',
        children: [{ _type: 'span', _key: 's6', text: 'Commission agreements are governed by a separate contract confirmed via email. A 50% non-refundable deposit is required to begin work. The remaining balance is due upon completion before delivery. Prints and originals are non-refundable unless damaged in transit.' }],
      },
      {
        _type: 'block', _key: 'h4', style: 'h2',
        children: [{ _type: 'span', _key: 's7', text: 'Limitation of Liability' }],
      },
      {
        _type: 'block', _key: 'p4', style: 'normal',
        children: [{ _type: 'span', _key: 's8', text: 'This website is provided "as is". Lateefat Tobun makes no warranties regarding the accuracy or availability of the site and is not liable for any damages arising from its use.' }],
      },
      {
        _type: 'block', _key: 'h5', style: 'h2',
        children: [{ _type: 'span', _key: 's9', text: 'Governing Law' }],
      },
      {
        _type: 'block', _key: 'p5', style: 'normal',
        children: [{ _type: 'span', _key: 's10', text: 'These terms are governed by the laws of England and Wales. Any disputes shall be subject to the exclusive jurisdiction of the courts of England and Wales.' }],
      },
      {
        _type: 'block', _key: 'h6', style: 'h2',
        children: [{ _type: 'span', _key: 's11', text: 'Changes to Terms' }],
      },
      {
        _type: 'block', _key: 'p6', style: 'normal',
        children: [{ _type: 'span', _key: 's12', text: 'We reserve the right to update these terms at any time. Continued use of the site after changes constitutes your acceptance of the revised terms.' }],
      },
    ],
  },
]

async function seed() {
  console.log(`Seeding ${documents.length} documents to project f5jgmo2u/production...`)

  const transaction = client.transaction()
  for (const doc of documents) {
    transaction.createOrReplace(doc)
  }

  try {
    const result = await transaction.commit()
    console.log(`✓ Created/replaced ${documents.length} documents`)
    console.log('Result:', JSON.stringify(result, null, 2).slice(0, 500))
  } catch (err) {
    console.error('✗ Transaction failed:', err.message)
    process.exit(1)
  }

  // Publish all documents
  const ids = documents.map(d => d._id)
  console.log('\nPublishing all documents...')
  try {
    for (const id of ids) {
      await client.request({
        url: `/data/publish/production`,
        method: 'POST',
        body: { ids: [id] },
      }).catch(() => {}) // Some docs may not need publishing
    }
  } catch {}

  // Use mutations to publish
  const publishMutations = ids.map(id => ({
    patch: {
      id: `drafts.${id}`,
      unset: ['_id'], // will be handled by publish
    },
  }))

  console.log('Done! Open Sanity Studio to review and add images to gallery items.')
}

seed().catch(console.error)
