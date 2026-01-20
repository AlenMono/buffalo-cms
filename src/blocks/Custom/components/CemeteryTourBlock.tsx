import React from 'react'
import RichText from '@/components/RichText'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'

interface CemeteryTourLink {
    resourceTitle: string
    resourceUrl: string
    resourceDescription: string
}

interface CemeteryTourBlockProps {
    cemeteryTourTitle?: DefaultTypedEditorState
    cemeteryTourDescription?: string
    cemeteryVideoUrl: string
    cemeteryVideoPoster?: string
    cemeteryTourLinks?: CemeteryTourLink[]
}

const CemeteryTourBlock: React.FC<CemeteryTourBlockProps> = ({
    cemeteryTourTitle,
    cemeteryTourDescription,
    cemeteryVideoUrl,
    cemeteryVideoPoster,
    cemeteryTourLinks,
}) => {
    if (!cemeteryVideoUrl) return null

    return (
        <section className="max-w-[1320px] mx-auto flex flex-col gap-10">
            {/* Title and Description Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 md:mb-10 gap-5">
                {cemeteryTourTitle && (
                    <RichText
                        data={cemeteryTourTitle}
                        paragraphClassName="section-title"
                        h1ClassName="section-title"
                    />
                )}
                {cemeteryTourDescription && (
                    <div className="flex md:justify-end">
                        <p className="max-w-[460px] text-sm md:text-lg text-brand-30">
                            {cemeteryTourDescription}
                        </p>
                    </div>
                )}
            </div>

            {/* Video Player Section */}
            <div className="bg-background-light border border-primary-dark p-3 rounded-lg">
                <div
                    className="w-full relative rounded-lg overflow-hidden"
                    style={{ paddingBottom: '56.25%', height: 0 }}
                >
                    <video
                        src={cemeteryVideoUrl}
                        poster={cemeteryVideoPoster}
                        controls
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        title="Cemetery Tour"
                    />
                </div>
            </div>

            {/* Tour Links Grid */}
            {cemeteryTourLinks && cemeteryTourLinks.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
                    {cemeteryTourLinks.map((link, index) => (
                        <Link
                            href={link.resourceUrl}
                            target="_blank"
                            key={index}
                            className="flex flex-col gap-2 group"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex items-start gap-2 transition-all duration-300 group-hover:text-accent-darkest">
                                    <p className="text-lg md:text-xl font-semibold">{link.resourceTitle}</p>
                                    <ArrowUpRight className="mt-1 min-w-5" size={20} />
                                </div>
                            </div>
                            <p className="text-sm md:text-base text-brand-30">{link.resourceDescription}</p>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    )
}

export default CemeteryTourBlock
