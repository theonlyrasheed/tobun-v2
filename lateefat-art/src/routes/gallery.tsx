import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { GalleryHero } from "@/components/gallery/hero";
import { FilterBar } from "@/components/gallery/filter-bar";
import { MasonryGrid } from "@/components/gallery/masonry-grid";

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
});

function GalleryPage() {
  const [activeFilter, setActiveFilter] = React.useState("all");

  return (
    <>
      <GalleryHero />
      <FilterBar active={activeFilter} onChange={setActiveFilter} />
      <MasonryGrid activeFilter={activeFilter} />
    </>
  );
}
