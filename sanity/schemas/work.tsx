import { defineType, defineField, defineArrayMember } from 'sanity'

const work = defineType({
  name: 'work',
  title: 'Work',
  type: 'document',
  fieldsets: [
    { name: 'caseStudyDetails', title: 'Case Study Details', options: { collapsible: true, collapsed: false } },
    { name: 'testimonialGroup', title: 'Testimonial', options: { collapsible: true, collapsed: false } },
    { name: 'metrics', title: 'Key Metrics', options: { collapsible: true, collapsed: false } },
  ],
  fields: [
    defineField({
      name: 'pageTitle',
      title: 'Page Title',
      type: 'string',
    }),
    defineField({
      name: 'companyName',
      title: 'Company Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Company Logo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'projectType',
      title: 'Project Type',
      type: 'string',
      options: {
        list: [
          { title: 'Work', value: 'work' },
          { title: 'Case Study', value: 'caseStudy' },
          { title: 'App by TWJ', value: 'app'}
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'completionDate',
      title: 'Date of Completion',
      type: 'string',
      description: 'E.g., "August 2024", "Ongoing", or "In Development"',
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [defineArrayMember({ type: 'string' })],
      options: {
        layout: 'tags',
      },
      description: 'Type a technology (e.g., Next.js, UI/UX) and press Enter.',
    }),
    defineField({
      name: 'industry',
      title: 'Industry Type',
      type: 'string',
    }),
    defineField({
      name: 'siteUrl',
      title: 'Site URL',
      type: 'url',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Other Images',
      type: 'array',
      of: [defineArrayMember({ type: 'image', options: { hotspot: true } })],
      options: { layout: 'grid' },
    }),

    // --- Case Study Details Fieldset ---
    defineField({
      name: 'problem',
      title: 'The Problem',
      type: 'text',
      fieldset: 'caseStudyDetails',
    }),
    defineField({
      name: 'solution',
      title: 'The Solution',
      type: 'text',
      fieldset: 'caseStudyDetails',
    }),
    defineField({
      name: 'results',
      title: 'The Results',
      type: 'text',
      fieldset: 'caseStudyDetails',
    }),

    // --- Testimonial Fieldset ---
    defineField({
      name: 'testimonialQuote',
      title: 'Quote',
      type: 'text',
      fieldset: 'testimonialGroup',
      rows: 4,
    }),
    defineField({
      name: 'testimonialName',
      title: 'Person Name',
      type: 'string',
      fieldset: 'testimonialGroup',
    }),
    defineField({
      name: 'testimonialDesignation',
      title: 'Person Designation',
      type: 'string',
      fieldset: 'testimonialGroup',
    }),

    // --- Metrics Fieldset ---
    defineField({
      name: 'conversionRate',
      title: 'Conversion Rate',
      type: 'string',
      fieldset: 'metrics',
      description: 'E.g., "+24%" or "15%"',
    }),
    defineField({
      name: 'userGrowth',
      title: 'User Growth',
      type: 'string',
      fieldset: 'metrics',
      description: 'E.g., "10k+" or "300%"',
    }),
  ],
  
  preview: {
    select: {
      title: 'companyName',
      subtitle: 'projectType',
      media: 'logo',
    },
  },
})

export default work