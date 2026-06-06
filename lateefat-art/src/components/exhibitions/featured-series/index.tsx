import * as React from "react";
import { Box, Text } from "@mantine/core";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { useExhibitions } from "@/hooks/use-sanity";


export function FeaturedSeries() {
  const { data: exhs = [] } = useExhibitions();

  const featured = React.useMemo(() => {
    if (exhs.length === 0) return null;
    return exhs.find((exh: any) => 
      exh.record?.cta?.label?.toLowerCase().includes("featured") || 
      exh.record?.kicker?.toLowerCase().includes("featured")
    ) || exhs[0];
  }, [exhs]);

  if (!featured) return null;

  return (
    <Box component="section" className="section wrap" style={{ background: "var(--bg)" }}>
      <Box className="feature" data-reveal>
        <ImagePlaceholder
          src={featured.record.img}
          alt={`${featured.name} — hero piece`}
          bloom
          style={{
            width: "100%",
            borderRadius: "var(--radius)",
          }}
        />
        <Box>
          <span className="tag" style={{ marginBottom: "16px", display: "inline-block" }}>
            {featured.record.kicker} &middot; {featured.place}
          </span>
          <h2 className="h-lg" style={{ margin: "0 0 18px" }}>
            {featured.name}
          </h2>
          <Text className="lead" style={{ color: "var(--ink-soft)", margin: 0 }}>
            {featured.desc}
          </Text>
          <Box
            component="a"
            href={featured.record.cta.href}
            className="link-arrow"
            style={{ marginTop: "24px", display: "inline-flex" }}
          >
            {featured.record.cta.label}
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              style={{ marginLeft: "6px" }}
            >
              <path d="M3 12L12 3M5 3h7v7" />
            </svg>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
