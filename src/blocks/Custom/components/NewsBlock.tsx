import { getNews } from '@/utilities/getNews'
import Image from 'next/image'
import Link from 'next/link'

export default async function NewsBlock() {
    const news = await getNews()

    return (
        <section className="bg-cream">
            <div className="max-w-[1128px] mx-auto px-6">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-3xl font-serif italic">News & Announcements</h2>
                    <Link href="/posts" className="border px-4 py-2 rounded">
                        Read All News
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {news?.map((item: any) => {
                        return (
                            <Link
                                href={`/posts/${item.slug}`}
                                key={item.id}
                                className="flex flex-col border border-primary-dark bg-background-light rounded-lg overflow-hidden p-4 min-h-[360px]"
                            >
                                {item.heroImage.url && (
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
                                    <h3 className="text-xl font-semibold mt-1 font-faustina">{item.title}</h3>
                                    <p className="flex items-end text-sm text-brand mt-4 flex-1">
                                        {new Date(item.publishedAt).toLocaleDateString()}
                                    </p>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
