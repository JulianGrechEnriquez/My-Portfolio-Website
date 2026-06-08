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

        { name: 'learned',
            type: 'array',
            of: [{ type: 'string' }] },
        { name: 'future', type: 'text' },
        {
            name: 'heroLayout',
            title: 'Hero Layout',
            type: 'string',
            options: {
                list: [
                    { title: 'Centered', value: 'centered' },
                    { title: 'Split Image and Text', value: 'split' },
                    { title: 'Large Banner', value: 'banner' },
                ],
                layout: 'radio',
            },
            initialValue: 'centered',
        },
        {
            name: 'playButtonText',
            title: 'Play Button Text',
            type: 'string',
            description: 'Example: Play Cascade',
        },
        {
            name: 'sectionLabels',
            title: 'Section Labels',
            type: 'object',
            fields: [
                { name: 'overview', title: 'Overview Label', type: 'string' },
                { name: 'gameplay', title: 'Gameplay Label', type: 'string' },
                { name: 'features', title: 'Features Label', type: 'string' },
                { name: 'tech', title: 'Tech Stack Label', type: 'string' },
                { name: 'learned', title: 'What I Learned Label', type: 'string' },
                { name: 'future', title: 'Future Improvements Label', type: 'string' },
            ],
        },
        {
            name: 'pageLayout',
            title: 'Page Layout',
            type: 'object',
            fields: [
                {
                    name: 'preset',
                    title: 'Layout Preset',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Classic Portfolio', value: 'classic' },
                            { title: 'Arcade', value: 'arcade' },
                            { title: 'Showcase', value: 'showcase' },
                            { title: 'Compact', value: 'compact' },
                        ],
                        layout: 'radio',
                    },
                    initialValue: 'classic',
                },
                {
                    name: 'overviewLayout',
                    title: 'Game Overview Layout',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Normal Card', value: 'card' },
                            { title: 'Title Beside Text', value: 'split' },
                            { title: 'Callout Block', value: 'callout' },
                        ],
                        layout: 'radio',
                    },
                    initialValue: 'card',
                },
                {
                    name: 'contentLayout',
                    title: 'Rest Of Page Layout',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Stacked Sections', value: 'stacked' },
                            { title: 'Two Columns', value: 'two-column' },
                            { title: 'Alternating Widths', value: 'alternating' },
                        ],
                        layout: 'radio',
                    },
                    initialValue: 'stacked',
                },
                {
                    name: 'sectionStyle',
                    title: 'Section Style',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Filled Cards', value: 'filled' },
                            { title: 'Outlined Cards', value: 'outlined' },
                            { title: 'Minimal', value: 'minimal' },
                        ],
                        layout: 'radio',
                    },
                    initialValue: 'filled',
                },
                {
                    name: 'gameplayLayout',
                    title: 'Gameplay Images Layout',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Responsive Grid', value: 'grid' },
                            { title: 'Featured First Image', value: 'featured' },
                            { title: 'Horizontal Strip', value: 'strip' },
                        ],
                        layout: 'radio',
                    },
                    initialValue: 'grid',
                },
                {
                    name: 'imageShape',
                    title: 'Image Shape',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Rounded', value: 'rounded' },
                            { title: 'Square', value: 'square' },
                            { title: 'Soft Shadow', value: 'shadow' },
                        ],
                        layout: 'radio',
                    },
                    initialValue: 'rounded',
                },
                {
                    name: 'sectionSpacing',
                    title: 'Section Spacing',
                    type: 'string',
                    options: {
                        list: [
                            { title: 'Comfortable', value: 'comfortable' },
                            { title: 'Compact', value: 'compact' },
                            { title: 'Airy', value: 'airy' },
                        ],
                        layout: 'radio',
                    },
                    initialValue: 'comfortable',
                },
                {
                    name: 'sectionOrder',
                    title: 'Section Order',
                    type: 'array',
                    description: 'Add sections in the order you want them to appear. Any missing sections stay after these.',
                    of: [
                        {
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Overview', value: 'overview' },
                                    { title: 'Gameplay', value: 'gameplay' },
                                    { title: 'Features', value: 'features' },
                                    { title: 'Tech Stack', value: 'tech' },
                                    { title: 'What I Learned', value: 'learned' },
                                    { title: 'Future Improvements', value: 'future' },
                                ],
                            },
                        },
                    ],
                },
                {
                    name: 'hiddenSections',
                    title: 'Hide Sections',
                    type: 'array',
                    description: 'Choose sections to hide on this game page.',
                    of: [
                        {
                            type: 'string',
                            options: {
                                list: [
                                    { title: 'Overview', value: 'overview' },
                                    { title: 'Gameplay', value: 'gameplay' },
                                    { title: 'Features', value: 'features' },
                                    { title: 'Tech Stack', value: 'tech' },
                                    { title: 'What I Learned', value: 'learned' },
                                    { title: 'Future Improvements', value: 'future' },
                                ],
                            },
                        },
                    ],
                },
            ],
        }
    ]
}
