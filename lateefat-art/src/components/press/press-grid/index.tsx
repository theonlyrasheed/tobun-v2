import { Link } from "@tanstack/react-router";
import { pressArticles } from "@/data/press";

export function PressGrid() {
  return (
    <div className="wrap">
      <div className="pr-grid">
        {pressArticles.map((art) => (
          <Link
            key={art.slug}
            to="/press/$slug"
            params={{ slug: art.slug }}
            className="pr-card"
            data-reveal
          >
            <div className="ph light bloom">
              <img src={art.hero} alt={art.title} loading="lazy" />
            </div>
            <div className="c-body">
              <div className="src">
                <span className="outlet">{art.outlet}</span>
                <span className="sep" />
                <span className="date">{art.date}</span>
              </div>
              <div className="c-title">{art.title}</div>
              <span className="read">
                Read feature{" "}
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 15 15"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                >
                  <path d="M3 12L12 3M5 3h7v7" />
                </svg>
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
