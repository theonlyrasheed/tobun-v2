import * as React from "react";
import { Box, Text } from "@mantine/core";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import { Kicker } from "@/components/shared/kicker";

export function GalleryHero() {
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
      {/* Background */}
      <Box style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <ImagePlaceholder
          src="https://picsum.photos/seed/lt-fresco-bg/1600/900"
          alt=""
          style={{ width: "100%", height: "100%", borderRadius: 0, opacity: 0.4 }}
          className="bg-breathe"
        />
        <Box style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 60% at 65% 40%, color-mix(in oklab, var(--gold) 18%, transparent) 0%, transparent 65%)" }} />
        <Box style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, var(--deep) 0%, transparent 60%)" }} />
      </Box>

      {/* Arched SVG headline */}
      <Box style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -60%)", width: "min(700px, 90vw)", zIndex: 1 }}>
        <svg viewBox="0 0 700 200" style={{ width: "100%", overflow: "visible" }}>
          <defs>
            <path id="arc" d="M 50,180 A 300,300 0 0,1 650,180" />
          </defs>
          <text style={{ fontFamily: "var(--display)", fontSize: 72, fontWeight: 800, fill: "var(--on-dark)", letterSpacing: "-0.04em" }}>
            <textPath href="#arc" startOffset="50%" textAnchor="middle">
              The world is your <tspan style={{ fill: "var(--clay-soft)", fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 300 }}>canvas</tspan>
            </textPath>
          </text>
        </svg>
      </Box>

      {/* Content bottom */}
      <Box className="wrap" style={{ position: "relative", zIndex: 2, paddingBottom: "clamp(48px,8vw,96px)" }}>
        <Box data-reveal style={{ maxWidth: "40ch" }}>
          <Kicker style={{ color: "var(--gold)" }}>Browse the work</Kicker>
          <Text
            className="lead"
            style={{ margin: "16px 0 28px", color: "color-mix(in oklab, var(--on-dark) 80%, transparent)" }}
          >
            Seven years of practice across digital couture, mural art, visual painting, illustration, fabric, and AI — all in one place.
          </Text>
          <a
            href="#gallery-grid"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5em", fontFamily: "var(--mono)", fontSize: "0.7rem", letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--on-dark)" }}
          >
            Browse the work
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M7 2v10M3.5 8.5 7 12l3.5-3.5" />
            </svg>
          </a>
        </Box>
      </Box>
    </Box>
  );
}
