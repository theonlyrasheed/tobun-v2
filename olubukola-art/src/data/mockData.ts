import { faker } from "@faker-js/faker";
import { blogPosts as placeholderBlogPosts } from "@/builders/blog/placeholder";
import {
  testimonials as placeholderTestimonials,
  faqs as placeholderFaqs,
} from "@/builders/site/placeholder";
import {
  BlogPostProps,
  TestimonialProps,
  FAQItemProps,
  StatCardProps,
} from "@/types";

// Generate realistic stats
export const stats: StatCardProps[] = [
  {
    value: faker.number.int({ min: 500, max: 1000 }) + "+",
    label: "Customers",
  },
  { value: faker.number.int({ min: 30, max: 50 }) + "+", label: "Commissions" },
  { value: faker.number.int({ min: 15, max: 25 }) + "+", label: "Global" },
];

// Convert Sanity blog posts to the expected format
export const blogPosts: BlogPostProps[] = placeholderBlogPosts.map(
  (post, i) => ({
    id: post._id,
    title: post.title,
    excerpt: post.excerpt || "",
    image: `https://picsum.photos/549/622?random=${i + 10}`,
    date: new Date(post._createdAt).toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    }),
    readTime: faker.number.int({ min: 3, max: 15 }),
  })
);

// Convert Sanity testimonials to the expected format
export const testimonials: TestimonialProps[] = placeholderTestimonials.map(
  (testimonial) => ({
    id: testimonial._id,
    name: testimonial.name,
    text: testimonial.quote,
    rating: testimonial.rating || 5,
    avatar: "/images/testimonials/avatar.jpg",
  })
);

// Convert Sanity FAQs to the expected format
export const faqs: FAQItemProps[] = placeholderFaqs.map((faq) => ({
  question: faq.question,
  answer: (faq.answer[0] as any)?.children?.[0]?.text || "Answer coming soon.",
}));
