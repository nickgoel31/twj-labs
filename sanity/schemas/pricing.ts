import { defineType, defineField, defineArrayMember } from 'sanity'

export default defineType({
  name: 'pricing',
  title: 'Pricing',
  type: 'document',
  fields: [
    defineField({
      name: 'category',
      title: 'Select Category',
      type: 'string',
      options: {
        list: [
          { title: 'Webflow', value: 'webflow' },
          { title: 'Wordpress', value: 'wordpress' },
          { title: 'AI Integration & Automation', value: 'ai-automation' },
          { title: 'Ecommerce', value: 'ecommerce' },
          { title: 'Custom Development', value: 'custom-development' },
          { title: 'Web Design', value: 'web-design' },
          { title: 'Accessibility', value: 'accessibility' },
          { title: 'Go Online', value: 'go-online' }
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'plans',
      title: 'Plans',
      type: 'array',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'plan',
          fields: [
            defineField({
              name: 'planName',
              title: 'Plan Name',
              type: 'string',
            }),
            defineField({
              name: 'price',
              title: 'Price',
              type: 'string',
              description: 'e.g., "$50/mo" or "contact-sales"',
            }),
            defineField({
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 3,
            }),
            defineField({
              name: 'featuredPlan',
              title: 'Featured Plan',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'everythingInPrevious',
              title: '"Everything in previous"',
              type: 'boolean',
              initialValue: false,
            }),
            defineField({
              name: 'includedFeatures',
              title: 'Included Features',
              type: 'array',
              of: [defineArrayMember({ type: 'string' })],
            }),
            defineField({
              name: 'missingFeatures',
              title: 'Missing Features',
              type: 'array',
              of: [defineArrayMember({ type: 'string' })],
            })
          ],
          preview: {
            select: {
              title: 'planName',
              subtitle: 'price',
            },
          },
        }),
      ],
    }),
  ],
  preview: {
    select: {
      title: 'category',
    },
    prepare({ title }) {
      return {
        title: title ? title.charAt(0).toUpperCase() + title.slice(1) : 'New Pricing Category',
      };
    },
  },
})