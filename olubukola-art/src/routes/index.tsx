import { createFileRoute } from "@tanstack/react-router";

import { HeroSection } from "@/components/hero-section";
import { ValuesSection } from "@/components/home/values-section";
import { ServicesSection } from "@/components/home/services-section";
import { GallerySection } from "@/components/home/gallery-section";
import { BlogSection } from "@/components/home/blog-section";
import { MeetSection } from "@/components/home/meet-section";
import { FAQSection } from "@/components/home/faq-section";
import { ContactSection } from "@/components/home/contact-section";
import { TestimonialsSection } from "@/components/home/testimonials-section";
import { AdsSection } from "@/components/home/ads-section";
import { TrustedCompaniesSection } from "@/components/home/trusted-companies-section";

export const Route = createFileRoute("/")({
  ssr: true,
  component: Home,
});

function Home() {
  return (
    <>
      <HeroSection />
      <ValuesSection />
      <ServicesSection />
      <GallerySection />
      <BlogSection />
      <MeetSection />
      <FAQSection />
      <ContactSection />
      <TrustedCompaniesSection />
      <TestimonialsSection />
      <AdsSection />
    </>
  );
}
