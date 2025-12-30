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
