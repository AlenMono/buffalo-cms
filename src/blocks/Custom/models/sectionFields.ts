import { Field } from 'payload'

export const sectionFields: Field = {
  name: 'section',
  type: 'select',
  options: [
    {
      label: 'Benefit',
      value: 'benefit',
    },
    {
      label: 'Burial Options',
      value: 'burial-options',
    },
    {
      label: 'Burial Options List',
      value: 'burial-options-list',
    },
    {
      label: 'Cemetery Locations',
      value: 'cemetery-locations',
    },
    {
      label: 'Cemetery List',
      value: 'cemetery-list',
    },
    {
      label: 'Cemetery Tour',
      value: 'cemetery-tour',
    },
    {
      label: 'Contact',
      value: 'contact',
    },
    {
      label: 'Contact Form',
      value: 'contact-form',
    },
    {
      label: 'Custom',
      value: 'custom',
    },
    {
      label: 'Faq',
      value: 'faq',
    },
    {
      label: 'Grief Support',
      value: 'grief-support',
    },
    {
      label: 'Iframe',
      value: 'iframe',
    },
    {
      label: 'Image Galleries',
      value: 'image-galleries',
    },
    {
      label: 'News',
      value: 'news',
    },
    {
      label: 'Planning',
      value: 'planning',
    },
    {
      label: 'Promo / Guidance & Comfort',
      value: 'guidance-and-comfort',
    },

    {
      label: 'Resources',
      value: 'resources',
    },
    {
      label: 'Statistics',
      value: 'stats',
    },
    {
      label: 'Steps',
      value: 'planning-process',
    },
    {
      label: 'Team',
      value: 'team',
    },
    {
      label: 'Testimonial',
      value: 'testimonial',
    },
    {
      label: 'Video',
      value: 'video',
    },
    {
      label: 'With Signature',
      value: 'signature',
    },
  ],
  required: true,
}
