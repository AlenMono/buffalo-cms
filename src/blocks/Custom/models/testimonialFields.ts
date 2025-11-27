import { checkSelectedSection } from '@/utilities/checkSelectedSection'

const isTestimonialSection = checkSelectedSection('testimonial')

export const testimonialFields = {
  testimonialText: {
    name: 'testimonialText',
    type: 'text',
    required: true,
    admin: { condition: isTestimonialSection },
  },
  testimonialAuthor: {
    name: 'testimonialAuthor',
    type: 'text',
    required: true,
    admin: { condition: isTestimonialSection },
  },
  testimonialPlace: {
    name: 'testimonialPlace',
    type: 'text',
    required: true,
    admin: { condition: isTestimonialSection },
  },
}
