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

  const updateProgress = React.useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const max = track.scrollWidth - track.clientWidth;
    const sl = track.scrollLeft;
    const centre = sl + track.clientWidth / 2;

    // Fill line length
    if (fillRef.current) {
      fillRef.current.style.width = `${centre}px`;
    }

    // Scrollbar indicator position
    if (barSpanRef.current) {
      const frac = max > 0 ? sl / max : 0;
      // 120px indicator track width. Span is 26% wide.
      barSpanRef.current.style.left = `${frac * (120 - 0.26 * 120)}px`;
    }

    // Determine active item based on proximity to horizontal center
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
    const container = containerRef.current;
    if (!track || !container) return;

    const onScroll = () => {
      requestAnimationFrame(updateProgress);
    };

    track.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", updateProgress);
    requestAnimationFrame(updateProgress);

    // Continuous page scroll linked to horizontal scroll
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    
    const onPageScroll = () => {
      if (isDragging || reduce || !track) return;
      const max = track.scrollWidth - track.clientWidth;
      if (max <= 0) return;
      const rect = container.getBoundingClientRect();
      const vh = window.innerHeight;
      if (rect.bottom < 0 || rect.top > vh) return;
      const total = vh + rect.height;
      let p = (vh - rect.top) / total;
      p = Math.max(0, Math.min(1, p));
      track.scrollLeft = p * max;
    };

    window.addEventListener("scroll", onPageScroll, { passive: true });

    return () => {
      track.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", updateProgress);
      window.removeEventListener("scroll", onPageScroll);
    };
  }, [updateProgress, isDragging]);

  // Drag handlers
  const dragStart = React.useRef({ isDown: false, sx: 0, sl0: 0, moved: false });

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const track = trackRef.current;
    if (!track) return;
    dragStart.current = {
      isDown: true,
      sx: e.clientX,
      sl0: track.scrollLeft,
      moved: false,
    };
    setIsDragging(true);
  };

  const onPointerMove = React.useCallback((e: PointerEvent) => {
    if (!dragStart.current.isDown) return;
    const track = trackRef.current;
    if (!track) return;
    const dx = e.clientX - dragStart.current.sx;
    if (Math.abs(dx) > 4) {
      dragStart.current.moved = true;
    }
    track.scrollLeft = dragStart.current.sl0 - dx;
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
      style={{ padding: "124px 0px 0px" }}
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
      <div
        className="jrn wrap"
        data-reveal
        style={{ margin: "30px 0px" }}
      >
        <div
          ref={trackRef}
          className={`jrn-track ${isDragging ? "dragging" : ""}`}
          onPointerDown={onPointerDown}
          style={{ touchAction: "pan-y" }}
        >
          <div className="jrn-inner">
            <div className="jrn-line" />
            <div ref={fillRef} className="jrn-fill" />
            {TIMELINE_STEPS.map((step, i) => (
              <div
                key={step.yr}
                className={`jrn-step ${i === activeIndex ? "on" : ""}`}
              >
                <span className="jrn-dot" />
                <div className="jrn-yr">{step.yr}</div>
                <div className="jrn-ti">{step.ti}</div>
                <p className="jrn-de">{step.de}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="jrn-hint" style={{ alignItems: "flex-end", textAlign: "center" }}>
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
