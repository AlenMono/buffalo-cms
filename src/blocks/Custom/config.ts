import type { Block } from 'payload'
import { sectionFields } from './models/sectionFields'
import { columnFields } from './models/columnFields'
import { signatureFields } from './models/signatureFields'
import { planningFields } from './models/planningFields'
import { burialFields } from './models/burialOptionFields'
import { statsFields } from './models/statsFields'
import { griefSupportFields } from './models/griefSupportFields'
import { guidanceAndComfortFields } from './models/guidanceAndComfortFields'
import { resourcesFields } from './models/resourcesFields'
import { contactUsFields } from './models/contactUsFields'
import { benefitFields } from './models/benefitFields'
import { testimonialFields } from './models/testimonialFields'
import { planningProcessFields } from './models/planningProccessFields'
import { faqFields } from './models/faqFields'
import { burialOptionsListFields } from './models/burialOptionsFields'
import { iframeFields } from './models/iframeFields'
import { imageGaleriesFields } from './models/imageGaleriesFields'
import { cemeteryLocationsFields } from './models/cementeryLocationsFields'

export const CustomBlock: Block = {
  slug: 'customBlock',
  interfaceName: 'Custom Block',
  fields: [
    sectionFields,

    // custom selected
    columnFields,

    // // Signature
    ...Object.values(signatureFields),

    // // Planning
    ...Object.values(planningFields),

    // // burialOptionFields
    ...Object.values(burialFields),

    // // burialOptions
    ...Object.values(burialOptionsListFields),

    // // Stats
    ...Object.values(statsFields),

    // // Grief Support
    ...Object.values(griefSupportFields),

    // // Guidance and Comfort
    ...Object.values(guidanceAndComfortFields),

    ...Object.values(resourcesFields),

    // // Contact us
    ...Object.values(contactUsFields),

    // // Benefit
    ...Object.values(benefitFields),

    // // testimonial
    ...Object.values(testimonialFields),

    // // Planning Process
    ...Object.values(planningProcessFields),

    // // FAQ
    ...Object.values(faqFields),

    // iframe
    ...Object.values(iframeFields),

    // Cemetery Locations
    ...Object.values(cemeteryLocationsFields),

    // image gallery
    ...Object.values(imageGaleriesFields),
  ],
}
