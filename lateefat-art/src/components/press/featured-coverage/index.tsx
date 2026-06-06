import * as React from "react";
import { Link } from "@tanstack/react-router";
import { usePressArticles } from "@/hooks/use-sanity";


export function FeaturedCoverage() {
  const { data: articles = [] } = usePressArticles();

  // Pick the most recent post marked featured=true in Sanity.
  // Articles arrive ordered by published_at desc, so the first match is always the newest.
  // Falls back to the most recent post overall when none are explicitly featured.
  const featured = React.useMemo(() => {
    if (articles.length === 0) return null;
    return articles.find((art: any) => art.featured === true) ?? articles[0];
  }, [articles]);

  if (!featured) return null;

  const isExternal = featured.source && featured.source.href && featured.source.href !== "#" && (!featured.body || featured.body.length === 0);

  const content = (
    <>
      <div className="ph bloom">
        <img
          src={featured.hero}
          alt={`Feature image — ${featured.outlet}`}
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
          {featured.outlet} &middot; {featured.kind} &middot; {featured.date}
        </span>
        <h2 className="h-lg" style={{ color: "var(--on-dark)", margin: "18px 0 16px" }}>
          {featured.title}
        </h2>
        <p className="lead">
          {featured.standfirst}
        </p>
        <span className="link-arrow" style={{ color: "var(--on-dark)", marginTop: "26px" }}>
          {isExternal ? `Read original` : "Read feature"}
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
    </>
  );

  if (isExternal) {
    return (
      <section className="section-tight wrap" id="press-feature">
        <a
          className="pr-feature"
          data-reveal
          href={featured.source.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {content}
        </a>
      </section>
    );
  }

  return (
    <section className="section-tight wrap" id="press-feature">
      <Link
        className="pr-feature"
        data-reveal
        to="/press/$slug"
        params={{ slug: featured.slug || "" }}
      >
        {content}
      </Link>
    </section>
  );
}
