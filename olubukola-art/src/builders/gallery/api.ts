import { sanityClient } from "../client";
import {
  AlbumsWithCountQueryResult,
  AllGalleriesQueryResult,
  AllGalleryAlbumsQueryResult,
  AvailableGalleriesQueryResult,
  FeaturedGalleriesQueryResult,
  GalleriesByAlbumQueryResult,
  GalleryAlbumBySlugQueryResult,
  GalleryBySlugQueryResult,
} from "../sanity.types";
import {
  allGalleriesQuery,
  featuredGalleriesQuery,
  galleryBySlugQuery,
  galleriesByAlbumQuery,
  allGalleryAlbumsQuery,
  galleryAlbumBySlugQuery,
  availableGalleriesQuery,
  galleriesPaginatedQuery,
  albumsWithCountQuery,
} from "./queries";

export const galleryApi = {
  async getAllGalleries(): Promise<AllGalleriesQueryResult> {
    try {
      const galleries = await sanityClient.fetch(allGalleriesQuery);
      return galleries;
    } catch (error) {
      console.error("Error fetching all galleries:", error);
      throw new Error("Failed to fetch galleries");
    }
  },

  async getFeaturedGalleries(): Promise<FeaturedGalleriesQueryResult> {
    try {
      const galleries = await sanityClient.fetch(featuredGalleriesQuery);
      return galleries;
    } catch (error) {
      console.error("Error fetching featured galleries:", error);
      throw new Error("Failed to fetch featured galleries");
    }
  },

  async getGalleryBySlug(slug: string): Promise<GalleryBySlugQueryResult> {
    try {
      const gallery = await sanityClient.fetch(galleryBySlugQuery, {
        slug,
      });
      return gallery;
    } catch (error) {
      console.error("Error fetching gallery by slug:", error);
      throw new Error("Failed to fetch gallery");
    }
  },

  async getGalleriesByAlbum(
    albumId: string
  ): Promise<GalleriesByAlbumQueryResult> {
    try {
      const galleries = await sanityClient.fetch(galleriesByAlbumQuery, {
        albumId,
      });
      return galleries;
    } catch (error) {
      console.error("Error fetching galleries by album:", error);
      throw new Error("Failed to fetch galleries by album");
    }
  },

  async getAvailableGalleries(): Promise<AvailableGalleriesQueryResult> {
    try {
      const galleries = await sanityClient.fetch(availableGalleriesQuery);
      return galleries;
    } catch (error) {
      console.error("Error fetching available galleries:", error);
      throw new Error("Failed to fetch available galleries");
    }
  },

  async getGalleriesPaginated(
    limit: number = 12,
    offset: number = 0
  ): Promise<AllGalleriesQueryResult> {
    try {
      const galleries = await sanityClient.fetch(galleriesPaginatedQuery, {
        limit,
        offset,
      });
      return galleries;
    } catch (error) {
      console.error("Error fetching paginated galleries:", error);
      throw new Error("Failed to fetch galleries");
    }
  },
};

export const galleryAlbumApi = {
  async getAllGalleryAlbums(): Promise<AllGalleryAlbumsQueryResult> {
    try {
      const galleryAlbums = await sanityClient.fetch(allGalleryAlbumsQuery);
      return galleryAlbums;
    } catch (error) {
      console.error("Error fetching gallery albums:", error);
      throw new Error("Failed to fetch gallery albums");
    }
  },

  async getGalleryAlbumBySlug(
    slug: string
  ): Promise<GalleryAlbumBySlugQueryResult> {
    try {
      const galleryAlbum = await sanityClient.fetch(galleryAlbumBySlugQuery, {
        slug,
      });
      return galleryAlbum;
    } catch (error) {
      console.error("Error fetching gallery album by slug:", error);
      throw new Error("Failed to fetch gallery album");
    }
  },

  async getAlbumsWithCount(): Promise<AlbumsWithCountQueryResult> {
    try {
      const albums = await sanityClient.fetch(albumsWithCountQuery);
      return albums;
    } catch (error) {
      console.error("Error fetching albums with count:", error);
      throw new Error("Failed to fetch albums");
    }
  },
};
