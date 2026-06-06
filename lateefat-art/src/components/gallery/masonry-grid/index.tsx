import * as React from "react";
import { Box, Text } from "@mantine/core";
import { ImagePlaceholder } from "@/components/shared/image-placeholder";
import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import { useGallery } from "@/hooks/use-sanity";


interface MasonryGridProps {
  activeFilter: string;
}

export function MasonryGrid({ activeFilter }: MasonryGridProps) {
  const { data: items = [] } = useGallery();

  React.useEffect(() => {
    if (items.length === 0) return;

    const lightbox = new PhotoSwipeLightbox({
      gallery: "#gallery-grid",
      children: "a.masonry-item",
      pswpModule: () => import("photoswipe"),
    });

    // Register a caption bar that reads data-caption from the current slide's anchor
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
  }, [items]);

  return (
    <Box
      id="gallery-grid"
      style={{
        background: "var(--bg)",
        paddingBottom: "clamp(40px, 6vh, 84px)",
      }}
    >
      <Box className="wrap">
        <Box
          className="masonry"
          style={{
            columns: "4 270px",
            columnGap: "clamp(14px, 2vw, 24px)",
            paddingBlock: "clamp(34px, 4vw, 56px)",
          }}
        >
          {items.map((item: any, idx: number) => {
            const hidden =
              activeFilter !== "all" &&
              item.cat !== activeFilter;

            // Use direct src/largeSrc from Sanity queries, or fallback to picsum format if using fallback
            const thumbnailSrc = item.src || `https://picsum.photos/seed/${item.seed}/800/900`;
            const lightboxSrc = item.largeSrc || `https://picsum.photos/seed/${item.seed}/1600/1200`;

            return (
              <Box
                key={item.seed || idx}
                component="a"
                href={lightboxSrc}
                className="masonry-item"
                data-pswp-width={item.w}
                data-pswp-height={item.h}
                data-cursor="view"
                data-cursor-label="Explore"
                data-caption={[item.title, item.subtitle, item.year].filter(Boolean).join(" · ")}
                style={{
                  display: hidden ? "none" : "block",
                }}
              >
                <ImagePlaceholder
                  src={thumbnailSrc}
                  alt={item.title}
                  variant={item.variant || "default"}
                  bloom
                  aspectRatio={item.aspect}
                  style={{
                    width: "100%",
                  }}
                />
                <Box
                  className="meta"
                  style={{
                    color: item.color || "var(--on-dark)",
                  }}
                >
                  <Text className="t">{item.title}</Text>
                  <Text className="c">
                    {item.subtitle} &middot; {item.year}
                  </Text>
                </Box>
              </Box>
            );
          })}
        </Box>
      </Box>

      <style>{`
        .masonry-item {
          position: relative;
          overflow: hidden;
          cursor: pointer;
          break-inside: avoid;
          margin-bottom: clamp(14px, 2vw, 24px);
          border-radius: var(--radius);
          display: block;
        }
        .masonry-item .ph img {
          transition: transform 0.6s var(--ease);
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
        }
        .masonry-item:hover .ph img {
          transform: scale(1.05);
        }
        .masonry-item::after {
          content: "";
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(20, 18, 50, 0.66), transparent 55%);
          opacity: 0;
          transition: opacity 0.35s;
          pointer-events: none;
          z-index: 1;
        }
        .masonry-item:hover::after {
          opacity: 1;
        }
        .masonry-item .meta {
          position: absolute;
          left: 16px;
          right: 16px;
          bottom: 16px;
          z-index: 2;
          opacity: 0;
          transform: translateY(8px);
          transition: 0.35s var(--ease);
        }
        .masonry-item:hover .meta {
          opacity: 1;
          transform: none;
        }
        .masonry-item .meta .t {
          font-family: var(--display);
          font-weight: 700;
          font-size: 1.15rem;
          line-height: 1.25;
        }
        .masonry-item .meta .c {
          font-family: var(--mono);
          font-size: 0.62rem;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          opacity: 0.85;
          margin-top: 4px;
        }

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
