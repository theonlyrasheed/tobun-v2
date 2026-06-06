import * as React from "react";
import { Box, Button } from "@mantine/core";
import { useGallery } from "@/hooks/use-sanity";

// Master list — values must match `slug.current` of gallery_album documents in Sanity.
// Pills for albums with no items are hidden automatically.
const ALL_CATEGORIES = [
  { label: "All work",        value: "all" },
  { label: "Painting",        value: "painting" },
  { label: "Digital Art",     value: "digital-art" },
  { label: "Generative Art",  value: "generative-art" },
  { label: "Textile Art",     value: "textile-art" },
  { label: "Murals",          value: "murals" },
  { label: "Digital Couture", value: "digital-couture" },
  { label: "Coloring",        value: "coloring" },
] as const;

interface FilterBarProps {
  active: string;
  onChange: (cat: string) => void;
}

export function FilterBar({ active, onChange }: FilterBarProps) {
  const { data: items = [] } = useGallery();
  const barRef = React.useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = React.useState(false);

  // Build the set of album slugs that actually have at least one gallery item
  const populatedSlugs = React.useMemo(() => {
    const slugs = new Set<string>();
    items.forEach((item: any) => {
      if (item.cat) slugs.add(item.cat);
    });
    return slugs;
  }, [items]);

  // Only keep "All work" (always shown) + categories that have data
  const visibleCategories = React.useMemo(
    () =>
      ALL_CATEGORIES.filter(
        (cat) => cat.value === "all" || populatedSlugs.has(cat.value)
      ),
    [populatedSlugs]
  );

  React.useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { threshold: 1, rootMargin: "-96px 0px 0px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Box
      ref={barRef}
      style={{
        position: "sticky",
        top: "80px",
        zIndex: 50,
        background: stuck
          ? "color-mix(in oklab, var(--bg) 88%, transparent)"
          : "var(--bg)",
        backdropFilter: stuck ? "blur(16px)" : "none",
        borderBottom: `1px solid ${stuck ? "var(--sand-line)" : "transparent"}`,
        transition: "background 0.3s, border-color 0.3s",
        padding: "12px 0",
      }}
    >
      {/* Scroll wrapper — no wrap, horizontal scroll on all viewports */}
      <Box
        className="wrap filter-scroll-wrap"
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "nowrap",
          overflowX: "auto",
          WebkitOverflowScrolling: "touch" as any,
          scrollbarWidth: "none",
          paddingBottom: "2px", /* prevent clipping button shadows */
        }}
      >
        {visibleCategories.map((cat) => {
          const isActive = active === cat.value;
          return (
            <Button
              key={cat.value}
              variant="outline"
              size="sm"
              onClick={() => onChange(cat.value)}
              style={{
                flexShrink: 0,
                borderRadius: "100px",
                fontFamily: "var(--mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                fontWeight: 700,
                padding: "8px 16px",
                whiteSpace: "nowrap",
                background: isActive ? "var(--clay)" : "transparent",
                color: isActive ? "var(--on-dark)" : "var(--fg-soft)",
                border: `1px solid ${isActive ? "var(--clay)" : "var(--sand-line)"}`,
                transition: "background 0.2s, color 0.2s, border-color 0.2s",
              }}
            >
              {cat.label}
            </Button>
          );
        })}
      </Box>

      <style>{`
        /* Hide scrollbar on webkit (Chrome, Safari, mobile) */
        .filter-scroll-wrap::-webkit-scrollbar {
          display: none;
        }

        /* On mobile, add a right fade-out to hint there's more to scroll */
        @media (max-width: 768px) {
          .filter-scroll-wrap {
            /* Extend the wrap to full bleed so fade reaches the edge */
            margin-right: calc(-1 * var(--gut, 24px));
            padding-right: var(--gut, 24px);
            -webkit-mask-image: linear-gradient(
              to right,
              black calc(100% - 48px),
              transparent 100%
            );
            mask-image: linear-gradient(
              to right,
              black calc(100% - 48px),
              transparent 100%
            );
          }
        }
      `}</style>
    </Box>
  );
}
