import { checkSelectedSection } from '@/utilities/checkSelectedSection'
import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

const isCemeteryTour = checkSelectedSection('cemetery-tour')

const cemeteryTourLinksFieldsArray = {
  title: {
    name: 'resourceTitle',
    type: 'text',
    required: true,
  },
  url: {
    name: 'resourceUrl',
    type: 'text',
    required: true,
  },
  description: {
    name: 'resourceDescription',
    type: 'textarea',
  },
}

export const cemeteryTourFields = {
  cemeteryTourTitle: {
    name: 'cemeteryTourTitle',
    type: 'richText',
    editor: lexicalEditor({
      features: ({ rootFeatures }) => [
        ...rootFeatures,
        HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
        FixedToolbarFeature(),
        InlineToolbarFeature(),
      ],
    }),
    label: 'Title',
    required: false,
    admin: { condition: isCemeteryTour },
  },
  cemeteryTourDescription: {
    name: 'cemeteryTourDescription',
    type: 'textarea',
    label: 'Description',
    required: false,
    admin: { condition: isCemeteryTour },
  },
  cemeteryVideoUrl: {
    name: 'cemeteryVideoUrl',
    label: 'Video URL',
    type: 'text',
    required: true,
    admin: {
      description: 'Paste the URL to your video file (e.g., .mp4, .webm, etc.)',
      condition: isCemeteryTour,
    },
  },
  cemeteryVideoPoster: {
    name: 'cemeteryVideoPoster',
    label: 'Poster Image URL',
    type: 'text',
    required: false,
    admin: {
      description: 'Optional: URL to an image to display before the video plays',
      condition: isCemeteryTour,
    },
  },
  cemeteryTourLinks: {
    name: 'cemeteryTourLinks',
    type: 'array',
    admin: { condition: isCemeteryTour },
    fields: Object.values(cemeteryTourLinksFieldsArray),
  },
}
