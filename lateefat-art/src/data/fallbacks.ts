import type { FAQ, Testimonial, Service, SiteEvent, Exhibition, GalleryItem } from '@/types/sanity'

export const fallbackFAQs: FAQ[] = [
  {
    question: 'Do you take on commissions?',
    answer: [{ _type: 'block', children: [{ _type: 'span', text: "Yes — I take a limited number of couture, textile, mural and digital commissions each year. Share your idea, timeline and space, and I'll tell you honestly whether it's a fit." }] }],
  },
  {
    question: 'Can you run a workshop for my group?',
    answer: [{ _type: 'block', children: [{ _type: 'span', text: 'Absolutely. I run printing workshops, fashion-tech bootcamps and mindful art sessions for schools, companies and communities — in person across the UK and remotely worldwide.' }] }],
  },
  {
    question: 'How does AI fit into your practice?',
    answer: [{ _type: 'block', children: [{ _type: 'span', text: 'As a collaborator, never a shortcut. I use AI and data tools to extend hand-made work into sustainable, digital wearable art — the concept, craft and cultural story always lead.' }] }],
  },
  {
    question: 'Where are you based, and do you ship?',
    answer: [{ _type: 'block', children: [{ _type: 'span', text: "I'm based in Bradford, United Kingdom, and work internationally. Original pieces and prints ship worldwide; bespoke and large-scale works are arranged case by case." }] }],
  },
  {
    question: "What's the timeline for a project?",
    answer: [{ _type: 'block', children: [{ _type: 'span', text: "It depends on scope — a print can be a couple of weeks, while couture or murals run one to three months. We'll map clear milestones before any work starts." }] }],
  },
]

export const fallbackTestimonials: Testimonial[] = [
  {
    name: 'Amara Okafor',
    title: 'Workshop participant · Bradford',
    avatarUrl: '/assets/img/avatar-tst-av-1.png',
    quote: 'Lateefat turned a room of strangers into makers in an afternoon. People left holding something they made — and a little more of themselves.',
    rating: 5,
  },
  {
    name: 'Daniel Mensah',
    title: 'Curator · Accra',
    avatarUrl: '/assets/img/avatar-tst-av-2.png',
    quote: 'Her work sits exactly where tradition meets technology. The ADIRE indigo feels ancestral and the digital layer feels like tomorrow.',
    rating: 5,
  },
  {
    name: 'Sofia Reyes',
    title: 'Creative director · London',
    avatarUrl: '/assets/img/avatar-tst-av-3.png',
    quote: 'Collaborating with Lateefat is rare — rigorous about the craft, generous with the vision. She makes the ambitious feel inevitable.',
    rating: 5,
  },
]

export const fallbackServices: Service[] = [
  {
    title: 'Creative Services',
    description: 'Digital illustration, textile & visual art, fashion-tech commissions and custom couture pieces.',
    tags: ['Illustration', 'Textile', 'Couture'],
    order: 1,
  },
  {
    title: 'Tech & Innovation',
    description: 'Virtual art, AR activations, AI-generated work, media art and digital commerce experiences.',
    tags: ['AR', 'AI', 'Digital Commerce'],
    order: 2,
  },
  {
    title: 'Learning & Workshops',
    description: 'Printing workshops, fashion-tech bootcamps and mindful art sessions for groups and communities.',
    tags: ['Workshops', 'Bootcamps', 'Wellbeing'],
    order: 3,
  },
]

export const fallbackEvents: SiteEvent[] = [
  { yr: '2026', date: 'Mar 2026 · UK', title: 'The Pocket Stories', desc: 'Wearable couture, ADIRE printing and storytelling for the whole community.', badge: 'Free', img: 'https://picsum.photos/seed/lt-19-the-pocket-stories/800/900', href: '/contact' },
  { yr: '2025', date: 'Sep 2025 · UK', title: 'Mindful Regulation', desc: 'Using art as a therapeutic tool to regulate emotion and find calm.', badge: 'Free', img: 'https://picsum.photos/seed/lt-20-mindful-regulation/800/900', href: '/contact' },
  { yr: '2024', date: 'May 2024 · Ghana', title: 'Elevating Heritage', desc: 'A hands-on textile-printing workshop reconnecting craft and identity.', badge: 'Ticketed', img: 'https://picsum.photos/seed/lt-21-elevating-heritage/800/900', href: '/contact' },
  { yr: '2023', date: 'Nov 2023 · UK', title: 'The Art We Carry', desc: 'A reflective session on identity, weight and belonging through charcoal.', badge: 'Free', img: 'https://picsum.photos/seed/lt-22-the-art-we-carry/800/900', href: '/contact' },
  { yr: '2022', date: 'Jul 2022 · UK', title: 'Fashion-Tech Bootcamp', desc: 'Hands-on intro to digital couture, illustration and AI tools.', badge: 'Ticketed', img: 'https://picsum.photos/seed/lt-23-fashion-tech-bootc/800/900', href: '/contact' },
  { yr: '2020', date: '2020 · UK', title: 'The First Workshop', desc: 'The session that started it all — 40+ participants, one shared goal.', badge: 'Free', img: 'https://picsum.photos/seed/lt-24-first-workshop/800/900', href: '/contact' },
]

