import * as React from "react";
import { Link } from "@tanstack/react-router";
import { usePressArticles } from "@/hooks/use-sanity";


const VARIANTS = ["light", "", "ochre", "", "light", "ochre"] as const;

export function PressGrid() {
  const { data: articles = [] } = usePressArticles();

  return (
    <div className="wrap">
      <div className="pr-grid">
        {articles.map((art: any, idx: number) => {
          const variant = VARIANTS[idx % VARIANTS.length];
          const phClasses = ["ph", variant, "bloom"].filter(Boolean).join(" ");

          const isExternal = art.source && art.source.href && art.source.href !== "#" && (!art.body || art.body.length === 0);

          if (isExternal) {
            return (
              <a
                key={art.slug || idx}
                href={art.source.href}
                target="_blank"
                rel="noopener noreferrer"
                className="pr-card"
                data-reveal
              >
                <div className={phClasses}>
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
                    Read original{" "}
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 15 15"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      style={{ marginLeft: "4px" }}
                    >
                      <path d="M3 12L12 3M5 3h7v7" />
                    </svg>
                  </span>
                </div>
              </a>
            );
          }

          return (
            <Link
              key={art.slug || idx}
              to="/press/$slug"
              params={{ slug: art.slug || "" }}
              className="pr-card"
              data-reveal
            >
              <div className={phClasses}>
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
                    style={{ marginLeft: "4px" }}
                  >
                    <path d="M3 12L12 3M5 3h7v7" />
                  </svg>
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
