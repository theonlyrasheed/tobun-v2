import {CalendarIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event (Flyer)',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Used only to avoid duplicates (keep unique).',
      options: {maxLength: 96},
      validation: (rule) =>
        rule.required().custom(async (value, context) => {
          const slug = (value as any)?.current
          if (!slug) return true

          const client = context.getClient({apiVersion: '2026-01-01'})
          const id = context.document?._id?.replace(/^drafts\./, '')

          const existing = await client.fetch(
            `count(*[_type == "event" && slug.current == $slug && _id != $id])`,
            {slug, id},
          )

          return existing === 0 || 'Slug already exists.'
        }),
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (rule) =>
            rule.required().warning('Alt text is important for accessibility/SEO'),
        }),
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'slug.current',
      media: 'image',
    },
  },
})
