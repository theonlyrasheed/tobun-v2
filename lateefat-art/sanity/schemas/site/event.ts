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
      name: 'date',
      title: 'Date & Time',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location / Country',
      type: 'string',
      description: 'e.g. “UK” or “Ghana”',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      description: 'e.g. “Free” or “Ticketed”',
      initialValue: 'Free',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'desc',
      title: 'Description',
      type: 'text',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'end_date',
      title: 'End Date & Time',
      type: 'datetime',
      description:
        'Optional. If set, the event is shown as “Ongoing” while the current time is between start and end. Leave blank for single-day events.',
    }),

    defineField({
      name: 'body',
      title: 'Full Description',
      type: 'block_content',
      description: 'Rich text shown on the event detail page. Supports paragraphs, images, and quotes.',
    }),

    defineField({
      name: 'booking_url',
      title: 'Booking / Registration URL',
      type: 'url',
      description:
        'HOW TO SET UP FREE REGISTRATION WITH LUMA (recommended): ' +
        '1. Go to lu.ma and sign up for a free account. ' +
        '2. Click "Create Event", fill in the title, date, location, and description — these can mirror what you entered here. ' +
        '3. Set ticket type to "Free" (or paid if applicable). ' +
        '4. Publish the event. ' +
        '5. Copy the event URL from your browser — it looks like lu.ma/your-event-name. ' +
        '6. Paste that URL into this field and save. ' +
        'The website will automatically embed a live RSVP form on the event detail page. Attendees get automatic confirmation and reminder emails from Luma — no extra setup needed. ' +
        'CAL.COM (for bookable workshops/sessions): Create a free account at cal.com, set up your event type, and paste your cal.com/username/event-name URL here — the site will embed an inline booking widget. ' +
        'OTHER: Any Calendly, Tally, Eventbrite, or plain URL also works — it will show as a "Register now" button instead of an embed.',
    }),

    defineField({
      name: 'href',
      title: 'Legacy Registration Link',
      type: 'string',
      description: 'Deprecated — use Booking URL above. Kept for back-compat.',
      initialValue: '/contact',
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
      title: 'title',
      subtitle: 'location',
      media: 'image',
    },
  },
})
