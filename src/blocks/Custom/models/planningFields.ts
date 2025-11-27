import { checkSelectedSection } from "@/utilities/checkSelectedSection";
import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";

const isPlanningSection = checkSelectedSection('planning');

const showIfFDefault = (_data: any, _siblingData: any, parentData: any) => {
    return parentData?.blockData.section === 'planning' && parentData?.blockData.planningLayout === 'default';
};

const showIfFloral = (_data: any, _siblingData: any, parentData: any) => {
    return parentData?.blockData.section === 'planning' && parentData?.blockData.planningLayout === 'floral';
};

const planningCardsFields = {
    heading: {
        name: 'heading',
        type: 'text',
        required: true,
    },
    subHeading: {
        name: 'subheading',
        type: 'text',
        required: true,
    },
    description: {
        name: 'description',
        type: 'textarea',
        required: true,
    },
    link: {
        name: 'link',
        type: 'text',
        required: false,
    },
    buttonActionLink: {
        name: 'buttonLabel',
        label: 'Button Action Label',
        type: 'text',
        required: false,
        admin: { condition: showIfFDefault }
    },
    buttonActionVariant: {
        name: 'buttonVariant',
        label: 'Button Action Variant',
        type: 'select',
        defaultValue: 'default',
        options: [
            { label: 'Primary', value: 'primary' },
            { label: 'Primary Outline', value: 'primary-outline' },
            { label: 'Default', value: 'default' },
            { label: 'Outline', value: 'outline' },
        ],
        required: false,
        admin: { condition: showIfFDefault }
    },
    badges: {
        name: 'badges',
        label: 'Badges List',
        type: 'array',
        required: false,
        fields: [
            {
                name: 'badge',
                type: 'text',
                required: true,
            },
        ],
        admin: { condition: showIfFDefault }
    },
    cardBackground: {
        name: 'cardBackground',
        dbName: 'card_bg',
        type: 'select',
        defaultValue: 'default',
        options: [
            { label: 'Default', value: 'default' },
            { label: 'Floral', value: 'floral' },
        ],
        required: false,
        admin: { condition: showIfFloral }
    },
};

export const planningFields = {
    planningLayout: {
        name: 'planningLayout',
        type: 'select',
        defaultValue: 'floral',
        options: [
            { label: 'Default', value: 'default' },
            { label: 'Floral', value: 'floral' },
        ],
        required: false,
        admin: { condition: isPlanningSection },
    },
    title: {
        name: 'planningTitle',
        type: 'richText',
        editor: lexicalEditor({
            features: ({ rootFeatures }) => {
                return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                ];
            },
        }),
        required: false,
        admin: { condition: showIfFloral },
    },
    description: {
        name: 'description',
        type: 'textarea',
        required: false,
        admin: { condition: showIfFloral },
    },
    planningCards: {
        name: 'planningCards',
        type: 'array',
        fields: Object.values(planningCardsFields),
        admin: { condition: isPlanningSection },
    },
};
