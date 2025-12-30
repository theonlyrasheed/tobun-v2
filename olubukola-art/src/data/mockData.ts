import {
  BlogPostProps,
  TestimonialProps,
  EventProps,
  FAQItemProps,
  StatCardProps,
} from "@/types";

export const stats: StatCardProps[] = [
  { value: "600+", label: "Customers" },
  { value: "34+", label: "Commissions" },
  { value: "18+", label: "Global" },
];

export const blogPosts: BlogPostProps[] = [
  {
    id: "1",
    title: "From Sketch To Mural",
    excerpt:
      "Bringing stories to life , where art and imagination unite on every page.",
    image: "https://picsum.photos/549/622?random=10",
    date: "Saturday, Oct 22",
    readTime: 7,
  },
  {
    id: "2",
    title: "Solo Exhibition 2025",
    excerpt:
      "Bringing stories to life , where art and imagination unite on every page.",
    image: "https://picsum.photos/549/622?random=11",
    date: "Saturday, Oct 22",
    readTime: 8,
  },
  {
    id: "3",
    title: "NGO: Making Art For Trenches",
    excerpt:
      "Bringing stories to life , where art and imagination unite on every page.",
    image: "https://picsum.photos/549/622?random=12",
    date: "Saturday, Oct 22",
    readTime: 10,
  },
];

export const testimonials: TestimonialProps[] = [
  {
    id: "1",
    name: "Mariam Oriyonmi",
    text: "I left feeling like an artist. The ambiance and guidance made it unforgettable.",
    rating: 5,
    avatar: "/images/testimonials/avatar.jpg",
  },
  {
    id: "2",
    name: "Chris Oweazim",
    text: "I honestly don't think you charge enough for your performance cause it's given luxury treatment",
    rating: 5,
    avatar: "/images/testimonials/avatar.jpg",
  },
  {
    id: "3",
    name: "Isimi Taiwo",
    text: "There's something unique about your level of thinking when it comes to art. It's deep!",
    rating: 5,
    avatar: "/images/testimonials/avatar.jpg",
  },
  {
    id: "4",
    name: "Charles",
    text: "You healed me, through the way you handled your art, it's a connection of souls",
    rating: 5,
    avatar: "/images/testimonials/avatar.jpg",
  },
  {
    id: "5",
    name: "Hauwa Ibrahim",
    text: "I'm happy to purchase your bead work, my son now is so intuitive in describing them, i'm happy.",
    rating: 5,
    avatar: "/images/testimonials/avatar.jpg",
  },
  {
    id: "6",
    name: "Adeola",
    text: "Olubukola Art has a great workers. They are all so polite and kind. I love them",
    rating: 5,
    avatar: "/images/testimonials/avatar.jpg",
  },
  {
    id: "7",
    name: "Hauwa Ibrahim",
    text: "I'm happy to purchase your bead work, my son now is so intuitive in describing them, i'm happy.",
    rating: 5,
    avatar: "/images/testimonials/avatar.jpg",
  },
  {
    id: "8",
    name: "Adeola",
    text: "Olubukola Art has a great workers. They are all so polite and kind. I love them",
    rating: 5,
    avatar: "/images/testimonials/avatar.jpg",
  },
];

export const events: EventProps[] = [
  {
    id: "1",
    title: "Holiday fun package",
    type: "Sip & Paint • Game Time • Karoke",
    date: "Saturday, December 20, 2025",
    time: "12:PM - 3:00PM",
    location: "Plot 174, Kur Mohammed Avenue, Central Area",
    slots: 20,
    image: "/images/events/holiday-event.png",
    details: ["Everyone is truly welcome"],
  },
];

export const faqs: FAQItemProps[] = [
  {
    question: "Can I have a personalized customized illustration book?",
    answer:
      "Yes, we offer personalized illustration services. Contact us to discuss your requirements.",
  },
  {
    question: "How long do you take to complete a bead Art?",
    answer:
      "Bead art typically takes 2-4 weeks depending on the complexity and size of the piece.",
  },
  {
    question: "Do you accept international commissions?",
    answer:
      "Yes, we accept commissions from clients worldwide. Shipping arrangements can be made.",
  },
  {
    question: "What is the typical timeline for a painting?",
    answer:
      "Most paintings take 3-6 weeks from commission to completion, depending on size and detail.",
  },
  {
    question: "Do you have limit for a sip & paint session?",
    answer:
      "Yes, we typically limit sessions to 20-30 participants to ensure quality instruction.",
  },
  {
    question: "Do you license artwork for brands?",
    answer:
      "Yes, we offer licensing options for commercial use. Contact us for more details.",
  },
  {
    question: "How do I start a commission?",
    answer:
      "Simply fill out our contact form with your requirements, and we will get back to you within 2-3 business days.",
  },
];
