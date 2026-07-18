import { sanityClient } from "../client";
import {
  AllEventsQueryResult,
  AllFaqsQueryResult,
  AllCompaniesQueryResult,
  AllServicesQueryResult,
  AllTestimonialsQueryResult,
  FeaturedFaqsQueryResult,
  FeaturedServicesQueryResult,
  ServiceBySlugQueryResult,
  UpcomingEventsQueryResult,
} from "../sanity.types";
import {
  allServicesQuery,
  allTestimonialsQuery,
  allFaqsQuery,
  allEventsQuery,
  allCompaniesQuery,
  featuredServicesQuery,
  serviceBySlugQuery,
  featuredFaqsQuery,
  upcomingEventsQuery,
  advertsSectionQuery,
  statsSectionQuery,
} from "./queries";

export const serviceApi = {
  async getAllServices(): Promise<AllServicesQueryResult> {
    try {
      const services = await sanityClient.fetch(allServicesQuery);
      return services;
    } catch (error) {
      console.error("Error fetching services:", error);
      throw new Error("Failed to fetch services");
    }
  },

  async getFeaturedServices(): Promise<FeaturedServicesQueryResult> {
    try {
      const services = await sanityClient.fetch(featuredServicesQuery);
      return services;
    } catch (error) {
      console.error("Error fetching featured services:", error);
      throw new Error("Failed to fetch featured services");
    }
  },

  async getServiceBySlug(slug: string): Promise<ServiceBySlugQueryResult> {
    try {
      const service = await sanityClient.fetch(serviceBySlugQuery, { slug });
      return service;
    } catch (error) {
      console.error("Error fetching service by slug:", error);
      throw new Error("Failed to fetch service");
    }
  },
};

export const testimonialApi = {
  async getAllTestimonials(): Promise<AllTestimonialsQueryResult> {
    try {
      const testimonials = await sanityClient.fetch(allTestimonialsQuery);
      return testimonials;
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      throw new Error("Failed to fetch testimonials");
    }
  },
};

export const faqApi = {
  async getAllFaqs(): Promise<AllFaqsQueryResult> {
    try {
      const faqs = await sanityClient.fetch(allFaqsQuery);
      return faqs;
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      throw new Error("Failed to fetch FAQs");
    }
  },

  async getFeaturedFaqs(): Promise<FeaturedFaqsQueryResult> {
    try {
      const faqs = await sanityClient.fetch(featuredFaqsQuery);
      return faqs;
    } catch (error) {
      console.error("Error fetching featured FAQs:", error);
      throw new Error("Failed to fetch featured FAQs");
    }
  },
};

export const eventApi = {
  async getAllEvents(): Promise<AllEventsQueryResult> {
    try {
      const events = await sanityClient.fetch(allEventsQuery);
      return events;
    } catch (error) {
      console.error("Error fetching events:", error);
      throw new Error("Failed to fetch events");
    }
  },

  async getUpcomingEvents(): Promise<UpcomingEventsQueryResult> {
    try {
      const events = await sanityClient.fetch(upcomingEventsQuery);
      return events;
    } catch (error) {
      console.error("Error fetching upcoming events:", error);
      throw new Error("Failed to fetch upcoming events");
    }
  },
};

export const advertsApi = {
  async getAdvertsSection(): Promise<any> {
    try {
      return await sanityClient.fetch(advertsSectionQuery);
    } catch (error) {
      console.error("Error fetching adverts section:", error);
      throw new Error("Failed to fetch adverts section");
    }
  },
};

export const statsApi = {
  async getStatsSection(): Promise<any> {
    try {
      return await sanityClient.fetch(statsSectionQuery);
    } catch (error) {
      console.error("Error fetching stats section:", error);
      throw new Error("Failed to fetch stats section");
    }
  },
};

export const companyApi = {
  async getAllCompanies(): Promise<AllCompaniesQueryResult> {
    try {
      const companies = await sanityClient.fetch(allCompaniesQuery);
      return companies;
    } catch (error) {
      console.error("Error fetching companies:", error);
      throw new Error("Failed to fetch companies");
    }
  },
};
