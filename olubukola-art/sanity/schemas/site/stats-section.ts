import {ChartUpwardIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'stats_section',
  title: 'Stats Section',
  type: 'document',
  icon: ChartUpwardIcon,
  fields: [
    defineField({
      name: 'stats',
      title: 'Stats',
      description: 'Shown on the homepage hero and the About page (e.g. "150+ Customers").',
      type: 'array',
      of: [
        defineArrayMember({
          name: 'stat_item',
          title: 'Stat',
          type: 'object',
          fields: [
            defineField({
              name: 'value',
              title: 'Value',
              type: 'string',
              description: 'e.g. "150+"',
              validation: (rule) => rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Label',
              type: 'string',
              description: 'e.g. "Customers"',
              validation: (rule) => rule.required(),
            }),
          ],
          preview: {
            select: {value: 'value', label: 'label'},
            prepare({value, label}) {
              return {
                title: `${value ?? ''} ${label ?? ''}`.trim() || 'Stat',
              }
            },
          },
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
      stats: 'stats',
      enabled: 'enabled',
    },
    prepare({stats, enabled}) {
      const count = Array.isArray(stats) ? stats.length : 0
      return {
        title: 'Stats Section',
        subtitle: [
          `${count} stat${count === 1 ? '' : 's'}`,
          enabled === false ? 'Disabled' : undefined,
        ]
          .filter(Boolean)
          .join(' · '),
      }
    },
  },
})
