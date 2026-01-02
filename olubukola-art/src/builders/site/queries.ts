import { defineQuery } from "groq";

export const allServicesQuery =
  defineQuery(`*[_type == "service"] | order(order asc, _createdAt desc) {
  _id,
  _type,
  "title": coalesce(title, ""),
  "slug": coalesce(slug.current, ""),
  "description": coalesce(description, ""),
  "order": coalesce(order, 0),
  "featured": coalesce(featured, false),
  image {
    "url": coalesce(asset->url, null),
    "alt": coalesce(alt, "")
  },
  hero_image {
    "url": coalesce(asset->url, null),
    "alt": coalesce(alt, "")
  }
}`);

export const allTestimonialsQuery =
  defineQuery(`*[_type == "testimonial"] | order(_createdAt desc) {
  _id,
  _type,
  "name": coalesce(name, ""),
  "rating": coalesce(rating, 0),
  "company": coalesce(company, ""),
  "quote": coalesce(quote, ""),
  avatar {
    "url": coalesce(asset->url, null),
    "alt": coalesce(alt, "")
  }
}`);

export const allFaqsQuery =
  defineQuery(`*[_type == "faq"] | order(order asc, _createdAt desc) {
  _id,
  _type,
  "question": coalesce(question, ""),
  "answer": coalesce(answer, ""),
  "order": coalesce(order, 0),
  "featured": coalesce(featured, false)
}`);

export const allEventsQuery =
  defineQuery(`*[_type == "event"] | order(date desc) {
  _id,
  _type,
  "title": coalesce(title, ""),
  "slug": coalesce(slug.current, ""),
  "description": coalesce(description, ""),
  date,
  "location": coalesce(location, ""),
  image {
    "url": coalesce(asset->url, null),
    "alt": coalesce(alt, "")
  }
}`);

export const allCompaniesQuery =
  defineQuery(`*[_type == "company"] | order(title asc) {
  _id,
  _type,
  "title": coalesce(title, ""),
  logo {
    "url": coalesce(asset->url, null),
    "alt": coalesce(alt, "")
  }
}`);

export const featuredServicesQuery =
  defineQuery(`*[_type == "service" && featured == true] | order(order asc) {
  _id,
  _type,
  "title": coalesce(title, ""),
  "slug": coalesce(slug.current, ""),
  "description": coalesce(description, ""),
  "order": coalesce(order, 0),
  "featured": coalesce(featured, false),
   image {
    "url": coalesce(asset->url, null),
    "alt": coalesce(alt, "")
  }
}`);

export const serviceBySlugQuery =
  defineQuery(`*[_type == "service" && slug.current == $slug][0] {
  _id,
  _type,
  "title": coalesce(title, ""),
  "slug": coalesce(slug.current, ""),
  "description": coalesce(description, ""),
  "order": coalesce(order, 0),
  "featured": coalesce(featured, false),
   image {
    "url": coalesce(asset->url, null),
    "alt": coalesce(alt, "")
  }
}`);

export const featuredFaqsQuery =
  defineQuery(`*[_type == "faq" && featured == true] | order(order asc) {
  _id,
  _type,
  "question": coalesce(question, ""),
  "answer": coalesce(answer, ""),
  "order": coalesce(order, 0),
  "featured": coalesce(featured, false)
}`);

export const upcomingEventsQuery =
  defineQuery(`*[_type == "event" && date >= $now] | order(date asc) {
  _id,
  _type,
  "title": coalesce(title, ""),
  "slug": coalesce(slug.current, ""),
  "description": coalesce(description, ""),
  date,
  "location": coalesce(location, ""),
   image {
    "url": coalesce(asset->url, null),
    "alt": coalesce(alt, "")
  }
}`);
