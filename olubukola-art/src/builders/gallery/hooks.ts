import {
  keepPreviousData,
  useQuery,
  useInfiniteQuery,
} from "@tanstack/react-query";
import { galleryApi, galleryAlbumApi } from "./api";
import type { Gallery } from "../client";

// Gallery hooks
export const useGalleries = () => {
  return useQuery({
    queryKey: ["galleries"],
    queryFn: galleryApi.getAllGalleries,
    placeholderData: keepPreviousData,
  });
};

// Backward compatibility
export const useArtworks = useGalleries;

export const useFeaturedGalleries = () => {
  return useQuery({
    queryKey: ["galleries", "featured"],
    queryFn: galleryApi.getFeaturedGalleries,
    placeholderData: keepPreviousData,
  });
};

// Backward compatibility
export const useFeaturedArtworks = useFeaturedGalleries;

export const useGallery = (slug: string) => {
  return useQuery({
    queryKey: ["gallery", slug],
    queryFn: () => galleryApi.getGalleryBySlug(slug),
    enabled: !!slug,
    placeholderData: keepPreviousData,
  });
};

// Backward compatibility
export const useArtwork = useGallery;

export const useGalleriesByAlbum = (albumId: string) => {
  return useQuery({
    queryKey: ["galleries", "album", albumId],
    queryFn: () => galleryApi.getGalleriesByAlbum(albumId),
    enabled: !!albumId,
    placeholderData: keepPreviousData,
  });
};

// Backward compatibility
export const useArtworksByCategory = useGalleriesByAlbum;

export const useAvailableGalleries = () => {
  return useQuery({
    queryKey: ["galleries", "available"],
    queryFn: galleryApi.getAvailableGalleries,
    placeholderData: keepPreviousData,
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
    queryFn: () => galleryApi.getGalleriesPaginated(limit, offset),
    placeholderData: keepPreviousData,
  });
};

// Backward compatibility
export const useArtworksPaginated = useGalleriesPaginated;

// Album hooks
export const useAlbums = () => {
  return useQuery({
    queryKey: ["albums"],
    queryFn: galleryAlbumApi.getAllGalleryAlbums,
    placeholderData: keepPreviousData,
  });
};

// Backward compatibility
export const useCategories = useAlbums;

export const useCategory = (slug: string) => {
  return useQuery({
    queryKey: ["category", slug],
    queryFn: () => galleryAlbumApi.getGalleryAlbumBySlug(slug),
    enabled: !!slug,
    placeholderData: keepPreviousData,
  });
};

export const useCategoriesWithCount = () => {
  return useQuery({
    queryKey: ["categories", "with-count"],
    queryFn: galleryAlbumApi.getAlbumsWithCount,
    placeholderData: keepPreviousData,
  });
};

// Types for infinite query responses
interface InfiniteGalleryResponse {
  data: Gallery[];
  hasMore: boolean;
  nextOffset: number;
}

// Infinite query hooks
export const useGalleriesInfinite = (limit: number = 12) => {
  return useInfiniteQuery({
    queryKey: ["galleries", "infinite"],
    queryFn: async ({ pageParam }: { pageParam: number }) => {
      const data = await galleryApi.getGalleriesPaginated(limit, pageParam);
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
      const data = await galleryApi.getGalleriesByAlbum(albumId);
      // For album filtering, we slice the results for pagination
      const startIndex = pageParam;
      const endIndex = startIndex + limit;
      const paginatedData = data.slice(startIndex, endIndex);

      return {
        data: paginatedData,
        hasMore: endIndex < data.length,
        nextOffset: endIndex,
      } as InfiniteGalleryResponse;
    },
    initialPageParam: 0,
    getNextPageParam: (lastPage: InfiniteGalleryResponse) => {
      return lastPage.hasMore ? lastPage.nextOffset : undefined;
    },
    enabled: !!albumId,
  });
};
