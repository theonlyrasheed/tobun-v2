import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { sanityQ } from "@/sanity/query-builder";
import { EventsHero } from "@/components/events/hero";
import { FeaturedEvent } from "@/components/events/featured-event";
import { EventsGrid } from "@/components/events/events-grid";

export const Route = createFileRoute("/events")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData({
      queryKey: sanityQ.events.key(),
      queryFn: sanityQ.events.fetch,
    }),
  component: EventsPage,
});

function EventsPage() {
  const [selectedYear, setSelectedYear] = React.useState<string>("all");

  return (
    <>
      <EventsHero selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
      <FeaturedEvent />
      <EventsGrid selectedYear={selectedYear} setSelectedYear={setSelectedYear} />
    </>
  );
}
