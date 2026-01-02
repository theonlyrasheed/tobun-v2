import { faker } from "@faker-js/faker";
import type {
  AllServicesQueryResult,
  AllTestimonialsQueryResult,
  AllEventsQueryResult,
  AllFaqsQueryResult,
  AllCompaniesQueryResult,
  FeaturedServicesQueryResult,
} from "../sanity.types";

// Generate placeholder services
export const generateServices = (count: number = 8): AllServicesQueryResult => {
  const serviceTitles = [
    "Custom Portraits",
    "Event Photography",
    "Wedding Photography",
    "Corporate Events",
    "Art Workshops",
    "Children's Parties",
    "Private Functions",
    "Exhibition Setup",
    "Digital Art Creation",
    "Mixed Media Workshops",
    "Bead Art Classes",
    "Sip & Paint Sessions",
  ];

  const descriptions = [
    "Professional custom portrait sessions with artistic flair and attention to detail.",
    "Capture your special moments with our experienced event photography services.",
    "Beautiful wedding photography that tells your unique love story.",
    "Professional corporate event coverage and documentation.",
    "Interactive art workshops for all skill levels and ages.",
    "Fun and creative children's party entertainment with artistic activities.",
    "Intimate private function photography and event coordination.",
    "Complete exhibition setup and display services for artists.",
    "Digital art creation using modern tools and techniques.",
    "Mixed media art workshops combining various artistic mediums.",
    "Traditional bead art classes teaching ancient techniques.",
    "Relaxing sip & paint sessions with wine and artistic guidance.",
  ];

  return Array.from({ length: count }, (_, i) => ({
    _id: `service-${i + 1}`,
    _type: "service",
    title:
      serviceTitles[i % serviceTitles.length] ||
      faker.lorem.words({ min: 2, max: 4 }),
    slug: faker.helpers.slugify(
      serviceTitles[i % serviceTitles.length] ||
        faker.lorem.words({ min: 2, max: 4 })
    ),
    description:
      descriptions[i % descriptions.length] ||
      faker.lorem.sentences({ min: 2, max: 3 }),
    order: i + 1,
    featured: false,
    image: {
      url: `https://via.placeholder.com/400x300?text=Service+${i + 1}`,
      alt: `${serviceTitles[i % serviceTitles.length]} service`,
    },
    hero_image: faker.datatype.boolean(0.6)
      ? {
          url: `https://via.placeholder.com/800x400?text=Hero+${i + 1}`,
          alt: `${serviceTitles[i % serviceTitles.length]} hero image`,
        }
      : null,
  }));
};

// Generate placeholder testimonials
export const generateTestimonials = (
  count: number = 12
): AllTestimonialsQueryResult => {
  const testimonialTexts = [
    "Olubukola Art has a great workers. They are all so polite and kind. I love them",
    "I left feeling like an artist. The ambiance and guidance made it unforgettable.",
    "I honestly don't think you charge enough for your performance cause it's given luxury treatment",
    "There's something unique about your level of thinking when it comes to art. It's deep!",
    "You healed me, through the way you handled your art, it's a connection of souls",
    "I'm happy to purchase your bead work, my son now is so intuitive in describing them, i'm happy.",
    "The workshop was amazing! Learned so much and had a great time.",
    "Professional service from start to finish. Highly recommended!",
    "The attention to detail in their work is outstanding.",
    "Such a wonderful experience for our family event.",
    "The creativity and passion really shines through in everything they do.",
    "Best art experience I've ever had. Will definitely be back!",
  ];

  return Array.from({ length: count }, (_, i) => ({
    _id: `testimonial-${i + 1}`,
    _type: "testimonial",
    name: faker.person.fullName(),
    rating: faker.number.int({ min: 4, max: 5 }),
    company: "",
    quote:
      testimonialTexts[i % testimonialTexts.length] ||
      faker.lorem.sentences({ min: 1, max: 2 }),
    avatar: {
      url: `https://via.placeholder.com/100x100?text=Avatar+${i + 1}`,
      alt: faker.person.fullName(),
    },
  }));
};

// Generate placeholder events
export const generateEvents = (count: number = 8): AllEventsQueryResult => {
  const eventTitles = [
    "Holiday Fun Package",
    "Summer Art Workshop",
    "Spring Exhibition Opening",
    "Winter Creative Session",
    "Autumn Art Festival",
    "Children's Art Day",
    "Corporate Team Building",
    "Private Art Class",
  ];

  return Array.from({ length: count }, (_, i) => ({
    _id: `event-${i + 1}`,
    _type: "event",
    title:
      eventTitles[i % eventTitles.length] ||
      faker.lorem.words({ min: 2, max: 4 }),
    slug: faker.helpers.slugify(
      eventTitles[i % eventTitles.length] ||
        faker.lorem.words({ min: 2, max: 4 })
    ),
    description: [
      {
        children: [
          {
            marks: [],
            text: faker.lorem.sentences({ min: 2, max: 4 }),
            _type: "span",
            _key: faker.string.uuid(),
          },
        ],
        style: "normal",
        listItem: undefined,
        markDefs: [],
        level: undefined,
        _type: "block",
        _key: faker.string.uuid(),
      },
    ],
    date: null,
    location: {
      venue: faker.company.name(),
      address: faker.location.streetAddress(),
      city: faker.location.city(),
      country: faker.location.country(),
    },
    image: null,
  }));
};

