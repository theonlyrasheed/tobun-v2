import * as React from "react";
import { Box, Text, Button } from "@mantine/core";
import { Kicker } from "@/components/shared/kicker";
import { DetailPanel, type DetailRecord } from "@/components/shared/detail-panel";

const EXHIBITIONS = [
  {
    year: "2026",
    name: "The Pocket Stories",
    place: "Barbican Centre, London",
    desc: "Wearable digital art exploring memory and the things we carry, presented as an immersive installation.",
    record: {
      kicker: "2026 · Upcoming",
      title: "The Pocket Stories",
      meta: ["Digital Couture", "Installation", "London"],
      img: "https://picsum.photos/seed/lt-14-wearable-art/800/600",
      paragraphs: [
        "A wearable art exhibition exploring memory, garments, and the things we carry.",
        "Presented as an immersive installation at the Barbican Centre, the work draws on ADIRE textile tradition and digital couture to explore what we preserve in cloth and code.",
      ],
      gallery: [
        "https://picsum.photos/seed/lt-14-wearable-art/700/700",
        "https://picsum.photos/seed/lt-1-digital-couture-01/700/700",
      ],
    },
  },
  {
    year: "2025",
    name: "Valentine Series",
    place: "Tiwani Contemporary, London & Lagos",
    desc: "Hand-dyed ADIRE cloth and digital couture in conversation about intimacy, love, and what we make for those we love.",
    record: {
      kicker: "2025 · London & Lagos",
      title: "Valentine Series",
      meta: ["ADIRE", "Digital Couture", "Bilateral"],
      img: "https://picsum.photos/seed/lt-2-adire-indigo-study/800/600",
      paragraphs: [
        "Shown across London and Lagos, the Valentine Series brought together hand-dyed indigo cloth and digital couture.",
        "A conversation about intimacy, love, and the things we make for the people we love.",
      ],
      gallery: [
        "https://picsum.photos/seed/lt-2-adire-indigo-study/700/700",
        "https://picsum.photos/seed/lt-9-tie-dye-pattern/700/700",
      ],
    },
  },
  {
    year: "2024",
    name: "Elevating Heritage",
    place: "Gallery 1957, Accra",
    desc: "Traditional Yoruba indigo pattern reinterpreted through generative systems, shown alongside live printing workshops.",
    record: {
      kicker: "2024 · Accra, Ghana",
      title: "Elevating Heritage",
      meta: ["Mural", "ADIRE", "Community"],
      img: "https://picsum.photos/seed/lt-11-mural-heritage/800/600",
      paragraphs: [
        "Yoruba indigo pattern met generative systems in a show that asked what it means to keep tradition alive by letting it change.",
        "Paired with live printing workshops, visitors dyed their own cloth and watched the pattern reappear on screen.",
      ],
      gallery: [
        "https://picsum.photos/seed/lt-11-mural-heritage/700/700",
        "https://picsum.photos/seed/lt-3-clayton-community-/700/700",
      ],
    },
  },
  {
    year: "2023",
    name: "Digital Culture Event",
    place: "Tate Exchange, London",
    desc: "A community gathering placing ancestral and algorithmic tools on equal footing, open to all makers.",
    record: {
      kicker: "2023 · London",
      title: "Digital Culture Event",
      meta: ["Workshop", "Community", "AI"],
      img: "https://picsum.photos/seed/lt-12-ai-illustration-hy/800/600",
      paragraphs: [
        "Printing tables and rendering screens side by side — a gathering for makers who had never met.",
        "By closing time, the walls held indigo beside generative pattern, made by hands that had arrived as strangers.",
      ],
      gallery: [
        "https://picsum.photos/seed/lt-12-ai-illustration-hy/700/700",
        "https://picsum.photos/seed/lt-4-ai-feature/700/700",
      ],
    },
  },
  {
    year: "2022",
    name: "Clayton Community Mural",
    place: "Clayton Community Centre, Manchester",
    desc: "Large-scale public mural celebrating the heritage and futures of a multicultural community.",
    record: {
      kicker: "2022 · Manchester",
      title: "Clayton Community Mural",
      meta: ["Mural Art", "Public", "Community"],
      img: "https://picsum.photos/seed/lt-3-clayton-community-/800/600",
      paragraphs: [
        "A large-scale mural commissioned by Clayton Community Centre, celebrating heritage and futures.",
        "Created with direct input from local residents over twelve weeks of community engagement.",
      ],
      gallery: [
        "https://picsum.photos/seed/lt-3-clayton-community-/700/700",
      ],
    },
  },
  {
    year: "2020",
    name: "Four Yards",
    place: "Online / Self-published",
    desc: "The beginning — four yards of fabric and a question about how pattern behaves once it wraps a body.",
    record: {
      kicker: "2020 · Origin",
      title: "Four Yards",
      meta: ["ADIRE", "Fabric", "Series Origin"],
      img: "https://picsum.photos/seed/lt-9-tie-dye-pattern/800/600",
      paragraphs: [
        "With only four yards of fabric, the practice began — a question about how pattern behaves once it wraps a body.",
        "This self-published series of studies became the foundation for everything that followed.",
      ],
      gallery: [
        "https://picsum.photos/seed/lt-9-tie-dye-pattern/700/700",
        "https://picsum.photos/seed/lt-16-fabric-painting/700/700",
      ],
    },
  },
] as const;

