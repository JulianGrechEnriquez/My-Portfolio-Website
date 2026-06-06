export default {
    name: 'eventPage',
    title: 'Event Page',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'event',
            title: 'Event Reference',
            type: 'reference',
            to: [{ type: 'eventsCard' }]
        },
        {
            name: 'eventDate',
            title: 'Event Date',
            type: 'date',
        },

        { name: 'description', type: 'text' },

        {
            name: 'images',
            type: 'array',
            of: [{ type: 'image' }]
        },

        {
            name: 'MembersofTeam',
            type: 'array',
            of: [{ type: 'string' }]
        },

        { name: 'learned',
            type: 'array',
            of: [{ type: 'string' }] },
        { name: 'future', type: 'text' },
        {
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96
            }
        }
    ]
}