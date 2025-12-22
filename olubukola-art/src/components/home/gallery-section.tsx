import {
  Box,
  Button,
  Card,
  Container,
  Image,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  Title,
} from "@mantine/core";
import { SectionTitle } from "@/components/section-title";
import { SectionTabs } from "@/components/shared/section-tabs";
import { artworks } from "@/data/mockData";
import { formatDimensions, formatPrice } from "@/utils/formatters";
import { MAX_WIDTH } from "@/utils/constants";
import { PAGES } from "@/utils/enums";
import { useState } from "react";
import { MakeEnquiryModal } from "../modals/make-enquiry";
import { BookingServiceModal } from "../modals/booking-service";

export function GallerySection() {
  const [enquiryOpened, setEnquiryOpened] = useState(false);
  const [bookingOpened, setBookingOpened] = useState(false);

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
      }}
    >
      <SectionTitle
        subtitle='CURATED SELECTIONS'
        title='Our Gallery'
        id={PAGES.GALLERY}
      />

      <SectionTabs
        defaultValue='all'
        mt={50}
        tabs={[
          { value: "all", label: "Our Gallery" },
          { value: "photography", label: "Photography" },
          { value: "exhibition", label: "Exhibition" },
          { value: "tutorials", label: "Tutorials" },
        ]}
      >
        <Tabs.Panel value='all' pt='xl'>
          <SimpleGrid
            cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
            spacing={{
              base: 10,
              md: 15,
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
                <Card.Section inheritPadding pt='lg'>
                  <Box
                    style={{
                      height: 300,
                      backgroundColor: "#f0f0f0",
                      position: "relative",
                    }}
                  >
                    <Image
                      src={artwork.image}
                      h={300}
                      w='100%'
                      maw={520}
                      mx='auto'
                      alt={artwork.title}
                      fit='cover'
                      radius='sm'
                    />
                    <Text
                      className='font-playball'
                      fz={18}
                      c='rgba(255, 255, 255, 0.67)'
                      style={{
                        position: "absolute",
                        bottom: 10,
                        left: 10,
                        letterSpacing: "1.20px",
                      }}
                    >
                      {artwork.artist}
                    </Text>
                  </Box>
                </Card.Section>

                <Stack gap='xs' mt='md'>
                  <Title order={4} className='font-playfair' fz={24} fw={600}>
                    {artwork.title}
                  </Title>
                  <Text fz={15} c='gray.6'>
                    {artwork.description}
                  </Text>
                  <Text fz={14} c='gray.7'>
                    Size:{" "}
                    {formatDimensions(artwork.size.height, artwork.size.width)}
                  </Text>
                  <Text fz={14} c='gray.7'>
                    Date: {artwork.date}
                  </Text>
                  <Text fz={16} c='red.7' fw={700}>
                    Prize: {formatPrice(artwork.price)}
                  </Text>
                </Stack>
              </Card>
            ))}

            {/* Fills the 8th slot when lg=4 and artworks=7 */}
            <Card
              shadow='none'
              padding='lg'
              radius='sm'
              className='h-full'
              data-aos='fade-up'
              data-aos-delay={420}
            >
              <Stack className='h-full' gap='sm' justify='center'>
                <Button
                  fullWidth
                  size='md'
                  color='dark'
                  radius='sm'
                  h={48}
                  onClick={() => {
                    setEnquiryOpened(true);
                  }}
                >
                  Make Enquiry
                </Button>
                <Button
                  fullWidth
                  size='md'
                  variant='outline'
                  color='gray'
                  radius='sm'
                  h={48}
                  styles={{ root: { color: "var(--mantine-color-dark-9)" } }}
                  onClick={() => {
                    setBookingOpened(true);
                  }}
                >
                  Buy Art piece
                </Button>
              </Stack>
            </Card>
          </SimpleGrid>
        </Tabs.Panel>
      </SectionTabs>

      <MakeEnquiryModal
        opened={enquiryOpened}
        onClose={() => setEnquiryOpened(false)}
        service={null}
      />

      <BookingServiceModal
        opened={bookingOpened}
        onClose={() => setBookingOpened(false)}
        services={artworks}
        modalType='artwork'
      />
    </Container>
  );
}
