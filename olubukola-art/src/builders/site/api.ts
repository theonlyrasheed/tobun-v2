import {
  sanityClient,
  type Service,
  type Testimonial,
  type Faq,
  type Event,
  type Company,
} from "../client";
import { SITE_QUERIES } from "./queries";

// Service API functions
export const serviceApi = {
  /**
   * Get all services
   */
  async getAllServices(): Promise<Service[]> {
    try {
      const services = await sanityClient.fetch(SITE_QUERIES.ALL_SERVICES);
      return services;
    } catch (error) {
      console.error("Error fetching services:", error);
      throw new Error("Failed to fetch services");
    }
  },

  /**
   * Get featured services
   */
  async getFeaturedServices(): Promise<Service[]> {
    try {
      const services = await sanityClient.fetch(
        `*[_type == "service" && featured == true] | order(order asc) {
          _id,
          _type,
          title,
          slug,
          description,
          enquiry_url,
          booking_url,
          order,
          featured,
          image {
            asset->{
              _id,
              url,
              metadata {
                dimensions,
                lqip
              }
            },
            alt,
            hotspot,
            crop
          }
        }`
      );
      return services;
    } catch (error) {
      console.error("Error fetching featured services:", error);
      throw new Error("Failed to fetch featured services");
    }
  },

  /**
   * Get service by slug
   */
  async getServiceBySlug(slug: string): Promise<Service | null> {
    try {
      const service = await sanityClient.fetch(
        `*[_type == "service" && slug.current == $slug][0] {
          _id,
          _type,
          title,
          slug,
          description,
          enquiry_url,
          booking_url,
          order,
          featured,
          image {
            asset->{
              _id,
              url,
              metadata {
                dimensions,
                lqip
              }
            },
            alt,
            hotspot,
            crop
          }
        }`,
        { slug }
      );
      return service;
    } catch (error) {
      console.error("Error fetching service by slug:", error);
      throw new Error("Failed to fetch service");
    }
  },
};

// Testimonial API functions
export const testimonialApi = {
  /**
   * Get all testimonials
   */
  async getAllTestimonials(): Promise<Testimonial[]> {
    try {
      const testimonials = await sanityClient.fetch(
        SITE_QUERIES.ALL_TESTIMONIALS
      );
      return testimonials;
    } catch (error) {
      console.error("Error fetching testimonials:", error);
      throw new Error("Failed to fetch testimonials");
    }
  },
};

// FAQ API functions
export const faqApi = {
  /**
   * Get all FAQs
   */
  async getAllFaqs(): Promise<Faq[]> {
    try {
      const faqs = await sanityClient.fetch(SITE_QUERIES.ALL_FAQS);
      return faqs;
    } catch (error) {
      console.error("Error fetching FAQs:", error);
      throw new Error("Failed to fetch FAQs");
    }
  },

  /**
   * Get featured FAQs
   */
  async getFeaturedFaqs(): Promise<Faq[]> {
    try {
      const faqs = await sanityClient.fetch(
        `*[_type == "faq" && featured == true] | order(order asc) {
          _id,
          _type,
          question,
          answer,
          order,
          featured
        }`
      );
      return faqs;
    } catch (error) {
      console.error("Error fetching featured FAQs:", error);
      throw new Error("Failed to fetch featured FAQs");
    }
  },
};

// Event API functions
export const eventApi = {
  /**
   * Get all events
   */
  async getAllEvents(): Promise<Event[]> {
    try {
      const events = await sanityClient.fetch(SITE_QUERIES.ALL_EVENTS);
      return events;
    } catch (error) {
      console.error("Error fetching events:", error);
      throw new Error("Failed to fetch events");
    }
  },

  /**
   * Get upcoming events
   */
  async getUpcomingEvents(): Promise<Event[]> {
    try {
      const now = new Date().toISOString().split("T")[0]; // Get current date in YYYY-MM-DD format
      const events = await sanityClient.fetch(
        `*[_type == "event" && date >= $now] | order(date asc) {
          _id,
          _type,
          title,
          slug,
          description,
          date,
          location,
          image {
            asset->{
              _id,
              url,
              metadata {
                dimensions,
                lqip
              }
            },
            alt,
            hotspot,
            crop
          }
        }`,
        { now }
      );
      return events;
    } catch (error) {
      console.error("Error fetching upcoming events:", error);
      throw new Error("Failed to fetch upcoming events");
    }
  },
};

// Company API functions
export const companyApi = {
  /**
   * Get all companies
   */
  async getAllCompanies(): Promise<Company[]> {
    try {
      const companies = await sanityClient.fetch(SITE_QUERIES.ALL_COMPANIES);
      return companies;
    } catch (error) {
      console.error("Error fetching companies:", error);
      throw new Error("Failed to fetch companies");
    }
  },
};
