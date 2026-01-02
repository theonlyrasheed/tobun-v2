import { createServerFn } from "@tanstack/react-start";
import {
  serviceApi,
  testimonialApi,
  faqApi,
  eventApi,
  companyApi,
} from "./api";

// Service server functions
export const getAllServices = createServerFn({ method: "GET" }).handler(
  async () => {
    return await serviceApi.getAllServices();
  }
);

export const getFeaturedServices = createServerFn({ method: "GET" }).handler(
  async () => {
    return await serviceApi.getFeaturedServices();
  }
);

export const getServiceBySlug = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    return await serviceApi.getServiceBySlug(slug);
  });

// Testimonial server functions
export const getAllTestimonials = createServerFn({ method: "GET" }).handler(
  async () => {
    return await testimonialApi.getAllTestimonials();
  }
);

// FAQ server functions
export const getAllFaqs = createServerFn({ method: "GET" }).handler(
  async () => {
    return (await faqApi.getAllFaqs()) as any;
  }
);

export const getFeaturedFaqs = createServerFn({ method: "GET" }).handler(
  async () => {
    return (await faqApi.getFeaturedFaqs()) as any;
  }
);

// Event server functions
export const getAllEvents = createServerFn({ method: "GET" }).handler(
  async () => {
    return (await eventApi.getAllEvents()) as any;
  }
);

export const getUpcomingEvents = createServerFn({ method: "GET" }).handler(
  async () => {
    return (await eventApi.getUpcomingEvents()) as any;
  }
);

// Company server functions
export const getAllCompanies = createServerFn({ method: "GET" }).handler(
  async () => {
    return await companyApi.getAllCompanies();
  }
);
