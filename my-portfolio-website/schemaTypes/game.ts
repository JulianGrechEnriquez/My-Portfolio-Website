export default {
    name: 'game',
    title: 'Game',
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
            title: 'Game Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'type',
            title: 'Game Type',
            type: 'string',
            options: {
                list: [
                    { title: '2D Game', value: '2d' },
                    { title: '3D Game', value: '3d' },
                ],
                layout: 'radio',
            },
        },
        {
            name: 'genre',
            title: 'Genres',
            type: 'array',
            of: [{ type: 'string' }],
        },
        {
            name: 'Gitlink',
            title: 'Git Link',
            type: 'string',
        },

                {
            name: 'Gamelink',
            title: 'Game Link',
            type: 'string',
        },
        {
            name: 'controls',
            title: 'Controls',
            type: 'array',
            of: [
                {
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Keyboard & Mouse', value: 'keyboard' },
                            { title: 'Controller', value: 'controller' },
                            { title: 'Mobile', value: 'mobile' },
                        ],
                    },
                },
            ],
        },
        {
            name: 'slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 96
            }
        }

    ],
}
