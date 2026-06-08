export default {
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Site Title',
      type: 'string',
    },
    {
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    },
    {
      name: 'heroText',
      title: 'Hero Text',
      type: 'text',
    },
    {
      name: 'about',
      title: 'About Text',
      type: 'text',
    },
    {
      name: 'aboutImage',
      title: 'About Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'education',
      title: 'Education Background',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'school', title: 'School', type: 'string' },
            { name: 'qualification', title: 'Qualification', type: 'string' },
            { name: 'startDate', title: 'Start Date', type: 'string' },
            { name: 'endDate', title: 'End Date', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'highlights', title: 'Highlights', type: 'array', of: [{ type: 'string' }] },
          ],
        },
      ],
    },
    {
      name: 'workExperience',
      title: 'Work Experience',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'company', title: 'Company', type: 'string' },
            { name: 'role', title: 'Role', type: 'string' },
            { name: 'startDate', title: 'Start Date', type: 'string' },
            { name: 'endDate', title: 'End Date', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'highlights', title: 'Highlights', type: 'array', of: [{ type: 'string' }] },
          ],
        },
      ],
    },
    {
      name: 'email',
      title: 'Contact Email',
      type: 'string',
    },
    {
      name: 'socialLinks',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Label', type: 'string' },
            { name: 'href', title: 'URL', type: 'url' },
            {
              name: 'logo',
              title: 'Logo Image',
              type: 'image',
              options: {
                hotspot: true,
              },
            },
          ],
        },
      ],
    },
  ],
}
