export function FeaturedCoverage() {
  return (
    <section className="section-tight wrap" id="press-feature">
      <a
        className="pr-feature"
        data-reveal
        href="https://guardian.ng/art/lateefat-tobun-leads-art-and-fashion-tech-innovation-at-uk-creative-workshop/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <div className="ph bloom">
          <img
            src="https://picsum.photos/seed/lt-25-feature-image-guar/800/900"
            alt="Feature image — Guardian"
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
            The Guardian · News · Oct 20, 2025
          </span>
          <h2 className="h-lg" style={{ color: "var(--on-dark)", margin: "18px 0 16px" }}>
            Lateefat Tobun leads art and fashion-tech innovation at UK creative workshop.
          </h2>
          <p className="lead">
            The Guardian published a feature on the uplifting of the arts in the modern world space
            — spotlighting a creative workshop that brought together textile heritage, digital
            couture and AI.
          </p>
          <span className="link-arrow" style={{ color: "var(--on-dark)", marginTop: "26px" }}>
            Read on guardian.ng
            <svg
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <path d="M3 12L12 3M5 3h7v7" />
            </svg>
          </span>
        </div>
      </a>
    </section>
  );
}
