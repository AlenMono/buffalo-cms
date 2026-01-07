import RichText from '@/components/RichText'
import { cn } from '@/utilities/ui'
import React from 'react'

type BenefitCard = {
  heading: string
  subheading: string
  icon?: string
}

type PlanningBlockProps = {
  benefitTitle: any
  benefits: BenefitCard[]
  benefitLayout?: 'vertical' | 'horizontal'
  benefitDescription?: string
  benefitNote?: any
}

export const BenefitBlock: React.FC<PlanningBlockProps> = ({
  benefitTitle,
  benefits,
  benefitLayout,
  benefitDescription,
  benefitNote,
}) => {
  const getGridCols = (length: number) => {
    switch (length) {
      case 1: return 'md:grid-cols-1'
      case 2: return 'md:grid-cols-2'
      case 3: return 'md:grid-cols-3'
      case 4: return 'md:grid-cols-4'
      case 5: return 'md:grid-cols-5'
      case 6: return 'md:grid-cols-6'
      default: return 'md:grid-cols-1'
    }
  }

  if (benefitLayout === 'horizontal') {
    return (
      <div className='max-w-[1128px] mx-auto'>
        {benefitTitle && (
          <div className='mb-10 md:mb-16'>
            <RichText
              data={benefitTitle}
              paragraphClassName="!text-2xl lg:!text-4xl leading-[32px] lg:!leading-[44px] xl:!text-[44px] xl:leading-[52px]"
              h1ClassName="!text-2xl lg:!text-4xl leading-[32px] lg:!leading-[44px] xl:!text-[44px] xl:leading-[52px]"
            />
          </div>
        )}

        <div className={cn('grid grid-cols-1', getGridCols(benefits.length), 'gap-12 flex-1')}>
          {benefits.map((card, idx) => (
            <div key={idx} className="flex gap-2">
              <CheckIcon className="mt-1 min-w-5" />
              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{card.heading}</h3>
                <p className="text-brand-30">{card.subheading}</p>
              </div>
            </div>
          ))}
        </div>

        {benefitNote && <div className='mt-10 md:mt-16'><RichText data={benefitNote} paragraphClassName='font-satoshi text-lg' /></div>}
      </div>
    )
  }

  return (
    <section className="max-w-[1125px] mx-auto">
      <div className="flex flex-wrap justify-between gap-10">
        <div className="xl:max-w-[457px] flex flex-col justify-between gap-10">
          {benefitTitle && (
            <RichText
              data={benefitTitle}
              paragraphClassName="!text-2xl lg:!text-4xl leading-[32px] lg:!leading-[44px] xl:!text-[44px] xl:leading-[52px]"
              h1ClassName="!text-2xl lg:!text-4xl leading-[32px] lg:!leading-[44px] xl:!text-[44px] xl:leading-[52px]"
            />
          )}

          {benefitDescription && <p className="text-brand-30 xl:max-w-[266px]">{benefitDescription}</p>}
        </div>

        <div className="flex flex-col gap-10 xl:gap-12 max-w-[495px]">
          {benefits.map((card, idx) => (
            <div key={idx} className="flex gap-2">
              <CheckIcon className="mt-1 min-w-5" />

              <div className="flex flex-col gap-4">
                <h3 className="text-xl font-semibold">{card.heading}</h3>
                <p className="text-brand-30">{card.subheading}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#clip0_380_228)">
        <path
          d="M18.5628 7.7967C18.2329 7.45195 17.8916 7.0967 17.763 6.78433C17.644 6.4982 17.637 6.02395 17.63 5.56458C17.6169 4.71058 17.6029 3.74283 16.93 3.06995C16.2571 2.39708 15.2894 2.38308 14.4354 2.36995C13.976 2.36295 13.5018 2.35595 13.2156 2.23695C12.9041 2.10833 12.548 1.76708 12.2033 1.4372C11.5995 0.857076 10.9135 0.199951 10 0.199951C9.08651 0.199951 8.40139 0.857076 7.79676 1.4372C7.45201 1.76708 7.09676 2.10833 6.78439 2.23695C6.50001 2.35595 6.02401 2.36295 5.56464 2.36995C4.71064 2.38308 3.74289 2.39708 3.07001 3.06995C2.39714 3.74283 2.38751 4.71058 2.37001 5.56458C2.36301 6.02395 2.35601 6.4982 2.23701 6.78433C2.10839 7.09583 1.76714 7.45195 1.43726 7.7967C0.857137 8.40045 0.200012 9.08645 0.200012 9.99995C0.200012 10.9135 0.857137 11.5986 1.43726 12.2032C1.76714 12.548 2.10839 12.9032 2.23701 13.2156C2.35601 13.5017 2.36301 13.976 2.37001 14.4353C2.38314 15.2893 2.39714 16.2571 3.07001 16.93C3.74289 17.6028 4.71064 17.6168 5.56464 17.6299C6.02401 17.6369 6.49826 17.644 6.78439 17.763C7.09589 17.8916 7.45201 18.2328 7.79676 18.5627C8.40051 19.1428 9.08651 19.7999 10 19.7999C10.9135 19.7999 11.5986 19.1428 12.2033 18.5627C12.548 18.2328 12.9033 17.8916 13.2156 17.763C13.5018 17.644 13.976 17.6369 14.4354 17.6299C15.2894 17.6168 16.2571 17.6028 16.93 16.93C17.6029 16.2571 17.6169 15.2893 17.63 14.4353C17.637 13.976 17.644 13.5017 17.763 13.2156C17.8916 12.9041 18.2329 12.548 18.5628 12.2032C19.1429 11.5995 19.8 10.9135 19.8 9.99995C19.8 9.08645 19.1429 8.40133 18.5628 7.7967ZM13.9953 8.3952L9.09526 13.2952C8.82183 13.5689 8.37819 13.5689 8.10476 13.2952L6.00476 11.1952C5.62352 10.814 5.79795 10.163 6.31874 10.0234C6.56043 9.95866 6.81833 10.0278 6.99526 10.2047L8.60001 11.8103L13.0048 7.4047C13.386 7.02346 14.037 7.19789 14.1765 7.71868C14.2413 7.96037 14.1722 8.21826 13.9953 8.3952Z"
          fill="#2A322B"
        />
      </g>
      <defs>
        <clipPath id="clip0_380_228">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}
