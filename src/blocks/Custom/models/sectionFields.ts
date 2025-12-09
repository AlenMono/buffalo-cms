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
      label: 'Contact',
      value: 'contact',
    },
    {
      label: 'Custom',
      value: 'custom',
    },
    {
      label: 'Default',
      value: 'default',
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
      label: 'Planning Process',
      value: 'planning-process',
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
