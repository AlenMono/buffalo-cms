import React from 'react'

type TestimonialBlockProps = {
    testimonialText: string;
    testimonialAuthor: string;
    testimonialPlace: string;
}

const TestimonialBlock = ({ testimonialText, testimonialAuthor, testimonialPlace }: TestimonialBlockProps) => {
    return (
        <div className='flex flex-col items-center gap-10 lg:gap-20 text-center'>
            <QuoteSvg />

            <p className='font-faustina-italic text-3xl lg:text-[44px] lg:leading-[52px]'>{testimonialText}</p>

            <div>
                <p className='font-faustina-italic text-2xl font-semibold'>{testimonialAuthor}</p>
                <p>{testimonialPlace}</p>
            </div>
        </div>
    )
}

export default TestimonialBlock

const QuoteSvg = () => {
    return <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M28.3816 13.9076V40.443C28.3732 48.4333 21.8979 54.9085 13.9077 54.9169C12.0507 54.9168 10.8901 52.9065 11.8186 51.2983C12.2496 50.552 13.0459 50.0922 13.9077 50.0922C19.2368 50.0922 23.5569 45.7721 23.5569 40.443V38.0307H5.46464C2.79999 38.0308 0.640015 35.8707 0.640015 33.2061V13.9076C0.640015 11.243 2.79999 9.08288 5.46464 9.08301H23.5569C26.2214 9.08313 28.3816 11.2432 28.3816 13.9076ZM58.5354 9.08301H40.4431C37.7784 9.08288 35.6185 11.243 35.6185 13.9076V33.2061C35.6185 35.8707 37.7784 38.0308 40.4431 38.0307H58.5354V40.443C58.5354 45.7723 54.2155 50.0925 48.8862 50.0922C47.0292 50.0923 45.8685 52.1026 46.7971 53.7108C47.228 54.4571 48.0244 54.9169 48.8862 54.9169C56.8764 54.9085 63.3517 48.4333 63.36 40.443V13.9076C63.36 11.2432 61.1999 9.08313 58.5354 9.08301Z" fill="#475049" />
    </svg>

}