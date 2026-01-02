// Main Sanity API exports
export { sanityClient } from "./client";

// Artwork exports
export { galleryApi, galleryAlbumApi } from "./gallery/api";
export * from "./gallery/hooks";

// Blog exports
export { blogApi, authorApi, postCategoryApi } from "./blog/api";
export * from "./blog/hooks";

// Site exports
export {
  serviceApi,
  testimonialApi,
  faqApi,
  eventApi,
  companyApi,
} from "./site/api";
export * from "./site/hooks";
