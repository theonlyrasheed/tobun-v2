import { keepPreviousData, useQuery } from "@tanstack/react-query";
import {
  serviceApi,
  testimonialApi,
  faqApi,
  eventApi,
  companyApi,
} from "./api";

// Service hooks
export const useServices = () => {
  return useQuery({
    queryKey: ["services"],
    queryFn: serviceApi.getAllServices,
    placeholderData: keepPreviousData,
  });
};

export const useFeaturedServices = () => {
  return useQuery({
    queryKey: ["services", "featured"],
    queryFn: serviceApi.getFeaturedServices,
    placeholderData: keepPreviousData,
  });
};

export const useService = (slug: string) => {
  return useQuery({
    queryKey: ["service", slug],
    queryFn: () => serviceApi.getServiceBySlug(slug),
    enabled: !!slug,
    placeholderData: keepPreviousData,
  });
};

// Testimonial hooks
export const useTestimonials = () => {
  return useQuery({
    queryKey: ["testimonials"],
    queryFn: testimonialApi.getAllTestimonials,
    placeholderData: keepPreviousData,
  });
};

// FAQ hooks
export const useFaqs = () => {
  return useQuery({
    queryKey: ["faqs"],
    queryFn: faqApi.getAllFaqs,
    placeholderData: keepPreviousData,
  });
};

export const useFeaturedFaqs = () => {
  return useQuery({
    queryKey: ["faqs", "featured"],
    queryFn: faqApi.getFeaturedFaqs,
    placeholderData: keepPreviousData,
  });
};

// Event hooks
export const useEvents = () => {
  return useQuery({
    queryKey: ["events"],
    queryFn: eventApi.getAllEvents,
    placeholderData: keepPreviousData,
  });
};

export const useUpcomingEvents = () => {
  return useQuery({
    queryKey: ["events", "upcoming"],
    queryFn: eventApi.getUpcomingEvents,
    placeholderData: keepPreviousData,
  });
};

// Company hooks
export const useCompanies = () => {
  return useQuery({
    queryKey: ["companies"],
    queryFn: companyApi.getAllCompanies,
    placeholderData: keepPreviousData,
  });
};
