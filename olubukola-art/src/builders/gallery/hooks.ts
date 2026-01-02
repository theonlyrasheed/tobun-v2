import { useQuery, useInfiniteQuery } from "@tanstack/react-query";
import {
  getAllGalleries,
  getFeaturedGalleries,
  getGalleryBySlug,
  getGalleriesByAlbum,
  getAvailableGalleries,
  getGalleriesPaginated,
  getAllGalleryAlbums,
  getGalleryAlbumBySlug,
  getAlbumsWithCount,
} from "./server-fns";
import type { AllGalleriesQueryResult } from "../sanity.types";
import { galleries, galleryAlbums, albumsWithCount } from "./placeholder";

// Gallery hooks
export const useGalleries = () => {
  return useQuery({
    queryKey: ["galleries"],
    queryFn: getAllGalleries,
    placeholderData: galleries,
  });
};

// Backward compatibility
export const useArtworks = useGalleries;

export const useFeaturedGalleries = () => {
  return useQuery({
    queryKey: ["galleries", "featured"],
    queryFn: getFeaturedGalleries,
  });
};

// Backward compatibility
export const useFeaturedArtworks = useFeaturedGalleries;

export const useGallery = (slug: string) => {
  return useQuery({
    queryKey: ["gallery", slug],
    queryFn: () => getGalleryBySlug({ data: slug }),
    enabled: !!slug,
    placeholderData: galleries.find((gallery) => gallery.slug === slug) || null,
  });
};

// Backward compatibility
export const useArtwork = useGallery;

export const useGalleriesByAlbum = (albumId: string) => {
  return useQuery({
    queryKey: ["galleries", "album", albumId],
    queryFn: () => getGalleriesByAlbum({ data: albumId }),
    enabled: !!albumId,
  });
};

// Backward compatibility
export const useArtworksByCategory = useGalleriesByAlbum;

export const useAvailableGalleries = () => {
  return useQuery({
    queryKey: ["galleries", "available"],
    queryFn: getAvailableGalleries,
  });
};

// Backward compatibility
export const useAvailableArtworks = useAvailableGalleries;

export const useGalleriesPaginated = (
  limit: number = 12,
  offset: number = 0
) => {
  return useQuery({
    queryKey: ["galleries", "paginated", limit, offset],
    queryFn: () => getGalleriesPaginated({ data: { limit, offset } }),
    placeholderData: galleries.slice(offset, offset + limit) || [],
  });
};

// Backward compatibility
export const useArtworksPaginated = useGalleriesPaginated;

// Album hooks
export const useAlbums = () => {
  return useQuery({
    queryKey: ["albums"],
    queryFn: getAllGalleryAlbums,
    placeholderData: galleryAlbums || [],
  });
};

// Backward compatibility
export const useCategories = useAlbums;

export const useCategory = (slug: string) => {
  return useQuery({
    queryKey: ["category", slug],
    queryFn: () => getGalleryAlbumBySlug({ data: slug }),
    enabled: !!slug,
    placeholderData: galleryAlbums.find((album) => album.slug === slug) || null,
  });
};

export const useCategoriesWithCount = () => {
  return useQuery({
    queryKey: ["categories", "with-count"],
    queryFn: getAlbumsWithCount,
    placeholderData: albumsWithCount || [],
  });
};

// Types for infinite query responses
interface InfiniteGalleryResponse {
  data: AllGalleriesQueryResult;
  hasMore: boolean;
  nextOffset: number;
}

// Infinite query hooks
export const useGalleriesInfinite = (limit: number = 12) => {
  return useInfiniteQuery({
    queryKey: ["galleries", "infinite"],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const data = await getGalleriesPaginated({
        data: { limit, offset: pageParam },
      });
      return {
        data,
        hasMore: data.length === limit,
        nextOffset: pageParam + limit,
      } as InfiniteGalleryResponse;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: InfiniteGalleryResponse) => {
      return lastPage.hasMore ? lastPage.nextOffset : undefined;
    },
  });
};

export const useGalleriesByAlbumInfinite = (
  albumId: string,
  limit: number = 12
) => {
  return useInfiniteQuery({
    queryKey: ["galleries", "album", albumId, "infinite"],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const data = await getGalleriesByAlbum({ data: albumId });
      // For album filtering, we slice the results for pagination
      const startIndex = pageParam;
      const endIndex = startIndex + limit;
      const paginatedData = data.slice(startIndex, endIndex);

      return {
        data: paginatedData,
        hasMore: endIndex < data.length,
        nextOffset: endIndex,
      } as unknown as InfiniteGalleryResponse;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: InfiniteGalleryResponse) => {
      return lastPage.hasMore ? lastPage.nextOffset : undefined;
    },
    enabled: !!albumId,
  });
};
