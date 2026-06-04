import { createFileRoute } from "@tanstack/react-router";
import { PressHero } from "@/components/press/hero";
import { FeaturedCoverage } from "@/components/press/featured-coverage";
import { PressGrid } from "@/components/press/press-grid";

export const Route = createFileRoute("/press")({
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
