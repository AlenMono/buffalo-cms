import React from 'react'
import RichText from '@/components/RichText'
import Link from 'next/link'
import type { DefaultTypedEditorState } from '@payloadcms/richtext-lexical'
import Image from 'next/image'
import { buttonVariants } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'

interface CemeteryItem {
    cemeteryName: string
    cemeteryAdress: string
    cemeteryLink: string
}

interface CemeteryListBlockProps {
    cemeteryListTitle?: DefaultTypedEditorState
    cemeteryListDescription?: string
    cemeteryList?: CemeteryItem[]
}

const CemeteryListBlock: React.FC<CemeteryListBlockProps> = ({
    cemeteryListTitle,
    cemeteryListDescription,
    cemeteryList,
}) => {
    if (!cemeteryList || cemeteryList.length === 0) return null

    return (
        <section className="max-w-[1320px] mx-auto">
            <div className="bg-background-light border border-primary-dark p-5 lg:px-9 lg:py-7 rounded-lg relative overflow-hidden">

                <Image
                    src="/img/wreath-full.svg"
                    width={999}
                    height={958}
                    alt="Wreath"
                    className="absolute -top-20 h-[290px] md:h-auto md:top-1/2 -left-[55%] md:transform md:translate-y-[-50%]"
                />
                <Image
                    src="/img/wreath-full.svg"
                    width={999}
                    height={958}
                    alt="Wreath"
                    className="absolute -top-20 h-[290px] md:h-auto md:top-1/2 -right-[55%] transform md:translate-y-[-50%] scale-x-[-1] "
                />

                <div className="z-10 relative">
                    {cemeteryListTitle && (
                        <div className="mb-6 text-center">
                            <RichText data={cemeteryListTitle} className="section-title" />
                        </div>
                    )}
                    {cemeteryListDescription && (
                        <p className="mx-auto text-brand-30 text-center mb-12 max-w-[493px] text-sm md:text-base">
                            {cemeteryListDescription}
                        </p>
                    )}
                    <div className="flex flex-col gap-3">
                        {cemeteryList.map((cemetery, index) => (
                            <div key={index} className="flex justify-between items-center gap-10 bg-background border border-primary-dark rounded-lg p-6 pt-5">
                                <div>
                                    <h3 className="text-2xl font-bold font-satoshi text-brand">{cemetery.cemeteryName}</h3>
                                    <p className="text-brand-30 text-sm">{cemetery.cemeteryAdress}</p>
                                </div>

                                {cemetery.cemeteryLink && (
                                    <Link
                                        href={cemetery.cemeteryLink}
                                        className={buttonVariants({ variant: 'outline', size: 'sm', className: 'w-12 !h-12' })}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <ArrowRight className="min-w-6 min-h-6" />
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}

export default CemeteryListBlock