export const fallbackExhibitions: Exhibition[] = [
  {
    year: '2026', name: 'The Pocket Stories', place: 'United Kingdom',
    desc: 'Wearable digital couture exploring memory and the garments we carry.',
    record: {
      kicker: 'Exhibition · 2026', title: 'The Pocket Stories',
      meta: ['Mar 14–28, 2026', '11am–7pm', 'Bradford, United Kingdom', 'Digital Couture'],
      img: 'https://picsum.photos/seed/lt-19-the-pocket-stories/1000/750',
      paragraphs: [
        'Wearable digital couture exploring memory and the garments we carry. The Pocket Stories asks a simple question — what do we keep, and where do we keep it? — and answers it in fabric, indigo and rendered cloth.',
        'Built around ADIRE printing and digital pattern, each piece pairs a physical garment with a digital twin you can wear in virtual space. Visitors are invited to leave a story behind in a pocket; by closing night the gallery itself becomes the artwork.',
      ],
      gallery: ['https://picsum.photos/seed/lt-1-digital-couture-01/600/600', 'https://picsum.photos/seed/lt-14-wearable-art/600/600', 'https://picsum.photos/seed/lt-9-tie-dye-pattern/600/600', 'https://picsum.photos/seed/lt-8-digital-couture-02/600/600'],
      cta: { label: 'Enquire about this series', href: '/contact' },
    },
  },
  {
    year: '2025', name: 'Valentine Series', place: 'Nigeria',
    desc: 'Colour, contrast and connection across fabric, charcoal and digital media.',
    record: {
      kicker: 'Featured exhibition · 2025', title: 'Valentine Series',
      meta: ['Feb 8–22, 2025', '10am–6pm', 'Lagos, Nigeria', 'Mixed media'],
      img: 'https://picsum.photos/seed/lt-17-valentine-series-h/1000/750',
      paragraphs: [
        'A study in colour, contrast and intimacy. The Valentine Series brings together fabric painting, charcoal and digital couture into a single meditation on connection.',
        'Shown in Lagos across two weeks, the series gathered a community around a shared creative goal — colour as language, contrast as feeling, connection as the work itself.',
      ],
      gallery: ['https://picsum.photos/seed/lt-5-charcoal-contrast-/600/600', 'https://picsum.photos/seed/lt-10-visual-painting/600/600', 'https://picsum.photos/seed/lt-16-fabric-painting/600/600'],
      cta: { label: 'Enquire about this series', href: '/contact' },
    },
  },
  {
    year: '2024', name: 'Elevating Heritage', place: 'Ghana',
    desc: 'Mural and textile work celebrating Yoruba craft and pattern.',
    record: {
      kicker: 'Exhibition · 2024', title: 'Elevating Heritage',
      meta: ['May 3–17, 2024', '9am–5pm', 'Accra, Ghana', 'Mural', 'Textile'],
      img: 'https://picsum.photos/seed/lt-21-elevating-heritage/1000/750',
      paragraphs: [
        'Mural and textile work celebrating Yoruba craft and pattern. Elevating Heritage took ADIRE off the body and onto the wall — large-scale public work rooted in community and place.',
        'The Accra show paired finished murals with a live printing workshop, reconnecting craft and identity for everyone who walked through.',
      ],
      gallery: ['https://picsum.photos/seed/lt-3-clayton-community-/600/600', 'https://picsum.photos/seed/lt-11-mural-heritage/600/600', 'https://picsum.photos/seed/lt-2-adire-indigo-study/600/600'],
      cta: { label: 'Enquire about this series', href: '/contact' },
    },
  },
  {
    year: '2023', name: 'The Art We Carry', place: 'United Kingdom',
    desc: 'Charcoal and illustration on identity, weight and belonging.',
    record: {
      kicker: 'Exhibition · 2023', title: 'The Art We Carry',
      meta: ['Nov 9–23, 2023', '12pm–8pm', 'London, United Kingdom', 'Charcoal', 'Illustration'],
      img: 'https://picsum.photos/seed/lt-22-the-art-we-carry/1000/750',
      paragraphs: [
        'Charcoal and illustration on identity, weight and belonging. The Art We Carry is a reflective body of work about the things we hold and the marks they leave.',
        'Quiet, monochrome and deliberate, the series let contrast do the talking — the hand behind every line made plainly visible.',
      ],
      gallery: ['https://picsum.photos/seed/lt-5-charcoal-contrast-/600/600', 'https://picsum.photos/seed/lt-15-sketch-series/600/600', 'https://picsum.photos/seed/lt-6-digital-illustrati/600/600'],
      cta: { label: 'Enquire about this series', href: '/contact' },
    },
  },
  {
    year: '2021', name: 'Colors of Clothes', place: 'United Kingdom',
    desc: 'A fashion exhibit tracing traditional textures through digital renders.',
    record: {
      kicker: 'Exhibition · 2021', title: 'Colors of Clothes',
      meta: ['Jul 14–28, 2021', '11am–7pm', 'Bradford, United Kingdom', 'Digital Art', 'Textiles'],
      img: 'https://picsum.photos/seed/lt-25-colors-of-clothes/1000/750',
      paragraphs: ['Colors of Clothes brought traditional ADIRE printing methods to life through interactive digital fashion design, examining how cloth is coded with family memories.'],
      gallery: ['https://picsum.photos/seed/lt-10-visual-painting/600/600', 'https://picsum.photos/seed/lt-2-adire-indigo-study/600/600'],
      cta: { label: 'Enquire about this series', href: '/contact' },
    },
  },
]