// Generate placeholder FAQs
export const generateFaqs = (count: number = 15): AllFaqsQueryResult => {
  const faqData = [
    {
      question: "Can I have a personalized customized illustration book?",
      answer:
        "Yes, we offer personalized illustration services. Contact us to discuss your requirements and we'll create something unique just for you.",
    },
    {
      question: "How long do you take to complete a bead Art?",
      answer: `Bead art typically takes ${faker.number.int({ min: 2, max: 6 })} weeks depending on the complexity and size of the piece. Rush orders may be available for an additional fee.`,
    },
    {
      question: "Do you accept international commissions?",
      answer:
        "Yes, we accept commissions from clients worldwide. Shipping arrangements can be made, and we work with various international carriers to ensure safe delivery.",
    },
    {
      question: "What is the typical timeline for a painting?",
      answer: `Most paintings take ${faker.number.int({ min: 3, max: 8 })} weeks from commission to completion, depending on size, detail level, and current workload.`,
    },
    {
      question: "Do you have limit for a sip & paint session?",
      answer: `Yes, we typically limit sessions to ${faker.number.int({ min: 15, max: 35 })} participants to ensure quality instruction and a personalized experience for everyone.`,
    },
    {
      question: "Do you license artwork for brands?",
      answer:
        "Yes, we offer licensing options for commercial use. Contact us for more details about pricing and terms for brand partnerships.",
    },
    {
      question: "How do I start a commission?",
      answer:
        "Simply fill out our contact form with your requirements, and we will get back to you within 2-3 business days with a detailed quote and timeline.",
    },
    {
      question: `Can you create artwork for ${faker.company.name()}?`,
      answer: `Absolutely! We work with various brands and companies. ${faker.lorem.sentences({ min: 1, max: 2 })} Contact us to discuss your specific brand needs.`,
    },
    {
      question: "What materials do you use for your paintings?",
      answer: `We use high-quality ${faker.helpers.arrayElement(["acrylic", "oil", "watercolor", "mixed media"])} paints on ${faker.helpers.arrayElement(["canvas", "paper", "wood panels", "metal surfaces"])}. All materials are professionally sourced and archival quality.`,
    },
    {
      question: "Do you offer art classes for children?",
      answer: `Yes! Our children's art classes are designed for ages ${faker.number.int({ min: 5, max: 12 })}+. We focus on creativity, fun, and building confidence through artistic expression.`,
    },
    {
      question: "Can I purchase prints of your artwork?",
      answer:
        "Yes, we offer high-quality giclee prints of our original artwork. All prints are professionally printed and come with certificates of authenticity.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "For commissions, we require a 50% deposit to begin work. Cancellations made within 48 hours of deposit will receive a full refund. After work has begun, deposits are non-refundable but can be applied to future projects.",
    },
  ];

  return Array.from({ length: count }, (_, i) => ({
    _id: `faq-${i + 1}`,
    _type: "faq",
    question:
      faqData[i % faqData.length]?.question ||
      faker.lorem.sentence().replace(/\.$/, "?"),
    answer: [
      {
        children: [
          {
            marks: [],
            text:
              faqData[i % faqData.length]?.answer ||
              faker.lorem.sentences({ min: 1, max: 3 }),
            _type: "span",
            _key: faker.string.uuid(),
          },
        ],
        style: "normal",
        listItem: undefined,
        markDefs: [],
        level: undefined,
        _type: "block",
        _key: faker.string.uuid(),
      },
    ],
    order: i + 1,
    featured: faker.datatype.boolean(0.3),
  }));
};

// Generate placeholder companies
export const generateCompanies = (
  count: number = 8
): AllCompaniesQueryResult => {
  const companyNames = [
    "FMC Abuja",
    "Leadway Assurance",
    "Access Bank",
    "MTN Nigeria",
    "Dangote Group",
    "Airtel Nigeria",
    "UBA Group",
    "Zenith Bank",
  ];

  return Array.from(
    { length: count },
    (_, i) =>
      ({
        _id: `company-${i + 1}`,
        _type: "company",
        title: companyNames[i % companyNames.length] || faker.company.name(),
        logo: {
          url: `https://via.placeholder.com/200x100?text=Logo+${i + 1}`,
          alt: `${companyNames[i % companyNames.length] || faker.company.name()} logo`,
        },
      }) as AllCompaniesQueryResult[0]
  );
};

// Pre-generated placeholder data
export const services = generateServices(8);
export const testimonials = generateTestimonials(12);
export const events = generateEvents(8);
export const faqs = generateFaqs(15);
export const companies = generateCompanies(8);

// Helper to get featured services (top 3 services)
export const featuredServices: FeaturedServicesQueryResult = [];

// Helper to get featured FAQs
export const featuredFaqs = faqs.filter((faq) => faq.featured);

// Helper to get upcoming events
export const upcomingEvents = events
  .filter((event) => new Date(event.date!) > new Date())
  .sort((a, b) => new Date(a.date!).getTime() - new Date(b.date!).getTime());
