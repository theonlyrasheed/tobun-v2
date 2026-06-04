import * as React from "react";
import { Box, Text } from "@mantine/core";

export function AboutHero() {
  const [inViewport, setInViewport] = React.useState(false);

  React.useEffect(() => {
    setInViewport(true);
  }, []);

  return (
    <Box
      component="section"
      className={`why-hero${inViewport ? " in" : ""}`}
      style={{
        position: "relative",
        minHeight: "100svh",
        overflow: "hidden",
        isolation: "isolate",
        background: `
          radial-gradient(120% 90% at 50% 8%, oklch(0.28 0.05 60 / .55), transparent 60%),
          radial-gradient(90% 70% at 50% 96%, oklch(0.20 0.04 268 / .6), transparent 70%),
          linear-gradient(180deg, oklch(0.165 0.022 268) 0%, oklch(0.135 0.018 270) 55%, oklch(0.115 0.016 272) 100%)
        `,
        color: "var(--on-dark)",
        display: "flex",
        alignItems: "stretch",
      }}
      data-header-watch
    >
      <div className="why-glow" />
      <div className="why-grid" />
      <div className="why-frame" />

      <div className="why-inner">
        <div className="why-top">
          <span className="why-eyebrow why-anim">Art &amp; Culture</span>
          <span className="why-est why-anim">Est. 2020</span>
        </div>

        <div className="why-stage">
          <h1 className="why-word l why-anim">
            Why <span className="it">I</span>
          </h1>
          <div className="why-figure why-anim">
            <img src="/assets/img/lateefat-sitting.png" alt="Lateefat Tobun, seated" />
          </div>
          <h1 className="why-word r why-anim">Choose Art</h1>
          <span className="why-tag why-anim">Unveiling the future through art</span>
        </div>

        <div className="why-bottom">
          <p className="why-lead why-anim">
            Despite an analytical foundation, my heart chose art — not as a discipline, but as a lifelong journey of discovery.
          </p>
          <a className="why-scroll why-anim" href="#bio-intro">
            Read her story
            <span className="dot">
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M6.5 2v9M3 7.5l3.5 3.5L10 7.5" />
              </svg>
            </span>
          </a>
        </div>
      </div>
    </Box>
  );
}
