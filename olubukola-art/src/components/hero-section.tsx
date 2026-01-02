import {
  Box,
  Container,
  Title,
  Text,
  Group,
  Button,
  Stack,
} from "@mantine/core";
import { stats } from "@/data/mockData";

import clsx from "clsx";
import { MAX_WIDTH } from "@/utils/constants";
import { useServices } from "@/builders/site/hooks";
import { PAGES } from "@/utils/enums";
import { Link } from "@tanstack/react-router";

export function HeroSection() {
  const { data: services, isPlaceholderData: isLoading } = useServices();

  const categories =
    services?.map((service) => ({
      label: service.title,
      image: service.hero_image ? service.hero_image.url : service.image.url,
    })) || [];

  return (
    <Box
      className='relative min-h-[830px] bg-cover bg-center bg-no-repeat flex flex-col justify-center'
      style={{
        backgroundImage: "url(/images/hero-bg.jpg)",
        backgroundAttachment: "fixed",
      }}
    >
      ``
      <Box className='absolute inset-0 bg-black/55' />
      <Container
        size='full'
        maw={MAX_WIDTH}
        className='relative z-10 py-14 lg:py-20'
      >
        <Box className='grid grid-cols-1 items-center gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.75fr)] lg:gap-16'>
          <Stack gap='lg'>
            <Stack gap='sm'>
              <Text
                c='white'
                fz={16}
                lh={1.5}
                py={6}
                px={16}
                w='fit-content'
                className='font-segoe rounded-full bg-white/25'
                bg='white/25'
                fw={500}
                style={{ letterSpacing: "0.48px" }}
              >
                Multidisciplinary Artist & Digital Designer
              </Text>

              <Title
                order={2}
                className='font-segoe text-4xl! sm:text-6xl! text-white leading-[1.2]'
              >
                Exploring Your World Through{" "}
                <span
                  className='inline-block bg-clip-text text-transparent font-extrabold'
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.18), rgba(255,255,255,0.18)), url(/images/culture-pattern.avif)",
                    backgroundSize: "contain",
                    backgroundPosition: "center",
                    WebkitBackgroundClip: "text",
                    backgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.45))",
                  }}
                >
                  Art & Culture
                </span>
              </Title>
            </Stack>
            <Text
              c='white'
              fz={24}
              className='font-segoe max-w-[58ch] '
              fw={400}
            >
              I create contemporary works that blend tradition with modern
              storytelling- paintings, murals, illustration, and design for
              brands and communities.
            </Text>

            <Box className='flex flex-wrap gap-[18px] max-w-2xl'>
              {stats.map((stat) => (
                <Box
                  key={stat.label}
                  className={clsx(
                    "min-w-[180px] rounded-[10px] border flex-1",
                    "border-white/40 bg-white/10 px-[22px] py-5 text-center text-white/95 backdrop-blur"
                  )}
                >
                  <Box className='text-xl font-semibold leading-[1.15] tracking-[0.01em]'>
                    {stat.value}
                  </Box>
                  <Box className='mt-1.5 text-base leading-[1.2] text-white/85'>
                    {stat.label}
                  </Box>
                </Box>
              ))}
            </Box>

            <Group gap='sm' mt='xs' maw={400}>
              <Button
                component={Link}
                to={PAGES.GALLERY}
                flex={1}
                size='lg'
                color='purple'
                radius='sm'
              >
                Browse Gallery
              </Button>
              <Button
                component={Link}
                to={PAGES.HOME}
                hash={PAGES.SERVICES}
                flex={1}
                size='lg'
                variant='subtle'
                color='white'
                radius='sm'
                styles={{ root: { borderColor: "rgba(255, 255, 255, 0.85)" } }}
              >
                See Services
              </Button>
            </Group>
          </Stack>

          <Box
            className='w-full gap-3 hidden lg:grid'
            style={{
              gridTemplateColumns:
                "repeat(auto-fill,minmax(min(140px,100%),1fr))",
              gridAutoRows: "1fr",
            }}
          >
            {categories.slice(0, 9).map((category) => (
              <Box
                key={category.label}
                className={clsx(
                  "flex flex-col h-full group relative aspect-square overflow-hidden rounded-lg border border-white/15 bg-white/5"
                )}
              >
                <Box
                  role='img'
                  aria-label={category.label}
                  className={clsx(
                    "absolute inset-0 bg-cover bg-center transition duration-200 ease-out transform-[scale(1)]",
                    "filter-[saturate(1.08)_contrast(1.02)] group-hover:transform-[scale(1.03)] group-hover:filter-[saturate(1.16)_contrast(1.05)]",
                    { skeleton: isLoading }
                  )}
                  style={{ backgroundImage: `url(${category.image})` }}
                />
                <Box
                  className={clsx(
                    "mt-auto font-segoe pointer-events-none relative z-10 mx-2.5 mb-2.5",
                    "rounded-[10px] border border-white/50 bg-black/20 px-3 py-2.5 text-center ",
                    "text-sm tracking-[0.02em] text-white/95 backdrop-blur",
                    { skeleton: isLoading }
                  )}
                >
                  {category.label}
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
