import * as React from "react";
import { Link } from "@tanstack/react-router";
import { useEvents } from "@/hooks/use-sanity";


export function FeaturedEvent() {
  const { data: evs = [] } = useEvents();

  // Show the soonest upcoming/ongoing event; if none, return null.
  const featured = React.useMemo(() => {
    if (evs.length === 0) return null;
    return (
      evs.find((e: any) => e.status === "upcoming") ??
      evs.find((e: any) => e.status === "ongoing") ??
      null
    );
  }, [evs]);

  if (!featured) return null;

  const isExternal = featured.href && featured.href.startsWith("http");

  const CardWrapper = ({ children }: { children: React.ReactNode }) => {
    if (featured.slug) {
      return (
        <Link
          to="/events/$slug"
          params={{ slug: featured.slug }}
          className="feat-ev dark"
          style={{ textDecoration: "none", cursor: "pointer" }}
          data-reveal
        >
          {children}
        </Link>
      );
    }
    if (isExternal) {
      return (
        <a
          href={featured.href}
          target="_blank"
          rel="noopener noreferrer"
          className="feat-ev dark"
          style={{ textDecoration: "none", cursor: "pointer" }}
          data-reveal
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        to={featured.href as any}
        className="feat-ev dark"
        style={{ textDecoration: "none", cursor: "pointer" }}
        data-reveal
      >
        {children}
      </Link>
    );
  };

  return (
    <section className="section-tight wrap">
      <CardWrapper>
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
              background: featured.status === "expired"
                ? "#bc382e"
                : featured.status === "ongoing"
                ? "#2da44e"
                : "var(--ochre)",
              color: featured.status === "upcoming" ? "var(--deep)" : "#fff",
              borderColor: "transparent",
              alignSelf: "flex-start",
            }}
          >
            {featured.status === "upcoming"
              ? `Next up · ${featured.yr}`
              : featured.status === "ongoing"
              ? `Ongoing · ${featured.yr}`
              : `Past event · ${featured.yr}`}
          </span>
          <h2 className="h-lg" style={{ color: "var(--on-dark)", margin: "18px 0 14px" }}>
            {featured.title}
          </h2>
          <p className="lead">
            {featured.desc}
          </p>
          {featured.status === "expired" ? (
            featured.slug ? (
              <span
                className="btn btn-ghost"
                style={{ alignSelf: "flex-start", marginTop: "28px" }}
              >
                View details
              </span>
            ) : null
          ) : (
            <span
              className="btn btn-ochre"
              style={{ alignSelf: "flex-start", marginTop: "28px" }}
            >
              {featured.badge === "Free" ? "Get your free ticket" : "Get your ticket"}
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" stroke="currentColor" strokeWidth="1.8">
                <path d="M3 8.5h11M9 3.5l5 5-5 5" />
              </svg>
            </span>
          )}
        </div>
      </CardWrapper>

      <style>{`
        .feat-ev {
          transition: transform 0.3s var(--ease), box-shadow 0.3s var(--ease);
        }
        .feat-ev:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 30px rgba(0,0,0,0.15);
        }
        .feat-ev img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s var(--ease);
        }
        .feat-ev:hover img {
          transform: scale(1.03);
        }
        .feat-ev:hover .btn-ochre {
          background: var(--clay-deep) !important;
          transform: translateY(-2px);
        }
        .feat-ev:hover .btn-ghost {
          border-color: var(--on-dark) !important;
          background: color-mix(in oklab, var(--on-dark) 8%, transparent) !important;
          transform: translateY(-2px);
        }
        .feat-ev .btn {
          transition: transform 0.2s var(--ease), background 0.2s, color 0.2s, border-color 0.2s;
        }
        .feat-ev:hover .btn svg {
          transform: translateX(4px);
        }
      `}</style>
    </section>
  );
}
