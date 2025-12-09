import { checkSelectedSection } from '@/utilities/checkSelectedSection'

const isVideoSection = checkSelectedSection('video')

export const videoFields = {
  videoTitle: {
    name: 'videoTitle',
    label: 'Title',
    type: 'text',
    required: false,
    admin: { condition: isVideoSection },
  },
  videoUrl: {
    name: 'videoUrl',
    label: 'Video URL',
    type: 'text',
    required: true,
    admin: {
      description: 'Paste the URL to your video file (e.g., .mp4, .webm, etc.)',
      condition: isVideoSection,
    },
  },
  videoPoster: {
    name: 'videoPoster',
    label: 'Poster Image URL',
    type: 'text',
    required: false,
    admin: {
      description: 'Optional: URL to an image to display before the video plays',
      condition: isVideoSection,
    },
  },
}
