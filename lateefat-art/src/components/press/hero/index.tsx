import * as React from "react";

const OUTLETS = [
  "The Guardian",
  "Creative Worship",
  "Digital Culture",
  "Arts Review",
  "Heritage Now",
  "Fashion Tech",
  "Mindful Arts",
];

export function PressHero() {
  const [inViewport, setInViewport] = React.useState(false);

  React.useEffect(() => {
    setInViewport(true);
  }, []);

  return (
    <section
      className={`prh ${inViewport ? "in" : ""}`}
      data-header-watch
      data-screen-label="Press — Hero"
    >
      <div className="prh-bg">
        <img src="/assets/img/fresco.jpg" alt="Baroque ceiling fresco" />
      </div>
      <div className="prh-glow" />

      <div className="prh-inner">
        <span className="kicker no-tick prh-kicker prh-anim d1">In the press</span>
        <h1 className="prh-title prh-anim d2">
          <span className="q">&ldquo;</span>
          What the world is saying about <em>art.</em>
          <span className="q">&rdquo;</span>
        </h1>
        <p className="prh-lead prh-anim d3">
          Features, interviews and coverage of work bridging art, fashion and technology — and
          the uplifting of craft in the modern world.
        </p>

        <div className="prh-feat prh-anim d4">
          <span className="lbl">As featured in</span>
          <div className="prh-strip">
            <div className="prh-track" aria-hidden="true">
              {OUTLETS.map((o, idx) => (
                <span key={`o1-${idx}`}>{o}</span>
              ))}
              {OUTLETS.map((o, idx) => (
                <span key={`o2-${idx}`}>{o}</span>
              ))}
            </div>
          </div>
        </div>

        <a className="prh-scroll prh-anim d5" href="#press-feature">
          The coverage
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
        </a>
      </div>
    </section>
  );
}
