import React from 'react'
import Image from 'next/image'
import RichText from '@/components/RichText'

interface SignatureBlockProps {
  heading: any
  body: any
  cardBackground?: ('default' | 'flowers') | null
  signatureName: string
  signatureTitle: string
  signatureImage?: {
    url: string
    alt?: string
    width?: number
    height?: number
  }
}

const SignatureBlock = (props: SignatureBlockProps) => {
  const { heading, body, signatureImage, signatureTitle, signatureName } = props

  return (
    <section className="container py-12">
      <div className="max-w-[1128px] mx-auto space-y-16">
        <RichText
          data={heading}
          paragraphClassName="!text-2xl md:!text-4xl leading-[32px] md:!leading-[44px] xl:!text-[44px] xl:leading-[52px]"
          h1ClassName="!text-2xl md:!text-4xl leading-[32px] md:!leading-[44px] xl:!text-[44px] xl:leading-[52px]"
        />

        {body && (
          <div className="flex justify-between flex-col md:flex-row gap-6">
            <div className="text-base max-w-[650px]">
              <RichText
                data={body}
                className="text-left"
                paragraphClassName="text-2xl font-satoshi text-brand-30"
              />
            </div>

            <div className="min-w-[300px] w-[300px] h-[200px] relative flex flex-col justify-center">
              {signatureImage && signatureImage?.url && (
                <div className="inline-block absolute right-0">
                  <Image
                    src={signatureImage.url}
                    alt="Signature"
                    width={300}
                    height={200}
                    className="object-contain"
                  />
                </div>
              )}
              <div className="z-10">
                <div className="text-2xl font-semibold font-faustina-italic italic text-left text-text-primary">
                  {signatureName}
                </div>
                <div className="text-base text-brand text-left">{signatureTitle}</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default SignatureBlock
