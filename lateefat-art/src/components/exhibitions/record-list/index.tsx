import * as React from "react";
import { Box, Text } from "@mantine/core";
import { Kicker } from "@/components/shared/kicker";
import { DetailDrawer, type DetailRecord } from "@/components/shared/detail-drawer";
import { useDisclosure } from "@mantine/hooks";

const EXHIBITIONS = [
  {
    year: "2026",
    name: "The Pocket Stories",
    place: "United Kingdom",
    desc: "Wearable digital couture exploring memory and the garments we carry.",
    record: {
      kicker: "Exhibition · 2026",
      title: "The Pocket Stories",
      meta: ["Mar 14–28, 2026", "11am–7pm", "Bradford, United Kingdom", "Digital Couture"],
      img: "https://picsum.photos/seed/lt-19-the-pocket-stories/1000/750",
      paragraphs: [
        "Wearable digital couture exploring memory and the garments we carry. The Pocket Stories asks a simple question — what do we keep, and where do we keep it? — and answers it in fabric, indigo and rendered cloth.",
        "Built around ADIRE printing and digital pattern, each piece pairs a physical garment with a digital twin you can wear in virtual space. Visitors are invited to leave a story behind in a pocket; by closing night the gallery itself becomes the artwork."
      ],
      gallery: [
        "https://picsum.photos/seed/lt-1-digital-couture-01/600/600",
        "https://picsum.photos/seed/lt-14-wearable-art/600/600",
        "https://picsum.photos/seed/lt-9-tie-dye-pattern/600/600",
        "https://picsum.photos/seed/lt-8-digital-couture-02/600/600"
      ],
      cta: { label: "Enquire about this series", href: "/contact" }
    }
  },
  {
    year: "2025",
    name: "Valentine Series",
    place: "Nigeria",
    desc: "Colour, contrast and connection across fabric, charcoal and digital media.",
    record: {
      kicker: "Featured exhibition · 2025",
      title: "Valentine Series",
      meta: ["Feb 8–22, 2025", "10am–6pm", "Lagos, Nigeria", "Mixed media"],
      img: "https://picsum.photos/seed/lt-17-valentine-series-h/1000/750",
      paragraphs: [
        "A study in colour, contrast and intimacy. The Valentine Series brings together fabric painting, charcoal and digital couture into a single meditation on connection.",
        "Shown in Lagos across two weeks, the series gathered a community around a shared creative goal — colour as language, contrast as feeling, connection as the work itself."
      ],
      gallery: [
        "https://picsum.photos/seed/lt-5-charcoal-contrast-/600/600",
        "https://picsum.photos/seed/lt-10-visual-painting/600/600",
        "https://picsum.photos/seed/lt-16-fabric-painting/600/600"
      ],
      cta: { label: "Enquire about this series", href: "/contact" }
    }
  },
  {
    year: "2024",
    name: "Elevating Heritage",
    place: "Ghana",
    desc: "Mural and textile work celebrating Yoruba craft and pattern.",
    record: {
      kicker: "Exhibition · 2024",
      title: "Elevating Heritage",
      meta: ["May 3–17, 2024", "9am–5pm", "Accra, Ghana", "Mural", "Textile"],
      img: "https://picsum.photos/seed/lt-21-elevating-heritage/1000/750",
      paragraphs: [
        "Mural and textile work celebrating Yoruba craft and pattern. Elevating Heritage took ADIRE off the body and onto the wall — large-scale public work rooted in community and place.",
        "The Accra show paired finished murals with a live printing workshop, reconnecting craft and identity for everyone who walked through."
      ],
      gallery: [
        "https://picsum.photos/seed/lt-3-clayton-community-/600/600",
        "https://picsum.photos/seed/lt-11-mural-heritage/600/600",
        "https://picsum.photos/seed/lt-2-adire-indigo-study/600/600"
      ],
      cta: { label: "Enquire about this series", href: "/contact" }
    }
  },
  {
    year: "2023",
    name: "The Art We Carry",
    place: "United Kingdom",
    desc: "Charcoal and illustration on identity, weight and belonging.",
    record: {
      kicker: "Exhibition · 2023",
      title: "The Art We Carry",
      meta: ["Nov 9–23, 2023", "12pm–8pm", "London, United Kingdom", "Charcoal", "Illustration"],
      img: "https://picsum.photos/seed/lt-22-the-art-we-carry/1000/750",
      paragraphs: [
        "Charcoal and illustration on identity, weight and belonging. The Art We Carry is a reflective body of work about the things we hold and the marks they leave.",
        "Quiet, monochrome and deliberate, the series let contrast do the talking — the hand behind every line made plainly visible."
      ],
      gallery: [
        "https://picsum.photos/seed/lt-5-charcoal-contrast-/600/600",
        "https://picsum.photos/seed/lt-15-sketch-series/600/600",
        "https://picsum.photos/seed/lt-6-digital-illustrati/600/600"
      ],
      cta: { label: "Enquire about this series", href: "/contact" }
    }
  },
  {
    year: "2021",
    name: "Colors of Clothes",
    place: "United Kingdom",
    desc: "Fabric paintings translating tie-and-dye into framed visual art.",
    record: {
      kicker: "Exhibition · 2021",
      title: "Colors of Clothes",
      meta: ["Jul 6–20, 2021", "10am–6pm", "Bradford, United Kingdom", "Fabric painting"],
      img: "https://picsum.photos/seed/lt-10-visual-painting/1000/750",
      paragraphs: [
        "Fabric paintings translating tie-and-dye into framed visual art. Colors of Clothes lifted ADIRE from garment to canvas — pattern read as painting.",
        "Each framed piece began as four yards of cloth, asking how the colours we wear become the colours we keep."
      ],
      gallery: [
        "https://picsum.photos/seed/lt-16-fabric-painting/600/600",
        "https://picsum.photos/seed/lt-9-tie-dye-pattern/600/600",
        "https://picsum.photos/seed/lt-2-adire-indigo-study/600/600"
      ],
      cta: { label: "Enquire about this series", href: "/contact" }
    }
  },
  {
    year: "2020",
    name: "Minds on Earth",
    place: "United Kingdom",
    desc: "Early experiments at the meeting point of sketch, fabric and code.",
    record: {
      kicker: "Exhibition · 2020",
      title: "Minds on Earth",
      meta: ["Oct 2–16, 2020", "11am–5pm", "Bradford, United Kingdom", "Mixed media"],
      img: "https://picsum.photos/seed/lt-12-ai-illustration-hy/1000/750",
      paragraphs: [
        "Early experiments at the meeting point of sketch, fabric and code. Minds on Earth was the first show to put hand-drawn work beside digital output.",
        "It set the direction for everything since — tradition and technology in the same frame, neither one winning."
      ],
      gallery: [
        "https://picsum.photos/seed/lt-12-ai-illustration-hy/600/600",
        "https://picsum.photos/seed/lt-15-sketch-series/600/600",
        "https://picsum.photos/seed/lt-4-ai-feature/600/600"
      ],
      cta: { label: "Enquire about this series", href: "/contact" }
    }
  }
] as const;

