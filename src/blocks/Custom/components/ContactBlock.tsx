import RichText from '@/components/RichText'
import { buttonVariants } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

type ContactLink = {
    linkTitle: string
    linkUrl: string
    linkVariant: 'outline' | 'default'
}

type ContactBlockProps = {
    contactTitle?: any
    contactDescription?: string
    contactLinks?: ContactLink[]
}

const ContactBlock: React.FC<ContactBlockProps> = ({
    contactTitle,
    contactDescription,
    contactLinks = [],
}) => {
    if (!contactTitle && !contactDescription && contactLinks.length === 0) return null

    return (
        <section className="max-w-[746px] mx-auto text-center">
            <div className="hidden lg:block absolute left-0 h-[520px] z-[-1]">
                <Image src="/img/left-flower.png" alt="Flowers" width={411} height={628} />
            </div>
            <div className="hidden lg:block absolute right-0 h-[520px] z-[-1]">
                <Image src="/img/right-flower.png" alt="Flowers" width={411} height={628} />
            </div>
            {contactTitle && (
                <RichText data={contactTitle} className="!text-3xl lg:!text-4xl font-faustina mb-6 lg:mb-16" />
            )}

            {contactDescription && <p className="text-brand-30 text-sm lg:text-lg mb-6">{contactDescription}</p>}

            {contactLinks.length > 0 && (
                <ul className="flex justify-center gap-3">
                    {contactLinks.map((link, i) => {
                        return (
                            <li key={i}>
                                <a
                                    href={link.linkUrl}
                                    rel="noopener noreferrer"
                                    className={buttonVariants({
                                        variant: link.linkVariant,
                                    })}
                                >
                                    {link.linkTitle}
                                </a>
                            </li>
                        )
                    })}
                </ul>
            )}
        </section>
    )
}

export default ContactBlock
