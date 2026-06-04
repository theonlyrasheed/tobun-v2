import * as React from "react";

const SPECIALTIES = [
  {
    num: "01",
    cap: "Couture",
    title: "Digital Couture",
    desc: "Garments as art objects — illustrated and rendered digitally, where pattern meets the body.",
    img: "https://picsum.photos/seed/ltcouture/800/1000",
    thumb: "https://picsum.photos/seed/ltcouture/640/420",
  },
  {
    num: "02",
    cap: "Textile",
    title: "Fabric Painting & ADIRE",
    desc: "Tie-and-dye and textile work as a narrative medium — indigo that preserves culture and tells stories.",
    img: "https://picsum.photos/seed/ltadire/800/1000",
    thumb: "https://picsum.photos/seed/ltadire/640/420",
  },
  {
    num: "03",
    cap: "Mural",
    title: "Mural Art",
    desc: "Large-scale public works rooted in community and place — art that belongs to a street.",
    img: "https://picsum.photos/seed/ltmural/800/1000",
    thumb: "https://picsum.photos/seed/ltmural/640/420",
  },
  {
    num: "04",
    cap: "Painting",
    title: "Visual & Charcoal",
    desc: "Painting and expressive contrast on canvas and paper — the hand behind every pixel.",
    img: "https://picsum.photos/seed/ltpaint/800/1000",
    thumb: "https://picsum.photos/seed/ltpaint/640/420",
  },
  {
    num: "05",
    cap: "AI",
    title: "AI Features",
    desc: "Artificial intelligence as a creative collaborator, not a shortcut — sustainable, digital wearable art.",
    img: "https://picsum.photos/seed/ltai/800/1000",
    thumb: "https://picsum.photos/seed/ltai/640/420",
  },
  {
    num: "06",
    cap: "Illustration",
    title: "Digital Illustration",
    desc: "Line upon line — building wearable form, sketch by sketch, toward the runway.",
    img: "https://picsum.photos/seed/ltsketch/800/1000",
    thumb: "https://picsum.photos/seed/ltsketch/640/420",
  },
] as const;

export function SpecialtyList() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const rootRef = React.useRef<HTMLDivElement>(null);

  const select = React.useCallback((i: number) => {
    setActiveIndex(i);
  }, []);

  React.useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const rows = [...root.querySelectorAll<HTMLButtonElement>(".spec2-row")];
    const wide = window.matchMedia("(min-width:900px)");
    let ticking = false;

    const onScroll = () => {
      if (!wide.matches || ticking) return;
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
  }, [select]);

  return (
    <section className="section-tight wrap">
      <div className="eyebrow-row">
        <div>
          <span className="kicker">Areas of specialty &amp; beyond</span>
          <h2 class="h-lg" style={{ marginTop: "16px" }}>
            Six ways I <em className="accent-ochre">make</em>
          </h2>
        </div>
      </div>
      <div ref={rootRef} className="spec2" data-reveal data-spec>
        <div className="spec2-list">
          {SPECIALTIES.map((spec, i) => (
            <button
              key={spec.num}
              type="button"
              className={`spec2-row ${i === activeIndex ? "active" : ""}`}
              data-i={i}
              data-cap={spec.cap}
              onMouseEnter={() => select(i)}
              onFocus={() => select(i)}
              onClick={() => select(i)}
            >
              <span className="sn">{spec.num}</span>
              <span>
                <span className="st">{spec.title}</span>
                <span className="sd">{spec.desc}</span>
                <span className="sthumb">
                  <img src={spec.thumb} alt={spec.title} />
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
          ))}
        </div>
        <div className="spec2-preview" aria-hidden="true">
          {SPECIALTIES.map((spec, i) => (
            <div key={spec.num} className={`sp-img ${i === activeIndex ? "on" : ""}`}>
              <img src={spec.img} alt="" />
            </div>
          ))}
          <div className="sp-cap">
            <span className="sp-num">{SPECIALTIES[activeIndex].num}</span>
            <span className="sp-name">{SPECIALTIES[activeIndex].title}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
