import Image from 'next/image'
import PhoneIcon from '@/components/ui/icons/PhoneIcon'
import ClockIcon from '@/components/ui/icons/ClockIcon'
import LocationIcon from '@/components/ui/icons/LocationIcon'
import { getCemeteries } from '@/utilities/getCemeteries'
import Link from 'next/link'

interface CemeteryItem {
    id?: string | number
    name: string
    detailsLink: string
    address?: string
    phone?: string | null
    workingHours?: {
        weekday?: string | null
        weekend?: string | null
    }
    image?: {
        url: string
        alt?: string | null
    }
}

interface CemeteryLocationsProps {
    layout?: 'list' | 'preview'
    cemeteryLayout?: 'list' | 'preview'
    cemeteries?: BlockCemeteryItem[]
    pageSlug?: string
}

interface BlockCemeteryItem {
    cemeteryTitle?: string
    cemeteryAddress?: string
    cemeteryPhone?: string
    hoursWeekdays?: string
    hoursSaturday?: string
    detailsLink?: string
    image?: { url?: string; alt?: string } | number | null
}

const CemeteryLocationsBlock = async ({
    cemeteryLayout = 'list',
    pageSlug,
}: CemeteryLocationsProps) => {
    const cemeteries: CemeteryItem[] = await getCemeteries()
    if (!cemeteries || cemeteries.length === 0) return null

    if (cemeteryLayout === 'preview') {
        const selected = cemeteries.find(cem => cem.detailsLink === pageSlug) as BlockCemeteryItem | undefined
        if (!selected) return null

        return (
            <div className='relative'>
                <div className="max-w-[1128px] mx-auto">
                    <h2 className="text-4xl lg:text-5xl xl:text-6xl font-faustina mb-16">
                        <span className='font-semibold italic'>{selected.cemeteryTitle?.split(' Cemetery')[0]}</span> Cemetery
                    </h2>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
                        {selected.cemeteryAddress && (
                            <div>
                                <div className='flex items-center gap-4 mb-3'>
                                    <LocationIcon fill="#2A322B" className='min-w-5 h-5 w-5' />
                                    <h4 className="font-semibold text-brand-10 text-xl">Location</h4>
                                </div>

                                <p className="text-lg pl-9 underline">{selected.cemeteryAddress}</p>
                            </div>
                        )}

                        {(selected.hoursWeekdays || selected.hoursSaturday) && (
                            <div >
                                <div className='flex items-center gap-4 mb-3'>
                                    <ClockIcon fill="#2A322B" className='min-w-5 h-5 w-5' />
                                    <h4 className="font-semibold text-brand-10 text-xl">Working hours</h4>
                                </div>

                                {selected.hoursWeekdays && <p className="text-lg pl-9">Mon - Fri: {selected.hoursWeekdays}</p>}
                                {selected.hoursSaturday && <p className="text-lg pl-9">Sat: {selected.hoursSaturday}</p>}
                            </div>
                        )}

                        {selected.cemeteryPhone && (
                            <div>
                                <div className='flex items-center gap-4 mb-3'>
                                    <PhoneIcon fill="#2A322B" className='min-w-5 h-5 w-5' />
                                    <h4 className="font-semibold text-brand-10 text-xl">Contact</h4>
                                </div>

                                <p className="text-lg pl-9 flex items-center gap-2">
                                    Phone:
                                    <a href={`tel:${selected.cemeteryPhone}`} className="underline">
                                        {selected.cemeteryPhone}
                                    </a>
                                </p>
                            </div>
                        )}
                    </div>
                </div>

                <Image
                    src="/img/low-impact/hero-right.svg"
                    alt="Floral"
                    width={411}
                    height={628}
                    className="-right-52  scale-75 lg:scale-100 absolute -top-16 lg:-right-20 object-contain z-[-1]"
                />
            </div>
        )
    }

    return (
        <section className="py-16">
            <div className="container mx-auto px-4">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                    {cemeteries.map((cemetery) => (
                        <div
                            key={cemetery.id}
                            className="flex rounded-lg p-5 bg-background-light border border-primary-dark"
                        >
                            {cemetery.image?.url && (
                                <div className="relative w-40 h-full shrink-0 mr-4">
                                    <Image
                                        src={cemetery.image.url}
                                        alt={cemetery.image.alt || cemetery.name}
                                        fill
                                        className="object-cover rounded-md"
                                    />
                                </div>
                            )}

                            <div className="flex flex-col justify-between gap-4 flex-1">
                                <h3 className="text-xl font-faustina">{cemetery.name}</h3>

                                {cemetery.address && (
                                    <div className="flex gap-2">
                                        <LocationIcon className="min-w-4" />
                                        <p className="text-sm">{cemetery.address}</p>
                                    </div>
                                )}

                                {(cemetery.workingHours?.weekday || cemetery.workingHours?.weekend) && (
                                    <div className="flex gap-2">
                                        <ClockIcon className="min-w-4" />

                                        {cemetery.workingHours?.weekday && (
                                            <div className="text-sm text-brand-30 flex-1">
                                                <p>Mon–Fri:</p>
                                                <p>{cemetery.workingHours.weekday}</p>
                                            </div>
                                        )}

                                        {cemetery.workingHours?.weekend && (
                                            <div className="text-sm text-brand-30 flex-1">
                                                <p>Sat–Sun:</p>
                                                <p>{cemetery.workingHours.weekend}</p>
                                            </div>
                                        )}
                                    </div>
                                )}

                                <div className="flex justify-between items-center">
                                    {cemetery.phone && (
                                        <div className="flex gap-2">
                                            <PhoneIcon className="min-w-4" />
                                            <p className="text-sm font-bold">{cemetery.phone}</p>
                                        </div>
                                    )}

                                    <div className="flex-1 flex justify-end">
                                        <Link href={cemetery.detailsLink} className="px-0 text-bold text-[#E89A1E]">
                                            Details →
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default CemeteryLocationsBlock
