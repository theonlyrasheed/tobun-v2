import { createFileRoute } from "@tanstack/react-router";
import { sanityQ } from "@/sanity/query-builder";
import { PressHero } from "@/components/press/hero";
import { FeaturedCoverage } from "@/components/press/featured-coverage";
import { PressGrid } from "@/components/press/press-grid";

export const Route = createFileRoute("/press")({
  loader: ({ context: { queryClient } }) =>
    queryClient.ensureQueryData({
      queryKey: sanityQ.press.all.key(),
      queryFn: sanityQ.press.all.fetch,
    }),
  component: PressPage,
});

function PressPage() {
  return (
    <>
      <PressHero />
      <FeaturedCoverage />
      <PressGrid />
    </>
  );
}
