import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { sanityQ } from "@/sanity/query-builder";
import { ExhibitionsHero } from "@/components/exhibitions/hero";
import { FeaturedSeries } from "@/components/exhibitions/featured-series";
import { YearRail } from "@/components/exhibitions/year-rail";
import { RecordList } from "@/components/exhibitions/record-list";

export const Route = createFileRoute("/exhibitions")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData({
      queryKey: sanityQ.exhibitions.key(),
      queryFn: sanityQ.exhibitions.fetch,
    }),
  component: ExhibitionsPage,
});

function ExhibitionsPage() {
  const [activeYear, setActiveYear] = React.useState("All years");

  return (
    <>
      <ExhibitionsHero />
      <FeaturedSeries />
      <YearRail active={activeYear} onChange={setActiveYear} />
      <RecordList activeYear={activeYear} />
    </>
  );
}