interface RecordListProps {
  activeYear: string;
}

export function RecordList({ activeYear }: RecordListProps) {
  const [openRecord, setOpenRecord] = React.useState<DetailRecord | null>(null);
  const [panelOpen, setPanelOpen] = React.useState(false);

  const handleOpen = (record: DetailRecord) => {
    setOpenRecord(record);
    setPanelOpen(true);
  };

  const handleClose = () => {
    setPanelOpen(false);
    setTimeout(() => setOpenRecord(null), 500);
  };

  return (
    <>
      <Box
        component="section"
        id="the-record"
        className="section-tight"
        style={{ background: "var(--bg)" }}
      >
        <Box className="wrap">
          <Kicker>The record</Kicker>
          <h2
            className="h-lg"
            data-reveal
            style={{ margin: "16px 0 clamp(28px,4vw,48px)", fontFamily: "var(--display)" }}
          >
            Exhibitions &amp; shows.
          </h2>

          <Box style={{ borderTop: "1px solid var(--sand-line)" }}>
            {EXHIBITIONS.map((exh) => {
              const hidden = activeYear !== "All years" && exh.year !== activeYear;
              if (hidden) return null;

              return (
                <Box
                  key={exh.name}
                  data-reveal
                  style={{
                    display: "grid",
                    gridTemplateColumns: "80px 1fr auto",
                    gap: "clamp(16px,3vw,40px)",
                    alignItems: "start",
                    padding: "clamp(20px,3vw,32px) 0",
                    borderBottom: "1px solid var(--sand-line)",
                    transition: "padding-left 0.25s var(--ease), border-color 0.25s",
                    cursor: "pointer",
                    position: "relative",
                  }}
                  onClick={() => handleOpen(exh.record)}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.paddingLeft = "16px";
                    (e.currentTarget as HTMLElement).style.borderTopColor = "var(--clay)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.paddingLeft = "0";
                    (e.currentTarget as HTMLElement).style.borderTopColor = "var(--sand-line)";
                  }}
                >
                  <Text
                    style={{
                      fontFamily: "var(--mono)",
                      fontSize: "0.78rem",
                      letterSpacing: "0.06em",
                      color: "var(--fg-soft)",
                      paddingTop: "4px",
                    }}
                  >
                    {exh.year}
                  </Text>
                  <Box>
                    <Text
                      style={{
                        fontFamily: "var(--display)",
                        fontWeight: 700,
                        fontSize: "clamp(1.1rem,2vw,1.5rem)",
                        letterSpacing: "-0.02em",
                        marginBottom: "4px",
                      }}
                    >
                      {exh.name}
                    </Text>
                    <Text
                      style={{ fontFamily: "var(--mono)", fontSize: "0.72rem", letterSpacing: "0.06em", color: "var(--fg-soft)", marginBottom: "8px" }}
                    >
                      {exh.place}
                    </Text>
                    <Text style={{ color: "var(--fg-soft)", fontSize: "0.92rem", lineHeight: 1.5, maxWidth: "52ch" }}>
                      {exh.desc}
                    </Text>
                  </Box>
                  <Button
                    variant="outline"
                    size="sm"
                    style={{
                      borderRadius: "100px",
                      fontFamily: "var(--mono)",
                      fontSize: "0.68rem",
                      letterSpacing: "0.1em",
                      padding: "8px 16px",
                      color: "var(--fg-soft)",
                      border: "1px solid var(--sand-line)",
                      background: "transparent",
                      whiteSpace: "nowrap",
                      alignSelf: "flex-start",
                    }}
                    onClick={(e) => { e.stopPropagation(); handleOpen(exh.record); }}
                  >
                    View details
                  </Button>
                </Box>
              );
            })}
          </Box>
        </Box>
      </Box>

      <DetailPanel open={panelOpen} record={openRecord} onClose={handleClose} />
    </>
  );
}
