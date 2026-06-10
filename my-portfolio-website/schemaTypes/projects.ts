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
            name: 'link',
            title: 'Project Link',
            type: 'string',
        },
        {
            name: 'Gitlink',
            title: 'Git Link',
            type: 'string',
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
