import {
  ServiceType,
  GalleryFilter,
  YearRange,
  EventMonth,
} from "@/utils/enums";

export type { ServiceType, GalleryFilter, YearRange, EventMonth };

export interface StatCardProps {
  value: string;
  label: string;
}

import type { AllServicesQueryResult } from "@/builders/sanity.types";
export type ServiceCardProps = AllServicesQueryResult[0];

export interface ArtworkCardProps {
  id: string;
  title: string;
  description: string;
  artist: string;
  // image: string | null;
  image: any;
  /** Larger variant for lightbox/zoom views; falls back to `image` when unset. */
  fullImage?: string | null;
  size: { height: number; width: number };
  date: string;
  price: { currency: string; amount: number };
  availability: "available" | "sold" | "not_for_sale";
}

export interface BlogPostProps {
  id: string;
  slug?: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: number;
  authorName?: string;
  authorImage?: string;
}

export interface TestimonialProps {
  id: string;
  name: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface EventProps {
  id: string;
  title: string;
  type: string;
  date: string;
  time: string;
  location: string;
  slots?: number;
  image: string;
  details: string[];
}

export interface FAQItemProps {
  question: string;
  answer: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface NewsletterFormData {
  email: string;
}
