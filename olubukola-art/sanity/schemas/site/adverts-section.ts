import {ImageIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'adverts_section',
  title: 'Adverts Section',
  type: 'document',
  icon: ImageIcon,
  fields: [
    // defineField({
    //   name: 'slug',
    //   title: 'Slug',
    //   type: 'slug',
    //   description: 'Used only to avoid duplicates (keep unique).',
    //   options: {source: () => 'adverts-section', maxLength: 96},
    //   initialValue: {current: 'adverts-section'},
    //   readOnly: true,
    //   validation: (rule) =>
    //     rule.required().custom(async (value, context) => {
    //       const slug = (value as any)?.current
    //       if (!slug) return true

    //       const client = context.getClient({apiVersion: '2026-01-01'})
    //       const id = context.document?._id?.replace(/^drafts\./, '')

    //       const existing = await client.fetch(
    //         `count(*[_type == "adverts_section" && slug.current == $slug && _id != $id])`,
    //         {slug, id},
    //       )

    //       return existing === 0 || 'An Adverts Section already exists.'
    //     }),
    // }),
    defineField({
      name: 'adverts',
      title: 'Adverts',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'advert_item',
          title: 'Advert',
          type: 'object',
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
              description: 'Used only to avoid duplicates (keep unique).',
              options: {source: 'title', maxLength: 96},
              validation: (rule) => rule.required(),
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
            select: {title: 'title', media: 'image'},
          },
        }),
      ],
      validation: (rule) =>
        rule.min(1).custom((items) => {
          if (!items || !Array.isArray(items)) return true
          const slugs = items
            .map((i: any) => i?.slug?.current)
            .filter((s: any) => typeof s === 'string' && s.length)
          return slugs.length === new Set(slugs).size || 'Duplicate advert slug found.'
        }),
    }),
    defineField({
      name: 'enabled',
      title: 'Enabled',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'slug.current',
      enabled: 'enabled',
    },
    prepare({title, enabled}) {
      return {
        title: title || 'Adverts Section',
        subtitle: enabled === false ? 'Disabled' : undefined,
      }
    },
  },
})
