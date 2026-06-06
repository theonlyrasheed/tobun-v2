import * as React from "react";
import { Link } from "@tanstack/react-router";
import { useEvents } from "@/hooks/use-sanity";
import type { EventStatus } from "@/types/sanity";

/* ── Status chip ─────────────────────────────────────────────── */
const STATUS_CONFIG: Record<EventStatus, { label: string; color: string; border: string }> = {
  upcoming: { label: "Upcoming",    color: "var(--ochre)",    border: "color-mix(in oklab, var(--ochre) 50%, transparent)"     },
  ongoing:  { label: "Ongoing",     color: "#2da44e",         border: "color-mix(in oklab, #2da44e 50%, transparent)"          },
  expired:  { label: "Past event",  color: "#bc382e",         border: "color-mix(in oklab, #bc382e 50%, transparent)"          },
};

function StatusChip({ status }: { status: EventStatus }) {
  const cfg = STATUS_CONFIG[status];
  return (
    <span
      className="ev-status"
      style={{ color: cfg.color, borderColor: cfg.border }}
    >
      {status === "ongoing" && <span className="ev-dot" />}
      {cfg.label}
    </span>
  );
}

interface EventsGridProps {
  selectedYear: string;
  setSelectedYear: (year: string) => void;
}

export function EventsGrid({ selectedYear, setSelectedYear }: EventsGridProps) {
  const { data: events = [] } = useEvents();

  const years = React.useMemo(() => {
    const ySet = new Set<string>();
    events.forEach((ev: any) => { if (ev.yr) ySet.add(ev.yr); });
    return Array.from(ySet).sort((a, b) => b.localeCompare(a));
  }, [events]);

  // Same logic as FeaturedEvent — only upcoming/ongoing events are spotlighted up top.
  // When all events are expired the featured section is hidden, so nothing to exclude.
  const featured = React.useMemo(() => {
    if (events.length === 0) return null;
    return (
      events.find((e: any) => e.status === "upcoming") ??
      events.find((e: any) => e.status === "ongoing") ??
      null
    );
  }, [events]);

  const filteredEvents = React.useMemo(() => {
    return events.filter((ev: any) => {
      const matchesYear = selectedYear === "all" || ev.yr === selectedYear;
      const isFeatured = featured && ev.slug === featured.slug;
      return matchesYear && !isFeatured;
    });
  }, [events, selectedYear, featured]);

  return (
    <>
      <div className="year-wrap" id="ev-listing">
        <div className="year-rail">
          <button
            className={selectedYear === "all" ? "on" : ""}
            onClick={() => setSelectedYear("all")}
          >
            All years
          </button>
          {years.map((y) => (
            <button
              key={y}
              className={selectedYear === y ? "on" : ""}
              onClick={() => setSelectedYear(y)}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      <div className="wrap">
        <div className="ev-grid">
          {filteredEvents.map((ev: any, idx: number) => {
            const isExpired = ev.status === "expired";
            const slug = ev.slug;
            const isExternal = ev.href && ev.href.startsWith("http");

            const cardContent = (
              <>
                {/* Image */}
                <div className="ph bloom">
                  <img src={ev.img} alt={ev.title} loading="lazy" />
                  {/* Status overlay on image */}
                  <StatusChip status={ev.status} />
                </div>

                <div className="c-body">
                  <div className="c-meta">
                    <span className="c-date">{ev.date}</span>
                    <span className="badge-free">{ev.badge}</span>
                  </div>

                  <div className="c-title">{ev.title}</div>

                  {/* 4-line clamp */}
                  <p className="c-desc ev-desc-clamp">{ev.desc}</p>

                  <div className="c-foot">
                    {isExpired ? (
                      /* Expired — detail link only, no booking CTA */
                      slug ? (
                        <span className="link-arrow ev-link-muted">
                          View details
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ marginLeft: "4px" }}>
                            <path d="M3 8.5h11M9 3.5l5 5-5 5" />
                          </svg>
                        </span>
                      ) : (
                        <span className="ev-closed-label">Registrations closed</span>
                      )
                    ) : (
                      /* Active — prominent CTA + optional detail link */
                      <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
                        <span className="link-arrow">
                          Register
                          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" stroke="currentColor" strokeWidth="1.8" style={{ marginLeft: "4px" }}>
                            <path d="M3 8.5h11M9 3.5l5 5-5 5" />
                          </svg>
                        </span>
                        {slug && (
                          <span
                            style={{
                              fontFamily: "var(--mono)",
                              fontSize: "0.6rem",
                              letterSpacing: "0.14em",
                              textTransform: "uppercase",
                              color: "var(--fg-soft)",
                            }}
                          >
                            Details →
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </>
            );

            if (slug) {
              return (
                <Link
                  key={slug}
                  to="/events/$slug"
                  params={{ slug }}
                  className={`ev-card${isExpired ? " ev-card--expired" : ""}`}
                  style={{ textDecoration: "none", cursor: "pointer", display: "flex", flexDirection: "column" }}
                  data-yr={ev.yr}
                  data-reveal
                >
                  {cardContent}
                </Link>
              );
            }

            if (isExternal) {
              return (
                <a
                  key={ev.href || idx}
                  href={ev.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`ev-card${isExpired ? " ev-card--expired" : ""}`}
                  style={{ textDecoration: "none", cursor: "pointer", display: "flex", flexDirection: "column" }}
                  data-yr={ev.yr}
                  data-reveal
                >
                  {cardContent}
                </a>
              );
            }

            return (
              <Link
                key={ev.href || idx}
                to={ev.href as any}
                className={`ev-card${isExpired ? " ev-card--expired" : ""}`}
                style={{ textDecoration: "none", cursor: "pointer", display: "flex", flexDirection: "column" }}
                data-yr={ev.yr}
                data-reveal
              >
                {cardContent}
              </Link>
            );
          })}
        </div>
      </div>

      <style>{`
        /* Status chip on the image */
        .ev-card .ph {
          position: relative;
          overflow: hidden;
        }
        .ev-card {
          color: inherit !important;
          text-decoration: none !important;
        }
        .ev-card .ph img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s var(--ease);
        }
        .ev-card:hover .ph img {
          transform: scale(1.04);
        }
        .ev-card:hover .link-arrow {
          color: var(--clay-deep) !important;
        }
        .ev-card:hover .link-arrow svg {
          transform: translateX(4px);
        }
        .ev-status {
          position: absolute;
          top: 12px;
          left: 12px;
          display: inline-flex;
          align-items: center;
          gap: 5px;
          padding: 4px 10px;
          border-radius: 100px;
          border: 1px solid;
          background: color-mix(in oklab, var(--bg) 80%, transparent);
          backdrop-filter: blur(8px);
          font-family: var(--mono);
          font-size: 0.58rem;
          font-weight: 700;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          z-index: 2;
        }
        .ev-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: currentColor;
          animation: ev-dot-pulse 1.4s ease-in-out infinite;
          flex-shrink: 0;
        }
        @keyframes ev-dot-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.4; transform: scale(0.7); }
        }

        /* 4-line clamp */
        .ev-desc-clamp {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        /* Expired card dimming */
        .ev-card--expired {
          opacity: 0.72;
        }
        .ev-card--expired .ph img {
          filter: grayscale(40%);
        }

        /* Expired footer text */
        .ev-closed-label {
          font-family: var(--mono);
          font-size: 0.6rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--fg-soft);
        }
        .ev-link-muted {
          opacity: 0.65;
        }
      `}</style>
    </>
  );
}
