import {
  ServiceCardProps,
  ArtworkCardProps,
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

export const services: ServiceCardProps[] = [
  {
    id: "1",
    type: "visual-art",
    title: "Visual Art Paintings",
    description:
      "Expressing stories and soul through the use of brush, texture, and tone",
    image: "/images/services/visual-art.jpg",
  },
  {
    id: "2",
    type: "face-painting",
    title: "Face Paintings",
    description:
      "Transforming faces into living art, where color, creativity, and expression come alive.",
    image: "/images/services/face-painting.jpg",
  },
  {
    id: "3",
    type: "sip-paint",
    title: "Sip & Paintings",
    description:
      "Blending creativity and relaxation, where every sip inspires a beautiful stroke of art.",
    image: "/images/services/sip-paint.jpg",
  },
  {
    id: "4",
    type: "digital",
    title: "Digital Artworks",
    description:
      "Where technology meets creativity turning imagination into visual experiences.",
    image: "/images/services/digital-art.png",
  },
  {
    id: "5",
    type: "illustration",
    title: "Illustration Artworks",
    description:
      "Bringing stories to life , where art and imagination unite on every page.",
    image: "/images/services/illustration.png",
  },
  {
    id: "6",
    type: "bead",
    title: "Bead Artworks",
    description:
      "Crafting beauty with precision, where tiny beads create timeless expressions of art.",
    image: "/images/services/bead-art.jpg",
  },
  {
    id: "7",
    type: "gift-box",
    title: "Gift Art Box",
    description:
      "Sharing creativity with love, snacks, art, inspiration, and personal touch.",
    image: "/images/services/gift-box.jpg",
  },
  {
    id: "8",
    type: "food",
    title: "Food Artworks",
    description:
      "lending flavor and creativity, where culinary delights become edible masterpieces.",
    image: "/images/services/food-art.jpg",
  },
];

export const artworks: ArtworkCardProps[] = [
  {
    id: "1",
    title: "Mr Little Germs",
    description:
      "Bringing stories to life , where art and imagination unite on every page.",
    artist: "Olubukola's Art",
    image: "https://picsum.photos/350/558?random=1",
    size: { height: 120, width: 32 },
    date: "7/11/2022",
    price: 250000,
  },
  {
    id: "2",
    title: "The Act Of Love",
    description:
      "Bringing stories to life , where art and imagination unite on every page.",
    artist: "Olubukola's Art",
    image: "https://picsum.photos/350/558?random=2",
    size: { height: 120, width: 32 },
    date: "10/12/2024",
    price: 450000,
  },
  {
    id: "3",
    title: "In My Era",
    description:
      "Bringing stories to life , where art and imagination unite on every page.",
    artist: "Olubukola's Art",
    image: "https://picsum.photos/350/558?random=3",
    size: { height: 120, width: 32 },
    date: "10/12/2025",
    price: 450000,
  },
  {
    id: "4",
    title: "Breaking The Circle",
    description:
      "Bringing stories to life , where art and imagination unite on every page.",
    artist: "Olubukola's Art",
    image: "https://picsum.photos/350/558?random=4",
    size: { height: 120, width: 32 },
    date: "10/12/2024",
    price: 750000,
  },
  {
    id: "5",
    title: "Patterned Love",
    description:
      "Bringing stories to life , where art and imagination unite on every page.",
    artist: "Olubukola's Art",
    image: "https://picsum.photos/350/558?random=5",
    size: { height: 120, width: 32 },
    date: "10/12/2024",
    price: 600000,
  },
  {
    id: "6",
    title: "My Path",
    description:
      "Bringing stories to life , where art and imagination unite on every page.",
    artist: "Olubukola's Art",
    image: "https://picsum.photos/350/558?random=6",
    size: { height: 120, width: 32 },
    date: "10/12/2025",
    price: 450000,
  },
  {
    id: "7",
    title: "Layers",
    description:
      "Bringing stories to life , where art and imagination unite on every page.",
    artist: "Olubukola's Art",
    image: "https://picsum.photos/350/558?random=7",
    size: { height: 120, width: 32 },
    date: "10/12/2022",
    price: 250000,
  },
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
