'use client'

import React from 'react'

type Iframe = {
    iframeTitle?: string
    iframeUrl: string
    iframeWidth?: string
    iframeHeight?: string
}


export const IframeBlock: React.FC<Iframe> = ({ iframeUrl, iframeTitle, iframeWidth, iframeHeight }) => {
    return (
        <section className="max-w-[1320px] mx-auto flex flex-col gap-10">
            <div key={iframeTitle} className="flex flex-col gap-4">
                {iframeTitle && (
                    <h3 className="text-2xl font-bold text-gray-900">{iframeTitle}</h3>
                )}

                <div className='bg-surface border border-gold-light p-3 rounded-lg '>
                    <div className="w-full relative rounded-lg overflow-hidden" style={{ paddingBottom: '56.25%', height: 0 }}>
                        <iframe
                            src={iframeUrl}
                            width={iframeWidth || '560'}
                            height={iframeHeight || '315'}
                            className="absolute top-0 left-0 w-full h-full"
                            allowFullScreen
                            sandbox="allow-scripts allow-same-origin allow-forms allow-downloads"
                            title={iframeTitle}
                        ></iframe>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default IframeBlock
