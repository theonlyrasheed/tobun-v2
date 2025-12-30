import { createFileRoute } from "@tanstack/react-router";
import {
  ActionIcon,
  Box,
  Card,
  Container,
  Image,
  Stack,
  Tabs,
} from "@mantine/core";
import { SectionTabs } from "@/components/shared/section-tabs";
import { artworks } from "@/data/mockData";
import { MAX_WIDTH } from "@/utils/constants";
import { IconHeart } from "@tabler/icons-react";
import { SectionTitle } from "@/components/section-title";

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
});

function GalleryPage() {
  return (
    <Stack gap={0} flex={1}>
      <Image src='/svgs/gallery-hero.svg' alt='Gallery Hero' />
      <Container
        size='full'
        py={{ base: 30, md: 60 }}
        w={"100%"}
        maw={MAX_WIDTH}
      >
        <Stack gap={0} mb={20}>
          <SectionTitle
            subtitle='OUR CREATIVE MEMORY'
            title='Welcome To Our Gallery'
          />
        </Stack>

        <SectionTabs
          defaultValue='all'
          tabs={[
            { value: "all", label: "All" },
            { value: "photography", label: "Photography" },
            { value: "exhibition", label: "Exhibition" },
            { value: "tutorials", label: "Tutorials" },
          ]}
        >
          <Tabs.Panel value='all' pt='xl' className='w-full'>
            <Box
              className='w-full gap-3 grid'
              style={{
                gridTemplateColumns:
                  "repeat(auto-fill,minmax(min(300px,100%),1fr))",
                gridAutoRows: "1fr",
              }}
            >
              {artworks.map((artwork, idx) => (
                <Card
                  key={artwork.id}
                  shadow='none'
                  padding='lg'
                  radius='sm'
                  withBorder
                  data-aos='fade-up'
                  data-aos-delay={Math.min(idx * 70, 420)}
                >
                  <Card.Section inheritPadding py='lg'>
                    <Box
                      style={{
                        backgroundColor: "#f0f0f0",
                        position: "relative",
                      }}
                    >
                      <Image
                        src={artwork.image}
                        w='100%'
                        h={450}
                        maw={520}
                        mx='auto'
                        alt={artwork.title}
                        fit='cover'
                        radius='sm'
                      />
                      <ActionIcon
                        variant='transparent'
                        color='white'
                        radius='xl'
                        size='lg'
                        style={{
                          position: "absolute",
                          top: 10,
                          right: 10,
                        }}
                        aria-label='Save post'
                      >
                        <IconHeart size={18} />
                      </ActionIcon>
                    </Box>
                  </Card.Section>
                </Card>
              ))}
            </Box>
          </Tabs.Panel>
        </SectionTabs>
      </Container>
    </Stack>
  );
}
