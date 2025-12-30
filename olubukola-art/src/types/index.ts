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

export type { Service as ServiceCardProps } from "@/builders";

export interface ArtworkCardProps {
  id: string;
  title: string;
  description: string;
  artist: string;
  image: string;
  size: { height: number; width: number };
  date: string;
  price: number;
  availability: "available" | "sold" | "not_for_sale";
}

export interface BlogPostProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: number;
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
