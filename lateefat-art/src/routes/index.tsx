import { createFileRoute } from "@tanstack/react-router";
import { sanityQ } from "@/sanity/query-builder";
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
  loader: ({ context: { queryClient } }) =>
    Promise.all([
      queryClient.ensureQueryData({ queryKey: sanityQ.faqs.key(), queryFn: sanityQ.faqs.fetch }),
      queryClient.ensureQueryData({ queryKey: sanityQ.testimonials.key(), queryFn: sanityQ.testimonials.fetch }),
      queryClient.ensureQueryData({ queryKey: sanityQ.services.key(), queryFn: sanityQ.services.fetch }),
      queryClient.ensureQueryData({ queryKey: sanityQ.events.key(), queryFn: sanityQ.events.fetch }),
      queryClient.ensureQueryData({ queryKey: sanityQ.gallery.key(), queryFn: sanityQ.gallery.fetch }),
      queryClient.ensureQueryData({ queryKey: sanityQ.exhibitions.key(), queryFn: sanityQ.exhibitions.fetch }),
    ]),
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
