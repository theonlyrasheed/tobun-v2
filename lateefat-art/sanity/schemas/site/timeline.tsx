import {CalendarIcon} from '@sanity/icons'
import React from 'react'
import {defineField, defineType, type FieldProps} from 'sanity'

function TimelineInstructionWrapper(props: FieldProps) {
  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '6px'}}>
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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            marginBottom: '10px',
          }}
        >
          <span style={{fontSize: '14px'}}>📖</span>
          <span
            style={{
              fontWeight: 700,
              fontSize: '10px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#e8a045',
            }}
          >
            Journey Timeline Milestones Guidelines
          </span>
        </div>
        <div style={{marginBottom: '10px'}}>
          <p style={{margin: '0 0 6px 0'}}>
            These milestones populate the interactive horizontal timeline section on the <strong>About / Biography</strong> page.
          </p>
          <ul style={{margin: '0', paddingLeft: '18px'}}>
            <li><strong>Year/Era</strong>: E.g., <code>"Roots"</code>, <code>"2017"</code>. This is the main chronological marker.</li>
            <li><strong>Title</strong>: E.g., <code>"Four yards of fabric"</code>. Keep it short and punchy.</li>
            <li><strong>Description</strong>: Keep it brief (under 2 lines / 20 words) to prevent text overflow in the slider layout.</li>
            <li><strong>Chronological Order</strong>: Set the <code>Order</code> field (e.g. 0, 1, 2) to sort items correctly from left to right.</li>
          </ul>
        </div>
      </div>
      {props.renderDefault(props)}
    </div>
  )
}

export default defineType({
  name: 'timelineMilestone',
  title: 'Timeline Milestone',
  type: 'document',
  icon: CalendarIcon,
  fields: [
    defineField({
      name: 'year',
      title: 'Year / Era',
      type: 'string',
      description: 'E.g., "Roots", "2017".',
      components: {field: TimelineInstructionWrapper},
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'E.g., "Four yards of fabric".',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Milestone description text (keep under 20 words).',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Order',
      type: 'number',
      description: 'Lower numbers display first (e.g., 1, 2, 3...)',
      validation: (rule) => rule.required().min(0),
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'year',
      subtitle: 'title',
    },
    prepare({title, subtitle}) {
      return {
        title: title || 'No Year',
        subtitle: subtitle || 'No Title',
      }
    },
  },
})
