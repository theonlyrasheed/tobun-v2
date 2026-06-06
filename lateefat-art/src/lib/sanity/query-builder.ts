import { sanityClient, urlFor } from './client'
import {
  faqsQuery,
  testimonialsQuery,
  servicesQuery,
  eventsQuery,
  exhibitionsQuery,
  galleryQuery,
  pressArticlesQuery,
  pressArticleBySlugQuery,
  legalPageBySlugQuery,
} from './queries'
import {
  fallbackFAQs,
  fallbackTestimonials,
  fallbackServices,
  fallbackEvents,
  fallbackExhibitions,
  fallbackGalleryItems,
} from '@/data/fallbacks'
import { pressArticles } from '@/data/press'
import type { FAQ, Testimonial, Service, SiteEvent, Exhibition, GalleryItem, LegalPage } from '@/types/sanity'
import type { PressArticle } from '@/data/press'

/* ── Helper ───────────────────────────────────────────────────── */
async function tryFetch<T>(query: string, params?: Record<string, unknown>): Promise<T | null> {
  try {
    return await sanityClient.fetch<T>(query, params ?? {})
  } catch (err) {
    console.error('[Sanity fetch error]', err)
    return null
  }
}

function calcReadTime(body: any[]): string {
  if (!body?.length) return '1 min read'
  let words = 0
  body.forEach((block) => {
    if (block._type === 'block' && block.children) {
      block.children.forEach((child: any) => {
        if (child.text) words += child.text.split(/\s+/).filter(Boolean).length
      })
    }
  })
  return `${Math.max(1, Math.round(words / 200))} min read`
}

function calcAspect(w: number, h: number): string {
  const r = w / h
  if (Math.abs(r - 1) < 0.05) return '1/1'
  if (Math.abs(r - 1.25) < 0.05) return '5/4'
  if (Math.abs(r - 0.8) < 0.05) return '4/5'
  if (r > 1.3) return '4/3'
  if (r < 0.7) return '2/3'
  return '3/4'
}

/* ── Query builder ────────────────────────────────────────────── */
export const sanityQ = {

  faqs: {
    key: () => ['faqs'] as const,
    fetch: async (): Promise<FAQ[]> => {
      const data = await tryFetch<FAQ[]>(faqsQuery)
      return data?.length ? data : fallbackFAQs
    },
  },

  testimonials: {
    key: () => ['testimonials'] as const,
    fetch: async (): Promise<Testimonial[]> => {
      const data = await tryFetch<any[]>(testimonialsQuery)
      if (data?.length) {
        return data.map((item) => ({
          name: item.name,
          title: item.title || '',
          avatarUrl: item.avatar ? urlFor(item.avatar).width(120).height(120).url() : '',
          quote: item.quote,
          rating: item.rating || 5,
        }))
      }
      return fallbackTestimonials
    },
  },

  services: {
    key: () => ['services'] as const,
    fetch: async (): Promise<Service[]> => {
      const data = await tryFetch<Service[]>(servicesQuery)
      return data?.length ? data : fallbackServices
    },
  },

  events: {
    key: () => ['events'] as const,
    fetch: async (): Promise<SiteEvent[]> => {
      const data = await tryFetch<any[]>(eventsQuery)
      if (data?.length) {
        return data.map((item) => {
          const dateObj = new Date(item.date)
          const formatted = dateObj.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
          return {
            yr: item.yr || dateObj.getFullYear().toString(),
            date: `${formatted} · ${item.location}`,
            title: item.title,
            desc: item.desc,
            badge: item.badge,
            img: urlFor(item.image).width(800).url(),
            href: item.href || '/contact',
          }
        })
      }
      return fallbackEvents
    },
  },

  exhibitions: {
    key: () => ['exhibitions'] as const,
    fetch: async (): Promise<Exhibition[]> => {
      const data = await tryFetch<any[]>(exhibitionsQuery)
      if (data?.length) {
        return data.map((item) => {
          const dateObj = new Date(item.date)
          const yr = dateObj.getFullYear().toString()
          const dateFormatted = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
          return {
            year: item.year || yr,
            name: item.name,
            place: item.place,
            desc: item.desc,
            record: {
              kicker: item.kicker || `Exhibition · ${yr}`,
              title: item.name,
              meta: [dateFormatted, item.time, item.location || item.place, ...(item.categories || [])].filter(Boolean),
              img: urlFor(item.image).width(1200).url(),
              paragraphs: item.paragraphs || [],
              gallery: item.gallery ? item.gallery.map((g: any) => urlFor(g).width(800).url()) : [],
              cta: { label: item.ctaLabel || 'Enquire about this series', href: item.ctaHref || '/contact' },
            },
          }
        })
      }
      return fallbackExhibitions
    },
  },

  gallery: {
    key: () => ['gallery'] as const,
    fetch: async (): Promise<GalleryItem[]> => {
      const data = await tryFetch<any[]>(galleryQuery)
      if (data?.length) {
        return data.map((item) => {
          const w = item.imageWidth || 1200
          const h = item.imageHeight || 900
          return {
            seed: item.slug?.current || Math.random().toString(36).substring(7),
            title: item.title,
            cat: item.album?.slug?.current || 'other',
            aspect: calcAspect(w, h),
            w,
            h,
            year: item.created_at ? new Date(item.created_at).getFullYear().toString() : '2025',
            subtitle: item.album?.title || 'Artwork',
            src: urlFor(item.main_image).width(800).url(),
            largeSrc: urlFor(item.main_image).width(1600).url(),
            variant: 'default' as const,
          }
        })
      }
      return fallbackGalleryItems
    },
  },

  press: {
    all: {
      key: () => ['press'] as const,
      fetch: async (): Promise<PressArticle[]> => {
        const data = await tryFetch<any[]>(pressArticlesQuery)
        if (data?.length) {
          return data.map((item) => {
            const dateObj = new Date(item.published_at)
            return {
              slug: item.slug,
              outlet: item.outlet,
              kind: item.kind || 'Feature',
              date: dateObj.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
              read: calcReadTime(item.body),
              title: item.title,
              standfirst: item.standfirst || item.excerpt || '',
              hero: urlFor(item.main_image).width(1600).url(),
              heroCaption: '',
              body: item.body,
              gallery: item.gallery ? item.gallery.map((g: any) => urlFor(g).width(800).url()) : [],
              source: { label: item.source?.label || 'Read the original', href: item.source?.href || '#' },
            }
          })
        }
        return pressArticles
      },
    },
    detail: {
      key: (slug: string) => ['press', 'detail', slug] as const,
      fetch: async (slug: string): Promise<PressArticle | null> => {
        const item = await tryFetch<any>(pressArticleBySlugQuery, { slug })
        if (item) {
          const dateObj = new Date(item.published_at)
          return {
            slug: item.slug,
            outlet: item.outlet,
            kind: item.kind || 'Feature',
            date: dateObj.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            read: calcReadTime(item.body),
            title: item.title,
            standfirst: item.standfirst || item.excerpt || '',
            hero: urlFor(item.main_image).width(1600).url(),
            heroCaption: '',
            body: item.body,
            gallery: item.gallery ? item.gallery.map((g: any) => urlFor(g).width(800).url()) : [],
            source: { label: item.source?.label || 'Read the original', href: item.source?.href || '#' },
          }
        }
        return pressArticles.find((a) => a.slug === slug) ?? null
      },
    },
  },

  legalPages: {
    detail: {
      key: (slug: string) => ['legal', slug] as const,
      fetch: (slug: string): Promise<LegalPage | null> =>
        tryFetch<LegalPage>(legalPageBySlugQuery, { slug }),
    },
  },

}
