import * as React from "react";
import { Box, Text } from "@mantine/core";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";

const GALLERY_ITEMS = [
  { seed: "lt-1-digital-couture-01", title: "Form Beyond Fabric", cat: "digital-couture", aspect: "3/4" },
  { seed: "lt-2-adire-indigo-study", title: "Indigo Study No. 3", cat: "fabric-adire", aspect: "4/3" },
  { seed: "lt-3-clayton-community-", title: "Clayton Community Mural", cat: "mural-art", aspect: "16/9" },
  { seed: "lt-4-ai-feature", title: "Minds on Earth", cat: "ai-features digital-illustration", aspect: "1/1" },
  { seed: "lt-5-charcoal-contrast-", title: "Charcoal Contrasts", cat: "visual-paintings", aspect: "4/5" },
  { seed: "lt-6-digital-illustrati", title: "Digital Study IV", cat: "digital-illustration", aspect: "3/4" },
  { seed: "lt-7-editorial-photogra", title: "Editorial Session", cat: "photography", aspect: "2/3" },
  { seed: "lt-8-digital-couture-02", title: "The Draped Self", cat: "digital-couture", aspect: "4/5" },
  { seed: "lt-9-tie-dye-pattern", title: "Tie-Dye Pattern Study", cat: "fabric-adire", aspect: "1/1" },
  { seed: "lt-10-visual-painting", title: "Visual Painting No. 7", cat: "visual-paintings", aspect: "4/3" },
  { seed: "lt-11-mural-heritage", title: "Elevating Heritage", cat: "mural-art", aspect: "16/9" },
  { seed: "lt-12-ai-illustration-hy", title: "Hybrid AI Study", cat: "ai-features digital-illustration", aspect: "3/4" },
  { seed: "lt-13-studio-photography", title: "Studio Session II", cat: "photography", aspect: "2/3" },
  { seed: "lt-14-wearable-art", title: "The Pocket Stories", cat: "digital-couture fabric-adire", aspect: "4/5" },
  { seed: "lt-15-sketch-series", title: "Sketch Series I", cat: "visual-paintings digital-illustration", aspect: "1/1" },
  { seed: "lt-16-fabric-painting", title: "Fabric Painting", cat: "fabric-adire visual-paintings", aspect: "3/4" },
] as const;

interface MasonryGridProps {
  activeFilter: string;
}

function GalleryItem({ item, hidden }: { item: (typeof GALLERY_ITEMS)[number]; hidden: boolean }) {
  return (
    <Box
      style={{
        breakInside: "avoid",
        marginBottom: "clamp(12px,2vw,20px)",
        display: hidden ? "none" : "block",
      }}
    >
      <Box
        style={{
          position: "relative",
          overflow: "hidden",
          borderRadius: "var(--radius)",
          cursor: "pointer",
        }}
        data-cursor="view"
        className="item"
      >
        <ImagePlaceholder
          src={`https://picsum.photos/seed/${item.seed}/600/800`}
          alt={item.title}
          bloom
          style={{ aspectRatio: item.aspect, width: "100%" }}
        />
        {/* Hover caption */}
        <Box
          className="gallery-caption"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "clamp(12px,2vw,20px)",
            background: "linear-gradient(to top, rgba(20,18,30,.9) 0%, transparent 100%)",
            color: "var(--on-dark)",
            transform: "translateY(100%)",
            transition: "transform 0.35s var(--ease)",
          }}
        >
          <Text style={{ fontFamily: "var(--mono)", fontSize: "0.64rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--clay-soft)" }}>
            {item.cat.split(" ")[0].replace(/-/g, " ")}
          </Text>
          <Text style={{ fontFamily: "var(--display)", fontWeight: 700, fontSize: "1rem", letterSpacing: "-0.02em", marginTop: "2px" }}>
            {item.title}
          </Text>
        </Box>
      </Box>

      <style>{`
        .item:hover .gallery-caption { transform: translateY(0); }
      `}</style>
    </Box>
  );
}

export function MasonryGrid({ activeFilter }: MasonryGridProps) {
  return (
    <Box
      id="gallery-grid"
      className="section-tight"
      style={{ background: "var(--bg)" }}
    >
      <Box
        className="wrap"
        style={{
          columns: "repeat(auto-fill, minmax(280px, 1fr))",
          columnGap: "clamp(12px,2vw,20px)",
        }}
      >
        {GALLERY_ITEMS.map((item) => {
          const hidden = activeFilter !== "all" && !item.cat.includes(activeFilter);
          return (
            <GalleryItem key={item.seed} item={item} hidden={hidden} />
          );
        })}
      </Box>
    </Box>
  );
}