interface RecordListProps {
  activeYear: string;
}

export function RecordList({ activeYear }: RecordListProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedRecord, setSelectedRecord] = React.useState<DetailRecord | null>(null);

  const handleOpen = (rec: DetailRecord) => {
    setSelectedRecord(rec);
    open();
  };

  return (
    <>
      <Box component="section" className="section-tight wrap" style={{ background: "var(--bg)" }}>
        <Kicker>The record</Kicker>
        <Box style={{ marginTop: "26px" }}>
          {EXHIBITIONS.map((exh, i) => {
            const isMatch = activeYear === "All years" || exh.year === activeYear;
            if (!isMatch) return null;

            return (
              <Box
                key={exh.name}
                className="ex-row"
                data-reveal
                onClick={() => handleOpen(exh.record)}
                style={{
                  borderBottom: i === EXHIBITIONS.length - 1 ? "1px solid var(--sand-line)" : undefined
                }}
              >
                <div className="yr">{exh.year}</div>
                <div>
                  <div className="nm">{exh.name}</div>
                  <div className="place">{exh.place}</div>
                </div>
                <div className="ds">{exh.desc}</div>
                <span className="ex-go">
                  View details{" "}
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M3 12L12 3M5 3h7v7" />
                  </svg>
                </span>
              </Box>
            );
          })}
        </Box>
      </Box>

      <DetailDrawer opened={opened} onClose={close} record={selectedRecord} />
    </>
  );
}
