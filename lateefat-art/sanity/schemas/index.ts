import author from './blog/author'
import blockContent from './blog/block-content'
import post from './blog/post'
import postCategory from './blog/category'
import gallery from './gallery'
import galleryAlbum from './gallery/albums'
import company from './site/company'
import advertsSection from './site/adverts-section'
import event from './site/event'
import exhibition from './site/exhibition'
import faq from './site/faq'
import legalPage from './site/legal-page'
import siteSettings from './site/site-settings'
import testimonial from './site/testimonial'
import service from './site/service'
import timelineMilestone from './site/timeline'

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
  exhibition,
  company,
  advertsSection,
  testimonial,
  faq,
  service,
  legalPage,
  siteSettings,
  timelineMilestone,
]


