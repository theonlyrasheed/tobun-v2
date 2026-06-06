import * as React from "react";
import { Link } from "@tanstack/react-router";
import { useEvents } from "@/hooks/use-sanity";


export function FeaturedEvent() {
  const { data: evs = [] } = useEvents();

  const featured = React.useMemo(() => {
    if (evs.length === 0) return null;
    return evs[0];
  }, [evs]);

  if (!featured) return null;

  return (
    <section className="section-tight wrap">
      <div className="feat-ev" data-reveal>
        <div className="ph bloom">
          <img
            src={featured.img}
            alt={`Upcoming event — ${featured.title}`}
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
            Next up · {featured.yr}
          </span>
          <h2 className="h-lg" style={{ color: "var(--on-dark)", margin: "18px 0 14px" }}>
            {featured.title}
          </h2>
          <p className="lead">
            {featured.desc}
          </p>
          {featured.href.startsWith("http") ? (
            <a
              href={featured.href}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ochre"
              style={{ alignSelf: "flex-start", marginTop: "28px" }}
            >
              Get your ticket
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
            </a>
          ) : (
            <Link
              to={featured.href}
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
          )}
        </div>
      </div>
    </section>
  );
}
