import React from 'react'
import Video from 'next-video';

type VideoBlockProps = {
    videoTitle?: string
    videoUrl: string
    videoPoster?: string
}

export const VideoBlock: React.FC<VideoBlockProps> = ({ videoUrl, videoTitle, videoPoster }) => {
    if (!videoUrl) return null

    return (
        <section className="max-w-[1320px] mx-auto flex flex-col gap-10">
            <div className="flex flex-col gap-4">
                {videoTitle && (
                    <h3 className="text-2xl font-bold text-brand">{videoTitle}</h3>
                )}

                <div className="bg-background-light border border-primary-dark p-3 rounded-lg">
                    <Video
                        src={videoUrl}
                        poster={videoPoster}
                        controls
                        height={630}
                        title={videoTitle}
                        blurDataURL='https://i.postimg.cc/FHYWP62s/Untitled-design.png'
                    />
                </div>
            </div>
        </section>
    )
}

export default VideoBlock
