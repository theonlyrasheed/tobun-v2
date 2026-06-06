import * as React from "react";
import { Box, Text } from "@mantine/core";
import { useGallery } from "@/hooks/use-sanity";

const FAN_POSITIONS = [-3, -2, -1, 0, 1, 2, 3] as const;

/** Deterministically shuffle an array (Fisher-Yates with a seed derived from array length). */
function seedShuffle<T>(arr: T[]): T[] {
  const out = [...arr];
  // simple deterministic pseudo-random based on indices — stable across renders
  for (let i = out.length - 1; i > 0; i--) {
    const j = (i * 1103515245 + 12345) % (i + 1);
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function GalleryHero() {
  const { data: galleryItems = [] } = useGallery();
  const heroRef = React.useRef<HTMLDivElement>(null);
  const fanRef = React.useRef<HTMLDivElement>(null);
  const [inViewport, setInViewport] = React.useState(false);

  // Pick 7 items — prefer featured ones, then fill from shuffled rest
  const fanItems = React.useMemo(() => {
    if (galleryItems.length === 0) return [];
    const featured = galleryItems.filter((g: any) => g.featured);
    const rest = seedShuffle(galleryItems.filter((g: any) => !g.featured));
    const pool = [...featured, ...rest].slice(0, 7);
    // Pad with shuffled repeats if we have fewer than 7 items
    while (pool.length < 7 && galleryItems.length > 0) {
      pool.push(galleryItems[pool.length % galleryItems.length]);
    }
    return pool.slice(0, 7);
  }, [galleryItems]);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setInViewport(true);
    }, 50);

    const hero = heroRef.current;
    const fan = fanRef.current;
    if (!hero || !fan) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (reduce || !fine) return;

    let rx = 0, ry = 0, tx = 0, ty = 0, raf = 0;

    const loop = () => {
      rx += (tx - rx) * 0.08;
      ry += (ty - ry) * 0.08;
      fan.style.transform = `rotateY(${rx}deg) rotateX(${ry}deg)`;

      if (Math.abs(tx - rx) > 0.01 || Math.abs(ty - ry) > 0.01) {
        raf = requestAnimationFrame(loop);
      } else {
        raf = 0;
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      const r = hero.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 12;
      ty = -((e.clientY - r.top) / r.height - 0.5) * 7;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const onPointerLeave = () => {
      tx = 0;
      ty = 0;
      if (!raf) raf = requestAnimationFrame(loop);
    };

    hero.addEventListener("pointermove", onPointerMove);
    hero.addEventListener("pointerleave", onPointerLeave);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(raf);
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return (
    <Box
      component="section"
      ref={heroRef}
      className={`gal-hero${inViewport ? " gh-in" : ""}`}
      data-header-watch
      data-screen-label="Gallery — Hero"
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "clamp(640px, 94vh, 1020px)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        color: "var(--on-dark)",
        background: "var(--deep)",
        padding: "calc(var(--header-h) + clamp(18px, 3vh, 40px)) var(--gut) clamp(40px, 6vh, 84px)",
      }}
    >
      <Box
        className="gh-bg"
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
        }}
      >
        <Box
          component="img"
          src="/assets/img/fresco.jpg"
          alt="Baroque ceiling fresco"
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "50% 40%",
            opacity: 0.32,
            transform: "scale(1.08)",
          }}
        />
      </Box>
      <Box
        className="gh-glow"
        style={{
          position: "absolute",
          left: "50%",
          top: "48%",
          width: "72vw",
          height: "72vw",
          maxWidth: "880px",
          maxHeight: "880px",
          transform: "translate(-50%, -50%)",
          zIndex: 1,
          pointerEvents: "none",
          borderRadius: "50%",
          background: "radial-gradient(circle, color-mix(in oklab, var(--gold) 28%, transparent), transparent 62%)",
          filter: "blur(8px)",
        }}
      />

      <Box
        className="gh-inner"
        style={{
          position: "relative",
          zIndex: 3,
          width: "100%",
          maxWidth: "1120px",
          perspective: "1500px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "clamp(16px, 2.4vh, 30px)",
        }}
      >
        <Text
          component="span"
          className="kicker no-tick gh-kicker gh-anim d1"
          style={{ color: "var(--gold)" }}
        >
          Our gallery
        </Text>

        <svg
          className="gh-arc gh-anim d2"
          viewBox="0 0 1200 250"
          role="img"
          aria-label="The world is your canvas"
          style={{
            width: "min(96vw, 1080px)",
            height: "auto",
            display: "block",
            overflow: "visible",
          }}
        >
          <defs>
            <path id="galArc" d="M 70 235 Q 600 35 1130 235" fill="none" />
          </defs>
          <text
            textAnchor="middle"
            fontSize="96"
            style={{
              fontFamily: "var(--display)",
              fontWeight: 800,
              letterSpacing: "-0.01em",
              fill: "var(--on-dark)",
              paintOrder: "stroke",
            }}
          >
            <textPath href="#galArc" startOffset="50%">
              The world is your{" "}
              <tspan
                className="accent"
                style={{
                  fill: "var(--gold)",
                  fontFamily: "var(--serif)",
                  fontStyle: "italic",
                  fontWeight: 400,
                }}
              >
                canvas
              </tspan>
            </textPath>
          </text>
        </svg>

        <Box
          ref={fanRef}
          className="gh-fan gh-anim d3"
          data-gh-fan
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            gap: "clamp(4px, 0.7vw, 11px)",
            transformStyle: "preserve-3d",
            marginTop: "clamp(-6px, -0.5vw, 0)",
          }}
        >
          {fanItems.map((item: any, idx: number) => {
            const i = FAN_POSITIONS[idx] ?? 0;
            const src = item.src || item.largeSrc || `https://picsum.photos/seed/${item.seed}/600/800`;
            return (
              <Box
                key={item.seed || idx}
                component="a"
                href="#gallery-grid"
                className="gh-card"
                data-cursor="view"
                data-cursor-label="Explore"
                style={{
                  "--i": i,
                  position: "relative",
                  flex: "none",
                  width: "clamp(72px, 10.5vw, 152px)",
                  aspectRatio: "3/4",
                  borderRadius: "12px",
                  overflow: "hidden",
                  border: "1px solid rgba(255, 255, 255, 0.14)",
                  transform: `rotate(calc(${i} * 3deg)) translateY(calc(${i} * ${i} * -6px))`,
                  transformOrigin: "center bottom",
                  boxShadow: "0 26px 46px -26px rgba(0, 0, 0, 0.72)",
                } as React.CSSProperties}
              >
                <Box
                  component="img"
                  src={src}
                  alt={item.title || ""}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                  }}
                />
              </Box>
            );
          })}
        </Box>

        <Text
          component="p"
          className="gh-lead gh-anim d3"
          style={{
            position: "relative",
            zIndex: 3,
            maxWidth: "60ch",
            fontFamily: "var(--serif)",
            fontSize: "clamp(1.05rem, 1.6vw, 1.45rem)",
            lineHeight: 1.5,
            color: "color-mix(in oklab, var(--on-dark) 86%, transparent)",
            textWrap: "pretty",
          }}
        >
          Explore moments, details and expressions from a creative journey where
          art, fashion and digital innovation intersect.{" "}
          <em style={{ fontStyle: "italic", color: "var(--gold)" }}>
            Create something — even if it's invisible.
          </em>
        </Text>

        <Box
          component="a"
          className="gh-scroll gh-anim d4"
          href="#gallery-grid"
          style={{
            position: "relative",
            zIndex: 3,
            display: "inline-flex",
            alignItems: "center",
            gap: "9px",
            fontFamily: "var(--mono)",
            fontSize: "0.64rem",
            letterSpacing: ".2em",
            textTransform: "uppercase",
            color: "color-mix(in oklab, var(--on-dark) 70%, transparent)",
          }}
        >
          Browse the work
          <Box
            component="span"
            className="dot"
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              display: "grid",
              placeItems: "center",
              border:
                "1px solid color-mix(in oklab, var(--on-dark) 38%, transparent)",
            }}
          >
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
        </Box>
      </Box>
    </Box>
  );
}
