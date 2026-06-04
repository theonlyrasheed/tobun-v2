import * as React from "react";
import { Box, Stack, Text } from "@mantine/core";
import { Kicker } from "@/components/shared/kicker";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";

export function ExhibitionsHero() {
  return (
    <Box
      component="section"
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        background: "var(--deep)",
        overflow: "hidden",
        color: "var(--on-dark)",
      }}
      data-header-watch
    >
      <Box style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <ImagePlaceholder
          src="https://picsum.photos/seed/lt-fresco-bg/1600/900"
          alt=""
          style={{ width: "100%", height: "100%", borderRadius: 0, opacity: 0.5 }}
          className="bg-breathe"
        />
        <Box style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 40% at 30% 60%, color-mix(in oklab, var(--clay) 24%, transparent) 0%, transparent 60%)" }} />
        <Box style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 40% 50% at 80% 30%, color-mix(in oklab, var(--gold) 12%, transparent) 0%, transparent 55%)" }} />
        <Box style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--deep) 0%, transparent 55%)" }} />
        <Box style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "40%", background: "linear-gradient(to top, var(--deep) 0%, transparent 100%)" }} />
      </Box>

      <Box className="wrap" style={{ position: "relative", zIndex: 1, paddingBottom: "clamp(56px,9vw,110px)" }}>
        <Stack gap={20} data-reveal style={{ maxWidth: "22ch" }}>
          <Kicker style={{ color: "var(--gold)" }}>Shows &amp; series</Kicker>
          <h1
            style={{
              fontFamily: "var(--display)",
              fontSize: "clamp(3rem,8vw,6rem)",
              fontWeight: 800,
              lineHeight: 0.92,
              letterSpacing: "-0.04em",
              margin: 0,
              color: "var(--on-dark)",
            }}
          >
            Shows &amp;{" "}
            <em style={{ fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 300, color: "var(--clay-soft)" }}>
              series.
            </em>
          </h1>
          <Text
            className="lead"
            style={{ color: "color-mix(in oklab, var(--on-dark) 78%, transparent)" }}
          >
            From community walls in Clayton to digital runways across the diaspora — a record of showing up, in every sense.
          </Text>
          <Text style={{ fontFamily: "var(--mono)", fontSize: "0.7rem", letterSpacing: "0.16em", color: "color-mix(in oklab, var(--on-dark) 55%, transparent)", textTransform: "uppercase" }}>
            Since 2020 · United Kingdom · Nigeria · Ghana
          </Text>
          <a
            href="#the-record"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5em", fontFamily: "var(--mono)", fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--on-dark)" }}
          >
            Browse the record
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M7 2v10M3.5 8.5 7 12l3.5-3.5" />
            </svg>
          </a>
        </Stack>
      </Box>
    </Box>
  );
}
