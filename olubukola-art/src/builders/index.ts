// Main Sanity API exports
export { sanityClient } from "./client";

// Artwork exports
export { GALLERY_QUERIES } from "./gallery/queries";
export { galleryApi, galleryAlbumApi } from "./gallery/api";
export * from "./gallery/hooks";

// Blog exports
export { BLOG_QUERIES } from "./blog/queries";
export { blogApi, authorApi, postCategoryApi } from "./blog/api";
export * from "./blog/hooks";

// Site exports
export { SITE_QUERIES } from "./site/queries";
export {
  serviceApi,
  testimonialApi,
  faqApi,
  eventApi,
  companyApi,
} from "./site/api";
export * from "./site/hooks";
