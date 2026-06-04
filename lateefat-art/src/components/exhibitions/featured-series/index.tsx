import * as React from "react";
import { Box, Stack, Text } from "@mantine/core";
import { Kicker } from "@/components/shared/kicker";
import { LinkArrow } from "@/components/shared/link-arrow";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";

export function FeaturedSeries() {
  return (
    <Box component="section" className="section" style={{ background: "var(--bg)" }}>
      <Box
        className="wrap"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "clamp(40px,6vw,96px)",
          alignItems: "center",
        }}
      >
        <ImagePlaceholder
          src="https://picsum.photos/seed/lt-14-wearable-art/700/840"
          alt="Valentine Series"
          bloom
          data-reveal
          style={{ aspectRatio: "5/6" }}
        />
        <Stack gap={20} data-reveal>
          <Kicker>Featured series</Kicker>
          <h2 className="h-lg" style={{ fontFamily: "var(--display)", margin: 0 }}>
            Valentine{" "}
            <em style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 300, color: "var(--clay-deep)" }}>
              Series
            </em>
          </h2>
          <Text className="lead" style={{ margin: 0 }}>
            A series exploring the intersection of love, ADIRE textile tradition, and the digital body — rooted in the belief that intimacy can be worn as well as felt.
          </Text>
          <Text style={{ color: "var(--fg-soft)", lineHeight: 1.65 }}>
            Shown across London and Lagos in 2025, the series brought together hand-dyed indigo cloth and digital couture in a conversation about what we make for the people we love.
          </Text>
          <LinkArrow href="/contact">Enquire about this series</LinkArrow>
        </Stack>
      </Box>
    </Box>
  );
}
