import { checkSelectedSection } from "@/utilities/checkSelectedSection";
import { FixedToolbarFeature, HeadingFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical";
import { Field } from "payload";

interface SignatureFieldsProps {
    heading: Field;
    body: Field;
    signatureName: Field;
    signatureTitle: Field;
    signatureImage: Field;
}

type HeadingTagType = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const signatureCondition = checkSelectedSection('signature');

const createRichTextField = (name: string, headingSizes: HeadingTagType[] = ['h1', 'h2', 'h3', 'h4']): Field => ({
    name,
    type: 'richText',
    required: false,
    editor: lexicalEditor({
        features: ({ rootFeatures }) => [
            ...(name === 'heading' ? rootFeatures : []),
            HeadingFeature({ enabledHeadingSizes: headingSizes }),
            InlineToolbarFeature(),
            FixedToolbarFeature(),
        ],
    }),
    admin: {
        condition: signatureCondition
    }
});

const createTextField = (name: 'signatureName' | 'signatureTitle') => ({
    name,
    type: 'text' as const,
    required: false,
    admin: {
        condition: signatureCondition,
    },
});

const createUploadField = (name: 'signatureImage', relationTo: 'media') => ({
    name,
    type: 'upload' as const,
    relationTo,
    required: false,
    admin: {
        condition: signatureCondition,
    },
});

export const signatureFields: SignatureFieldsProps = {
    heading: createRichTextField('heading', ['h1', 'h2', 'h3', 'h4']),
    body: createRichTextField('body', ['h3', 'h4']),
    signatureName: createTextField('signatureName'),
    signatureTitle: createTextField('signatureTitle'),
    signatureImage: createUploadField('signatureImage', 'media'),
};
