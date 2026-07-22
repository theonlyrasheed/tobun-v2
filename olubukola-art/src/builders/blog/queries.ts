import { defineQuery } from "groq";

export const allPostsQuery =
  defineQuery(`*[_type == "post"] | order(_createdAt desc) {
  _id,
  _type,
  "title": coalesce(title, ""),
  "slug": coalesce(slug.current, ""),
  "excerpt": coalesce(excerpt, ""),
  "numberOfCharacters": length(pt::text(coalesce(body, []))),
  "wordCount": round(length(pt::text(coalesce(body, []))) / 5),
  "readingTime": select(
    round(length(pt::text(coalesce(body, []))) / 5 / 180) < 1 => 1,
    round(length(pt::text(coalesce(body, []))) / 5 / 180)
  ),
  _createdAt,
  _updatedAt,
  author->{
    _id,
    "name": coalesce(name, ""),
    "slug": coalesce(slug.current, ""),
    "bio": coalesce(bio, ""),
    image {
      "url": coalesce(asset->url, null),
      "alt": coalesce(alt, "")
    }
  },
  "categories": coalesce(
    categories[]->{
      _id,
      "title": coalesce(title, ""),
      "slug": coalesce(slug.current, "")
    },
    []
  ),
  main_image {
    "url": coalesce(asset->url, null),
    "alt": coalesce(alt, "")
  }
}`);

export const postsPaginatedQuery =
  defineQuery(`*[_type == "post"] | order(_createdAt desc) [$offset...$offset + $limit] {
  _id,
  _type,
  "title": coalesce(title, ""),
  "slug": coalesce(slug.current, ""),
  "excerpt": coalesce(excerpt, ""),
  "numberOfCharacters": length(pt::text(coalesce(body, []))),
  "wordCount": round(length(pt::text(coalesce(body, []))) / 5),
  "readingTime": select(
    round(length(pt::text(coalesce(body, []))) / 5 / 180) < 1 => 1,
    round(length(pt::text(coalesce(body, []))) / 5 / 180)
  ),
  _createdAt,
  _updatedAt,
  author->{
    _id,
    "name": coalesce(name, ""),
    "slug": coalesce(slug.current, ""),
    "bio": coalesce(bio, ""),
    image {
      "url": coalesce(asset->url, null),
      "alt": coalesce(alt, "")
    }
  },
  "categories": coalesce(
    categories[]->{
      _id,
      "title": coalesce(title, ""),
      "slug": coalesce(slug.current, "")
    },
    []
  ),
  main_image {
    "url": coalesce(asset->url, null),
    "alt": coalesce(alt, "")
  }
}`);

export const postsByYearPaginatedQuery =
  defineQuery(`*[_type == "post" && _createdAt >= $yearStart && _createdAt < $yearEnd] | order(_createdAt desc) [$offset...$offset + $limit] {
  _id,
  _type,
  "title": coalesce(title, ""),
  "slug": coalesce(slug.current, ""),
  "excerpt": coalesce(excerpt, ""),
  "numberOfCharacters": length(pt::text(coalesce(body, []))),
  "wordCount": round(length(pt::text(coalesce(body, []))) / 5),
  "readingTime": select(
    round(length(pt::text(coalesce(body, []))) / 5 / 180) < 1 => 1,
    round(length(pt::text(coalesce(body, []))) / 5 / 180)
  ),
  _createdAt,
  _updatedAt,
  author->{
    _id,
    "name": coalesce(name, ""),
    "slug": coalesce(slug.current, ""),
    "bio": coalesce(bio, ""),
    image {
      "url": coalesce(asset->url, null),
      "alt": coalesce(alt, "")
    }
  },
  "categories": coalesce(
    categories[]->{
      _id,
      "title": coalesce(title, ""),
      "slug": coalesce(slug.current, "")
    },
    []
  ),
  main_image {
    "url": coalesce(asset->url, null),
    "alt": coalesce(alt, "")
  }
}`);

export const postBySlugQuery =
  defineQuery(`*[_type == "post" && slug.current == $slug][0] {
  _id,
  _type,
  "title": coalesce(title, ""),
  "slug": coalesce(slug.current, ""),
  "excerpt": coalesce(excerpt, ""),
  "body": coalesce(body, []),
  "numberOfCharacters": length(pt::text(coalesce(body, []))),
  "wordCount": round(length(pt::text(coalesce(body, []))) / 5),
  "readingTime": select(
    round(length(pt::text(coalesce(body, []))) / 5 / 180) < 1 => 1,
    round(length(pt::text(coalesce(body, []))) / 5 / 180)
  ),
  _createdAt,
  _updatedAt,
  author->{
    _id,
    "name": coalesce(name, ""),
    "slug": coalesce(slug.current, ""),
    "bio": coalesce(bio, ""),
    image {
      "url": coalesce(asset->url, null),
      "alt": coalesce(alt, "")
    }
  },
  "categories": coalesce(
    categories[]->{
      _id,
      "title": coalesce(title, ""),
      "slug": coalesce(slug.current, "")
    },
    []
  ),
  main_image {
    "url": coalesce(asset->url, null),
    "alt": coalesce(alt, "")
  }
}`);

