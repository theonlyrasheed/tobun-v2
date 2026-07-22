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
import { MAX_WIDTH } from "@/utils/constants";
import { IconHeart } from "@tabler/icons-react";
import { SectionTitle } from "@/components/section-title";
import {
  useGalleries,
  useCategoriesWithCount,
  useGalleriesInfinite,
  useGalleriesByAlbumInfinite,
} from "@/builders";
import type {
  AllGalleriesQueryResult,
  AlbumsWithCountQueryResult,
} from "@/builders/sanity.types";
import type { ArtworkCardProps } from "@/types";
import { useState, useEffect, useCallback, useRef } from "react";

import PhotoSwipeLightbox from "photoswipe/lightbox";
import "photoswipe/style.css";
import { optimizeImageUrl } from "@/utils/sanity";

// Grid thumbnails render at up to 520px wide (see maw={520} below) — request
// a resized image instead of shipping the full-resolution original. The
// lightbox gets a larger variant since it's shown full-screen, one at a time.
const GRID_THUMB_WIDTH = 700;
const LIGHTBOX_WIDTH = 1600;

const transformGalleryApi = (
  gallery: AllGalleriesQueryResult[0]
): ArtworkCardProps => {
  return {
    id: gallery._id,
    title: gallery.title,
    description: gallery.excerpt || "---",
    artist: "Olubukola's Art",
    image: optimizeImageUrl(gallery.main_image?.url, {
      width: GRID_THUMB_WIDTH,
    }),
    fullImage: optimizeImageUrl(gallery.main_image?.url, {
      width: LIGHTBOX_WIDTH,
    }),
    size: {
      height: 0,
      width: 0,
    },
    date: gallery.created_at
      ? new Date(gallery.created_at).toLocaleDateString()
      : "",
    price: {
      currency: gallery.price?.currency ?? "NGN",
      amount: gallery.price?.amount ?? 0,
    },
    availability: gallery.availability,
  };
};

export const Route = createFileRoute("/gallery")({
  component: GalleryPage,
  ssr: true,
});

function GalleryPage() {
  const { data: galleries, isPlaceholderData: isGalleriesPlaceholder } =
    useGalleries();
  const { data: albums, isPlaceholderData: isAlbumsPlaceholder } =
    useCategoriesWithCount();
  const [activeTab, setActiveTab] = useState("all");

  const ITEMS_PER_PAGE = 12;
  const isAllTab = activeTab === "all";

  const isPlaceholderData = isGalleriesPlaceholder || isAlbumsPlaceholder;

  const selectedAlbum = albums?.find(
    (album: AlbumsWithCountQueryResult[0]) => album.slug === activeTab
  );

  // Use appropriate infinite query based on active tab
  const infiniteQuery = isAllTab
    ? useGalleriesInfinite(ITEMS_PER_PAGE)
    : useGalleriesByAlbumInfinite(selectedAlbum?._id || "", ITEMS_PER_PAGE);

  const {
    data: infiniteData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = infiniteQuery;

  // Flatten the infinite query data and transform to ArtworkCardProps
  const allArtworks =
    infiniteData?.pages.flatMap((page) => page.data.map(transformGalleryApi)) ||
    [];

  // Initialize PhotoSwipe lightbox
  useEffect(() => {
    const lightboxInstance = new PhotoSwipeLightbox({
      gallery: "#gallery-grid",
      children: "a[data-pswp-src]",
      pswpModule: () => import("photoswipe"),
    });

    lightboxInstance.init();

    return () => {
      lightboxInstance.destroy();
    };
  }, []);

  // Load more function for infinite scroll
  const loadMore = useCallback(() => {
    if (hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  // Create tabs from all albums
  const tabs = [
    { value: "all", label: "All" },
    ...(albums
      ?.filter((album) => album.galleryCount > 0)
      .map((album) => ({
        value: album.slug,
        label: album.title,
      })) || []),
  ];

  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Intersection observer for infinite scroll
  useEffect(() => {
    if (!loadMoreRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(loadMoreRef.current);

    return () => observer.disconnect();
  }, [loadMore]);

  return (
    <Stack gap={0} flex={1}>
      <Image src='/images/gallery-hero.webp' alt='Gallery Hero' loading='eager' />
      <Container
        size='full'
        py={{ base: 30, md: 60 }}
        w={"100%"}
        maw={MAX_WIDTH}
        hidden={!isPlaceholderData && !galleries?.length}
      >
        <Stack gap={0} mb={20}>
          <SectionTitle
            subtitle='OUR CREATIVE MEMORY'
            title='Welcome To Our Gallery'
            skeleton={isPlaceholderData}
          />
        </Stack>

        <SectionTabs
          value={activeTab}
          onChange={(value) => setActiveTab(value || "all")}
          defaultValue='all'
          tabs={tabs}
          skeleton={isPlaceholderData}
          mih={400}
        >
          <Tabs.Panel value={activeTab} pt='xl' className='w-full'>
            <Box
              id='gallery-grid'
              className='w-full gap-3 grid'
              style={{
                gridTemplateColumns:
                  "repeat(auto-fill,minmax(min(300px,100%),1fr))",
                gridAutoRows: "1fr",
              }}
            >
              {allArtworks.map((artwork, idx) => (
                <Card
                  key={artwork.id}
                  shadow='none'
                  padding='lg'
                  radius='sm'
                  withBorder
                  data-aos='fade-up'
                  data-aos-delay={Math.min(idx * 70, 420)}
                  data-aos-disabled={isPlaceholderData}
                >
                  <Card.Section inheritPadding py='lg' h={"100%"} flex={1}>
                    <Box
                      style={{
                        backgroundColor: "#f0f0f0",
                        position: "relative",
                        height: "100%",
                      }}
                    >
                      <a
                        href={artwork.fullImage || artwork.image || undefined}
                        data-pswp-src={artwork.fullImage || artwork.image}
                        data-pswp-width='600'
                        data-pswp-height='800'
                        target='_blank'
                        rel='noopener'
                        style={{
                          cursor: "zoom-in",
                          display: "block",
                          height: "100%",
                        }}
                      >
                        <Image
                          src={artwork.image}
                          w='100%'
                          h={"100%"}
                          maw={520}
                          mx='auto'
                          alt={artwork.title}
                          fit='cover'
                          radius='sm'
                          loading='lazy'
                        />
                      </a>
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

              {/* Infinite scroll trigger */}
              {hasNextPage && (
                <Box
                  ref={loadMoreRef}
                  className='col-span-full flex justify-center py-8'
                >
                  <Box className='text-center'>
                    {isFetchingNextPage ? (
                      <Box className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900 mx-auto' />
                    ) : (
                      <p className='text-gray-500'>Loading more...</p>
                    )}
                  </Box>
                </Box>
              )}
            </Box>
          </Tabs.Panel>
        </SectionTabs>
      </Container>
    </Stack>
  );
}
