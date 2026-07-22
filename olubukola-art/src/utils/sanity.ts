import { createImageUrlBuilder } from "@sanity/image-url";
import { sanityClient } from "@/builders/client";

const builder = createImageUrlBuilder(sanityClient);

/**
 * Build a Sanity image URL with optional transformations
 * @param source - The Sanity image source (asset or reference)
 * @param options - Image transformation options (reserved for future use)
 * @returns The built image URL
 */
export function urlFor(source: any, options?: any) {
  let imageBuilder = builder.image(source);

  // Apply any options if provided in the future
  if (options) {
    // Future: apply transformation options here
  }

  return imageBuilder.url();
}

/**
 * Get an image URL with specific width
 * @param source - The Sanity image source
 * @param width - Desired width in pixels
 * @returns The transformed image URL
 */
export function urlForWidth(source: any, width: number) {
  return builder.image(source).width(width).url();
}

/**
 * Get an image URL with specific dimensions
 * @param source - The Sanity image source
 * @param width - Desired width in pixels
 * @param height - Desired height in pixels
 * @returns The transformed image URL
 */
export function urlForDimensions(source: any, width: number, height: number) {
  return builder.image(source).width(width).height(height).url();
}

/**
 * Get a cropped image URL
 * @param source - The Sanity image source
 * @param width - Desired width in pixels
 * @param height - Desired height in pixels
 * @param options - Additional crop options (reserved for future use)
 * @returns The cropped image URL
 */
export function urlForCrop(
  source: any,
  width: number,
  height: number,
  options: any = {}
) {
  let imageBuilder = builder
    .image(source)
    .width(width)
    .height(height)
    .fit("crop");

  // Apply any additional options if provided in the future
  if (options) {
    // Future: apply additional crop/transformation options here
  }

  return imageBuilder.url();
}

/**
 * Resize an already-resolved Sanity CDN image URL (e.g. from a GROQ
 * `asset->url` projection) using the same query-param image API that
 * powers `urlFor`. Use this whenever a query returns a raw asset URL
 * string instead of the full image reference, so thumbnails/grids don't
 * ship full-resolution originals to the browser.
 * @param url - The raw https://cdn.sanity.io/... asset URL
 * @param options - width/height in pixels and jpeg/webp quality (1-100)
 */
export function optimizeImageUrl(
  url: string | null | undefined,
  options: { width?: number; height?: number; quality?: number } = {}
) {
  if (!url) return url ?? undefined;

  try {
    const { width, height, quality = 75 } = options;
    const parsed = new URL(url);

    if (width) parsed.searchParams.set("w", String(Math.round(width)));
    if (height) parsed.searchParams.set("h", String(Math.round(height)));
    parsed.searchParams.set("fit", "max");
    parsed.searchParams.set("auto", "format");
    parsed.searchParams.set("q", String(quality));

    return parsed.toString();
  } catch {
    // Not a valid absolute URL (e.g. a placeholder src) — leave untouched
    return url;
  }
}
