import * as React from "react";

interface EventsHeroProps {
  selectedYear: string;
  setSelectedYear: (year: string) => void;
}

export function EventsHero({ selectedYear, setSelectedYear }: EventsHeroProps) {
  const [inViewport, setInViewport] = React.useState(false);

  React.useEffect(() => {
    setInViewport(true);
  }, []);

  const handleYearClick = (year: string) => {
    setSelectedYear(year);
    const target = document.getElementById("ev-listing");
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      className={`evh ${inViewport ? "in" : ""}`}
      data-header-watch
      data-screen-label="Events — Hero"
    >
      <div className="evh-bg">
        <img src="/assets/img/fresco.jpg" alt="Baroque ceiling fresco" />
      </div>
      <div className="evh-glow" />

      <div className="evh-inner">
        <span className="kicker no-tick evh-kicker evh-anim d1">Events &amp; gatherings</span>
        <h1 className="evh-title evh-anim d2">
          Collecting memories,
          <br />
          <em>weaving stories.</em>
        </h1>
        <p className="evh-lead evh-anim d3">
          Workshops, talks and community gatherings designed to bring people together around a
          shared creative goal — and to make art a tool for connection, empowerment and healing.
        </p>

        <div className="evh-thread evh-anim d4">
          <div className="rail" />
          <div className="evh-years">
            <button
              className={`evh-yr ${selectedYear === "2020" ? "now" : ""}`}
              onClick={() => handleYearClick("2020")}
              type="button"
            >
              <span className="nodt" />
              <span className="lab">2020</span>
            </button>
            <button
              className={`evh-yr ${selectedYear === "2022" ? "now" : ""}`}
              onClick={() => handleYearClick("2022")}
              type="button"
            >
              <span className="nodt" />
              <span className="lab">2022</span>
            </button>
            <button
              className={`evh-yr ${selectedYear === "2023" ? "now" : ""}`}
              onClick={() => handleYearClick("2023")}
              type="button"
            >
              <span className="nodt" />
              <span className="lab">2023</span>
            </button>
            <button
              className={`evh-yr ${selectedYear === "2024" ? "now" : ""}`}
              onClick={() => handleYearClick("2024")}
              type="button"
            >
              <span className="nodt" />
              <span className="lab">2024</span>
            </button>
            <button
              className={`evh-yr ${selectedYear === "2025" ? "now" : ""}`}
              onClick={() => handleYearClick("2025")}
              type="button"
            >
              <span className="nodt" />
              <span className="lab">2025</span>
            </button>
            <button
              className={`evh-yr ${selectedYear === "2026" ? "now" : ""}`}
              onClick={() => handleYearClick("2026")}
              type="button"
            >
              <span className="nodt" />
              <span className="lab">
                2026
                <span className="nx">Next up</span>
              </span>
            </button>
          </div>
        </div>

        <a className="evh-scroll evh-anim d5" href="#ev-listing">
          Browse all events
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
