import { checkSelectedSection } from '@/utilities/checkSelectedSection'

const isBenefitSection = checkSelectedSection('contact-form')

const benefitCardFields = {
  heading: {
    name: 'heading',
    type: 'text',
    required: true,
  },
  subheading: {
    name: 'subheading',
    type: 'textarea',
    required: true,
  },
}

export const contactFormFields = {
  contactForm: {
    name: 'contactForm',
    type: 'relationship',
    relationTo: 'forms',
    required: true,
    admin: { condition: isBenefitSection },
  },
  contactBenefits: {
    name: 'contactBenefits',
    type: 'array',
    fields: Object.values(benefitCardFields),
    admin: { condition: isBenefitSection },
  },
}
