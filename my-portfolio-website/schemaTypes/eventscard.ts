export default {
    name: 'eventsCard',
    title: 'Event Card',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
        },
        {
            name: 'description',
            title: 'Description',
            type: 'text',
        },
        {
            name: 'image',
            title: 'Event Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
    ],
}
