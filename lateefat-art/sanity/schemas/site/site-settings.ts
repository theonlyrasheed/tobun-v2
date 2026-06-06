import {SettingsIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  icon: SettingsIcon,
  // Singleton — only one document of this type should exist
  __experimental_actions: ['update', 'publish'],
  fields: [
    defineField({
      name: 'artistName',
      title: 'Artist Name',
      type: 'string',
      initialValue: 'Lateefat Modupeola Tobun',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short descriptor shown in meta and hero sections.',
      initialValue: 'Multidisciplinary Artist & Digital Couturier',
    }),
    defineField({
      name: 'bio',
      title: 'Short Bio',
      type: 'text',
      rows: 3,
      description: 'One-paragraph bio used in the About teaser and SEO description.',
    }),

    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      initialValue: 'hello@tobunlateefat.com',
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      initialValue: '+44 7846 002310',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      initialValue: 'Bradford, United Kingdom',
    }),

    defineField({
      name: 'instagram',
      title: 'Instagram URL',
      type: 'url',
    }),
    defineField({
      name: 'linkedin',
      title: 'LinkedIn URL',
      type: 'url',
    }),
    defineField({
      name: 'twitter',
      title: 'Twitter / X URL',
      type: 'url',
    }),
    defineField({
      name: 'facebook',
      title: 'Facebook URL',
      type: 'url',
    }),

    defineField({
      name: 'seoTitle',
      title: 'Default SEO Title',
      type: 'string',
      description: 'Falls back to artistName + tagline if empty.',
    }),
    defineField({
      name: 'seoDescription',
      title: 'Default SEO Description',
      type: 'text',
      rows: 2,
    }),
  ],

  preview: {
    select: {title: 'artistName'},
  },
})
