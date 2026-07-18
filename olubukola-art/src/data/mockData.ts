import { faker } from "@faker-js/faker";
import { blogPosts as placeholderBlogPosts } from "@/builders/blog/placeholder";
import {
  testimonials as placeholderTestimonials,
  faqs as placeholderFaqs,
} from "@/builders/site/placeholder";
import { BlogPostProps, TestimonialProps, FAQItemProps } from "@/types";

// Convert Sanity blog posts to the expected format
export const blogPosts: BlogPostProps[] = placeholderBlogPosts.map(
  (post, i) => ({
    id: post._id,
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt || "",
    image: `https://picsum.photos/549/622?random=${i + 10}`,
    date: new Date(post._createdAt).toLocaleDateString("en-US", {
      weekday: "long",
      month: "short",
      day: "numeric",
    }),
    readTime: faker.number.int({ min: 3, max: 15 }),
  }),
);

// Convert Sanity testimonials to the expected format
export const testimonials: TestimonialProps[] = placeholderTestimonials.map(
  (testimonial) => ({
    id: testimonial._id,
    name: testimonial.name,
    text: testimonial.quote,
    rating: testimonial.rating || 5,
    avatar: "/images/testimonials/avatar.jpg",
  }),
);

// Convert Sanity FAQs to the expected format
export const faqs: FAQItemProps[] = placeholderFaqs.map((faq) => ({
  question: faq.question,
  answer: (faq.answer[0] as any)?.children?.[0]?.text || "Answer coming soon.",
}));
