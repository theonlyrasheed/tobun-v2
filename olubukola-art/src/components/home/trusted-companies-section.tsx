import { Box, Container, Image } from "@mantine/core";
import { SectionTitle } from "@/components/section-title";
import { MAX_WIDTH } from "@/utils/constants";
import { Carousel } from "@mantine/carousel";
import type { EmblaCarouselType } from "embla-carousel";
import { useEffect, useMemo, useState } from "react";

const companies = [
  {
    name: "Leadway Assurance",
    src: "/images/companies/leadway.png",
  },
  {
    name: "FMC Abuja",
    src: "/images/companies/fmc-abuja.png",
  },
];

export function TrustedCompaniesSection() {
  // Duplicate items so looping feels continuous even with a small source list.
  const slides = useMemo(
    () =>
      Array.from({ length: 10 }, (_, idx) => companies[idx % companies.length]),
    []
  );

  const [embla, setEmbla] = useState<EmblaCarouselType | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!embla) return;

    const id = window.setInterval(() => {
      if (!paused) embla.scrollNext();
    }, 1800);

    return () => window.clearInterval(id);
  }, [embla, paused]);

  return (
    <Container size='full' maw={MAX_WIDTH} pt={{ base: 30, md: 80 }}>
      <SectionTitle
        subtitle='WHO WE WORK WITH'
        title='Trusted By Great- Companies'
      />

      <Box
        mt={50}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <Carousel
          emblaOptions={{ loop: true, align: "start", duration: 6000 }}
          withControls={false}
          withIndicators={false}
          getEmblaApi={setEmbla}
          slideGap={{ base: "xl", md: 36 }}
          slideSize={{ base: "70%", sm: "50%", md: "33.333%", lg: "25%" }}
        >
          {slides.map((company, idx) => (
            <Carousel.Slide key={`${company.name}-${idx}`}>
              <Box
                style={{
                  height: 90,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  src={company.src}
                  alt={company.name}
                  fit='contain'
                  h={80}
                  w='auto'
                  className='grayscale opacity-70 hover:grayscale-0 hover:opacity-100 transition duration-300 cursor-pointer'
                />
              </Box>
            </Carousel.Slide>
          ))}
        </Carousel>
      </Box>
    </Container>
  );
}
