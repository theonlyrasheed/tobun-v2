import {StarIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  icon: StarIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery_ref',
      title: 'Gallery Showcase Image',
      type: 'reference',
      to: [{type: 'gallery'}],
      description: 'Pick a piece from your gallery to use as this service\'s showcase image.',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (rule) => rule.required().min(10),
    }),
    defineField({
      name: 'tags',
      title: 'Tags / Chips',
      type: 'array',
      of: [{type: 'string'}],
      description: 'e.g. “Illustration”, “Textile”, “Couture”',
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers show first',
      validation: (rule) => rule.min(0),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'description',
      media: 'gallery_ref.main_image',
    },
    prepare({title, media, subtitle}) {
      return {
        title,
        media,
        subtitle: typeof subtitle === 'string' ? subtitle.slice(0, 80) : subtitle,
      }
    },
  },
})
