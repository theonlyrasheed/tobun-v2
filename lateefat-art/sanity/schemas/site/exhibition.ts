import {CalendarIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'exhibition',
  title: 'Exhibition',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'name',
      title: 'Exhibition Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {source: 'name', maxLength: 96},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
      description: 'e.g. “2026”',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'place',
      title: 'Place (Country/City)',
      type: 'string',
      description: 'e.g. “United Kingdom” or “Lagos, Nigeria”',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'desc',
      title: 'Short Description',
      type: 'text',
      rows: 3,
      description: 'Used for cards and list previews',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'kicker',
      title: 'Kicker Text',
      type: 'string',
      description: 'e.g. “Exhibition · 2026” (falls back to "Exhibition · Year" if empty)',
    }),
    defineField({
      name: 'date',
      title: 'Date',
      type: 'datetime',
      description: 'When the exhibition takes/took place',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'time',
      title: 'Opening Times',
      type: 'string',
      description: 'e.g. “11am–7pm” or “10am–6pm”',
    }),
    defineField({
      name: 'location',
      title: 'Venue Location',
      type: 'string',
      description: 'e.g. “Bradford, United Kingdom”',
    }),
    defineField({
      name: 'categories',
      title: 'Mediums / Categories',
      type: 'array',
      of: [defineArrayMember({type: 'string'})],
      description: 'e.g. “Digital Couture”, “Mural”, “Textile”',
    }),
    defineField({
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (rule) => rule.required().warning('Alt text is important for SEO/accessibility'),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'paragraphs',
      title: 'Detailed Paragraphs',
      type: 'array',
      of: [defineArrayMember({type: 'text', rows: 4})],
      description: 'Detailed description paragraphs shown inside the drawer details sheet',
    }),
    defineField({
      name: 'gallery',
      title: 'Exhibition Gallery',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'image',
          options: {hotspot: true},
          fields: [
            defineField({
              name: 'alt',
              title: 'Alt text',
              type: 'string',
              validation: (rule) => rule.required().warning('Alt text is important for SEO/accessibility'),
            }),
          ],
        }),
      ],
      description: 'Images showcasing the exhibition pieces/photos',
    }),
    defineField({
      name: 'ctaLabel',
      title: 'CTA Button Label',
      type: 'string',
      description: 'e.g. “Enquire about this series”',
      initialValue: 'Enquire about this series',
    }),
    defineField({
      name: 'ctaHref',
      title: 'CTA Button Href/Link',
      type: 'string',
      description: 'e.g. “/contact”',
      initialValue: '/contact',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
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
      title: 'name',
      subtitle: 'place',
      media: 'image',
    },
  },
})
