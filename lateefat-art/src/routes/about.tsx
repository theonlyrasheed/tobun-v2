import { createFileRoute } from "@tanstack/react-router";
import { AboutHero } from "@/components/about/hero";
import { AboutIntro } from "@/components/about/intro";
import { QuoteBand } from "@/components/about/quote-band";
import { SpecialtyList } from "@/components/about/specialty-list";
import { JourneyTimeline } from "@/components/about/journey-timeline";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <AboutHero />
      <AboutIntro />
      <QuoteBand />
      <SpecialtyList />
      <JourneyTimeline />
    </>
  );
}
