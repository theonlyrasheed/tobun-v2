import * as React from "react";
import { useMediaQuery } from "@mantine/hooks";
import { useServices } from "@/hooks/use-sanity";

const NUMBER_WORDS: Record<number, string> = {
  1: "One",
  2: "Two",
  3: "Three",
  4: "Four",
  5: "Five",
  6: "Six",
  7: "Seven",
  8: "Eight",
  9: "Nine",
  10: "Ten",
};

export function SpecialtyList() {
  const { data: services = [] } = useServices();
  const [activeIndex, setActiveIndex] = React.useState(0);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const isWide = useMediaQuery("(min-width: 900px)");

  const select = React.useCallback((i: number) => {
    setActiveIndex(i);
  }, []);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root || services.length === 0 || !isWide) return;

    const rows = [...root.querySelectorAll<HTMLButtonElement>(".spec2-row")];
    let ticking = false;

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const rect = root.getBoundingClientRect();
        if (rect.bottom < 80 || rect.top > window.innerHeight - 80) return;
        const vc = window.innerHeight / 2;
        let best = 0;
        let bd = Infinity;
        rows.forEach((r, idx) => {
          const rr = r.getBoundingClientRect();
          const d = Math.abs(rr.top + rr.height / 2 - vc);
          if (d < bd) {
            bd = d;
            best = idx;
          }
        });
        select(best);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, [select, services, isWide]);


  if (services.length === 0) return null;

  const safeIndex = activeIndex >= services.length ? 0 : activeIndex;
  const countText = services.length > 10 ? "10+" : (NUMBER_WORDS[services.length] || `${services.length}`);

  return (
    <section id="specialties" className="section-tight wrap">
      <div className="eyebrow-row">
        <div>
          <span className="kicker">Areas of specialty &amp; beyond</span>
          <h2 className="h-lg" style={{ marginTop: "16px" }}>
            {countText} ways I <em className="accent-ochre">make</em>
          </h2>
        </div>
      </div>
      <div ref={rootRef} className="spec2" data-reveal data-spec>
        <div className="spec2-list">
          {services.map((svc, i) => {
            const num = String(i + 1).padStart(2, "0");
            const cap = svc.tags?.[0] || "Art";
            const imageUrl = svc.image || "https://picsum.photos/seed/ltart/800/1000";

            return (
              <button
                key={svc.slug || i}
                type="button"
                className={`spec2-row ${i === safeIndex ? "active" : ""}`}
                data-i={i}
                data-cap={cap}
                onMouseEnter={() => select(i)}
                onFocus={() => select(i)}
                onClick={() => select(i)}
              >
                <span className="sn">{num}</span>
                <span>
                  <span className="st">{svc.title}</span>
                  <span className="sd">{svc.description}</span>
                  <span className="sthumb">
                    <img src={imageUrl} alt={svc.title} />
                  </span>
                </span>
                <svg
                  className="sx"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.7"
                >
                  <path d="M5 19L19 5M8 5h11v11" />
                </svg>
              </button>
            );
          })}
        </div>
        <div className="spec2-preview" aria-hidden="true">
          {services.map((svc, i) => {
            const imageUrl = svc.image || "https://picsum.photos/seed/ltart/800/1000";
            return (
              <div key={svc.slug || i} className={`sp-img ${i === safeIndex ? "on" : ""}`}>
                <img src={imageUrl} alt="" />
              </div>
            );
          })}
          {services[safeIndex] && (
            <div className="sp-cap">
              <span className="sp-num">{String(safeIndex + 1).padStart(2, "0")}</span>
              <span className="sp-name">{services[safeIndex].title}</span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

