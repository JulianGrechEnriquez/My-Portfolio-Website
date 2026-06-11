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
        {
            name: 'eventType',
            title: 'Event Type',
            type: 'string',
            options: {
                list: [
                    { title: 'In-person Event', value: 'inPerson' },
                    { title: 'Game Jam', value: 'gameJam' },
                    { title: 'Online Event', value: 'online' },
                    { title: 'Showcase', value: 'showcase' },
                ],
                layout: 'radio',
            },
        },

        { name: 'description', type: 'text' },

        {
            name: 'eventLocation',
            title: 'Event Location',
            type: 'string',
            hidden: ({ parent }) => parent?.eventType !== 'inPerson',
        },
        {
            name: 'eventWebsite',
            title: 'Event Website',
            type: 'url',
            hidden: ({ parent }) => parent?.eventType !== 'inPerson',
        },

        {
            name: 'gameJamDuration',
            title: 'Game Jam Duration',
            type: 'string',
            description: 'Example: 48 hours, 1 week, 3 days',
            hidden: ({ parent }) => parent?.eventType !== 'gameJam',
        },
        {
            name: 'gameJamGame',
            title: 'Game Made',
            type: 'reference',
            to: [{ type: 'game' }],
            hidden: ({ parent }) => parent?.eventType !== 'gameJam',
        },
        {
            name: 'gameJamOverview',
            title: 'Game Jam Overview',
            type: 'text',
            hidden: ({ parent }) => parent?.eventType !== 'gameJam',
        },

        {
            name: 'images',
            type: 'array',
            of: [{ type: 'image' }]
        },

        {
            name: 'MembersofTeam',
            title: 'Team Members',
            type: 'array',
            hidden: ({ parent }) => parent?.eventType !== 'gameJam',
            of: [
                {
                    type: 'object',
                    fields: [
                        {
                            name: 'member',
                            title: 'Team Member',
                            type: 'reference',
                            to: [{ type: 'teamMember' }],
                        },
                    ],
                    preview: {
                        select: {
                            title: 'member.name',
                            subtitle: 'member.link',
                        },
                    },
                },
            ]
        },
    ]
}
