import {defineArrayMember, defineField, defineType} from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
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
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'main_image',
      title: 'Main Image',
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
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'Short summary used for previews/cards',
      rows: 3,
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{type: 'reference', to: {type: 'post_category'}}],
    }),
    defineField({
      name: 'published_at',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'block_content',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'sidebar_images',
      title: 'Sidebar images',
      description:
        'Optional: Images shown on the right side of the post detail page, if empty, the frontend will not show any images.',
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
      description:
        'Optional: Curated list for the “Read more post” section. If empty, the frontend will auto-pick recent posts.',
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
      author: 'author.name',
      media: 'main_image',
      published_at: 'published_at',
    },
    prepare(selection) {
      const {author, published_at} = selection as {
        author?: string
        published_at?: string
      }
      const date = published_at ? new Date(published_at).toLocaleDateString() : undefined
      const bits = [author ? `by ${author}` : undefined, date].filter(Boolean)
      return {...selection, subtitle: bits.length ? bits.join(' • ') : undefined}
    },
  },
})
