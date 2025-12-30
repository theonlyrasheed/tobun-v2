import { useQuery } from "@tanstack/react-query";
import { galleryApi, galleryAlbumApi } from "./api";

// Gallery hooks
export const useGalleries = () => {
  return useQuery({
    queryKey: ["galleries"],
    queryFn: galleryApi.getAllGalleries,
  });
};

// Backward compatibility
export const useArtworks = useGalleries;

export const useFeaturedGalleries = () => {
  return useQuery({
    queryKey: ["galleries", "featured"],
    queryFn: galleryApi.getFeaturedGalleries,
  });
};

// Backward compatibility
export const useFeaturedArtworks = useFeaturedGalleries;

export const useGallery = (slug: string) => {
  return useQuery({
    queryKey: ["gallery", slug],
    queryFn: () => galleryApi.getGalleryBySlug(slug),
    enabled: !!slug,
  });
};

// Backward compatibility
export const useArtwork = useGallery;

export const useGalleriesByAlbum = (albumId: string) => {
  return useQuery({
    queryKey: ["galleries", "album", albumId],
    queryFn: () => galleryApi.getGalleriesByAlbum(albumId),
    enabled: !!albumId,
  });
};

// Backward compatibility
export const useArtworksByCategory = useGalleriesByAlbum;

export const useAvailableGalleries = () => {
  return useQuery({
    queryKey: ["galleries", "available"],
    queryFn: galleryApi.getAvailableGalleries,
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
  });
};

// Backward compatibility
export const useArtworksPaginated = useGalleriesPaginated;

// Album hooks
export const useAlbums = () => {
  return useQuery({
    queryKey: ["albums"],
    queryFn: galleryAlbumApi.getAllGalleryAlbums,
  });
};

// Backward compatibility
export const useCategories = useAlbums;

export const useCategory = (slug: string) => {
  return useQuery({
    queryKey: ["category", slug],
    queryFn: () => galleryAlbumApi.getGalleryAlbumBySlug(slug),
    enabled: !!slug,
  });
};

export const useCategoriesWithCount = () => {
  return useQuery({
    queryKey: ["categories", "with-count"],
    queryFn: galleryAlbumApi.getAlbumsWithCount,
  });
};