export const allPostCategoriesQuery =
  defineQuery(`*[_type == "post_category"] | order(title asc) {
  _id,
  _type,
  "title": coalesce(title, ""),
  "description": coalesce(description, "")
}`);

export const postCategoryBySlugQuery =
  defineQuery(`*[_type == "post_category" && slug.current == $slug][0] {
  _id,
  _type,
  "title": coalesce(title, ""),
  "description": coalesce(description, "")
}`);

export const allAuthorsQuery =
  defineQuery(`*[_type == "author"] | order(name asc) {
  _id,
  _type,
  "name": coalesce(name, ""),
  "slug": coalesce(slug.current, ""),
  "bio": coalesce(bio, ""),
  image {
    "url": coalesce(asset->url, null),
    "alt": coalesce(alt, "")
  }
}`);

export const authorBySlugQuery =
  defineQuery(`*[_type == "author" && slug.current == $slug][0] {
  _id,
  _type,
  "name": coalesce(name, ""),
  "slug": coalesce(slug.current, ""),
  "bio": coalesce(bio, ""),
  image {
    "url": coalesce(asset->url, null),
    "alt": coalesce(alt, "")
  }
  }`);

export const recentPostsQuery =
  defineQuery(`*[_type == "post"] | order(_createdAt desc) [0...$limit] {
  _id,
  _type,
  "title": coalesce(title, ""),
  "slug": coalesce(slug.current, ""),
  "excerpt": coalesce(excerpt, ""),
  "numberOfCharacters": length(pt::text(coalesce(body, []))),
  "wordCount": round(length(pt::text(coalesce(body, []))) / 5),
  "readingTime": select(
    round(length(pt::text(coalesce(body, []))) / 5 / 180) < 1 => 1,
    round(length(pt::text(coalesce(body, []))) / 5 / 180)
  ),
  _createdAt,
  author->{
    _id,
    "name": coalesce(name, ""),
    "slug": coalesce(slug.current, ""),
    image {
      "url": coalesce(asset->url, null),
      "alt": coalesce(alt, "")
    }
  },
  "categories": coalesce(
    categories[]->{
      _id,
      "title": coalesce(title, ""),
      "slug": coalesce(slug.current, "")
    },
    []
  ),
  main_image {
    "url": coalesce(asset->url, null),
    "alt": coalesce(alt, "")
  }
}`);

export const postsByCategoryQuery =
  defineQuery(`*[_type == "post" && $categoryId in categories[]._ref] | order(_createdAt desc) {
  _id,
  _type,
  "title": coalesce(title, ""),
  "slug": coalesce(slug.current, ""),
  "excerpt": coalesce(excerpt, ""),
  "numberOfCharacters": length(pt::text(coalesce(body, []))),
  "wordCount": round(length(pt::text(coalesce(body, []))) / 5),
  "readingTime": select(
    round(length(pt::text(coalesce(body, []))) / 5 / 180) < 1 => 1,
    round(length(pt::text(coalesce(body, []))) / 5 / 180)
  ),
  _createdAt,
  author->{
    _id,
    "name": coalesce(name, ""),
    "slug": coalesce(slug.current, ""),
    image {
      "url": coalesce(asset->url, null),
      "alt": coalesce(alt, "")
    }
  },
  "categories": coalesce(
    categories[]->{
      _id,
      "title": coalesce(title, ""),
      "slug": coalesce(slug.current, "")
    },
    []
  ),
  main_image {
    "url": coalesce(asset->url, null),
    "alt": coalesce(alt, "")
  }
}`);

export const postsByAuthorQuery =
  defineQuery(`*[_type == "post" && author._ref == $authorId] | order(_createdAt desc) {
  _id,
  _type,
  "title": coalesce(title, ""),
  "slug": coalesce(slug.current, ""),
  "excerpt": coalesce(excerpt, ""),
  "numberOfCharacters": length(pt::text(coalesce(body, []))),
  "wordCount": round(length(pt::text(coalesce(body, []))) / 5),
  "readingTime": select(
    round(length(pt::text(coalesce(body, []))) / 5 / 180) < 1 => 1,
    round(length(pt::text(coalesce(body, []))) / 5 / 180)
  ),
  _createdAt,
  author->{
    _id,
    "name": coalesce(name, ""),
    "slug": coalesce(slug.current, ""),
    image {
      "url": coalesce(asset->url, null),
      "alt": coalesce(alt, "")
    }
  },
  "categories": coalesce(
    categories[]->{
      _id,
      "title": coalesce(title, ""),
      "slug": coalesce(slug.current, "")
    },
    []
  ),
  main_image {
    "url": coalesce(asset->url, null),
    "alt": coalesce(alt, "")
  }
}`);
