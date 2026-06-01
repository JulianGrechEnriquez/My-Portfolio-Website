export default {
    name: 'eventPage',
    title: 'Event  Page',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'game',
            title: 'Game Reference',
            type: 'reference',
            to: [{ type: 'game' }]
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

        { name: 'learned',
            type: 'array',
            of: [{ type: 'string' }] },
        { name: 'future', type: 'text' }
    ]
}