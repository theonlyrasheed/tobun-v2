import * as React from "react";
import { Drawer, Box, Text, Button } from "@mantine/core";

export interface DetailRecord {
  kicker?: string;
  title: string;
  meta?: readonly string[];
  img?: string;
  paragraphs?: readonly string[];
  gallery?: readonly string[];
  cta?: { label: string; href: string };
}

interface DetailDrawerProps {
  opened: boolean;
  onClose: () => void;
  record: DetailRecord | null;
}

export function DetailDrawer({ opened, onClose, record }: DetailDrawerProps) {
  if (!record) return null;

  return (
    <Drawer
      opened={opened}
      onClose={onClose}
      position="right"
      size={560}
      withCloseButton={false}
      styles={{
        content: {
          background: "var(--bg)",
          color: "var(--fg)",
          overflowY: "auto",
          padding: 0,
        },
        body: {
          padding: 0,
        },
      }}
    >
      <Box style={{ position: "relative" }}>
        {/* Close Button */}
        <button
          className="dp-x"
          onClick={onClose}
          aria-label="Close details"
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            zIndex: 3,
            width: "44px",
            height: "44px",
            borderRadius: "50%",
            display: "grid",
            placeItems: "center",
            cursor: "pointer",
            border: "1px solid color-mix(in oklab, var(--on-dark) 30%, transparent)",
            background: "color-mix(in oklab, var(--deep) 38%, transparent)",
            color: "var(--on-dark)",
            backdropFilter: "blur(8px)",
            transition: "background .2s var(--ease), transform .2s var(--ease)",
          }}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {/* Media / Image */}
        {record.img && (
          <Box
            className="dp-media"
            style={{
              position: "relative",
              aspectRatio: "4/3",
              background: "var(--surface)",
              overflow: "hidden",
            }}
          >
            <img
              src={record.img}
              alt={record.title}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                display: "block",
              }}
            />
          </Box>
        )}

        {/* Content Details */}
        <Box
          className="dp-content"
          style={{
            padding: "clamp(26px, 4vw, 44px)",
            paddingTop: "clamp(20px, 2.6vw, 30px)",
            display: "flex",
            flexDirection: "column",
            gap: 0,
          }}
        >
          {record.kicker && (
            <Text
              className="dp-kicker"
              style={{
                fontFamily: "var(--mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                fontWeight: 700,
                color: "var(--indigo-bright)",
              }}
            >
              {record.kicker}
            </Text>
          )}

          <h2
            className="dp-title"
            style={{
              fontFamily: "var(--display)",
              fontWeight: 800,
              fontSize: "clamp(1.9rem, 4vw, 2.8rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.02,
              margin: "14px 0 0",
              textWrap: "balance",
            }}
          >
            {record.title}
          </h2>

          {/* Meta Chips */}
          {record.meta && record.meta.length > 0 && (
            <Box
              className="dp-meta"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "8px",
                marginTop: "20px",
              }}
            >
              {record.meta.map((m) => (
                <span
                  key={m}
                  className="dp-chip"
                  style={{
                    fontFamily: "var(--mono)",
                    fontSize: "0.66rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    fontWeight: 700,
                    color: "var(--ink-soft)",
                    padding: "6px 12px",
                    borderRadius: "100px",
                    border: "1px solid var(--sand-line)",
                  }}
                >
                  {m}
                </span>
              ))}
            </Box>
          )}

          {/* Description Paragraphs */}
          {record.paragraphs && record.paragraphs.length > 0 && (
            <Box
              className="dp-text"
              style={{
                marginTop: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "1em",
              }}
            >
              {record.paragraphs.map((p, i) => (
                <Text
                  key={i}
                  component="p"
                  style={{
                    margin: 0,
                    color: "var(--ink-soft)",
                    fontSize: "1.02rem",
                    lineHeight: 1.6,
                  }}
                >
                  {p}
                </Text>
              ))}
            </Box>
          )}

          {/* Thumbnails Gallery */}
          {record.gallery && record.gallery.length > 0 && (
            <Box
              className="dp-gallery"
              style={{
                marginTop: "26px",
                display: "grid",
                gridTemplateColumns: record.gallery.length === 1 ? "1fr" : "1fr 1fr",
                gap: "10px",
              }}
            >
              {record.gallery.map((src, i) => (
                <Box
                  key={i}
                  className="dp-thumb"
                  style={{
                    aspectRatio: "1/1",
                    borderRadius: "var(--radius)",
                    overflow: "hidden",
                    background: "var(--surface)",
                  }}
                >
                  <img
                    src={src}
                    alt=""
                    loading="lazy"
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
            </Box>
          )}

          {/* CTA Call-to-action */}
          {record.cta && (
            <Button
              component="a"
              href={record.cta.href}
              className="dp-cta btn btn-ochre"
              style={{
                alignSelf: "flex-start",
                marginTop: "30px",
              }}
            >
              {record.cta.label}
              <svg
                width="16"
                height="16"
                viewBox="0 0 17 17"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                style={{ marginLeft: "6px" }}
              >
                <path d="M3 8.5h11M9 3.5l5 5-5 5" />
              </svg>
            </Button>
          )}
        </Box>
      </Box>

      <style>{`
        .dp-x:hover {
          background: var(--clay) !important;
          border-color: var(--clay) !important;
          transform: rotate(90deg);
        }
        .dp-media::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(to bottom, transparent 56%, color-mix(in oklab, var(--bg) 92%, transparent) 100%);
        }
        .dp-thumb img:hover {
          transform: scale(1.06);
        }
      `}</style>
    </Drawer>
  );
}
