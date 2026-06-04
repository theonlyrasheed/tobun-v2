import { createFileRoute } from "@tanstack/react-router";
import { Preloader } from "@/components/home/preloader";
import { HomeHero } from "@/components/home/hero";
import { AboutTeaser } from "@/components/home/about-teaser";
import { FeaturedWork } from "@/components/home/featured-work";
import { Services } from "@/components/home/services";
import { EventsTeaser } from "@/components/home/events-teaser";
import { Testimonials } from "@/components/home/testimonials";
import { FAQ } from "@/components/home/faq";
import { RecognitionBand } from "@/components/home/recognition-band";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <>
      <Preloader />
      <HomeHero />
      <AboutTeaser />
      <FeaturedWork />
      <Services />
      <EventsTeaser />
      <Testimonials />
      <FAQ />
      <RecognitionBand />
    </>
  );
}
