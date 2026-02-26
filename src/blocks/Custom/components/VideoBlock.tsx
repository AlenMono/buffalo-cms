import React from 'react'

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

                <div className="bg-surface border border-gold-light p-3 rounded-lg">
                    <div className="w-full relative rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%', height: 0 }}>
                        <video
                            src={videoUrl}
                            poster={videoPoster}
                            controls
                            className="absolute top-0 left-0 w-full h-full object-cover"
                            title={videoTitle}
                            aria-label={videoTitle}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default VideoBlock
