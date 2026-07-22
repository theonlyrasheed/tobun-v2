import {
  Avatar,
  Box,
  Center,
  Container,
  Group,
  Paper,
  Rating,
  SimpleGrid,
  Stack,
  Text,
  ActionIcon,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { SectionTitle } from "@/components/section-title";
import { MAX_WIDTH } from "@/utils/constants";
import { Carousel } from "@mantine/carousel";
import type { EmblaCarouselType } from "embla-carousel";
import { useEffect, useMemo, useState } from "react";
import { useTestimonials } from "@/builders";

import type { AllTestimonialsQueryResult } from "@/builders/sanity.types";
import type { TestimonialProps } from "@/types";
import { optimizeImageUrl } from "@/utils/sanity";

const transformTestimonialApi = (
  testimonial: AllTestimonialsQueryResult[0],
): TestimonialProps => {
  return {
    id: testimonial._id,
    name: testimonial.name,
    text: testimonial.quote,
    rating: testimonial.rating,
    avatar: optimizeImageUrl(testimonial.avatar?.url, { width: 100 }) ?? "",
  };
};

export function TestimonialsSection() {
  const { data: testimonials, isPlaceholderData } = useTestimonials();

  // "Big screens": 4 cols x 2 rows => 8 cards per "page"
  // "Small screens": 2 cols x 2 rows => 4 cards per "page"
  const isLgUp = useMediaQuery("(min-width: 64em)"); // ~1024px
  const perPage = isLgUp ? 8 : 3;

  const pages = useMemo(() => {
    if (!testimonials) return [];

    const chunks: TestimonialProps[][] = [];
    for (let i = 0; i < testimonials.length; i += perPage) {
      chunks.push(
        testimonials.slice(i, i + perPage).map(transformTestimonialApi),
      );
    }
    return chunks;
  }, [testimonials, perPage]);

  const [embla, setEmbla] = useState<EmblaCarouselType | null>(null);
  const [_, setActive] = useState(0);

  useEffect(() => {
    // reset to first slide if breakpoint changes the paging
    setActive(0);
    embla?.scrollTo(0);
  }, [pages.length, embla]);

  const goPrev = () => embla?.scrollPrev();
  const goNext = () => embla?.scrollNext();

  return (
    <Container
      size='full'
      maw={MAX_WIDTH}
      pt={{
        base: 30,
        md: 100,
      }}
      pb={{
        base: 30,
        md: 100,
      }}
      hidden={isPlaceholderData || !testimonials?.length}
    >
      <SectionTitle
        subtitle='WHAT OUR CUSTOMER SAYS'
        title='Our Amazing Supporters'
      />

      <Box
        mt={50}
        p={{ base: "lg", md: "xl" }}
        style={{
          backgroundColor: "#06322d",
          borderRadius: 18,
          backgroundImage:
            "linear-gradient(rgba(6, 50, 45, 0.92), rgba(6, 50, 45, 0.92)), url('/images/culture-pattern.avif')",
          backgroundRepeat: "repeat",
          backgroundSize: "420px",
          backgroundPosition: "center",
        }}
      >
        <Box className='relative '>
          <Carousel
            getEmblaApi={setEmbla}
            withControls={false}
            withIndicators={false}
            emblaOptions={{
              loop: pages.length > 1,
              align: "start",
              watchDrag: pages.length > 1,
            }}
            slideSize='100%'
            slideGap={20}
            onSlideChange={setActive}
            mih={300}
          >
            {pages.map((pageItems, idx) => (
              <Carousel.Slide key={idx}>
                <SimpleGrid
                  cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
                  spacing='lg'
                  className='pb-14 cursor-grab'
                >
                  {pageItems.map((testimonial) => (
                    <Paper
                      key={testimonial.id}
                      p='xl'
                      radius='sm'
                      withBorder
                      shadow='sm'
                      style={{
                        backgroundColor: "rgba(255, 255, 255, 0.96)",
                        display: "flex",
                        flexDirection: "column",
                        gap: 16,
                        minHeight: 210,
                      }}
                      data-aos='fade-up'
                      data-aos-delay={idx * 100}
                    >
                      <Stack gap='md' style={{ flex: 1 }} justify='center'>
                        <Text
                          fz={16}
                          c='dark.9'
                          fs='italic'
                          fw={600}
                          ta='center'
                          style={{ lineHeight: 1.35 }}
                        >
                          {testimonial.text}
                        </Text>

                        <Center>
                          <Rating
                            value={testimonial.rating}
                            readOnly
                            color='orange'
                            size='md'
                          />
                        </Center>
                      </Stack>

                      <Center>
                        <Group gap='xs'>
                          <Avatar
                            src={testimonial.avatar}
                            name={testimonial.name}
                            radius='xl'
                            size='sm'
                          />
                          <Text fz={14} c='gray.7' fw={600}>
                            {testimonial.name}
                          </Text>
                        </Group>
                      </Center>
                    </Paper>
                  ))}
                </SimpleGrid>
              </Carousel.Slide>
            ))}
          </Carousel>

          {/* Controls: bottom-right inside the patterned container */}
          {pages.length > 1 && (
            <Group
              gap='xs'
              className='absolute bottom-0 right-0 mt-4'
              style={{ zIndex: 2 }}
            >
              <ActionIcon
                variant='filled'
                radius='sm'
                color='dark'
                size='lg'
                onClick={goPrev}
                aria-label='Previous testimonials'
              >
                <IconChevronLeft size={18} />
              </ActionIcon>
              <ActionIcon
                variant='filled'
                radius='sm'
                color='dark'
                size='lg'
                onClick={goNext}
                aria-label='Next testimonials'
              >
                <IconChevronRight size={18} />
              </ActionIcon>
            </Group>
          )}
        </Box>
      </Box>
    </Container>
  );
}
