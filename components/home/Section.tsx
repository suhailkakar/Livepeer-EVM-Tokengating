import React from 'react'
import { TracingBeam } from '../ui/tracing-beam'
import { MeteorsDemo } from './MeteorsDemo'
import { BackgroundGradientDemo } from './BackgroundGradientDemo'

const Section = () => {
    return (
        <TracingBeam className="px-12 md:px-6 w-full">
            <div className='my-16 space-y-12'>
                <div className='space-y-2'>
                    <h3 className='text-3xl'>
                        Peeling the Tech
                    </h3>
                    <p className='text-gray-700'>
                        No Bananas uses cutting-edge AI to moderate live streams in real-time, ensuring a safe viewing experience free from unwanted surprises. Join us in making live streaming fun and safe for all.
                    </p>
                </div>
                <div className='flex flex-col md:flex-row items-center justify-center md:justify-start gap-4 md:gap-8'>
                    <BackgroundGradientDemo title='Livepper' description='Leveraging robust streaming infrastructure for seamless content delivery, while maintaining decentralization.' image='/assets/livepeer.svg' />
                    <BackgroundGradientDemo title='Tensor Flow' description='Utilizing advanced AI to intelligently moderate content in real-time, ensuring no bananas are broadcasted' image='/assets/tensorflow.svg' />

                </div>
            </div>
            <div className='space-y-8'>
                <div className='space-y-2'>
                    <h3 className='text-3xl'>
                        Empowering Safe Streaming
                    </h3>
                    <p className='text-gray-700'>
                        With No Bananas, streamers and audiences can enjoy content without the worry of inappropriate material. By leveraging advanced machine learning, our tool automatically identifies and censors sensitive content, fostering a more inclusive online space.
                    </p>
                </div>
                <div className='grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8'>
                    <MeteorsDemo title='Real-Time Moderation' description='Instant banana 🍌 detection and censorship, keeping streams PG friendly' />
                    <MeteorsDemo title='Decentralized live streaming' description='Tailor moderation levels to fit your needs, from strict to more relaxed settings' />
                    <MeteorsDemo title='Community Trust' description='Build and maintain trust within your viewer base by providing consistently safe viewing experiences' />
                </div>
            </div>
        </TracingBeam>

    )
}

export default Section