export const landingPage = {
    name: 'landingPage',
    title: 'Landing Page',
    type: 'document',
    fields: [
      {
        name: 'heroTitle',
        title: 'Hero Title',
        type: 'string',
      },
      {
        name: 'heroDescription',
        title: 'Hero Description',
        type: 'text',
      },
      {
        name: 'heroImage',
        title: 'Hero Image',
        type: 'image',
        options: { hotspot: true },
      },
      {
        name: 'aboutTitle',
        title: 'About Title',
        type: 'string',
      },
      {
        name: 'aboutDescription',
        title: 'About Description',
        type: 'text',
      },
      {
        name: 'contactTitle',
        title: 'Contact Title',
        type: 'string',
      },
      {
        name: 'contactDescription',
        title: 'Contact Description',
        type: 'text',
      },
      {
        name: 'faqEyebrow',
        title: 'FAQ Eyebrow',
        type: 'string',
        description: 'Small label above the FAQ heading (e.g. "FAQ")',
      },
      {
        name: 'faqTitle',
        title: 'FAQ Title',
        type: 'string',
      },
      {
        name: 'faqDescription',
        title: 'FAQ Description',
        type: 'text',
        description: 'Optional supporting text below the FAQ heading',
      },
      {
        name: 'faqs',
        title: 'FAQ Items',
        type: 'array',
        of: [
          {
            type: 'object',
            name: 'faqItem',
            fields: [
              {
                name: 'question',
                title: 'Question',
                type: 'string',
              },
              {
                name: 'answer',
                title: 'Answer',
                type: 'text',
              },
            ],
            preview: {
              select: { title: 'question' },
            },
          },
        ],
      },
      {
        name: 'testimonialsEyebrow',
        title: 'Testimonials Eyebrow',
        type: 'string',
      },
      {
        name: 'testimonialsTitle',
        title: 'Testimonials Title',
        type: 'string',
      },
      {
        name: 'testimonialsDescription',
        title: 'Testimonials Description',
        type: 'text',
      },
      {
        name: 'testimonials',
        title: 'Testimonials',
        type: 'array',
        of: [
          {
            type: 'object',
            name: 'testimonialItem',
            fields: [
              { name: 'quote', title: 'Quote', type: 'text' },
              { name: 'name', title: 'Name', type: 'string' },
              { name: 'role', title: 'Role', type: 'string' },
              {
                name: 'avatar',
                title: 'Avatar',
                type: 'image',
                options: { hotspot: true },
              },
            ],
            preview: {
              select: { title: 'name', subtitle: 'role' },
            },
          },
        ],
      },
    ],
  }