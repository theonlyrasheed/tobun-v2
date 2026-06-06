import { createFileRoute } from "@tanstack/react-router";
import { sanityQ } from "@/sanity/query-builder";
import { AboutHero } from "@/components/about/hero";
import { AboutIntro } from "@/components/about/intro";
import { QuoteBand } from "@/components/about/quote-band";
import { SpecialtyList } from "@/components/about/specialty-list";
import { JourneyTimeline } from "@/components/about/journey-timeline";

export const Route = createFileRoute("/about")({
  loader: ({ context: { queryClient } }) =>
    Promise.all([
      queryClient.ensureQueryData({ queryKey: sanityQ.services.key(), queryFn: sanityQ.services.fetch }),
      queryClient.ensureQueryData({ queryKey: sanityQ.timeline.key(), queryFn: sanityQ.timeline.fetch }),
    ]),
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
