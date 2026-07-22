import { Box, Container, Image } from "@mantine/core";
import { SectionTitle } from "@/components/section-title";
import { MAX_WIDTH } from "@/utils/constants";
import { Carousel } from "@mantine/carousel";
import type { EmblaCarouselType } from "embla-carousel";
import { useEffect, useMemo, useState } from "react";
import { useCompanies } from "@/builders";
import type { AllCompaniesQueryResult } from "@/builders/sanity.types";
import { optimizeImageUrl } from "@/utils/sanity";

interface CompanyDisplay {
  name: string;
  src: string;
}

const transformCompanyApi = (
  company: AllCompaniesQueryResult[0],
): CompanyDisplay => ({
  name: company.title,
  src:
    optimizeImageUrl(company.logo?.url, { width: 300 }) ||
    "/images/companies/default.png",
});

export function TrustedCompaniesSection() {
  const { data: companies, isPlaceholderData } = useCompanies();

  const slides = useMemo(() => {
    if (!companies || companies.length === 0) return [];

    const transformedCompanies = companies.map(transformCompanyApi);
    // Duplicate items so looping feels continuous even with a small source list.
    return Array.from(
      { length: 10 },
      (_, idx) => transformedCompanies[idx % transformedCompanies.length],
    );
  }, [companies]);

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
    <Container
      size='full'
      maw={MAX_WIDTH}
      pt={{ base: 30, md: 80 }}
      hidden={isPlaceholderData || !companies?.length}
    >
      <SectionTitle
        subtitle='WHO WE WORK WITH'
        title='Trusted By Great- Companises'
      />

      <Box
        mt={50}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <Carousel
          emblaOptions={{ loop: true, align: "start", duration: 6300 }}
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
                  loading='lazy'
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
