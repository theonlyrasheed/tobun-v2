import * as React from "react";
import { Box } from "@mantine/core";

export function ExhibitionsHero() {
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    // Run entrance animation on mount
    const timer = setTimeout(() => {
      setMounted(true);
    }, 50);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Box
      component="section"
      className={`exh${mounted ? " in" : ""}`}
      data-header-watch
      data-screen-label="Exhibitions — Hero"
      style={{
        position: "relative",
        overflow: "hidden",
        isolation: "isolate",
        color: "var(--on-dark)",
        background: "var(--deep)",
        minHeight: "clamp(540px, 82vh, 880px)",
        display: "flex",
        alignItems: "flex-end",
        padding: "calc(var(--header-h) + clamp(28px,5vh,60px)) var(--gut) clamp(40px,6vh,84px)",
      }}
    >
      <Box
        className="exh-bg"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <img
          src="/assets/img/fresco.jpg"
          alt="Baroque ceiling fresco"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "50% 32%",
            opacity: 0.5,
            transform: "scale(1.06)",
          }}
        />
      </Box>
      <Box className="exh-glow" />

      <Box
        className="exh-inner"
        style={{
          position: "relative",
          zIndex: 2,
          width: "100%",
          maxWidth: "var(--maxw)",
          margin: "0 auto",
        }}
      >
        <span
          className="kicker no-tick exh-kicker exh-anim d1"
          style={{ display: "block" }}
        >
          Exhibitions &amp; series
        </span>
        <h1 className="exh-title exh-anim d2">
          Shows &amp;
          <br />
          <em>series.</em>
        </h1>
        <p className="exh-lead exh-anim d3">
          Curated bodies of work shown across the United Kingdom, Nigeria and Ghana — each a chapter in an evolving conversation between heritage and the digital future.
        </p>
        <Box className="exh-meta exh-anim d4">
          <span>
            <b>Since 2020</b>
          </span>
          <span className="sep" />
          <span>United Kingdom</span>
          <span className="sep" />
          <span>Nigeria</span>
          <span className="sep" />
          <span>Ghana</span>
        </Box>
        <Box
          component="a"
          className="exh-scroll exh-anim d5"
          href="#ex-record"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "9px",
            textDecoration: "none",
          }}
        >
          Browse the record
          <span className="dot">
            <svg
              width="13"
              height="13"
              viewBox="0 0 13 13"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
            >
              <path d="M6.5 2v9M3 7.5l3.5 3.5L10 7.5" />
            </svg>
          </span>
        </Box>
      </Box>
    </Box>
  );
}
