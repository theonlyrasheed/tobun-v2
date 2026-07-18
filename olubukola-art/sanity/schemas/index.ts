import author from './blog/author'
import blockContent from './blog/block-content'
import post from './blog/post'
import postCategory from './blog/category'
import gallery from './gallery'
import galleryAlbum from './gallery/albums'
import company from './site/company'
import advertsSection from './site/adverts-section'
import statsSection from './site/stats-section'
import event from './site/event'
import faq from './site/faq'
import testimonial from './site/testimonial'
import service from './site/service'

export const schemas = [
  // Blog
  post,
  author,
  postCategory,
  blockContent,

  // Gallery
  gallery,
  galleryAlbum,

  // Site
  event,
  company,
  advertsSection,
  statsSection,
  testimonial,
  faq,
  service,
]
