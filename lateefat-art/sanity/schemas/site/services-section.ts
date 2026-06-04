import {EarthGlobeIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'services_section',
  title: 'Services Section',
  type: 'document',
  icon: EarthGlobeIcon,
  fields: [
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Used only to avoid duplicates (keep unique).',
      options: {source: () => 'services-section', maxLength: 96},
      initialValue: {current: 'services-section'},
      readOnly: true,
      validation: (rule) =>
        rule.required().custom(async (value, context) => {
          const slug = (value as any)?.current
          if (!slug) return true

          const client = context.getClient({apiVersion: '2026-01-01'})
          const id = context.document?._id?.replace(/^drafts\./, '')

          const existing = await client.fetch(
            `count(*[_type == "services_section" && slug.current == $slug && _id != $id])`,
            {slug, id},
          )

          return existing === 0 || 'A Services Section already exists.'
        }),
    }),
    defineField({
      name: 'kicker',
      title: 'Kicker',
      type: 'string',
      description: 'Small text above the heading (e.g. “WHY WE EXIST”)',
      initialValue: 'WHY WE EXIST',
    }),
    defineField({
      name: 'title',
      title: 'Heading',
      type: 'string',
      initialValue: 'Our Services',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'service'}],
        }),
      ],
      validation: (rule) => rule.min(1),
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
      title: 'title',
      enabled: 'enabled',
    },
    prepare({title, enabled}) {
      return {
        title: title || 'Services Section',
        subtitle: enabled === false ? 'Disabled' : undefined,
      }
    },
  },
})
