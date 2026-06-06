import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post (Press)',
  type: 'document',
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
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'outlet',
      title: 'Outlet / Publication Name',
      type: 'string',
      description: 'e.g. “The Guardian”, “Creative Worship”',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'kind',
      title: 'Kind of Coverage',
      type: 'string',
      description: 'e.g. “Feature”, “Report”, “Interview”',
      initialValue: 'Feature',
    }),
    defineField({
      name: 'standfirst',
      title: 'Standfirst / Subtitle',
      type: 'text',
      rows: 3,
      description: 'Italicized editorial intro paragraph shown at the top of the article',
    }),
    defineField({
      name: 'main_image',
      title: 'Main / Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
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
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'published_at',
      title: 'Published at',
      type: 'datetime',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'body',
      title: 'Body Content',
      type: 'block_content',
      description: 'Rich text body content. Supports paragraphs, blockquotes, and inline images.',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Article Gallery',
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
              validation: (rule) => rule.required().warning('Alt text is important for accessibility/SEO'),
            }),
          ],
        }),
      ],
      description: 'Optional sub-gallery of images shown near the footer of the article',
    }),
    defineField({
      name: 'source',
      title: 'Original Source Link',
      type: 'object',
      fields: [
        defineField({name: 'label', title: 'Link Label', type: 'string', initialValue: 'Read the original'}),
        defineField({name: 'href', title: 'Link URL', type: 'url'}),
      ],
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'Short summary used for press previews/cards list',
      rows: 2,
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'post_category'}}],
    }),
    defineField({
      name: 'sidebar_images',
      title: 'Sidebar images',
      description: 'Optional: Extra images shown on the sidebar of the page',
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
      name: 'related_posts',
      title: 'Read more posts',
      description: 'Optional: Curated list of related coverage.',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'reference',
          to: [{type: 'post'}],
          options: {disableNew: true},
        }),
      ],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      outlet: 'outlet',
      media: 'main_image',
      published_at: 'published_at',
    },
    prepare(selection) {
      const {outlet, published_at} = selection as {
        outlet?: string
        published_at?: string
      }
      const date = published_at ? new Date(published_at).toLocaleDateString() : undefined
      const bits = [outlet, date].filter(Boolean)
      return {...selection, subtitle: bits.length ? bits.join(' • ') : undefined}
    },
  },
})
