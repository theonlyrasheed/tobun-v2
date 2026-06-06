export interface FAQ {
  question: string
  answer: any[]
  order?: number
}

export interface Testimonial {
  name: string
  title: string
  avatarUrl: string
  quote: string
  rating: number
}

export interface Service {
  title: string
  description: string
  tags: string[]
  order?: number
}

export interface SiteEvent {
  yr: string
  date: string
  title: string
  desc: string
  badge: string
  img: string
  href: string
}

export interface ExhibitionRecord {
  kicker: string
  title: string
  meta: string[]
  img: string
  paragraphs: string[]
  gallery: string[]
  cta: { label: string; href: string }
}

export interface Exhibition {
  year: string
  name: string
  place: string
  desc: string
  record: ExhibitionRecord
}

export interface GalleryItem {
  seed: string
  title: string
  cat: string
  aspect: string
  w: number
  h: number
  year: string
  subtitle: string
  variant: 'default' | 'light' | 'ochre'
  color?: string
  src?: string
  largeSrc?: string
}

export interface LegalPage {
  _id: string
  title: string
  slug: string
  effectiveDate?: string
  lastUpdated?: string
  body: any[]
}

export interface SiteSettings {
  artistName: string
  tagline?: string
  bio?: string
  email: string
  phone?: string
  location?: string
  instagram?: string
  linkedin?: string
  twitter?: string
  facebook?: string
  seoTitle?: string
  seoDescription?: string
}
