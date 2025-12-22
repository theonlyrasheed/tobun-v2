import author from './blog/author'
import blockContent from './blog/block-content'
import post from './blog/post'
import postCategory from './blog/category'
import artwork from './artwork'
import artworkCategory from './artwork/category'
import company from './site/company'
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

  // Artwork
  artwork,
  artworkCategory,

  // Site
  event,
  company,
  testimonial,
  faq,
  service,
]
