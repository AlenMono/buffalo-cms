import type { Block } from 'payload'

export const NewsSection: Block = {
    slug: 'newsSection',
    labels: {
        singular: 'News Section',
        plural: 'News Sections',
    },
    fields: [
        {
            name: 'heading',
            type: 'text',
            defaultValue: 'News & Announcements',
            required: true,
        },
        {
            name: 'viewAllLink',
            type: 'text',
            defaultValue: '/news',
            required: true,
        },
        {
            name: 'newsItems',
            type: 'array',
            labels: {
                singular: 'News Item',
                plural: 'News Items',
            },
            fields: [
                {
                    name: 'title',
                    type: 'text',
                    required: true,
                },
                {
                    name: 'location',
                    type: 'text',
                },
                {
                    name: 'date',
                    type: 'date',
                    required: true,
                },
                {
                    name: 'image',
                    type: 'upload',
                    relationTo: 'media',
                },
                {
                    name: 'excerpt',
                    type: 'textarea',
                },
                {
                    name: 'slug',
                    type: 'text',
                    admin: {
                        description: 'Link to full news article',
                    },
                },
            ],
        },
    ],
}
