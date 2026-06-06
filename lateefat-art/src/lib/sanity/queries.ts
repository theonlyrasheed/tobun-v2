/* ── FAQs ─────────────────────────────────────────────────────── */
export const faqsQuery = `
  *[_type == "faq"] | order(order asc) {
    question, answer, order
  }
`

/* ── Testimonials ─────────────────────────────────────────────── */
export const testimonialsQuery = `
  *[_type == "testimonial" && featured == true] | order(order asc) {
    name, title, avatar, quote, rating
  }
`

/* ── Services ─────────────────────────────────────────────────── */
export const servicesQuery = `
  *[_type == "service"] | order(order asc) {
    title, description, tags, order
  }
`

/* ── Events ───────────────────────────────────────────────────── */
export const eventsQuery = `
  *[_type == "event"] | order(order asc) {
    yr, date, title, desc, badge, image, href, location
  }
`

/* ── Exhibitions ──────────────────────────────────────────────── */
export const exhibitionsQuery = `
  *[_type == "exhibition"] | order(order asc) {
    year, name, place, desc, date, time, location, categories,
    kicker, image, paragraphs, gallery, ctaLabel, ctaHref
  }
`

/* ── Gallery ──────────────────────────────────────────────────── */
export const galleryQuery = `
  *[_type == "gallery"] {
    ...,
    "album": album->,
    "imageWidth": main_image.asset->metadata.dimensions.width,
    "imageHeight": main_image.asset->metadata.dimensions.height
  } | order(created_at desc)
`

/* ── Press ────────────────────────────────────────────────────── */
export const pressArticlesQuery = `
  *[_type == "post"] | order(published_at desc) {
    "slug": slug.current,
    outlet, kind, published_at,
    title, standfirst, excerpt,
    main_image, body, gallery, source
  }
`

export const pressArticleBySlugQuery = `
  *[_type == "post" && slug.current == $slug][0] {
    "slug": slug.current,
    outlet, kind, published_at,
    title, standfirst, excerpt,
    main_image, body, gallery, source
  }
`

/* ── Legal Pages ──────────────────────────────────────────────── */
export const legalPageBySlugQuery = `
  *[_type == "legalPage" && slug.current == $slug][0] {
    _id, title, "slug": slug.current, effectiveDate, lastUpdated, body
  }
`
