import { sanityClient, urlFor } from './client'
import {
  faqsQuery,
  testimonialsQuery,
  servicesQuery,
  eventsQuery,
  eventBySlugQuery,
  exhibitionsQuery,
  galleryQuery,
  pressArticlesQuery,
  pressArticleBySlugQuery,
  legalPageBySlugQuery,
  siteSettingsQuery,
  timelineMilestonesQuery,
} from './queries'
import {
  fallbackFAQs,
  fallbackTestimonials,
  fallbackServices,
  fallbackEvents,
  fallbackExhibitions,
  fallbackGalleryItems,
  fallbackTimelineMilestones,
} from '@/data/fallbacks'
import { pressArticles } from '@/data/press'
import type { FAQ, Testimonial, Service, SiteEvent, EventStatus, Exhibition, GalleryItem, LegalPage, SiteSettings, TimelineMilestone } from '@/types/sanity'
import type { PressArticle } from '@/data/press'

/* ── Helper ───────────────────────────────────────────────────── */
async function isDevHost() {
  if (typeof window !== "undefined") {
    const hostname = window.location.hostname
    return hostname === "dev.tobunlateefat.com" || hostname.endsWith(".dev.tobunlateefat.com")
  }
  try {
    const serverModule = "@tanstack/react-start/server"
    const { getRequestHeaders } = await import(serverModule)
    const headers = getRequestHeaders() as Record<string, string | string[] | undefined>
    const forwardedHost = headers["x-forwarded-host"]
    const hostHeader = headers["host"]
    const rawHost = forwardedHost || hostHeader
    const host = Array.isArray(rawHost) ? rawHost[0] : rawHost
    const cleanHost = host ? host.split(":")[0] : ""
    return cleanHost === "dev.tobunlateefat.com" || cleanHost.endsWith(".dev.tobunlateefat.com")
  } catch (e) {
    return false
  }
}

async function tryFetch<T>(query: string, params?: Record<string, unknown>): Promise<T | null> {
  const isDev = await isDevHost()
  if (!isDev && import.meta.env.VITE_MAINTENANCE_MODE === "true") {
    return null
  }
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

/* ── Event status helpers ─────────────────────────────────────── */
function getEventStatus(dateISO: string, endDateISO?: string): EventStatus {
  const now = Date.now()
  const start = new Date(dateISO).getTime()
  const end = endDateISO ? new Date(endDateISO).getTime() : null
  if (now < start) return 'upcoming'
  if (end !== null && now <= end) return 'ongoing'
  return 'expired'
}

function mapEvent(item: any): SiteEvent {
  const dateObj = new Date(item.date)
  const formatted = dateObj.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  return {
    slug: item.slug || '',
    rawDate: item.date,
    rawEndDate: item.end_date ?? undefined,
    status: getEventStatus(item.date, item.end_date),
    yr: dateObj.getFullYear().toString(),
    date: `${formatted} · ${item.location || ''}`,
    title: item.title,
    desc: item.desc,
    badge: item.badge,
    img: urlFor(item.image).width(800).url(),
    href: item.booking_url || item.href || '/contact',
    location: item.location || '',
    featured: item.featured ?? false,
    bookingUrl: item.booking_url ?? undefined,
    body: item.body ?? undefined,
  }
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
      const data = await tryFetch<any[]>(servicesQuery)
      if (data?.length) {
        return data.map((item) => ({
          title: item.title,
          description: item.description,
          tags: item.tags || [],
          order: item.order,
          slug: item.slug || '',
          // gallery_ref takes priority; fall back to uploaded image
          image: item.gallery_image
            ? urlFor(item.gallery_image).width(800).height(1000).fit('crop').url()
            : item.image
            ? urlFor(item.image).width(800).height(1000).fit('crop').url()
            : undefined,
        }))
      }
      return fallbackServices
    },
  },

  events: {
    key: () => ['events'] as const,
    fetch: async (): Promise<SiteEvent[]> => {
      const data = await tryFetch<any[]>(eventsQuery)
      if (data?.length) {
        return data.map((item) => mapEvent(item))
      }
      return fallbackEvents
    },
    detail: {
      key: (slug: string) => ['events', 'detail', slug] as const,
      fetch: async (slug: string): Promise<SiteEvent | null> => {
        const item = await tryFetch<any>(eventBySlugQuery, { slug })
        return item ? mapEvent(item) : null
      },
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
            seed: item.slug || Math.random().toString(36).substring(7),
            title: item.title,
            cat: item.album?.slug?.current || 'other',
            aspect: calcAspect(w, h),
            w,
            h,
            year: item.created_at ? new Date(item.created_at).getFullYear().toString() : '2025',
            subtitle: item.album?.title || 'Artwork',
            src: urlFor(item.main_image).width(800).url(),
            largeSrc: urlFor(item.main_image).width(1600).url(),
            variant: (item.variant as GalleryItem['variant']) || 'default',
            ...(item.color ? { color: item.color } : {}),
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
              featured: item.featured ?? false,
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

  timeline: {
    key: () => ['timeline'] as const,
    fetch: async (): Promise<TimelineMilestone[]> => {
      const data = await tryFetch<any[]>(timelineMilestonesQuery)
      if (data?.length) {
        return data.map((item) => ({
          year: item.year,
          title: item.title,
          description: item.description,
          order: item.order,
        }))
      }
      return fallbackTimelineMilestones
    },
  },

  siteSettings: {
    key: () => ['site-settings'] as const,
    fetch: (): Promise<SiteSettings | null> =>
      tryFetch<SiteSettings>(siteSettingsQuery),
  },

}
