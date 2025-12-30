export const SITE_QUERIES = {
  ALL_SERVICES: `*[_type == "service"] | order(order asc, _createdAt desc) {
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
    },
    hero_image {
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

  ALL_TESTIMONIALS: `*[_type == "testimonial"] | order(_createdAt desc) {
    _id,
    _type,
    name,
    rating,
    company,
    quote,
    avatar {
      asset->{
        _id,
        url
      }
    }
  }`,

  ALL_FAQS: `*[_type == "faq"] | order(order asc, _createdAt desc) {
    _id,
    _type,
    question,
    answer,
    order,
    featured
  }`,

  ALL_EVENTS: `*[_type == "event"] | order(date desc) {
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

  ALL_COMPANIES: `*[_type == "company"] | order(title asc) {
    _id,
    _type,
    title,
    logo {
      asset->{
        _id,
        url
      }
    }
  }`,
};
