import { type Gallery, type Gallery_album, sanityClient } from "../client";
import { GALLERY_QUERIES, CATEGORY_QUERIES } from "./queries";

export const galleryApi = {
  async getAllGalleries(): Promise<Gallery[]> {
    try {
      const galleries = await sanityClient.fetch(GALLERY_QUERIES.ALL_GALLERIES);
      return galleries;
    } catch (error) {
      console.error("Error fetching all galleries:", error);
      throw new Error("Failed to fetch galleries");
    }
  },

  async getFeaturedGalleries(): Promise<Gallery[]> {
    try {
      const galleries = await sanityClient.fetch(
        GALLERY_QUERIES.FEATURED_GALLERIES
      );
      return galleries;
    } catch (error) {
      console.error("Error fetching featured galleries:", error);
      throw new Error("Failed to fetch featured galleries");
    }
  },

  /**
   * Get artwork by slug
   */
  async getGalleryBySlug(slug: string): Promise<Gallery | null> {
    try {
      const gallery = await sanityClient.fetch(
        GALLERY_QUERIES.GALLERY_BY_SLUG,
        { slug }
      );
      return gallery;
    } catch (error) {
      console.error("Error fetching gallery by slug:", error);
      throw new Error("Failed to fetch gallery");
    }
  },

  /**
   * Get artworks by category
   */
  async getGalleriesByAlbum(albumId: string): Promise<Gallery[]> {
    try {
      const galleries = await sanityClient.fetch(
        GALLERY_QUERIES.GALLERIES_BY_ALBUM,
        { albumId }
      );
      return galleries;
    } catch (error) {
      console.error("Error fetching galleries by album:", error);
      throw new Error("Failed to fetch galleries by album");
    }
  },

  /**
   * Get available artworks (not sold)
   */
  async getAvailableGalleries(): Promise<Gallery[]> {
    try {
      const galleries = await sanityClient.fetch(
        `*[_type == "gallery" && availability == "available"] | order(_createdAt desc) {
          _id,
          _type,
          title,
          slug,
          excerpt,
          availability,
          featured,
          created_at,
          size,
          price,
          album->{
            _id,
            title,
            slug,
            featured
          },
          main_image {
            asset->{
              _id,
              url,
              metadata {
                dimensions,
                lqip
              }
            },
            alt,
            hotspot,
            crop
          }
        }`
      );
      return galleries;
    } catch (error) {
      console.error("Error fetching available galleries:", error);
      throw new Error("Failed to fetch available galleries");
    }
  },

  /**
   * Get artworks with pagination
   */
  async getGalleriesPaginated(
    limit: number = 12,
    offset: number = 0
  ): Promise<Gallery[]> {
    try {
      const galleries = await sanityClient.fetch(
        `*[_type == "gallery"] | order(_createdAt desc) [${offset}...${offset + limit}] {
          _id,
          _type,
          title,
          slug,
          excerpt,
          availability,
          featured,
          created_at,
          size,
          price,
          album->{
            _id,
            title,
            slug,
            featured
          },
          main_image {
            asset->{
              _id,
              url,
              metadata {
                dimensions,
                lqip
              }
            },
            alt,
            hotspot,
            crop
          }
        }`
      );
      return galleries;
    } catch (error) {
      console.error("Error fetching paginated galleries:", error);
      throw new Error("Failed to fetch galleries");
    }
  },
};

export const galleryAlbumApi = {
  /**
   * Get all artwork categories
   */
  async getAllGalleryAlbums(): Promise<Gallery_album[]> {
    try {
      const galleryAlbums = await sanityClient.fetch(
        CATEGORY_QUERIES.ALL_GALLERY_ALBUMS
      );
      return galleryAlbums;
    } catch (error) {
      console.error("Error fetching gallery albums:", error);
      throw new Error("Failed to fetch gallery albums");
    }
  },

  /**
   * Get category by slug
   */
  async getGalleryAlbumBySlug(slug: string): Promise<Gallery_album | null> {
    try {
      const galleryAlbum = await sanityClient.fetch(
        CATEGORY_QUERIES.GALLERY_ALBUM_BY_SLUG,
        { slug }
      );
      return galleryAlbum;
    } catch (error) {
      console.error("Error fetching gallery album by slug:", error);
      throw new Error("Failed to fetch gallery album");
    }
  },

  /**
   * Get category with artwork count
   */
  async getAlbumsWithCount(): Promise<
    (Gallery_album & { galleryCount: number })[]
  > {
    try {
      const albums = await sanityClient.fetch(
        `*[_type == "gallery_album"] | order(title asc) {
          _id,
          _type,
          title,
          slug,
          "galleryCount": count(*[_type == "gallery" && references(^._id)])
        }`
      );
      return albums;
    } catch (error) {
      console.error("Error fetching albums with count:", error);
      throw new Error("Failed to fetch albums");
    }
  },
};
