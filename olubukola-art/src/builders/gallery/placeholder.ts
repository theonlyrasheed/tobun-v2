import { faker } from "@faker-js/faker";
import type {
  AllGalleriesQueryResult,
  AllGalleryAlbumsQueryResult,
  AlbumsWithCountQueryResult,
} from "../sanity.types";

// Generate placeholder galleries
export const generateGalleries = (
  count: number = 24
): AllGalleriesQueryResult => {
  const artTitles = Array.from({ length: count }, (_) =>
    faker.lorem.words({ min: 2, max: 4 })
  );

  return Array.from({ length: count }, (_, i) => ({
    _id: `gallery-${i + 1}`,
    _type: "gallery",
    title:
      artTitles[i % artTitles.length] || faker.lorem.words({ min: 2, max: 4 }),
    slug: faker.helpers.slugify(
      artTitles[i % artTitles.length] || faker.lorem.words({ min: 2, max: 4 })
    ),
    excerpt: faker.lorem.sentences({ min: 1, max: 2 }),
    availability: faker.helpers.arrayElement([
      "available",
      "sold",
      "not_for_sale",
    ] as const),
    featured: faker.datatype.boolean(0.3) ? true : null,
    created_at: faker.date.past({ years: 2 }).toISOString(),
    size: {
      height: faker.number.int({ min: 20, max: 200 }),
      width: faker.number.int({ min: 20, max: 150 }),
      dept: faker.number.int({ min: 1, max: 10 }),
      notes: faker.lorem.words({ min: 1, max: 3 }),
    },
    price: {
      currency: faker.helpers.arrayElement([
        "NGN",
        "USD",
        "GBP",
        "EUR",
      ] as const),
      amount: faker.number.int({ min: 1000, max: 100000 }),
    },
    album: {
      _id: `album-${faker.number.int({ min: 1, max: 8 })}`,
      title: faker.lorem.words({ min: 2, max: 4 }),
      slug: faker.helpers.slugify(faker.lorem.words({ min: 2, max: 4 })),
    },
    main_image: {
      url: `https://via.placeholder.com/800x600?text=Gallery+${i + 1}`,
      alt: faker.lorem.words({ min: 2, max: 5 }),
    },
    more_images: Array.from(
      { length: faker.number.int({ min: 0, max: 3 }) },
      (_, j) => ({
        url: `https://via.placeholder.com/400x300?text=Gallery+${i + 1}+Image+${j + 1}`,
        alt: faker.lorem.words({ min: 1, max: 3 }),
      })
    ),
  }));
};

// Generate placeholder gallery albums
export const generateGalleryAlbums = (
  count: number = 8
): AllGalleryAlbumsQueryResult => {
  const albumTitles = Array.from({ length: count }, (_) =>
    faker.lorem.words({ min: 2, max: 4 })
  );

  return Array.from({ length: count }, (_, i) => ({
    _id: `album-${i + 1}`,
    _type: "gallery_album",
    title: albumTitles[i] || faker.lorem.words({ min: 2, max: 4 }),
    slug: faker.helpers.slugify(
      albumTitles[i] || faker.lorem.words({ min: 2, max: 4 })
    ),
    featured: faker.datatype.boolean(0.3),
  }));
};

// Generate albums with gallery count (for categories with count)
export const generateAlbumsWithCount = (
  count: number = 8
): AlbumsWithCountQueryResult => {
  return generateGalleryAlbums(count).map((album) => ({
    ...album,
    galleryCount: faker.number.int({ min: 1, max: 15 }),
  }));
};

// Pre-generated placeholder data
export const galleries = generateGalleries(24);
export const galleryAlbums = generateGalleryAlbums(8);
export const albumsWithCount = generateAlbumsWithCount(8);
