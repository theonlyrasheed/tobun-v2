import * as React from "react";
import { Box } from "@mantine/core";
import { Kicker } from "@/components/shared/kicker";
import { DetailDrawer, type DetailRecord } from "@/components/shared/detail-drawer";
import { useDisclosure } from "@mantine/hooks";
import { useExhibitions } from "@/hooks/use-sanity";


interface RecordListProps {
  activeYear: string;
}

export function RecordList({ activeYear }: RecordListProps) {
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedRecord, setSelectedRecord] = React.useState<DetailRecord | null>(null);
  const { data: exhibitions = [] } = useExhibitions();

  const handleOpen = (rec: DetailRecord) => {
    setSelectedRecord(rec);
    open();
  };

  return (
    <>
      <Box component="section" className="section-tight wrap" style={{ background: "var(--bg)" }}>
        <Kicker>The record</Kicker>
        <Box style={{ marginTop: "26px" }}>
          {exhibitions.map((exh, i) => {
            const isMatch = activeYear === "All years" || exh.year === activeYear;
            if (!isMatch) return null;

            return (
              <Box
                key={exh.name || i}
                className="ex-row"
                data-reveal
                onClick={() => handleOpen(exh.record)}
                style={{
                  borderBottom: i === exhibitions.length - 1 ? "1px solid var(--sand-line)" : undefined
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
