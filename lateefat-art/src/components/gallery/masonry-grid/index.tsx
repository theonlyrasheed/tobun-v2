import * as React from "react";
import { Box, Text } from "@mantine/core";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";

const GALLERY_ITEMS = [
  {
    seed: "lt-1-digital-couture-01",
    title: "Form Beyond Fabric",
    cat: "couture",
    aspect: "3/4",
    w: 1200,
    h: 1600,
    year: "2024",
    subtitle: "Digital Couture",
    variant: "default" as const,
  },
  {
    seed: "lt-2-adire-indigo-study",
    title: "Indigo Repetition",
    cat: "textile",
    aspect: "1/1",
    w: 1400,
    h: 1400,
    year: "2019",
    subtitle: "ADIRE",
    variant: "light" as const,
    color: "var(--cream)",
  },
  {
    seed: "lt-3-clayton-community-",
    title: "Clayton Hub",
    cat: "mural",
    aspect: "4/5",
    w: 1200,
    h: 1500,
    year: "2025",
    subtitle: "Mural",
    variant: "default" as const,
  },
  {
    seed: "lt-4-ai-feature",
    title: "Synthetic Bloom",
    cat: "ai",
    aspect: "5/4",
    w: 1500,
    h: 1200,
    year: "2025",
    subtitle: "AI",
    variant: "ochre" as const,
    color: "var(--indigo-900)",
  },
  {
    seed: "lt-5-charcoal-contrast-",
    title: "The Art We Carry",
    cat: "painting",
    aspect: "2/3",
    w: 1200,
    h: 1800,
    year: "2022",
    subtitle: "Painting",
    variant: "default" as const,
  },
  {
    seed: "lt-6-digital-illustrati",
    title: "Line Upon Line",
    cat: "illustration",
    aspect: "1/1",
    w: 1400,
    h: 1400,
    year: "2023",
    subtitle: "Illustration",
    variant: "default" as const,
  },
  {
    seed: "lt-7-editorial-photogra",
    title: "Worn Stories",
    cat: "photo",
    aspect: "3/4",
    w: 1200,
    h: 1600,
    year: "2024",
    subtitle: "Photography",
    variant: "default" as const,
  },
  {
    seed: "lt-8-digital-couture-02",
    title: "Runway, Rendered",
    cat: "couture",
    aspect: "4/5",
    w: 1200,
    h: 1500,
    year: "2025",
    subtitle: "Digital Couture",
    variant: "default" as const,
  },
  {
    seed: "lt-9-tie-dye-pattern",
    title: "Four Yards",
    cat: "textile",
    aspect: "5/4",
    w: 1500,
    h: 1200,
    year: "2017",
    subtitle: "ADIRE",
    variant: "light" as const,
    color: "var(--cream)",
  },
  {
    seed: "lt-10-visual-painting",
    title: "Colors of Clothes",
    cat: "painting",
    aspect: "1/1",
    w: 1400,
    h: 1400,
    year: "2021",
    subtitle: "Painting",
    variant: "default" as const,
  },
  {
    seed: "lt-11-mural-heritage",
    title: "Elevating Heritage",
    cat: "mural",
    aspect: "3/4",
    w: 1200,
    h: 1600,
    year: "2024",
    subtitle: "Mural",
    variant: "default" as const,
  },
  {
    seed: "lt-12-ai-illustration-hy",
    title: "Minds on Earth",
    cat: "ai illustration",
    aspect: "4/5",
    w: 1200,
    h: 1500,
    year: "2026",
    subtitle: "AI · Illustration",
    variant: "default" as const,
  },
  {
    seed: "lt-13-studio-photography",
    title: "In the Making",
    cat: "photo",
    aspect: "2/3",
    w: 1200,
    h: 1800,
    year: "2023",
    subtitle: "Photography",
    variant: "default" as const,
  },
  {
    seed: "lt-14-wearable-art",
    title: "The Pocket Stories",
    cat: "couture",
    aspect: "1/1",
    w: 1400,
    h: 1400,
    year: "2026",
    subtitle: "Digital Couture",
    variant: "ochre" as const,
    color: "var(--indigo-900)",
  },
  {
    seed: "lt-15-sketch-series",
    title: "Sketch by Sketch",
    cat: "illustration",
    aspect: "5/4",
    w: 1500,
    h: 1200,
    year: "2020",
    subtitle: "Illustration",
    variant: "default" as const,
  },
  {
    seed: "lt-16-fabric-painting",
    title: "Patterns Speak",
    cat: "textile painting",
    aspect: "4/5",
    w: 1200,
    h: 1500,
    year: "2018",
    subtitle: "Fabric",
    variant: "default" as const,
  },
] as const;

