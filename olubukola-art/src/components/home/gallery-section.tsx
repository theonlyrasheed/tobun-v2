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
import { formatDimensions, formatPrice } from "@/utils/formatters";
import { MAX_WIDTH } from "@/utils/constants";
import { PAGES } from "@/utils/enums";
import { useEffect, useState } from "react";
import { useGalleries, useAlbums } from "@/builders/gallery/hooks";
import { Gallery } from "@/builders";
import { urlFor } from "@/utils/sanity";
import { BookingServiceModal } from "../modals/booking-service";
import { MakeEnquiryModal } from "../modals/make-enquiry";
import type { ArtworkCardProps } from "@/types";

export const transformGalleryApi = (gallery: Gallery): ArtworkCardProps => {
  return {
    id: gallery._id,
    title: gallery.title,
    description: gallery.excerpt || "---",
    artist: "Olubukola's Art",
    image: urlFor(gallery.main_image?.asset),
    size: {
      height: gallery.size?.heightCm || 0,
      width: gallery.size?.widthCm || 0,
    },
    date: gallery.created_at
      ? new Date(gallery.created_at).toLocaleDateString()
      : "",
    price: gallery.price?.amount || 0,
    availability: gallery.availability,
  };
};

const isAvailable = (gallery: ArtworkCardProps) => {
  return gallery.availability === "available";
};

export function GallerySection() {
  const [enquiryOpened, setEnquiryOpened] = useState(false);
  const [bookingOpened, setBookingOpened] = useState(false);
  const [activeTab, setActiveTab] = useState("digital-artwork");
  const [title, setTitle] = useState("Gallery");

  const { data: galleries } = useGalleries();
  const { data: albums } = useAlbums();

  const featuredGalleries = galleries?.filter((gallery) => gallery.featured);
  const featuredAlbums = albums?.filter(
    (album) =>
      album.featured &&
      featuredGalleries?.some((gallery) => gallery.album?._id === album._id)
  );

  const tabs = featuredAlbums?.map((album) => ({
    value: album.slug.current,
    label: album.title,
  })) || [{ value: "all", label: "All" }];

  const getFilteredGalleries = (albumSlug: string): ArtworkCardProps[] => {
    if (!featuredAlbums || !featuredGalleries) return [];

    const selectedAlbum = featuredAlbums.find(
      (album) => album.slug.current === albumSlug
    );

    if (!selectedAlbum) return [];

    return featuredGalleries
      .filter((gallery) => gallery.album?._id === selectedAlbum._id)
      .map(transformGalleryApi);
  };

  useEffect(() => {
    const defaultTab =
      tabs.length > 0
        ? tabs.find((tab) => tab.value === activeTab)?.value || tabs[0].value
        : activeTab;

    setActiveTab(defaultTab);

    if (activeTab === "digital-artwork") {
      setTitle("Gallery");
    } else {
      const selectedAlbum = featuredAlbums?.find(
        (album) => album.slug.current === activeTab
      );
      setTitle(selectedAlbum?.title ?? "Gallery");
    }
  }, [tabs, activeTab, featuredAlbums]);

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
        title={`Our ${title}`}
        id={PAGES.GALLERY}
      />

      <SectionTabs
        value={activeTab}
        onChange={(value) => setActiveTab(value || "all")}
        mt={50}
        tabs={tabs}
        mih={400}
      >
        <Tabs.Panel value={activeTab} pt='xl'>
          <SimpleGrid
            cols={{ base: 1, sm: 2, md: 3, lg: 4 }}
            spacing={{
              base: 10,
              md: 15,
            }}
          >
            {getFilteredGalleries(activeTab).map((gallery, idx) =>
              isAvailable(gallery) ? (
                <GalleryCard key={gallery.id} gallery={gallery} index={idx} />
              ) : (
                <SimpleGalleryCard
                  key={gallery.id}
                  gallery={gallery}
                  index={idx}
                />
              )
            )}

            {/* Fills the 8th slot when lg=4 and artworks=7 - only show if there are galleries with descriptions */}
            {getFilteredGalleries(activeTab).some(isAvailable) && (
              <ActionCard
                onEnquiryClick={() => setEnquiryOpened(true)}
                onBookingClick={() => setBookingOpened(true)}
              />
            )}
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
        services={getFilteredGalleries(activeTab)}
        modalType='gallery'
      />
    </Container>
  );
}

interface GalleryCardProps {
  gallery: ArtworkCardProps;
  index: number;
}

const GalleryCard = ({ gallery, index }: GalleryCardProps) => (
  <Card
    key={gallery.id}
    shadow='none'
    padding='lg'
    radius='sm'
    withBorder
    data-aos='fade-up'
    data-aos-delay={Math.min(index * 70, 420)}
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
          src={gallery.image}
          h={300}
          w='100%'
          maw={520}
          mx='auto'
          alt={gallery.title}
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
          {gallery.artist}
        </Text>
      </Box>
    </Card.Section>

    <Stack gap='xs' mt='md'>
      <Title order={4} className='font-playfair' fz={24} fw={600}>
        {gallery.title}
      </Title>
      <Text fz={15} c='gray.6'>
        {gallery.description}
      </Text>
      <Text fz={14} c='gray.7'>
        Size: {formatDimensions(gallery.size.height, gallery.size.width)}
      </Text>
      <Text fz={14} c='gray.7'>
        Date: {gallery.date}
      </Text>
      <Text fz={16} c='red.7' fw={700}>
        Prize: {formatPrice(gallery.price)}
      </Text>
    </Stack>
  </Card>
);

const SimpleGalleryCard = ({ gallery, index }: GalleryCardProps) => (
  <Card
    key={gallery.id}
    shadow='none'
    padding='lg'
    radius='sm'
    withBorder
    data-aos='fade-up'
    data-aos-delay={Math.min(index * 70, 420)}
  >
    <Card.Section inheritPadding py='lg'>
      <Box
        style={{
          backgroundColor: "#f0f0f0",
          position: "relative",
        }}
      >
        <Image
          src={gallery.image}
          w='100%'
          maw={520}
          mx='auto'
          alt={gallery.title}
          fit='cover'
          radius='sm'
        />
      </Box>
    </Card.Section>
  </Card>
);

interface ActionCardProps {
  onEnquiryClick: () => void;
  onBookingClick: () => void;
}

const ActionCard = ({ onEnquiryClick, onBookingClick }: ActionCardProps) => (
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
        onClick={onEnquiryClick}
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
        styles={{
          root: { color: "var(--mantine-color-dark-9)" },
        }}
        onClick={onBookingClick}
      >
        Buy Art piece
      </Button>
    </Stack>
  </Card>
);
