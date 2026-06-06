import * as React from "react";

const TIMELINE_STEPS = [
  {
    yr: "Roots",
    ti: "Colour & indigo",
    de: "Creativity began through colour, brush strokes, charcoal contrast and ADIRE — fabric as both medium and message.",
  },
  {
    yr: "2017",
    ti: "Four yards of fabric",
    de: "Experimenting with tie-and-dye on a single piece, I began to imagine form beyond flat material — no mannequins, no digital tools.",
  },
  {
    yr: "2020",
    ti: "The first workshop",
    de: "Over 40 participants — a pivotal moment that confirmed art as a shared experience for connection, empowerment and healing.",
  },
  {
    yr: "2023",
    ti: "Studying intelligence",
    de: "Two MSc degrees, including Applied AI & Data Analytics, reframed technology as a collaborator for sustainable, digital wearable art.",
  },
  {
    yr: "2025",
    ti: "Art as healing",
    de: "Recent work centres on mindful regulation — creativity as a therapeutic tool to help people find calm and emotional balance.",
  },
] as const;

export function JourneyTimeline() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const trackRef = React.useRef<HTMLDivElement>(null);
  const fillRef = React.useRef<HTMLDivElement>(null);
  const barSpanRef = React.useRef<HTMLSpanElement>(null);

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  // Monitor breakpoint to enable/disable drag/scroll calculations
  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const updateProgress = React.useCallback(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      return;
    }
    const track = trackRef.current;
    if (!track) return;

    const max = track.scrollWidth - track.clientWidth;
    const sl = track.scrollLeft;
    const centre = sl + track.clientWidth / 2;

    if (fillRef.current) {
      fillRef.current.style.width = `${centre}px`;
    }

    if (barSpanRef.current) {
      const frac = max > 0 ? sl / max : 0;
      barSpanRef.current.style.left = `${frac * (120 - 0.26 * 120)}px`;
    }

    const steps = [...track.querySelectorAll<HTMLDivElement>(".jrn-step")];
    let best = 0;
    let bestD = Infinity;
    steps.forEach((s, idx) => {
      const d = Math.abs(s.offsetLeft + s.offsetWidth / 2 - centre);
      if (d < bestD) {
        bestD = d;
        best = idx;
      }
    });
    setActiveIndex(best);
  }, []);

  React.useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const onScroll = () => requestAnimationFrame(updateProgress);

    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateProgress);
    requestAnimationFrame(updateProgress);

    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateProgress);
    };
  }, [updateProgress]);

  // Drag handlers
  const dragStart = React.useRef({ isDown: false, sx: 0, sl0: 0 });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;
    const track = trackRef.current;
    if (!track) return;
    dragStart.current = { isDown: true, sx: e.clientX, sl0: track.scrollLeft };
    setIsDragging(true);
  };

  const onPointerMove = React.useCallback((e: PointerEvent) => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) return;
    if (!dragStart.current.isDown) return;
    const track = trackRef.current;
    if (!track) return;
    track.scrollLeft =
      dragStart.current.sl0 - (e.clientX - dragStart.current.sx);
  }, []);

  const onPointerUp = React.useCallback(() => {
    dragStart.current.isDown = false;
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    window.addEventListener("pointercancel", onPointerUp);
    return () => {
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      window.removeEventListener("pointercancel", onPointerUp);
    };
  }, [onPointerMove, onPointerUp]);

  return (
    <section
      ref={containerRef}
      className="section cream-2-block"
      style={{ padding: "64px 0px 124px" }}
    >
      <div className="wrap">
        <div className="eyebrow-row">
          <div>
            <span className="kicker">The journey</span>
            <h2 className="h-lg" style={{ marginTop: "16px" }}>
              A defining <em className="accent-ochre">turn</em>
            </h2>
          </div>
        </div>
      </div>

      {/* Track sits outside .wrap so it can bleed edge-to-edge, but we
          cap and centre it at --maxw so it never exceeds the content width */}
      <div className="jrn-outer" data-reveal>
        <div
          ref={trackRef}
          className={`jrn-track ${isDragging ? "dragging" : ""}`}
          onPointerDown={onPointerDown}
          style={{ touchAction: isMobile ? "auto" : "pan-y" }}
        >
          <div className="jrn-inner">
            <div className="jrn-line" />
            <div ref={fillRef} className="jrn-fill" />
            {TIMELINE_STEPS.map((step, i) => (
              <div
                key={step.yr}
                className={`jrn-step ${isMobile || i === activeIndex ? "on" : ""}`}
                onClick={() => !isMobile && setActiveIndex(i)}
              >
                <span className="jrn-dot" />
                <div className="jrn-yr">{step.yr}</div>
                <div className="jrn-ti">{step.ti}</div>
                <p className="jrn-de">{step.de}</p>
              </div>
            ))}
          </div>
        </div>

        <div
          className="jrn-hint"
          style={{
            alignItems: "flex-end",
            textAlign: "center",
          }}
        >
          <span className="drag">
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M8 7L3 12l5 5M16 7l5 5-5 5M3 12h18" />
            </svg>
            Drag or scroll
          </span>
          <span className="bar">
            <span ref={barSpanRef} data-jrn-bar />
          </span>
        </div>
      </div>
    </section>
  );
}
