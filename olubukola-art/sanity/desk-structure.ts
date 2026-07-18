import {
  BookIcon,
  CalendarIcon,
  ChartUpwardIcon,
  CommentIcon,
  HelpCircleIcon,
  ImageIcon,
  TagIcon,
  UserIcon,
  UsersIcon,
  EarthGlobeIcon,
} from '@sanity/icons'
import type {StructureBuilder} from 'sanity/structure'

const GROUPED_TYPES = [
  'post',
  'author',
  'post_category',
  'gallery',
  'gallery_album',
  'event',
  'company',
  'testimonial',
  'faq',
  'service',
  'adverts_section',
  'stats_section',
  // 'services_section',
]

export const deskStructure = (S: StructureBuilder) =>
  S.list()
    .title('Content')
    .items([
      S.listItem()
        .title('Blog')
        .icon(BookIcon)
        .child(
          S.list()
            .title('Blog')
            .items([
              S.listItem()
                .title('Posts')
                .icon(BookIcon)
                .child(S.documentTypeList('post').title('Posts')),
              S.listItem()
                .title('Authors')
                .icon(UserIcon)
                .child(S.documentTypeList('author').title('Authors')),
              S.listItem()
                .title('Categories')
                .icon(TagIcon)
                .child(S.documentTypeList('post_category').title('Post Categories')),
            ]),
        ),

      S.listItem()
        .title('Gallery')
        .icon(ImageIcon)
        .child(
          S.list()
            .title('Gallery')
            .items([
              S.listItem()
                .title('Gallery Items')
                .icon(ImageIcon)
                .child(S.documentTypeList('gallery').title('Gallery Items')),
              S.listItem()
                .title('Albums')
                .icon(TagIcon)
                .child(S.documentTypeList('gallery_album').title('Albums')),
            ]),
        ),

      S.listItem()
        .title('Site')
        .icon(EarthGlobeIcon)
        .child(
          S.list()
            .title('Site')
            .items([
              // S.listItem()
              //   .title('Services Section')
              //   .icon(EarthGlobeIcon)
              //   .child(S.document().schemaType('services_section').documentId('services_section')),
              S.listItem()
                .title('Services')
                .icon(TagIcon)
                .child(S.documentTypeList('service').title('Services')),
              S.listItem()
                .title('Stats')
                .icon(ChartUpwardIcon)
                .child(S.documentTypeList('stats_section').title('Stats')),
              S.listItem()
                .title('Events')
                .icon(CalendarIcon)
                .child(S.documentTypeList('event').title('Events')),
              S.listItem()
                .title('Companies')
                .icon(UsersIcon)
                .child(S.documentTypeList('company').title('Companies')),
              S.listItem()
                .title('Testimonials')
                .icon(CommentIcon)
                .child(S.documentTypeList('testimonial').title('Testimonials')),
              S.listItem()
                .title('FAQs')
                .icon(HelpCircleIcon)
                .child(S.documentTypeList('faq').title('FAQs')),
              S.listItem()
                .title('Adverts')
                .icon(ImageIcon)
                .child(S.documentTypeList('adverts_section').title('Adverts')),
            ]),
        ),

      S.divider(),

      ...S.documentTypeListItems().filter((listItem) => {
        const id = listItem.getId()
        return !id || !GROUPED_TYPES.includes(id)
      }),
    ])
