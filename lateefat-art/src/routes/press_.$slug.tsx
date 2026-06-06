import * as React from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Box, Text } from "@mantine/core";
import { usePressArticle, usePressArticles } from "@/hooks/use-sanity";
import { urlFor } from "@/lib/sanity/client";
import { PortableText } from "@portabletext/react";
import { pressComponents } from "@/components/shared/portable-text";

export const Route = createFileRoute("/press_/$slug")({
  component: PressArticlePage,
});


// Render helper for local fallback mock data block format
const renderFallbackBlock = (block: any, idx: number) => {
  if ("p" in block) {
    return (
      <Text
        key={idx}
        component='p'
        style={{
          margin: "0 0 1.35em",
          fontSize: "clamp(1.08rem, 1.35vw, 1.22rem)",
          lineHeight: 1.75,
          color: "var(--ink)",
        }}
      >
        {block.p}
      </Text>
    );
  }
  if ("quote" in block) {
    return (
      <blockquote
        key={idx}
        className='art-quote'
        style={{
          margin: "clamp(34px, 4vw, 52px) 0",
          padding: 0,
          textAlign: "center",
        }}
      >
        <Text
          style={{
            fontFamily: "var(--serif)",
            fontStyle: "italic",
            fontWeight: 400,
            letterSpacing: "-.01em",
            fontSize: "clamp(1.5rem,3vw,2.3rem)",
            lineHeight: 1.22,
            color: "var(--ink)",
            margin: 0,
            textWrap: "balance",
          }}
        >
          {block.quote}
        </Text>
        {block.by && (
          <cite
            style={{
              display: "block",
              marginTop: "20px",
              fontFamily: "var(--mono)",
              fontStyle: "normal",
              fontSize: ".68rem",
              letterSpacing: ".18em",
              textTransform: "uppercase",
              color: "var(--ink-soft)",
            }}
          >
            &mdash; {block.by}
          </cite>
        )}
      </blockquote>
    );
  }
  if ("img" in block) {
    return (
      <figure
        key={idx}
        className='art-fig'
        style={{
          margin: "clamp(30px,4vw,48px) 0",
        }}
      >
        <Box
          className='img'
          style={{
            borderRadius: "var(--radius)",
            overflow: "hidden",
            background: "var(--surface)",
            aspectRatio: "3/2",
          }}
        >
          <img
            src={block.img}
            alt={block.cap || ""}
            loading='lazy'
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </Box>
        {block.cap && (
          <figcaption
            style={{
              marginTop: "12px",
              fontFamily: "var(--mono)",
              fontSize: ".68rem",
              letterSpacing: ".08em",
              textTransform: "uppercase",
              color: "var(--ink-soft)",
            }}
          >
            {block.cap}
          </figcaption>
        )}
      </figure>
    );
  }
  return null;
};

