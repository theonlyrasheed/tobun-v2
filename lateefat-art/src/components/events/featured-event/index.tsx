import { Link } from "@tanstack/react-router";

export function FeaturedEvent() {
  return (
    <section className="section-tight wrap">
      <div className="feat-ev" data-reveal>
        <div className="ph bloom">
          <img
            src="https://picsum.photos/seed/lt-18-upcoming-event-the/800/900"
            alt="Upcoming event — The Pocket Stories"
            loading="lazy"
          />
        </div>
        <div className="body">
          <span
            className="tag"
            style={{
              color: "var(--ochre)",
              borderColor: "color-mix(in oklab, var(--ochre) 50%, transparent)",
              alignSelf: "flex-start",
            }}
          >
            Next up · 2026
          </span>
          <h2 className="h-lg" style={{ color: "var(--on-dark)", margin: "18px 0 14px" }}>
            The Pocket Stories
          </h2>
          <p className="lead">
            An immersive afternoon of wearable digital couture, ADIRE printing and conversation —
            open to all, in Bradford, United Kingdom. The aim is simple: gather, make, and carry a
            story home.
          </p>
          <Link
            to="/contact"
            className="btn btn-ochre"
            style={{ alignSelf: "flex-start", marginTop: "28px" }}
          >
            Get your free ticket
            <svg
              width="17"
              height="17"
              viewBox="0 0 17 17"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M3 8.5h11M9 3.5l5 5-5 5" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
