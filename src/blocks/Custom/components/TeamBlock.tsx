import React from 'react'

interface TeamMember {
    name: string
    info?: string
    email?: string
}

interface TeamBlockProps {
    teamTitle?: string
    teamList?: TeamMember[]
}

const TeamBlock: React.FC<TeamBlockProps> = ({
    teamTitle,
    teamList,
}) => {
    if (!teamList || teamList.length === 0) return null

    return (
        <section>
            {teamTitle && (
                <p className="text-2xl md:text-3xl font-bold font-satoshi text-brand mb-5">{teamTitle}</p>
            )}
            <div className="grid gap-4 md:grid-cols-2">
                {teamList.map((member, index) => (
                    <div key={index} className="bg-background-light rounded-lg border border-primary-dark px-5 pt-3 pb-4">
                        <h3 className="text-2xl font-semibold font-faustina text-brand">{member.name}</h3>
                        {member.info && (
                            <p className="text-brand-30 text-sm mt-2">{member.info}</p>
                        )}
                        {member.email && (
                            <div className='flex items-center gap-2 mt-6'>
                                <EmailSendIcon />
                                <p className='text-sm font-bold font-satoshi text-brand-30'>
                                    {member.email}
                                </p>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </section>
    )
}

export default TeamBlock

const EmailSendIcon = () => {
    return (
        <svg width="16" height="20" viewBox="0 0 16 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1427_12549)">
                <path d="M15.74 2.15332C15.634 2.06883 15.5058 2.01693 15.3709 2.00391C15.236 1.99089 15.1002 2.01732 14.98 2.07998L0.553332 9.76665C0.38085 9.85961 0.238569 9.99998 0.143291 10.1712C0.0480133 10.3424 0.00371724 10.5373 0.0156339 10.7329C0.0275505 10.9284 0.095182 11.1165 0.210542 11.2749C0.325902 11.4333 0.484173 11.5553 0.666665 11.6267L2.84 12.5467C2.82985 12.6017 2.82985 12.6582 2.84 12.7133L4.50667 17.2067C4.57527 17.393 4.68856 17.5597 4.8366 17.692C4.98465 17.8244 5.16291 17.9184 5.35576 17.9658C5.54861 18.0132 5.75014 18.0125 5.94267 17.9638C6.1352 17.9152 6.31284 17.82 6.46 17.6867L8.72667 15.18C8.75099 15.1544 8.78253 15.1369 8.81708 15.1298C8.85163 15.1226 8.88753 15.1262 8.92 15.14L11.02 16.0333C11.1567 16.0928 11.3042 16.1235 11.4533 16.1235C11.6024 16.1235 11.7499 16.0928 11.8867 16.0333C12.0222 15.9696 12.142 15.8769 12.2376 15.7617C12.3333 15.6464 12.4024 15.5116 12.44 15.3667L16 2.86665C16.0344 2.73542 16.0279 2.59682 15.9815 2.46936C15.935 2.3419 15.8508 2.23164 15.74 2.15332ZM3.89333 12.7L10.3533 7.33332C10.3677 7.31755 10.3852 7.30495 10.4047 7.29634C10.4242 7.28772 10.4453 7.28326 10.4667 7.28326C10.488 7.28326 10.5091 7.28772 10.5286 7.29634C10.5481 7.30495 10.5656 7.31755 10.58 7.33332C10.5956 7.34708 10.6081 7.36401 10.6167 7.38297C10.6252 7.40194 10.6297 7.42251 10.6297 7.44332C10.6297 7.46413 10.6252 7.4847 10.6167 7.50366C10.6081 7.52263 10.5956 7.53955 10.58 7.55332L5.76666 13.46C5.71142 13.5272 5.67465 13.6076 5.66 13.6933L5.24 16.3267L3.89333 12.7Z" fill="#949D92" />
            </g>
            <defs>
                <clipPath id="clip0_1427_12549">
                    <rect width="16" height="16" fill="white" transform="translate(0 2)" />
                </clipPath>
            </defs>
        </svg>

    )
}