function PressArticlePage() {
  const { slug } = Route.useParams();
  const { data: data, isLoading: isArticleLoading } = usePressArticle(slug);
  const { data: allArticles = [], isLoading: isAllArticlesLoading } = usePressArticles();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setMounted(true);
    }, 50);
    return () => clearTimeout(timer);
  }, [slug]);

  const loading = isArticleLoading || isAllArticlesLoading;

  if (loading) {
    return (
      <Box
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "60vh",
        }}
      >
        <Text style={{ fontFamily: "var(--mono)", fontSize: "0.85rem", letterSpacing: "0.15em" }}>
          LOADING COVERAGE...
        </Text>
      </Box>
    );
  }

  if (!data) {
    return (
      <Box
        className='art-missing'
        style={{
          maxWidth: "60ch",
          margin: "0 auto",
          padding: "clamp(120px, 16vh, 200px) var(--gut)",
          textAlign: "center",
        }}
      >
        <span className='kicker no-tick' style={{ justifyContent: "center" }}>
          In the press
        </span>
        <h1
          style={{
            fontFamily: "var(--display)",
            fontWeight: 800,
            fontSize: "clamp(2rem,5vw,3.4rem)",
            letterSpacing: "-.03em",
            margin: "16px 0",
          }}
        >
          Article not found
        </h1>
        <p style={{ color: "var(--ink-soft)", marginBottom: "28px" }}>
          That piece of coverage could not be found. Browse the full press
          archive instead.
        </p>
        <Link to='/press' className='btn btn-primary'>
          Back to press
          <svg
            width='17'
            height='17'
            viewBox='0 0 17 17'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.8'
            style={{ marginLeft: "8px" }}
          >
            <path d='M3 8.5h11M9 3.5l5 5-5 5' />
          </svg>
        </Link>
      </Box>
    );
  }

  // Get other recommended articles
  const others = allArticles.filter((art: any) => art.slug !== slug).slice(0, 3);

  // Check if body content is in PortableText format or fallback mock array format
  const isPortableText = Array.isArray(data.body) && data.body.length > 0 && "_type" in data.body[0];

  return (
    <Box
      component='article'
      style={{ background: "var(--bg)", color: "var(--fg)" }}
    >
      {/* Editorial Hero Header */}
      <Box
        component='header'
        className={`art-hero${mounted ? " in" : ""}`}
        data-header-watch
        data-screen-label={`Press article — ${data.outlet}`}
        style={{
          position: "relative",
          overflow: "hidden",
          isolation: "isolate",
          color: "var(--on-dark)",
          background: "var(--deep)",
          minHeight: "clamp(520px, 78vh, 820px)",
          display: "flex",
          alignItems: "flex-end",
          padding:
            "calc(var(--header-h) + clamp(28px,5vh,64px)) var(--gut) clamp(36px,5vh,72px)",
        }}
      >
        <Box
          className='art-hero-bg'
          style={{ position: "absolute", inset: 0, zIndex: 0 }}
        >
          <img
            src={data.hero}
            alt={data.heroCaption || ""}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "50% 38%",
              opacity: 0.58,
              transform: "scale(1.05)",
            }}
          />
        </Box>
        <Box className='art-hero-glow' />

        <Box
          className='art-hero-inner'
          style={{
            position: "relative",
            zIndex: 2,
            width: "100%",
            maxWidth: "980px",
            margin: "0 auto",
          }}
        >
          <Link
            className='art-back a-anim d1'
            to='/press'
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: ".55em",
              fontFamily: "var(--mono)",
              fontSize: ".68rem",
              letterSpacing: ".18em",
              textTransform: "uppercase",
              color: "color-mix(in oklab, var(--on-dark) 78%, transparent)",
              marginBottom: "clamp(20px,3vw,34px)",
              textDecoration: "none",
            }}
          >
            <svg
              viewBox='0 0 15 15'
              fill='none'
              stroke='currentColor'
              strokeWidth='1.8'
              style={{ width: "15px", height: "15px" }}
            >
              <path d='M12 3L3 12M10 12H3V5' />
            </svg>
            Back to press
          </Link>

          <Box
            className='art-eyebrow a-anim d2'
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              fontFamily: "var(--mono)",
              fontSize: ".72rem",
              letterSpacing: ".2em",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            <span className='outlet' style={{ color: "var(--gold)" }}>
              {data.outlet}
            </span>
            <span
              className='sep'
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background:
                  "color-mix(in oklab, var(--on-dark) 40%, transparent)",
              }}
            />
            <span
              className='kind'
              style={{
                color: "color-mix(in oklab, var(--on-dark) 70%, transparent)",
              }}
            >
              {data.kind || "Feature"}
            </span>
          </Box>

          <h1
            className='art-title a-anim d3'
            style={{
              fontFamily: "var(--display)",
              fontWeight: 800,
              letterSpacing: "-0.035em",
              lineHeight: 0.98,
              fontSize: "clamp(2.3rem, 5.4vw, 4.6rem)",
              margin: "clamp(16px,2vw,24px) 0 0",
              maxWidth: "20ch",
              textWrap: "balance",
            }}
          >
            {data.title}
          </h1>

          <p
            className='art-standfirst a-anim d4'
            style={{
              margin: "clamp(18px,2.2vw,26px) 0 0",
              maxWidth: "56ch",
              fontFamily: "var(--serif)",
              fontStyle: "italic",
              fontSize: "clamp(1.12rem,1.7vw,1.5rem)",
              lineHeight: 1.46,
              color: "color-mix(in oklab, var(--on-dark) 88%, transparent)",
            }}
          >
            {data.standfirst}
          </p>

          <Box
            className='art-meta a-anim d5'
            style={{
              display: "flex",
              flexWrap: "wrap",
              alignItems: "center",
              gap: "10px",
              marginTop: "clamp(20px,2.6vw,30px)",
              fontFamily: "var(--mono)",
              fontSize: ".7rem",
              letterSpacing: ".12em",
              textTransform: "uppercase",
              color: "color-mix(in oklab, var(--on-dark) 66%, transparent)",
            }}
          >
            <span>{data.date}</span>
            {data.read && (
              <>
                <span
                  className='sep'
                  style={{
                    width: "4px",
                    height: "4px",
                    borderRadius: "50%",
                    background:
                      "color-mix(in oklab, var(--on-dark) 40%, transparent)",
                  }}
                />
                <span>{data.read}</span>
              </>
            )}
          </Box>
        </Box>
      </Box>

      {/* Article Body Content */}
      <Box className='art-wrap'>
        <Box
          className='art-body'
          style={{
            maxWidth: "70ch",
            margin: "0 auto",
            paddingBlock: "clamp(44px,6vw,84px)",
          }}
        >
          {isPortableText ? (
            <PortableText value={data.body} components={pressComponents} />
          ) : (
            data.body.map((block: any, idx: number) => renderFallbackBlock(block, idx))
          )}
        </Box>
      </Box>

      {/* Gallery Section */}
      {data.gallery && data.gallery.length > 0 && (
        <section
          className='art-gallery-sec'
          style={{
            borderTop: "1px solid var(--sand-line)",
            paddingBlock: "clamp(40px,5vw,68px)",
          }}
        >
          <Box className='art-wrap'>
            <span className='kicker'>From the feature</span>
            <div
              className='art-gallery'
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "clamp(10px,1.4vw,18px)",
                marginTop: "26px",
              }}
            >
              {data.gallery.map((src: string, i: number) => (
                <Box
                  key={i}
                  className='g'
                  style={{
                    aspectRatio: "1/1",
                    borderRadius: "var(--radius)",
                    overflow: "hidden",
                    background: "var(--surface)",
                  }}
                >
                  <img
                    src={src}
                    alt=''
                    loading='lazy'
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      display: "block",
                      transition: "transform .6s var(--ease)",
                    }}
                  />
                </Box>
              ))}
            </div>
          </Box>
        </section>
      )}

      {/* Source Link Section */}
      <Box className='art-wrap'>
        <Box
          className='art-source'
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            borderTop: "1px solid var(--sand-line)",
            paddingBlock: "clamp(26px,3vw,40px)",
          }}
        >
          <span
            className='credit'
            style={{
              fontFamily: "var(--mono)",
              fontSize: ".72rem",
              letterSpacing: ".15em",
              textTransform: "uppercase",
              color: "var(--ink-soft)",
            }}
          >
            Coverage by{" "}
            <b style={{ color: "var(--indigo-bright)" }}>{data.outlet}</b>{" "}
            &middot; {data.date}
          </span>
          {data.source && data.source.href && data.source.href !== "#" ? (
            <Box
              component='a'
              className='link-arrow'
              href={data.source.href}
              target='_blank'
              rel='noopener noreferrer'
            >
              {data.source.label || "Read the original"}
              <svg
                width='15'
                height='15'
                viewBox='0 0 15 15'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.8'
                style={{ marginLeft: "4px" }}
              >
                <path d='M3 12L12 3M5 3h7v7' />
              </svg>
            </Box>
          ) : (
            <Link className='link-arrow' to='/press'>
              All press
              <svg
                width='15'
                height='15'
                viewBox='0 0 15 15'
                fill='none'
                stroke='currentColor'
                strokeWidth='1.8'
                style={{ marginLeft: "4px" }}
              >
                <path d='M3 12L12 3M5 3h7v7' />
              </svg>
            </Link>
          )}
        </Box>
      </Box>

      {/* More recommended coverage */}
      {others.length > 0 && (
        <section
          className='art-more'
          style={{
            background: "var(--surface)",
            paddingBlock: "clamp(48px,6vw,88px)",
          }}
        >
          <Box className='art-wrap'>
            <Box
              className='head'
              style={{
                display: "flex",
                alignItems: "baseline",
                justifyContent: "space-between",
                gap: "16px",
                flexWrap: "wrap",
                marginBottom: "clamp(24px,3vw,40px)",
              }}
            >
              <h2
                className='h-md'
                style={{
                  margin: 0,
                  fontFamily: "var(--display)",
                  fontWeight: 700,
                  fontSize: "1.5rem",
                }}
              >
                More coverage
              </h2>
              <Link className='link-arrow' to='/press'>
                All press
                <svg
                  width='15'
                  height='15'
                  viewBox='0 0 15 15'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='1.8'
                  style={{ marginLeft: "4px" }}
                >
                  <path d='M3 12L12 3M5 3h7v7' />
                </svg>
              </Link>
            </Box>

            <Box
              className='art-more-grid'
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: "clamp(22px,2.6vw,34px)",
              }}
            >
              {others.map((o: any) => (
                <Link
                  key={o.slug}
                  className='art-more-card'
                  to='/press/$slug'
                  params={{ slug: o.slug }}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    textDecoration: "none",
                    color: "inherit",
                  }}
                >
                  <Box
                    className='img'
                    style={{
                      aspectRatio: "16/11",
                      borderRadius: "var(--radius)",
                      overflow: "hidden",
                      background: "var(--bg)",
                    }}
                  >
                    <img
                      src={o.hero}
                      alt=''
                      loading='lazy'
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                        transition: "transform .7s var(--ease)",
                      }}
                    />
                  </Box>
                  <Box
                    className='src'
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "9px",
                      marginTop: "14px",
                      fontFamily: "var(--mono)",
                      fontSize: ".64rem",
                      letterSpacing: ".12em",
                      textTransform: "uppercase",
                    }}
                  >
                    <span
                      className='outlet'
                      style={{
                        color: "var(--indigo-bright)",
                        fontWeight: 700,
                      }}
                    >
                      {o.outlet}
                    </span>
                    <span
                      className='sep'
                      style={{
                        width: "3px",
                        height: "3px",
                        borderRadius: "50%",
                        background: "var(--sand-line)",
                      }}
                    />
                    <span
                      className='date'
                      style={{ color: "var(--ink-soft)" }}
                    >
                      {o.date}
                    </span>
                  </Box>
                  <div
                    className='t'
                    style={{
                      fontSize: "1.22rem",
                      fontWeight: 700,
                      fontFamily: "var(--display)",
                      letterSpacing: "-.02em",
                      marginTop: "8px",
                      lineHeight: 1.16,
                    }}
                  >
                    {o.title}
                  </div>
                </Link>
              ))}
            </Box>
          </Box>
        </section>
      )}

      {/* local styles for drops cap and drifting hero bg */}
      <style>{`
        .art-hero-bg img {
          animation: artDrift 30s ease-in-out infinite alternate;
        }
        @keyframes artDrift {
          to { transform: scale(1.14) translateY(-2%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .art-hero-bg img { animation: none !important; }
        }
        .art-hero-bg::after {
          content: "";
          position: absolute;
          inset: 0;
          background:
            linear-gradient(to top, var(--deep) 2%, color-mix(in oklab, var(--deep) 64%, transparent) 36%, color-mix(in oklab, var(--deep) 30%, transparent) 70%, color-mix(in oklab, var(--deep) 55%, transparent) 100%),
            radial-gradient(80% 70% at 22% 88%, color-mix(in oklab, var(--clay) 28%, transparent), transparent 64%);
        }
        .art-hero-glow {
          position: absolute;
          left: 18%;
          top: 42%;
          width: 60vw;
          height: 60vw;
          max-width: 720px;
          max-height: 720px;
          transform: translate(-50%,-50%);
          z-index: 1;
          pointer-events: none;
          border-radius: 50%;
          filter: blur(8px);
          background: radial-gradient(circle, color-mix(in oklab, var(--gold) 22%, transparent), transparent 62%);
          animation: artBreathe 8.5s ease-in-out infinite alternate;
        }
        @keyframes artBreathe {
          from { opacity: .55; transform: translate(-50%,-50%) scale(.92); }
          to { opacity: .95; transform: translate(-50%,-50%) scale(1.08); }
        }
        @media (prefers-reduced-motion: reduce) {
          .art-hero-glow { animation: none !important; }
        }

        .art-body > p:first-of-type::first-letter {
          font-family: var(--display);
          font-weight: 800;
          font-size: 3.4em;
          line-height: .72;
          float: left;
          padding: 8px 14px 0 0;
          color: var(--clay-deep);
        }
        .art-quote::before {
          content: "\\201C";
          display: block;
          font-family: var(--serif);
          font-style: italic;
          color: var(--clay);
          font-size: clamp(3rem,6vw,4.6rem);
          line-height: .6;
          margin-bottom: .12em;
        }
        .art-gallery .g img:hover {
          transform: scale(1.06);
        }
        .art-more-card:hover .img img {
          transform: scale(1.05);
        }
        .art-more-card:hover .t {
          color: var(--clay-deep) !important;
        }
      `}</style>
    </Box>
  );
}
