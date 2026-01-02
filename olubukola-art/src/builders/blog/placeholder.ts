import { faker } from "@faker-js/faker";
import type {
  AllPostsQueryResult,
  AllAuthorsQueryResult,
  AllPostCategoriesQueryResult,
} from "../sanity.types";

// Generate placeholder blog posts
export const generateBlogPosts = (count: number = 12): AllPostsQueryResult => {
  return Array.from({ length: count }, (_, i) => ({
    _id: `post-${i + 1}`,
    _type: "post",
    _createdAt: faker.date.recent({ days: 365 }).toISOString(),
    _updatedAt: faker.date.recent({ days: 30 }).toISOString(),
    title: faker.lorem.words({ min: 3, max: 8 }),
    slug: faker.helpers.slugify(faker.lorem.words({ min: 2, max: 5 })),
    excerpt: faker.lorem.sentences({ min: 1, max: 2 }),
    author: {
      _id: `author-${faker.number.int({ min: 1, max: 5 })}`,
      name: faker.person.fullName(),
      slug: faker.helpers.slugify(faker.person.fullName()),
      bio: [
        {
          children: [
            {
              marks: [],
              text: faker.lorem.sentences({ min: 2, max: 4 }),
              _type: "span",
              _key: faker.string.uuid(),
            },
          ],
          style: "normal",
          listItem: undefined,
          markDefs: [],
          level: undefined,
          _type: "block",
          _key: faker.string.uuid(),
        },
      ],
      image: {
        url: `https://via.placeholder.com/400x400?text=Author+${i + 1}`,
        alt: "",
      },
    },
    categories: Array.from(
      { length: faker.number.int({ min: 1, max: 3 }) },
      (_) => ({
        _id: `category-${faker.number.int({ min: 1, max: 8 })}`,
        title: faker.lorem.words({ min: 1, max: 3 }),
        slug: faker.helpers.slugify(faker.lorem.words({ min: 1, max: 3 })),
      })
    ),
    main_image: {
      url: `https://via.placeholder.com/800x600?text=Post+Image+${i + 1}`,
      alt: faker.lorem.words({ min: 2, max: 5 }),
    },
  }));
};

// Generate placeholder authors
export const generateAuthors = (count: number = 8): AllAuthorsQueryResult => {
  return Array.from({ length: count }, (_, i) => ({
    _id: `author-${i + 1}`,
    _type: "author",
    name: faker.person.fullName(),
    slug: faker.helpers.slugify(faker.person.fullName()),
    bio: [
      {
        children: [
          {
            marks: [],
            text: faker.lorem.sentences({ min: 2, max: 4 }),
            _type: "span",
            _key: faker.string.uuid(),
          },
        ],
        style: "normal",
        listItem: undefined,
        markDefs: [],
        level: undefined,
        _type: "block",
        _key: faker.string.uuid(),
      },
    ],
    image: {
      url: `https://via.placeholder.com/400x400?text=Author+${i + 1}`,
      alt: "",
    },
  }));
};

// Generate placeholder categories
export const generatePostCategories = (
  count: number = 10
): AllPostCategoriesQueryResult => {
  const categoryNames = [
    "Art Techniques",
    "Exhibitions",
    "Artist Spotlight",
    "Creative Process",
    "Art Education",
    "Contemporary Art",
    "Traditional Arts",
    "Digital Art",
    "Sculpture",
    "Painting",
    "Mixed Media",
    "Art History",
  ];

  return Array.from({ length: count }, (_, i) => ({
    _id: `category-${i + 1}`,
    _type: "post_category",
    title: categoryNames[i] || faker.lorem.words({ min: 1, max: 3 }),
    description: faker.lorem.sentences({ min: 1, max: 2 }),
  }));
};

// Pre-generated placeholder data
export const blogPosts = generateBlogPosts(12);
export const authors = generateAuthors(8);
export const postCategories = generatePostCategories(10);
