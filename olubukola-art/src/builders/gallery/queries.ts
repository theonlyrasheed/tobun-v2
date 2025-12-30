export const GALLERY_QUERIES = {
  ALL_GALLERIES: `*[_type == "gallery"] | order(_createdAt desc) {
    _id,
    _type,
    title,
    slug,
    excerpt,
    description,
    availability,
    featured,
    created_at,
    size,
    price,
    album->{
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
    },
    more_images[] {
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

  FEATURED_GALLERIES: `*[_type == "gallery" && featured == true] | order(_createdAt desc) {
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
  }`,

  GALLERY_BY_SLUG: `*[_type == "gallery" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    excerpt,
    description,
    availability,
    featured,
    created_at,
    size,
    price,
    album->{
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
    },
    more_images[] {
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

  GALLERIES_BY_ALBUM: `*[_type == "gallery" && album._ref == $albumId] | order(_createdAt desc) {
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
};

export const CATEGORY_QUERIES = {
  ALL_GALLERY_ALBUMS: `*[_type == "gallery_album"] | order(title asc) {
    _id,
    _type,
    title,
    slug,
    featured
  }`,

  GALLERY_ALBUM_BY_SLUG: `*[_type == "gallery_album" && slug.current == $slug][0] {
    _id,
    _type,
    title,
    slug,
    featured
  }`,
};
