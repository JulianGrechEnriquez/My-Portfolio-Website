export default {
    name: 'projectPage',
    title: 'Project Page',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'project',
            title: 'Project Reference',
            type: 'reference',
            to: [{ type: 'project' }]
        },

        { name: 'description', type: 'text' },

        {
            name: 'gameplayImages',
            type: 'array',
            of: [{ type: 'image' }]
        },

        {
            name: 'features',
            type: 'array',
            of: [{ type: 'string' }]
        },

        {
            name: 'tech',
            type: 'array',
            of: [{ type: 'string' }]
        },
    ]
}
