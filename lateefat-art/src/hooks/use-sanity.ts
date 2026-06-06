import { useQuery } from '@tanstack/react-query'
import { sanityQ } from '@/lib/sanity/query-builder'
import type { FAQ, Testimonial, Service, SiteEvent, Exhibition, GalleryItem, LegalPage } from '@/types/sanity'
import type { PressArticle } from '@/data/press'

const STALE = 5 * 60 * 1000       /* 5 min */
const STALE_LONG = 30 * 60 * 1000 /* 30 min — settings/legal rarely change */

export function useFAQs() {
  return useQuery<FAQ[]>({
    queryKey: sanityQ.faqs.key(),
    queryFn: sanityQ.faqs.fetch,
    staleTime: STALE,
  })
}

export function useTestimonials() {
  return useQuery<Testimonial[]>({
    queryKey: sanityQ.testimonials.key(),
    queryFn: sanityQ.testimonials.fetch,
    staleTime: STALE,
  })
}

export function useServices() {
  return useQuery<Service[]>({
    queryKey: sanityQ.services.key(),
    queryFn: sanityQ.services.fetch,
    staleTime: STALE,
  })
}

export function useEvents() {
  return useQuery<SiteEvent[]>({
    queryKey: sanityQ.events.key(),
    queryFn: sanityQ.events.fetch,
    staleTime: STALE,
  })
}

export function useExhibitions() {
  return useQuery<Exhibition[]>({
    queryKey: sanityQ.exhibitions.key(),
    queryFn: sanityQ.exhibitions.fetch,
    staleTime: STALE,
  })
}

export function useGallery() {
  return useQuery<GalleryItem[]>({
    queryKey: sanityQ.gallery.key(),
    queryFn: sanityQ.gallery.fetch,
    staleTime: STALE,
  })
}

export function usePressArticles() {
  return useQuery<PressArticle[]>({
    queryKey: sanityQ.press.all.key(),
    queryFn: sanityQ.press.all.fetch,
    staleTime: STALE,
  })
}

export function usePressArticle(slug: string) {
  return useQuery<PressArticle | null>({
    queryKey: sanityQ.press.detail.key(slug),
    queryFn: () => sanityQ.press.detail.fetch(slug),
    staleTime: STALE,
    enabled: !!slug,
  })
}

export function useLegalPage(slug: string) {
  return useQuery<LegalPage | null>({
    queryKey: sanityQ.legalPages.detail.key(slug),
    queryFn: () => sanityQ.legalPages.detail.fetch(slug),
    staleTime: STALE_LONG,
    enabled: !!slug,
  })
}
