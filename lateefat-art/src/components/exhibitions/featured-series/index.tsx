import * as React from "react";
import { Box, Text } from "@mantine/core";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";

export function FeaturedSeries() {
  return (
    <Box component="section" className="section wrap" style={{ background: "var(--bg)" }}>
      <Box className="feature" data-reveal>
        <ImagePlaceholder
          src="https://picsum.photos/seed/lt-17-valentine-series-h/800/900"
          alt="Valentine Series — hero piece"
          bloom
          style={{
            width: "100%",
            borderRadius: "var(--radius)",
          }}
        />
        <Box>
          <span className="tag" style={{ marginBottom: "16px", display: "inline-block" }}>
            Featured · 2025 · Nigeria
          </span>
          <h2 className="h-lg" style={{ margin: "0 0 18px" }}>
            Valentine Series
          </h2>
          <Text className="lead" style={{ color: "var(--ink-soft)", margin: 0 }}>
            A study in colour, contrast and intimacy. The Valentine Series brings together fabric painting, charcoal and digital couture into a single meditation on connection — gathering a community around a shared creative goal.
          </Text>
          <Box
            component="a"
            href="/contact"
            className="link-arrow"
            style={{ marginTop: "24px", display: "inline-flex" }}
          >
            Enquire about this series
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
