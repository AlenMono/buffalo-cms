import { checkSelectedSection } from '@/utilities/checkSelectedSection'

const isImageGalleriesSection = checkSelectedSection('image-galleries')

export const imageGaleriesFields = {
  imageGalleries: {
    name: 'imageGalleries',
    label: 'Image Galleries',
    type: 'array',
    fields: [
      {
        name: 'image',
        label: 'Image',
        type: 'upload',
        relationTo: 'media',
        required: true,
      },
    ],
    admin: { condition: isImageGalleriesSection },
  },
}
