import type { RequiredDataFromCollectionSlug } from 'payload'

// Used for pre-seeded content so that the homepage is not empty
export const homeStatic: RequiredDataFromCollectionSlug<'pages'> = {
  slug: 'home',
  _status: 'published',
  hero: {
    type: 'highImpact',
    richText: {
      root: {
        type: 'root',
        children: [
          {
            type: 'heading',
            children: [
              { type: 'text', text: 'Honoring Life.' },
              { type: 'lineBreak' },
              { type: 'text', text: 'Supporting You.' },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            tag: 'h1',
            version: 1,
          },
          {
            type: 'paragraph',
            children: [
              {
                type: 'text',
                detail: 0,
                format: 0,
                mode: 'normal',
                style: '',
                text: 'Whether you’re facing a recent loss or planning for the future,',
                version: 1,
              },
              {
                type: 'lineBreak',
              },
              {
                type: 'text',
                text: 'we’re here to guide you with compassion and clarity.',
              },
            ],
            direction: 'ltr',
            format: '',
            indent: 0,
            textFormat: 0,
            version: 1,
          },
        ],
        direction: 'ltr',
        format: '',
        indent: 0,
        version: 1,
      },
    },
    links: [
      {
        id: '1',
        link: {
          type: 'custom',
          url: '/plan-a-funeral',
          label: 'Plan a Funeral',
          appearance: 'default',
          newTab: false,
        },
      },
      {
        id: '2',
        link: {
          type: 'custom',
          url: '/support',
          label: 'Grief Support',
          appearance: 'outline',
          newTab: true,
        },
      },
    ],
    media: {
      id: 1,
      updatedAt: '',
      createdAt: '',
      url: '/img/Frame 1.png',
      width: 1320,
      height: 660,
    },
  },
  meta: {
    description: '',
    title: 'Honoring Life. Supporting You.',
  },
  title: 'Home',
  layout: [
    {
      blockType: 'customBlock',
      section: 'signature',
      heading: {
        root: {
          type: 'root',
          children: [
            {
              type: 'heading',
              tag: 'h1',
              children: [
                {
                  type: 'text',
                  text: 'On behalf of Buffalo Catholic Cemeteries, welcome. Whether you are here after a recent loss or to plan for the future, we are honored to serve you and your family.',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      body: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Our mission has always been to provide a place of peace and dignity, honoring the memory of those who have gone before us while supporting the living. We invite you to explore our resources, connect with our counselors, and find comfort in knowing that you are not alone.',
                  detail: 0,
                  format: 0,
                  mode: 'normal',
                  style: '',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      signatureName: 'Thomas Christy',
      signatureTitle: 'Director, Buffalo Catholic Cemeteries',
      signatureImage: {
        id: 1,
        updatedAt: '',
        createdAt: '',
        url: '/img/signature.png',
      },
    },
    {
      blockType: 'customBlock',
      section: 'planning',
      planningTitle: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Planning',
                  detail: 0,
                  format: 3,
                  style: '',
                  version: 1,
                },
                {
                  type: 'text',
                  text: ' for Today &',
                  detail: 0,
                  format: 0,
                  style: '',
                  version: 1,
                },
                {
                  type: 'lineBreak',
                },
                {
                  type: 'text',
                  text: 'Tomorrow',
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      description:
        'Whether you are planning ahead, facing an immediate loss, or preparing for a near-term need, we offer guidance and services for every stage.',
      planningCards: [
        {
          heading: 'Pre-Need',
          subheading: 'Services',
          description: 'Get peace of mind by making thoughtful decisions in advance.',
          link: 'pre-need',
          cardBackground: 'floral',
        },
        {
          heading: 'At-Need',
          subheading: 'Services',
          description: 'Guidance and support during urgent moments of loss.',
          link: 'at-need',
          cardBackground: 'floral',
        },
        {
          heading: 'Near-Need',
          subheading: 'Services',
          description: 'Prepare ahead when a passing is expected soon',
          link: 'near-need',
          cardBackground: 'floral',
        },
      ],
    },
    {
      blockType: 'customBlock',
      section: 'burial-options',
      sectionTitle: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Burrial',
                  detail: 0,
                  format: 3,
                  style: '',
                  version: 1,
                },
                {
                  type: 'lineBreak',
                },
                {
                  type: 'text',
                  text: 'Options',
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      image: {
        updatedAt: '',
        createdAt: '',
        url: '/img/graveyard.png',
        alt: 'Graveyart',
        id: 3,
      },
      burialOptions: [
        {
          title: 'In Ground',
          description:
            'Traditional ground burial remains a popular option for Catholics. Families can choose graves distinguished by the type of memorial that may be placed on them.',
          buttonText: 'View Pricing & Info',
        },
        {
          title: 'Above Ground – Crypt',
          description:
            'Traditional ground burial remains a popular option for Catholics. Families can choose graves distinguished by the type of memorial that may be placed on them.',
          buttonText: 'View Pricing & Info',
        },
        {
          title: 'Above Ground – Columbarium',
          description:
            'Traditional ground burial remains a popular option for Catholics. Families can choose graves distinguished by the type of memorial that may be placed on them.',
          buttonText: 'View Pricing & Info',
        },
        {
          title: 'Green Burial',
          description:
            'Traditional ground burial remains a popular option for Catholics. Families can choose graves distinguished by the type of memorial that may be placed on them.',
          buttonText: 'View Pricing & Info',
        },
      ],
    },
    {
      blockType: 'customBlock',
      section: 'stats',
      blockName: 'stats',
      statsTitle: {
        root: {
          type: 'root',
          children: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Trusted',
                  detail: 0,
                  format: 3,
                  style: '',
                  version: 1,
                },
                {
                  type: 'text',
                  text: ' by Buffalo Families',
                },
                {
                  type: 'lineBreak',
                },
                {
                  type: 'text',
                  text: 'for Generations',
                  detail: 0,
                  format: 3,
                  style: '',
                  version: 1,
                },
              ],
              direction: 'ltr',
              format: '',
              indent: 0,
              version: 1,
            },
          ],
          direction: 'ltr',
          format: '',
          indent: 0,
          version: 1,
        },
      },
      statsDescription:
        'For more than a century, Buffalo Catholic Cemeteries has provided a place of peace, remembrance, and dignity for families across Western New York.',
      statsColumn: [
        {
          statsValue: '150',
          statsLabel: 'Years of Service',
        },
        {
          statsValue: '7',
          statsLabel: 'Locations Across NY',
        },
        {
          statsValue: '80k',
          statsLabel: 'Families Served',
        },
        {
          statsValue: '350+',
          statsLabel: 'Acres of Sacred Ground',
        },
      ],
      badges: [
        {
          badgeLabel: 'Mount Olivet Cemetery',
          badgeLink: 'mount-olivet-cemetery',
        },
        {
          badgeLabel: 'Holy Cross Cemetery',
          badgeLink: 'holy-cross-cemetery',
        },
        {
          badgeLabel: 'Holy Sepulchre Cemetery',
          badgeLink: 'holy-sepulchre-cemetery',
        },
        {
          badgeLabel: 'Gate of Heaven Cemetery',
          badgeLink: 'gate-of-heaven-cemetery',
        },
        {
          badgeLabel: 'Assumption Cemetery',
          badgeLink: 'assumption-cemetery',
        },
        {
          badgeLabel: 'Queen of Heaven Cemetery',
          badgeLink: 'queen-of-heaven-cemetery',
        },
        {
          badgeLabel: 'St. Adalbert Cemetery',
          badgeLink: 'st-adalbert-cemetery',
        },
      ],
    },
  ],
}
