import {CalendarIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  icon: CalendarIcon,
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
      name: 'flyer',
      title: 'Flyer image',
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
    defineField({
      name: 'mode',
      title: 'Mode',
      type: 'string',
      options: {
        list: [
          {title: 'In-person', value: 'in_person'},
          {title: 'Online', value: 'online'},
          {title: 'Hybrid', value: 'hybrid'},
        ],
        layout: 'radio',
      },
      initialValue: 'in_person',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'starts_at',
      title: 'Starts at',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'ends_at',
      title: 'Ends at',
      type: 'datetime',
      validation: (rule) =>
        rule.custom((endsAt, context) => {
          const start = context.document?.starts_at
          if (!start || !endsAt) return true
          return (
            new Date(endsAt as string) >= new Date(start as string) || 'End must be after start'
          )
        }),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'object',
      fields: [
        defineField({name: 'venue', title: 'Venue', type: 'string'}),
        defineField({name: 'address', title: 'Address', type: 'string'}),
        defineField({name: 'city', title: 'City', type: 'string'}),
        defineField({name: 'country', title: 'Country', type: 'string'}),
      ],
      hidden: ({parent}) => parent?.mode === 'online',
    }),
    defineField({
      name: 'meeting_url',
      title: 'Online link',
      type: 'url',
      validation: (rule) =>
        rule.uri({scheme: ['http', 'https']}).warning('Use a valid https:// link'),
      hidden: ({document}) => document?.mode === 'in_person',
    }),
    defineField({
      name: 'entry',
      title: 'Entry',
      type: 'string',
      options: {
        list: [
          {title: 'Free', value: 'free'},
          {title: 'Paid', value: 'paid'},
          {title: 'Invite only', value: 'invite_only'},
        ],
        layout: 'radio',
      },
      initialValue: 'free',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slots_available',
      title: 'Slots available',
      type: 'number',
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'block_content',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'flyer',
      starts_at: 'starts_at',
      mode: 'mode',
    },
    prepare({title, media, starts_at, mode}) {
      const date = starts_at ? new Date(starts_at).toLocaleDateString() : undefined
      return {
        title,
        media,
        subtitle: [date, mode].filter(Boolean).join(' • ') || undefined,
      }
    },
  },
})
