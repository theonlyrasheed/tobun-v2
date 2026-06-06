import {CalendarIcon} from '@sanity/icons'
import React from 'react'
import {defineField, defineType, type FieldProps} from 'sanity'

/* ── Styled instructions panel for the booking_url field ──────────────── */
function BookingFieldWrapper(props: FieldProps) {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
      {/* Instructions card */}
      <div
        style={{
          background: 'color-mix(in oklab, var(--card-bg-color, #1a1f2e) 60%, transparent)',
          border: '1px solid color-mix(in oklab, #e8a045 30%, transparent)',
          borderLeft: '3px solid #e8a045',
          borderRadius: '6px',
          padding: '14px 16px',
          fontSize: '12px',
          lineHeight: '1.75',
          color: 'var(--gray-500, #8a9bb0)',
        }}
      >
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '10px',
          }}
        >
          <span style={{fontSize: '14px'}}>🎟</span>
          <span
            style={{
              fontWeight: 700,
              fontSize: '10px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#e8a045',
            }}
          >
            How to set up event registration
          </span>
        </div>

        {/* Luma section */}
        <div style={{marginBottom: '10px'}}>
          <span
            style={{
              display: 'inline-block',
              fontWeight: 600,
              color: 'var(--gray-700, #c5d0da)',
              marginBottom: '4px',
            }}
          >
            Luma{' '}
            <span
              style={{
                fontSize: '10px',
                fontWeight: 400,
                background: 'color-mix(in oklab, #2da44e 20%, transparent)',
                color: '#2da44e',
                padding: '1px 6px',
                borderRadius: '100px',
              }}
            >
              Recommended · free
            </span>
          </span>
          <ol
            style={{
              margin: '0',
              paddingLeft: '18px',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px',
            }}
          >
            <li>
              Go to{' '}
              <code
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  padding: '1px 5px',
                  borderRadius: '3px',
                  fontSize: '11px',
                }}
              >
                lu.ma
              </code>{' '}
              → sign up → <strong>Create Event</strong>.
            </li>
            <li>Fill in title, date, location, set ticket type, then publish.</li>
            <li>
              Copy the URL from your dashboard — it must include the{' '}
              <code
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  padding: '1px 5px',
                  borderRadius: '3px',
                  fontSize: '11px',
                }}
              >
                evt-
              </code>{' '}
              prefix:{' '}
              <code
                style={{
                  background: 'rgba(255,255,255,0.06)',
                  padding: '1px 5px',
                  borderRadius: '3px',
                  fontSize: '11px',
                }}
              >
                luma.com/event/evt-XXXXXXXX
              </code>
              .
            </li>
            <li>Paste that URL below and click Publish.</li>
          </ol>
        </div>

        {/* Divider */}
        <div
          style={{
            height: '1px',
            background: 'rgba(255,255,255,0.06)',
            margin: '8px 0',
          }}
        />

        {/* Other options */}
        <div style={{display: 'flex', flexDirection: 'column', gap: '3px'}}>
          <div>
            <strong style={{color: 'var(--gray-700, #c5d0da)'}}>Cal.com</strong> — paste your{' '}
            <code
              style={{
                background: 'rgba(255,255,255,0.06)',
                padding: '1px 5px',
                borderRadius: '3px',
                fontSize: '11px',
              }}
            >
              cal.com/username/event
            </code>{' '}
            URL for an inline booking widget.
          </div>
          <div>
            <strong style={{color: 'var(--gray-700, #c5d0da)'}}>Other</strong> — Calendly,
            Eventbrite, Tally, or any URL renders as a "Register now" button.
          </div>
        </div>
      </div>

      {/* Render the actual field (label + input + validation) */}
      {props.renderDefault(props)}
    </div>
  )
}

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

          const rawId = context.document?._id
          if (!rawId) return true // new doc not yet saved — skip check

          const client = context.getClient({apiVersion: '2026-01-01'})
          // Strip draft prefix so both the draft and its published twin are treated as the same doc
          const id = rawId.replace(/^drafts\./, '')

          const existing = await client.fetch(
            // Exclude this document AND its draft twin, and ignore other drafts
            `count(*[_type == "event" && slug.current == $slug && _id != $id && _id != $draftId && !(_id in path("drafts.**"))])`,
            {slug, id, draftId: `drafts.${id}`},
          )

          return existing === 0 || 'This slug is already used by another event.'
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
      description: 'e.g. "UK" or "Ghana"',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'badge',
      title: 'Badge',
      type: 'string',
      description: 'e.g. "Free" or "Ticketed"',
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
        'Optional. If set, the event is shown as "Ongoing" while the current time is between start and end. Leave blank for single-day events.',
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
      components: {field: BookingFieldWrapper},
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
