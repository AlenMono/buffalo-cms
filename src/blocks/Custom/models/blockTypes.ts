// List all sections
export const blockOptions = [
  { label: 'With Signature', value: 'signature' },
  { label: 'Planning', value: 'planning' },
  { label: 'Burial Options', value: 'burial-options' },
  { label: 'Burial Options List', value: 'burial-options-list' },
  { label: 'Contact Form', value: 'contact-form' },
  { label: 'Stats', value: 'stats' },
  { label: 'Guidance and Comfort', value: 'guidance-and-comfort' },
  { label: 'Grief Support', value: 'grief-support' },
  { label: 'Resources', value: 'resources' },
  { label: 'News', value: 'news' },
  { label: 'Contact', value: 'contact' },
  { label: 'Benefit', value: 'benefit' },
  { label: 'Testimonial', value: 'testimonial' },
  { label: 'Planning Process', value: 'planning-process' },
  { label: 'Faq', value: 'faq' },
  { label: 'Iframe', value: 'iframe' },
  { label: 'Cemetery Locations', value: 'cemetery-locations' },
  { label: 'Cemetery List', value: 'cemetery-list' },
  { label: 'Team', value: 'team' },
  { label: 'Image Galleries', value: 'image-galleries' },
  { label: 'Video', value: 'video' },
] as const

// Literal type for section values
export type BlockSection = (typeof blockOptions)[number]['value']

// Base props all blocks receive
export interface BaseBlockProps {
  section: BlockSection
  [key: string]: any // Extra fields from Payload
}

// Optional: define props for each section
export interface SignatureBlockProps extends BaseBlockProps {
  section: 'signature'
  heading: any
  body: any
  signatureName: string
  signatureTitle: string
  signatureImage?: {
    url: string
    alt?: string
    width?: number
    height?: number
  }
  cardBackground?: 'default' | 'flowers' | null
}

// Example for Planning section
export interface PlanningBlockProps extends BaseBlockProps {
  section: 'planning'
  title: string
  description: string
}

export interface VideoBlockProps extends BaseBlockProps {
  section: 'video'
  videoTitle?: string
  videoUrl: string
  videoPoster?: string
}
