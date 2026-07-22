import { createServerFn } from "@tanstack/react-start";
import { galleryApi, galleryAlbumApi } from "./api";

// Gallery server functions
export const getAllGalleries = createServerFn({ method: "GET" }).handler(
  async () => {
    return await galleryApi.getAllGalleries();
  }
);

export const getFeaturedGalleries = createServerFn({ method: "GET" }).handler(
  async () => {
    return await galleryApi.getFeaturedGalleries();
  }
);

export const getGalleryBySlug = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    return (await galleryApi.getGalleryBySlug(slug)) as any;
  });

export const getGalleriesByAlbum = createServerFn({ method: "GET" })
  .inputValidator((albumId: string) => albumId)
  .handler(async ({ data: albumId }) => {
    return await galleryApi.getGalleriesByAlbum(albumId);
  });

export const getGalleriesByAlbumPaginated = createServerFn({ method: "GET" })
  .inputValidator(
    (params: { albumId: string; limit?: number; offset?: number }) => ({
      albumId: params.albumId,
      limit: params.limit || 12,
      offset: params.offset || 0,
    })
  )
  .handler(async ({ data: { albumId, limit, offset } }) => {
    return await galleryApi.getGalleriesByAlbumPaginated(
      albumId,
      limit,
      offset
    );
  });

export const getAvailableGalleries = createServerFn({ method: "GET" }).handler(
  async () => {
    return await galleryApi.getAvailableGalleries();
  }
);

export const getGalleriesPaginated = createServerFn({ method: "GET" })
  .inputValidator((params: { limit?: number; offset?: number } = {}) => ({
    limit: params.limit || 12,
    offset: params.offset || 0,
  }))
  .handler(async ({ data: { limit, offset } }) => {
    return await galleryApi.getGalleriesPaginated(limit, offset);
  });

// Gallery Album server functions
export const getAllGalleryAlbums = createServerFn({ method: "GET" }).handler(
  async () => {
    return await galleryAlbumApi.getAllGalleryAlbums();
  }
);

export const getGalleryAlbumBySlug = createServerFn({ method: "GET" })
  .inputValidator((slug: string) => slug)
  .handler(async ({ data: slug }) => {
    return await galleryAlbumApi.getGalleryAlbumBySlug(slug);
  });

export const getAlbumsWithCount = createServerFn({ method: "GET" }).handler(
  async () => {
    return await galleryAlbumApi.getAlbumsWithCount();
  }
);
