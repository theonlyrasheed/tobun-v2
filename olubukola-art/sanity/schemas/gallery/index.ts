import {ImageIcon} from '@sanity/icons'
import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'gallery',
  title: 'Gallery',
  type: 'document',
  icon: ImageIcon,
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
      name: 'album',
      title: 'Album',
      type: 'reference',
      to: [{type: 'gallery_album'}],
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'main_image',
      title: 'Main image',
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
      name: 'more_images',
      title: 'More images',
      type: 'array',
      of: [
        defineArrayMember({
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
        }),
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Short description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'block_content',
    }),
    defineField({
      name: 'size',
      title: 'Size',
      type: 'object',
      fields: [
        defineField({name: 'heightCm', title: 'Height (cm)', type: 'number'}),
        defineField({name: 'widthCm', title: 'Width (cm)', type: 'number'}),
        defineField({name: 'depthCm', title: 'Depth (cm)', type: 'number'}),
        defineField({
          name: 'notes',
          title: 'Notes',
          type: 'string',
          description: 'e.g. “Framed”, “Unframed”, “Canvas”',
        }),
      ],
    }),
    defineField({
      name: 'created_at',
      title: 'Date',
      type: 'date',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'object',
      fields: [
        defineField({
          name: 'currency',
          title: 'Currency',
          type: 'string',
          options: {
            list: [
              {title: 'Nigerian Naira (NGN)', value: 'NGN'},
              {title: 'US Dollar (USD)', value: 'USD'},
              {title: 'British Pound (GBP)', value: 'GBP'},
              {title: 'Euro (EUR)', value: 'EUR'},
            ],
            layout: 'radio',
          },
          initialValue: 'NGN',
        }),
        defineField({
          name: 'amount',
          title: 'Amount',
          type: 'number',
          validation: (rule) => rule.min(0),
        }),
      ],
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
      validation: (rule) => rule.required(),
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
      media: 'main_image',
      category_title: 'category.title',
      availability: 'availability',
    },
    prepare({title, media, category_title, availability}) {
      const bits = [category_title, availability].filter(Boolean)
      return {
        title,
        media,
        subtitle: bits.length ? bits.join(' • ') : undefined,
      }
    },
  },
})
