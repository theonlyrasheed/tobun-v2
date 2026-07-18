import { useQuery } from "@tanstack/react-query";
import {
  getAllServices,
  getFeaturedServices,
  getServiceBySlug,
  getAllTestimonials,
  getAllFaqs,
  getFeaturedFaqs,
  getAllEvents,
  getUpcomingEvents,
  getAllCompanies,
  getAdvertsSection,
  getStatsSection,
} from "./server-fns";
import {
  services,
  testimonials,
  events,
  faqs,
  companies,
  featuredServices,
  featuredFaqs,
  upcomingEvents,
  statsSection,
} from "./placeholder";

export const useServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: getAllServices,
    placeholderData: services,
  });
};

export const useFeaturedServices = () => {
  return useQuery({
    queryKey: ["services", "featured"],
    queryFn: getFeaturedServices,
    placeholderData: featuredServices,
  });
};

export const useService = (slug: string) => {
  return useQuery({
    queryKey: ["service", slug],
    queryFn: () => getServiceBySlug({ data: slug }),
    enabled: !!slug,
    placeholderData: services.find((service) => service.slug === slug) || null,
  });
};

// Testimonial hooks
export const useTestimonials = () => {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: getAllTestimonials,
    placeholderData: testimonials,
  });
};

// FAQ hooks
export const useFaqs = () => {
  return useQuery({
    queryKey: ["faqs"],
    queryFn: getAllFaqs,
    placeholderData: faqs,
  });
};

export const useFeaturedFaqs = () => {
  return useQuery({
    queryKey: ["faqs", "featured"],
    queryFn: getFeaturedFaqs,
    placeholderData: featuredFaqs,
  });
};

// Event hooks
export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: getAllEvents,
    placeholderData: events,
  });
};

export const useUpcomingEvents = () => {
  return useQuery({
    queryKey: ["events", "upcoming"],
    queryFn: getUpcomingEvents,
    placeholderData: upcomingEvents,
  });
};

// Company hooks
export const useCompanies = () => {
  return useQuery({
    queryKey: ["companies"],
    queryFn: getAllCompanies,
    placeholderData: companies,
  });
};

export const useAdvertsSection = () => {
  return useQuery({
    queryKey: ["adverts-section"],
    queryFn: getAdvertsSection,
    placeholderData: null,
  });
};

export const useStatsSection = () => {
  return useQuery({
    queryKey: ["stats-section"],
    queryFn: getStatsSection,
    placeholderData: statsSection,
  });
};
