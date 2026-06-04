import * as React from "react";
import { Box, Button } from "@mantine/core";

const CATEGORIES = [
  { label: "All work", value: "all" },
  { label: "Digital Couture", value: "digital-couture" },
  { label: "Visual Paintings", value: "visual-paintings" },
  { label: "Mural Art", value: "mural-art" },
  { label: "Digital Illustration", value: "digital-illustration" },
  { label: "Fabric / ADIRE", value: "fabric-adire" },
  { label: "Photography", value: "photography" },
  { label: "AI Features", value: "ai-features" },
] as const;

interface FilterBarProps {
  active: string;
  onChange: (cat: string) => void;
}

export function FilterBar({ active, onChange }: FilterBarProps) {
  const barRef = React.useRef<HTMLDivElement>(null);
  const [stuck, setStuck] = React.useState(false);

  React.useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setStuck(!entry.isIntersecting),
      { threshold: 1, rootMargin: "-96px 0px 0px 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <Box
      ref={barRef}
      style={{
        position: "sticky",
        top: "80px",
        zIndex: 50,
        background: stuck
          ? "color-mix(in oklab, var(--bg) 88%, transparent)"
          : "var(--bg)",
        backdropFilter: stuck ? "blur(16px)" : "none",
        borderBottom: `1px solid ${stuck ? "var(--sand-line)" : "transparent"}`,
        transition: "background 0.3s, border-color 0.3s",
        padding: "12px 0",
      }}
    >
      <Box
        className="wrap"
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          overflowX: "auto",
          scrollbarWidth: "none",
        }}
      >
        {CATEGORIES.map((cat) => {
          const isActive = active === cat.value;
          return (
            <Button
              key={cat.value}
              variant="outline"
              size="sm"
              onClick={() => onChange(cat.value)}
              style={{
                borderRadius: "100px",
                fontFamily: "var(--mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                fontWeight: 700,
                padding: "8px 16px",
                whiteSpace: "nowrap",
                background: isActive ? "var(--clay)" : "transparent",
                color: isActive ? "var(--on-dark)" : "var(--fg-soft)",
                border: `1px solid ${isActive ? "var(--clay)" : "var(--sand-line)"}`,
                transition: "background 0.2s, color 0.2s, border-color 0.2s",
              }}
            >
              {cat.label}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
}
