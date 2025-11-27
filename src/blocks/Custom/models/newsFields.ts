import { checkSelectedSection } from "@/utilities/checkSelectedSection";
import {
    FixedToolbarFeature,
    HeadingFeature,
    InlineToolbarFeature,
    lexicalEditor,
} from "@payloadcms/richtext-lexical";

const isNewsSection = checkSelectedSection("news");

const newsItemFields = {
    image: {
        name: "newsImage",
        type: "upload",
        relationTo: "media",
        label: "News Image",
        required: false,
    },
    cemeteryName: {
        name: "newsCemeteryName",
        type: "text",
        label: "Cemetery / Location",
        required: false,
    },
    title: {
        name: "newsTitle",
        type: "text",
        label: "News Title",
        required: true,
    },
    date: {
        name: "newsDate",
        type: "date",
        label: "Date",
        admin: {
            date: { pickerAppearance: "dayOnly" },
        },
        required: true,
    },
    link: {
        name: "newsLink",
        type: "text",
        label: "Optional Link",
        required: false,
    },
};

export const newsFields = {
    sectionTitle: {
        name: "newsSectionTitle",
        type: "richText",
        label: "Section Title",
        editor: lexicalEditor({
            features: ({ rootFeatures }) => [
                ...rootFeatures,
                HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
            ],
        }),
        required: false,
        admin: { condition: isNewsSection },
    },
    buttonText: {
        name: "newsButtonText",
        type: "text",
        label: "Button Text (e.g. Read All News)",
        required: false,
        admin: { condition: isNewsSection },
    },
    buttonLink: {
        name: "newsButtonLink",
        type: "text",
        label: "Button Link",
        required: false,
        admin: { condition: isNewsSection },
    },
    newsItems: {
        name: "newsItems",
        type: "array",
        label: "News Items",
        fields: Object.values(newsItemFields),
        admin: { condition: isNewsSection },
    },
};
