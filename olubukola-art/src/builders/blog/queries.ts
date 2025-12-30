export const BLOG_QUERIES = {
  ALL_POSTS: `*[_type == "post"] | order(_createdAt desc) {
    _id,
    _type,
    title,
    slug,
    excerpt,
    _createdAt,
    _updatedAt,
    author->{
      _id,
      name,
      slug,
      bio,
      image {
        asset->{
          _id,
          url
        }
      }
    },
    categories[]->{
      _id,
      title,
      slug
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
  }`,

  POST_BY_SLUG: `*[_type == "post" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    excerpt,
    body,
    _createdAt,
    _updatedAt,
    author->{
      _id,
      name,
      slug,
      bio,
      image {
        asset->{
          _id,
          url
        }
      }
    },
    categories[]->{
      _id,
      title,
      slug
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
  }`,

  ALL_POST_CATEGORIES: `*[_type == "post_category"] | order(title asc) {
    _id,
    _type,
    title,
    description
  }`,

  POST_CATEGORY_BY_SLUG: `*[_type == "post_category" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    description
  }`,

  ALL_AUTHORS: `*[_type == "author"] | order(name asc) {
    _id,
    _type,
    name,
    slug,
    bio,
    image {
      asset->{
        _id,
        url
      }
    }
  }`,

  AUTHOR_BY_SLUG: `*[_type == "author" && slug.current == $slug][0] {
    _id,
    _type,
    name,
    slug,
    bio,
    image {
      asset->{
        _id,
        url
      }
    }
  }`,
};
