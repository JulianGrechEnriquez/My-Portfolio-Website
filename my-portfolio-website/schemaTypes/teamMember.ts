export default {
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'link',
      title: 'Link',
      type: 'url',
      description: 'Portfolio, GitHub, LinkedIn, or another useful profile link.',
    },
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'link',
    },
  },
}
