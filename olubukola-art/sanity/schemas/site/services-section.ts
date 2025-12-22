import {EarthGlobeIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'services_section',
  title: 'Services Section',
  type: 'document',
  icon: EarthGlobeIcon,
  fields: [
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
