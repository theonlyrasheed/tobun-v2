import { ActionIcon, Box, Image } from "@mantine/core";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useEffect, useMemo, useState } from "react";

import { useAdvertsSection } from "@/builders";
import { PAGES } from "@/utils/enums";

export function AdsSection() {
  const { data } = useAdvertsSection();

  const ads = useMemo(() => {
    const items = (data as any)?.adverts as
      | Array<{ slug?: string; image?: { url?: string | null; alt?: string } }>
      | undefined;

    return (
      items
        ?.map((it, idx) => ({
          key: it.slug ?? `${it.image?.url ?? "ad"}-${idx}`,
          src: it.image?.url ?? "",
          alt: it.image?.alt ?? "Advert",
        }))
        .filter((x) => Boolean(x.src)) ?? []
    );
  }, [data]);

  const [active, setActive] = useState(0);

  useEffect(() => {
    if (ads.length <= 1) return;
    const id = window.setInterval(() => {
      setActive((idx) => (idx + 1) % ads.length);
    }, 2800);
    return () => window.clearInterval(id);
  }, [ads.length]);

  useEffect(() => {
    if (!ads.length) return;
    if (active >= ads.length) setActive(0);
  }, [ads.length, active]);

  if (!ads.length) return null;

  const prev = () => setActive((idx) => (idx - 1 + ads.length) % ads.length);
  const next = () => setActive((idx) => (idx + 1) % ads.length);

  return (
    <Box
      className="ads-fade"
      style={{ backgroundColor: "white" }}
      id={PAGES.ADS}
    >
      <Box
        className="ads-fade-viewport"
        aria-label="Ads"
        mih={{ base: 100, md: 530 }}
      >
        {ads.map((ad, idx) => {
          const isActive = idx === active;
          return (
            <Box
              key={ad.key}
              className="ads-fade-item"
              style={{
                // Disable the global keyframe animation from styles.css.
                // We control visibility with React state + transitions.
                animation: "none",
                opacity: isActive ? 1 : 0,
                transform: isActive ? "translateY(0)" : "translateY(6px)",
                transition: "opacity 600ms ease, transform 600ms ease",
                pointerEvents: isActive ? "auto" : "none",
              }}
            >
              <Image src={ad.src} alt={ad.alt} fit="cover" />
            </Box>
          );
        })}

        {ads.length > 1 ? (
          <>
            <ActionIcon
              variant="filled"
              radius="xl"
              size="lg"
              aria-label="Previous advert"
              onClick={prev}
              style={{ position: "absolute", left: 12, top: "50%" }}
            >
              <IconChevronLeft size={18} />
            </ActionIcon>
            <ActionIcon
              variant="filled"
              radius="xl"
              size="lg"
              aria-label="Next advert"
              onClick={next}
              style={{ position: "absolute", right: 12, top: "50%" }}
            >
              <IconChevronRight size={18} />
            </ActionIcon>
          </>
        ) : null}
      </Box>
    </Box>
  );
}
