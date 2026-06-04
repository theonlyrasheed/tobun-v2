import * as React from "react";
import { Box, Button } from "@mantine/core";

const YEARS = ["All years", "2026", "2025", "2024", "2023", "2022", "2021", "2020"] as const;

interface YearRailProps {
  active: string;
  onChange: (year: string) => void;
}

export function YearRail({ active, onChange }: YearRailProps) {
  return (
    <Box
      style={{
        position: "sticky",
        top: "80px",
        zIndex: 50,
        background: "var(--bg)",
        borderBottom: "1px solid var(--sand-line)",
        padding: "10px 0",
      }}
    >
      <Box
        className="wrap"
        style={{ display: "flex", gap: "8px", overflowX: "auto", scrollbarWidth: "none" }}
      >
        {YEARS.map((yr) => {
          const isActive = active === yr;
          return (
            <Button
              key={yr}
              variant="outline"
              size="sm"
              onClick={() => onChange(yr)}
              style={{
                borderRadius: "100px",
                fontFamily: "var(--mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                fontWeight: 700,
                padding: "8px 16px",
                whiteSpace: "nowrap",
                background: isActive ? "var(--clay-soft)" : "transparent",
                color: isActive ? "var(--deep)" : "var(--fg-soft)",
                border: `1px solid ${isActive ? "var(--clay-soft)" : "var(--sand-line)"}`,
                transition: "background 0.2s, color 0.2s, border-color 0.2s",
              }}
            >
              {yr}
            </Button>
          );
        })}
      </Box>
    </Box>
  );
}
