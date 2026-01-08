import { buttonVariants } from '@/components/ui/button'
import { CardPostData } from '@/components/Card'
import { getNews } from '@/utilities/getNews'
import Image from 'next/image'
import Link from 'next/link'

export default async function NewsBlock() {
    const news = await getNews()

    return (
        <section>
            <div className="max-w-[1128px] mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="section-title"><span className='italic font-semibold'>News</span> & Announcements</h2>
                    <Link href="/posts" className={buttonVariants({ variant: 'outline', size: 'md' })}>
                        Read All News
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {news?.map((item: CardPostData) => {
                        return (
                            <Link
                                href={`/posts/${item.slug}`}
                                key={item.id}
                                className="flex flex-col border border-primary-dark bg-background-light rounded-lg overflow-hidden p-4 min-h-[360px] card-hovered"
                            >
                                {item.heroImage && typeof item.heroImage === 'object' && item.heroImage.url && (
                                    <Image
                                        src={item.heroImage.url}
                                        alt={item.title}
                                        width={400}
                                        height={180}
                                        className="w-full h-48 object-cover rounded-lg"
                                    />
                                )}
                                <div className="flex flex-col flex-1 pt-4">
                                    <p className="text-sm text-brand font-bold">{item.publisher}</p>
                                    <h3 className="text-lg md:text-xl font-semibold mt-1 font-faustina">{item.title}</h3>
                                    {item.publishedAt && (
                                        <p className="flex items-end text-sm text-brand mt-4 flex-1">
                                            {new Date(item.publishedAt).toLocaleDateString()}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
