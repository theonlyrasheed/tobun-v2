import {ImageIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  icon: ImageIcon,
  fields: [
    defineField({
      name: 'title',
      title: 'Artwork Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Auto-fills from title — click Generate.',
      options: {source: 'title', maxLength: 96},
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'main_image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt text',
          type: 'string',
          validation: (rule) =>
            rule.required().warning('Alt text is required for accessibility/SEO'),
        }),
      ],
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'album',
      title: 'Album / Category',
      type: 'reference',
      to: [{type: 'gallery_album'}],
      description: 'Determines the filter category shown in the gallery.',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'variant',
      title: 'Card Variant',
      type: 'string',
      description: 'Controls background treatment on the masonry card.',
      options: {
        list: [
          {title: 'Default (dark)', value: 'default'},
          {title: 'Light (cream)', value: 'light'},
          {title: 'Ochre (warm gold)', value: 'ochre'},
        ],
        layout: 'radio',
      },
      initialValue: 'default',
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: 'color',
      title: 'Text / Overlay Colour',
      type: 'string',
      description:
        'Optional CSS colour override for the card text (e.g. "var(--cream)" or "#fff"). Leave blank to use the variant default.',
      hidden: ({document}) => document?.variant === 'default' || !document?.variant,
    }),

    defineField({
      name: 'created_at',
      title: 'Artwork Date',
      type: 'date',
      description: 'Year is extracted from this for the gallery filter.',
      initialValue: () => new Date().toISOString().split('T')[0],
    }),

    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'Pin to the top of the gallery.',
      initialValue: false,
    }),

    defineField({
      name: 'availability',
      title: 'Availability',
      type: 'string',
      options: {
        list: [
          {title: 'Available', value: 'available'},
          {title: 'Sold', value: 'sold'},
          {title: 'Not for sale', value: 'not_for_sale'},
        ],
        layout: 'radio',
      },
      initialValue: 'available',
    }),

    defineField({
      name: 'price',
      title: 'Price',
      type: 'object',
      hidden: ({document}) => document?.availability === 'not_for_sale',
      fields: [
        defineField({
          name: 'amount',
          title: 'Amount',
          type: 'number',
          validation: (rule) => rule.min(0),
        }),
        defineField({
          name: 'currency',
          title: 'Currency',
          type: 'string',
          options: {
            list: [
              {title: 'GBP £', value: 'GBP'},
              {title: 'USD $', value: 'USD'},
              {title: 'EUR €', value: 'EUR'},
              {title: 'NGN ₦', value: 'NGN'},
            ],
            layout: 'radio',
          },
          initialValue: 'GBP',
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'main_image',
      album: 'album.title',
      availability: 'availability',
    },
    prepare({title, media, album, availability}) {
      const bits = [album, availability].filter(Boolean)
      return {
        title,
        media,
        subtitle: bits.length ? bits.join(' · ') : undefined,
      }
    },
  },
})
