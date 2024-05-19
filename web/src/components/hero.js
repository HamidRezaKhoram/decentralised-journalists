'use client'
import Image from 'next/image';
import { useState, useEffect } from 'react'

export default function Hero() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section
            id='home'
            className={`main pt-5 pb-4 min-h-[75vh] md:min-h-[79vh] xl:min-h-[75vh] center flex-col items-center justify-center h-screen transition-all duration-1000 ease-out transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
                }`}
        >
            <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl'>Decentralised Journalists</h1>
            <Image
                src={`/logo-globe.png`}
                alt="Globe Logo for Decentralised Journalists"
                width={1000}
                height={1000}
                className="w-[90%] md:w-[50%] lg:w-[30%] d-inline-block align-text-top"
                priority={true}
            />
            <p className='my-1 text-lg lg:text-xl'>Shielded and Secure Journalism</p>
            <hr className="border-0 h-0.5 my-4 w-full mx-auto bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
        </section>
    );
}