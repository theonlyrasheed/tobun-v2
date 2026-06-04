import { Link } from "@tanstack/react-router";

const EVENTS = [
  {
    yr: "2026",
    date: "Mar 2026 · UK",
    title: "The Pocket Stories",
    desc: "Wearable couture, ADIRE printing and storytelling for the whole community.",
    badge: "Free",
    img: "https://picsum.photos/seed/lt-19-the-pocket-stories/800/900",
    href: "/contact",
  },
  {
    yr: "2025",
    date: "Sep 2025 · UK",
    title: "Mindful Regulation",
    desc: "Using art as a therapeutic tool to regulate emotion and find calm.",
    badge: "Free",
    img: "https://picsum.photos/seed/lt-20-mindful-regulation/800/900",
    href: "/contact",
  },
  {
    yr: "2024",
    date: "May 2024 · Ghana",
    title: "Elevating Heritage",
    desc: "A hands-on textile-printing workshop reconnecting craft and identity.",
    badge: "Ticketed",
    img: "https://picsum.photos/seed/lt-21-elevating-heritage/800/900",
    href: "/contact",
  },
  {
    yr: "2023",
    date: "Nov 2023 · UK",
    title: "The Art We Carry",
    desc: "A reflective session on identity, weight and belonging through charcoal.",
    badge: "Free",
    img: "https://picsum.photos/seed/lt-22-the-art-we-carry/800/900",
    href: "/contact",
  },
  {
    yr: "2022",
    date: "Jul 2022 · UK",
    title: "Fashion-Tech Bootcamp",
    desc: "Hands-on intro to digital couture, illustration and AI tools.",
    badge: "Ticketed",
    img: "https://picsum.photos/seed/lt-23-fashion-tech-bootc/800/900",
    href: "/contact",
  },
  {
    yr: "2020",
    date: "2020 · UK",
    title: "The First Workshop",
    desc: "The session that started it all — 40+ participants, one shared goal.",
    badge: "Free",
    img: "https://picsum.photos/seed/lt-24-first-workshop/800/900",
    href: "/contact",
  },
] as const;

interface EventsGridProps {
  selectedYear: string;
  setSelectedYear: (year: string) => void;
}

export function EventsGrid({ selectedYear, setSelectedYear }: EventsGridProps) {
  const filteredEvents = EVENTS.filter(
    (ev) => selectedYear === "all" || ev.yr === selectedYear
  );

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
          {["2026", "2025", "2024", "2023", "2022", "2021", "2020"].map((y) => (
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
          {filteredEvents.map((ev, idx) => (
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
                  <Link to={ev.href} className="link-arrow">
                    Register
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
