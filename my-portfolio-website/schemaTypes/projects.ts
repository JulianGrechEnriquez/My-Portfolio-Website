export default {
    name: 'project',
    title: 'Project',
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
            title: 'Project Image',
            type: 'image',
            options: {
                hotspot: true,
            },
        },
        {
            name: 'type',
            title: 'Project Type',
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
            name: 'link',
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