interface MasonryGridProps {
  activeFilter: string;
}

export function MasonryGrid({ activeFilter }: MasonryGridProps) {
  React.useEffect(() => {
    let lightbox = new PhotoSwipeLightbox({
      gallery: "#gallery-grid",
      children: "a.masonry-item",
      pswpModule: () => import("photoswipe"),
    });
    lightbox.init();

    return () => {
      lightbox.destroy();
    };
  }, []);

  return (
    <Box
      id="gallery-grid"
      style={{
        background: "var(--bg)",
        paddingBottom: "clamp(40px, 6vh, 84px)",
      }}
    >
      <Box className="wrap">
        <Box
          className="masonry"
          style={{
            columns: "4 270px",
            columnGap: "clamp(14px, 2vw, 24px)",
            paddingBlock: "clamp(34px, 4vw, 56px)",
          }}
        >
          {GALLERY_ITEMS.map((item) => {
            const hidden =
              activeFilter !== "all" &&
              !item.cat.split(" ").includes(activeFilter);

            return (
              <Box
                key={item.seed}
                component="a"
                href={`https://picsum.photos/seed/${item.seed}/1600/1200`}
                className="masonry-item"
                data-pswp-width={item.w}
                data-pswp-height={item.h}
                data-cursor="view"
                data-cursor-label="Explore"
                style={{
                  display: hidden ? "none" : "block",
                }}
              >
                <ImagePlaceholder
                  src={`https://picsum.photos/seed/${item.seed}/800/900`}
                  alt={item.title}
                  variant={item.variant}
                  bloom
                  aspectRatio={item.aspect}
                  style={{
                    width: "100%",
                  }}
                />
                <Box
                  className="meta"
                  style={{
                    color: (item as { color?: string }).color || "var(--on-dark)",
                  }}
                >
                  <Text className="t">{item.title}</Text>
                  <Text className="c">
                    {item.subtitle} &middot; {item.year}
                  </Text>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      <style>{`
        .masonry-item {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          break-inside: avoid;
          margin-bottom: clamp(14px, 2vw, 24px);
          border-radius: var(--radius);
          display: block;
        }
        .masonry-item .ph img {
          transition: transform 0.6s var(--ease);
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .masonry-item:hover .ph img {
          transform: scale(1.05);
        }
        .masonry-item::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(20, 18, 50, 0.66), transparent 55%);
          opacity: 0;
          transition: opacity 0.35s;
          pointer-events: none;
          z-index: 1;
        }
        .masonry-item:hover::after {
          opacity: 1;
        }
        .masonry-item .meta {
          position: absolute;
          left: 16px;
          right: 16px;
          bottom: 16px;
          z-index: 2;
          opacity: 0;
          transform: translateY(8px);
          transition: 0.35s var(--ease);
        }
        .masonry-item:hover .meta {
          opacity: 1;
          transform: none;
        }
        .masonry-item .meta .t {
          font-family: var(--display);
          font-weight: 700;
          font-size: 1.15rem;
          line-height: 1.25;
        }
        .masonry-item .meta .c {
          font-family: var(--mono);
          font-size: 0.62rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          opacity: 0.85;
          margin-top: 4px;
        }
      `}</style>
    </Box>
  );
}
