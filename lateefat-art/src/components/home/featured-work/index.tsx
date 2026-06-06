import * as React from "react";
import { Link } from "@tanstack/react-router";
import { Box, Text, Anchor } from "@mantine/core";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import { useGallery } from "@/hooks/use-sanity";

const GRID_LAYOUTS = ["wk wk-tall", "wk wk-wide", "wk", "wk", "wk wk-wide"];

export function FeaturedWork() {
  const { data: galleryItems = [] } = useGallery();

  React.useEffect(() => {
    if (galleryItems.length === 0) return;

    const lightbox = new PhotoSwipeLightbox({
      gallery: "#home-gallery-grid",
      children: "a.wk",
      pswpModule: () => import("photoswipe"),
    });

    // Register caption overlay reading from data-caption attribute
    lightbox.on("uiRegister", () => {
      lightbox.pswp!.ui!.registerElement({
        name: "caption",
        order: 9,
        isButton: false,
        appendTo: "wrapper",
        onInit(el, pswp) {
          pswp.on("change", () => {
            const anchor = pswp.currSlide?.data?.element as HTMLElement | undefined;
            el.innerHTML = anchor?.dataset?.caption ?? "";
          });
        },
      });
    });

    lightbox.init();

    return () => {
      lightbox.destroy();
    };
  }, [galleryItems]);

  return (
    <Box component='section' className='section-tight wrap'>
      <Box className='eyebrow-row'>
        <Box>
          <Text component='span' className='kicker'>
            Selected work
          </Text>
          <Text
            component='h2'
            className='h-lg'
            style={{ marginTop: "16px", fontWeight: "500" }}
          >
            The <em className='accent-ochre'>gallery</em>
          </Text>
        </Box>
        <Anchor
          component={Link}
          to='/gallery'
          underline='never'
          className='link-arrow'
        >
          All work
          <svg
            width='15'
            height='15'
            viewBox='0 0 15 15'
            fill='none'
            stroke='currentColor'
            strokeWidth='1.8'
          >
            <path d='M3 12L12 3M5 3h7v7' />
          </svg>
        </Anchor>
      </Box>
      <Box className='work-grid' id="home-gallery-grid" data-reveal>
        {galleryItems.slice(0, 5).map((item, i) => {
          const layoutClass = GRID_LAYOUTS[i] || "wk";
          const lightboxSrc = item.largeSrc || item.src || `https://picsum.photos/seed/${item.seed}/1600/1200`;
          return (
            <Anchor
              key={item.seed}
              component="a"
              href={lightboxSrc}
              className={layoutClass}
              data-pswp-width={item.w || 1200}
              data-pswp-height={item.h || 900}
              data-cursor="view"
              data-cursor-label="Explore"
              data-caption={[item.title, item.subtitle, item.year].filter(Boolean).join(" · ")}
              style={{ cursor: "pointer", textDecoration: "none" }}
            >
              <Box
                component='img'
                src={item.src}
                alt={item.title}
              />
              <Box className='cap'>
                <Text component='span' className='t'>
                  {item.title}
                </Text>
                <Text component='span' className='c'>
                  {item.subtitle || item.cat}
                </Text>
              </Box>
            </Anchor>
          );
        })}
      </Box>

      <style>{`
        /* PhotoSwipe caption bar */
        .pswp__caption {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          padding: 14px 20px 18px;
          background: linear-gradient(to top, rgba(10, 8, 30, 0.82) 0%, transparent 100%);
          color: #fff;
          font-family: var(--display, serif);
          font-size: clamp(0.95rem, 1.2vw, 1.1rem);
          font-weight: 600;
          letter-spacing: 0.01em;
          pointer-events: none;
          z-index: 10;
          text-align: center;
        }
      `}</style>
    </Box>
  );
}
