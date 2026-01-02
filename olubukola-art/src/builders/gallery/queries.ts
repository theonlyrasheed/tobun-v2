import { defineQuery } from "groq";

export const allGalleriesQuery =
  defineQuery(`*[_type == "gallery"] | order(_createdAt desc)[0...10] {
  _id,
  _type,
  "title": coalesce(title, ""),
  "slug": coalesce(slug.current, ""),
  "excerpt": coalesce(excerpt, ""),
  "availability": coalesce(availability, ""),
  featured,
  created_at,
  size {
  "height": coalesce(heightCm, 0),
  "width": coalesce(widthCm, 0),
  "dept": coalesce(depthCm, 0),
  "notes": coalesce(notes, "")
  },
  price {
  "currency": coalesce(currency, "NGN"),
  "amount": coalesce(amount, 0)
  },
  album->{
    _id,
    "title": coalesce(title, ""),
    "slug": coalesce(slug.current, "")
  },
  main_image {
    "url": coalesce(asset->url, null),
    "alt": coalesce(alt, "")
  },
  "more_images": coalesce(
    more_images[] {
      "url": coalesce(asset->url, null),
      "alt": coalesce(alt, "")
    },
    []
  )
}`);

export const featuredGalleriesQuery =
  defineQuery(`*[_type == "gallery" && featured == true] | order(_createdAt desc) {
  _id,
  _type,
  "title": coalesce(title, ""),
  "slug": coalesce(slug.current, ""),
  "excerpt": coalesce(excerpt, ""),
  "availability": coalesce(availability, ""),
  "featured": coalesce(featured, false),
  created_at,
  size {
  "height": coalesce(heightCm, 0),
  "width": coalesce(widthCm, 0),
  "dept": coalesce(depthCm, 0),
  "notes": coalesce(notes, "")
  },
  price {
  "currency": coalesce(currency, "NGN"),
  "amount": coalesce(amount, 0)
  },
  album->{
    _id,
    "title": coalesce(title, ""),
    "slug": coalesce(slug.current, ""),
    "featured": coalesce(featured, false)
  },
  main_image {
    "url": coalesce(asset->url, null),
    "alt": coalesce(alt, "")
  }
}`);

export const galleryBySlugQuery =
  defineQuery(`*[_type == "gallery" && slug.current == $slug][0] {
  _id,
  _type,
  "title": coalesce(title, ""),
  "slug": coalesce(slug.current, ""),
  "excerpt": coalesce(excerpt, ""),
  "description": coalesce(description, ""),
  "availability": coalesce(availability, ""),
  "featured": coalesce(featured, false),
  created_at,
  "size": coalesce(size, ""),
  "price": coalesce(price, 0),
  album->{
    _id,
    "title": coalesce(title, ""),
    "slug": coalesce(slug.current, "")
  },
  main_image {
    "url": coalesce(asset->url, null),
    "alt": coalesce(alt, "")
  }
}`);

export const galleriesByAlbumQuery =
  defineQuery(`*[_type == "gallery" && album._ref == $albumId] | order(_createdAt desc) {
  _id,
  _type,
  "title": coalesce(title, ""),
  "slug": coalesce(slug.current, ""),
  "excerpt": coalesce(excerpt, ""),
  "availability": coalesce(availability, ""),
  "featured": coalesce(featured, false),
  created_at,
  "size": coalesce(size, ""),
  "price": coalesce(price, 0),
  album->{
    _id,
    "title": coalesce(title, ""),
    "slug": coalesce(slug.current, "")
  },
  main_image {
    "url": coalesce(asset->url, null),
    "alt": coalesce(alt, "")
  }
}`);

export const allGalleryAlbumsQuery =
  defineQuery(`*[_type == "gallery_album"] | order(title asc) {
  _id,
  _type,
  "title": coalesce(title, ""),
  "slug": coalesce(slug.current, ""),
  "featured": coalesce(featured, false)
}`);

export const galleryAlbumBySlugQuery =
  defineQuery(`*[_type == "gallery_album" && slug.current == $slug][0] {
  _id,
  _type,
  "title": coalesce(title, ""),
  "slug": coalesce(slug.current, ""),
  "featured": coalesce(featured, false)
}`);

export const availableGalleriesQuery =
  defineQuery(`*[_type == "gallery" && availability == "available"] | order(_createdAt desc) {
  _id,
  _type,
  "title": coalesce(title, ""),
  "slug": coalesce(slug.current, ""),
  "excerpt": coalesce(excerpt, ""),
  "availability": coalesce(availability, ""),
  "featured": coalesce(featured, false),
  created_at,
  "size": coalesce(size, ""),
  "price": coalesce(price, 0),
  album->{
    _id,
    "title": coalesce(title, ""),
    "slug": coalesce(slug.current, ""),
    "featured": coalesce(featured, false)
  },
  main_image {
    "url": coalesce(asset->url, null),
    "alt": coalesce(alt, "")
  }
}`);

export const galleriesPaginatedQuery =
  defineQuery(`*[_type == "gallery"] | order(_createdAt desc) [$offset...$offset + $limit] {
  _id,
  _type,
  "title": coalesce(title, ""),
  "slug": coalesce(slug.current, ""),
  "excerpt": coalesce(excerpt, ""),
  "availability": coalesce(availability, ""),
  "featured": coalesce(featured, false),
  created_at,
  "size": coalesce(size, ""),
  "price": coalesce(price, 0),
  album->{
    _id,
    "title": coalesce(title, ""),
    "slug": coalesce(slug.current, ""),
    "featured": coalesce(featured, false)
  },
  main_image {
    "url": coalesce(asset->url, null),
    "alt": coalesce(alt, "")
  }
}`);

export const albumsWithCountQuery =
  defineQuery(`*[_type == "gallery_album"] | order(title asc) {
  _id,
  _type,
  "title": coalesce(title, ""),
  "slug": coalesce(slug.current, ""),
  "featured": coalesce(featured, false),
  "galleryCount": count(*[_type == "gallery" && references(^._id)])
}`);
