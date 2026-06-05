import * as React from "react";
import { Box, Text, Anchor } from "@mantine/core";
import { useMediaQuery, useReducedMotion, useTimeout } from "@mantine/hooks";

export function HomeHero() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const bgRef = React.useRef<HTMLDivElement>(null);
  const glowRef = React.useRef<HTMLDivElement>(null);
  const figRef = React.useRef<HTMLDivElement>(null);
  
  const [motionMode] = React.useState<"spotlight" | "still" | "parallax" | any>("spotlight");

  const reduce = useReducedMotion();
  const fine = useMediaQuery("(hover: hover) and (pointer: fine)");

  // Entrance animation trigger
  const { start: triggerReveal, clear: clearReveal } = useTimeout(() => {
    containerRef.current?.classList.add("hero-in");
  }, 1480);

  React.useEffect(() => {
    if (reduce) {
      containerRef.current?.classList.add("hero-in");
    } else {
      triggerReveal();
    }
    return clearReveal;
  }, [reduce, triggerReveal, clearReveal]);

  React.useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    if (motionMode !== "parallax" || !fine || reduce) {
      return;
    }

    // Parallax logic
    let px = 0, py = 0, tx = 0, ty = 0, raf = 0;

    const onMove = (e: PointerEvent) => {
      const r = container.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width - 0.5; // -0.5 to 0.5
      ty = (e.clientY - r.top) / r.height - 0.5;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const loop = () => {
      px += (tx - px) * 0.08;
      py += (ty - py) * 0.08;
      if (bgRef.current) {
        bgRef.current.style.transform = `translate(${px * -26}px, ${py * -16}px) scale(1.1)`;
      }
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${px * 30}px, ${py * 22}px)`;
      }
      if (figRef.current) {
        figRef.current.style.transform = `translateX(calc(-50% + ${px * 18}px)) translateY(${py * 8}px)`;
      }
      if (Math.abs(tx - px) > 0.001 || Math.abs(ty - py) > 0.001) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };

    const clearParallax = () => {
      cancelAnimationFrame(raf);
      raf = 0;
      px = py = tx = ty = 0;
      if (bgRef.current) bgRef.current.style.transform = "";
      if (glowRef.current) glowRef.current.style.transform = "";
      if (figRef.current) figRef.current.style.transform = "";
    };

    container.addEventListener("pointermove", onMove);
    container.addEventListener("pointerleave", clearParallax);

    return () => {
      cancelAnimationFrame(raf);
      container.removeEventListener("pointermove", onMove);
      container.removeEventListener("pointerleave", clearParallax);
      if (bgRef.current) bgRef.current.style.transform = "";
      if (glowRef.current) glowRef.current.style.transform = "";
      if (figRef.current) figRef.current.style.transform = "";
    };
  }, [motionMode, fine, reduce]);


  return (
    <Box
      component="section"
      ref={containerRef}
      className="canvas-hero"
      data-motion={motionMode}
      data-header-watch
      style={{
        position: "relative",
        minHeight: "100svh",
        overflow: "hidden",
        color: "var(--on-dark)",
        background: "var(--deep)",
        "--hero-accent": "var(--gold)"
      } as React.CSSProperties}
    >
      <Box ref={bgRef} className="ch-bg">
        <Box
          component="img"
          src="/assets/img/fresco.jpg"
          alt="Baroque ceiling fresco — the world as a canvas"
        />
      </Box>
      <Box ref={glowRef} className="ch-glow" />
      <Box ref={figRef} className="ch-figure">
        <Box
          component="img"
          src="/assets/img/lateefat-back.png"
          id="hero-figure"
          alt="Lateefat facing away"
          style={{ width: "100%", height: "auto" }}
        />
      </Box>
      <Box className="ch-vignette" />

      <Box className="ch-inner">
        <Box className="ch-bottom">
          <Box className="ch-headline">
            <Box component="span" className="ch-rule ch-anim d1" />
            <Text
              component="h1"
              className="ch-title ch-anim d2"
              id="heroTitle"
            >
              Create
              <br />
              something —
            </Text>
            <Text
              component="p"
              className="ch-sub ch-anim d3"
              id="heroSub"
            >
              even if it's <em>invisible.</em>
            </Text>
          </Box>
          <Box className="ch-side ch-anim d4">
            <Text component="p" className="ch-note-p">
              One art at a time is a timeless way to progression.
            </Text>
            <Text component="span" className="sig">
              — Lateefat M. Tobun
            </Text>
            <Anchor
              className="ch-scroll"
              href="#about"
            >
              Scroll
              <Box component="span" className="dot">
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
              </Box>
            </Anchor>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
