import * as React from "react";
import { Link } from "@tanstack/react-router";
import { useEvents } from "@/hooks/use-sanity";


interface EventsGridProps {
  selectedYear: string;
  setSelectedYear: (year: string) => void;
}

export function EventsGrid({ selectedYear, setSelectedYear }: EventsGridProps) {
  const { data: events = [] } = useEvents();

  // Compute available years dynamically
  const years = React.useMemo(() => {
    const ySet = new Set<string>();
    events.forEach((ev: any) => {
      if (ev.yr) ySet.add(ev.yr);
    });
    return Array.from(ySet).sort((a, b) => b.localeCompare(a));
  }, [events]);

  const filteredEvents = React.useMemo(() => {
    return events.filter(
      (ev: any) => selectedYear === "all" || ev.yr === selectedYear
    );
  }, [events, selectedYear]);

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
          {filteredEvents.map((ev: any, idx: number) => (
            <article key={idx} className="ev-card" data-yr={ev.yr} data-reveal>
              <div className="ph bloom">
                <img src={ev.img} alt={ev.title} loading="lazy" />
              </div>
              <div className="c-body">
                <div className="c-meta">
                  <span className="c-date">{ev.date}</span>
                  <span className="badge-free">{ev.badge}</span>
                </div>
                <div className="c-title">{ev.title}</div>
                <p className="c-desc">{ev.desc}</p>
                <div className="c-foot">
                  {ev.href.startsWith("http") ? (
                    <a href={ev.href} target="_blank" rel="noopener noreferrer" className="link-arrow">
                      Register
                    </a>
                  ) : (
                    <Link to={ev.href} className="link-arrow">
                      Register
                    </Link>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