export const fallbackGalleryItems: GalleryItem[] = [
  { seed: 'lt-1-digital-couture-01', title: 'Form Beyond Fabric', cat: 'couture', aspect: '3/4', w: 1200, h: 1600, year: '2024', subtitle: 'Digital Couture', variant: 'default' },
  { seed: 'lt-2-adire-indigo-study', title: 'Indigo Repetition', cat: 'textile', aspect: '1/1', w: 1400, h: 1400, year: '2019', subtitle: 'ADIRE', variant: 'light', color: 'var(--cream)' },
  { seed: 'lt-3-clayton-community-', title: 'Clayton Hub', cat: 'mural', aspect: '4/5', w: 1200, h: 1500, year: '2025', subtitle: 'Mural', variant: 'default' },
  { seed: 'lt-4-ai-feature', title: 'Synthetic Bloom', cat: 'ai', aspect: '5/4', w: 1500, h: 1200, year: '2025', subtitle: 'AI', variant: 'ochre', color: 'var(--indigo-900)' },
  { seed: 'lt-5-charcoal-contrast-', title: 'The Art We Carry', cat: 'painting', aspect: '2/3', w: 1200, h: 1800, year: '2022', subtitle: 'Painting', variant: 'default' },
  { seed: 'lt-6-digital-illustrati', title: 'Line Upon Line', cat: 'illustration', aspect: '1/1', w: 1400, h: 1400, year: '2023', subtitle: 'Illustration', variant: 'default' },
  { seed: 'lt-7-editorial-photogra', title: 'Worn Stories', cat: 'photo', aspect: '3/4', w: 1200, h: 1600, year: '2024', subtitle: 'Photography', variant: 'default' },
  { seed: 'lt-8-digital-couture-02', title: 'Runway, Rendered', cat: 'couture', aspect: '4/5', w: 1200, h: 1500, year: '2025', subtitle: 'Digital Couture', variant: 'default' },
  { seed: 'lt-9-tie-dye-pattern', title: 'Four Yards', cat: 'textile', aspect: '5/4', w: 1500, h: 1200, year: '2017', subtitle: 'ADIRE', variant: 'light', color: 'var(--cream)' },
  { seed: 'lt-10-visual-painting', title: 'Colors of Clothes', cat: 'painting', aspect: '1/1', w: 1400, h: 1400, year: '2021', subtitle: 'Painting', variant: 'default' },
  { seed: 'lt-11-mural-heritage', title: 'Elevating Heritage', cat: 'mural', aspect: '3/4', w: 1200, h: 1600, year: '2024', subtitle: 'Mural', variant: 'default' },
  { seed: 'lt-12-ai-illustration-hy', title: 'Minds on Earth', cat: 'ai illustration', aspect: '4/5', w: 1200, h: 1500, year: '2026', subtitle: 'AI · Illustration', variant: 'default' },
  { seed: 'lt-13-studio-photography', title: 'In the Making', cat: 'photo', aspect: '2/3', w: 1200, h: 1800, year: '2023', subtitle: 'Photography', variant: 'default' },
  { seed: 'lt-14-wearable-art', title: 'The Pocket Stories', cat: 'couture', aspect: '1/1', w: 1400, h: 1400, year: '2026', subtitle: 'Digital Couture', variant: 'ochre', color: 'var(--indigo-900)' },
  { seed: 'lt-15-sketch-series', title: 'Sketch by Sketch', cat: 'illustration', aspect: '5/4', w: 1500, h: 1200, year: '2020', subtitle: 'Illustration', variant: 'default' },
  { seed: 'lt-16-fabric-painting', title: 'Patterns Speak', cat: 'textile painting', aspect: '4/3', w: 1600, h: 1200, year: '2025', subtitle: 'Textile Painting', variant: 'default' },
]
