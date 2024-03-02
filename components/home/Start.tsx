import Link from 'next/link'

const Start = () => {
    return (
        <div className="relative w-full md:min-h-80 mb-12 mt-32 px-6 md:px-0">
            <div
                style={{ background: 'linear-gradient(94deg, #FFF2A2 0%, #FFFDF3 100%)', boxShadow: '5px 5px 40px rgba(249, 209, 44, .3)', borderRadius: 50 }}
                className="max-w-6xl mx-auto h-96 md:h-72 shadow flex flex-col-reverse md:flex-row items-center px-6 md:p-16 md:gap-4 md:pr-0 pt-4 pb-8">
                <div className='space-y-4 w-full'>
                    <div className="text-slate-950 text-4xl md:text-5xl font-bold capitalize leading-10">Ready To Start?</div>
                    <div className="text-slate-950 text-base font-normal ">
                        Get started with No Bananas and enjoy a safe streaming experience.
                    </div>
                    <Link href='/nodes' target='_blank' className="px-12 py-3 md:py-4 bg-white rounded-3xl backdrop-blur-lg justify-start items-center gap-1 inline-flex hover:shadow-lg hover:shadow-white/30 transition-all duration-300 hover:scale-95 group"
                    >
                        <span className="text-slate-950 text-base font-bold leading-snug group-hover:scale-95 transition-all duration-100">Start Now</span>
                    </Link>

                </div>
                {/* <Image src={chip} alt="Chip" width={500} height={500} className="w-64 md:w-2/5 md:mb-36 md:-mr-16" /> */}
            </div>
        </div>
    )
}

export default Start