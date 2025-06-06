import React from 'react'
import Navbar from '../Navbar'
import Image from 'next/image'
import buildings4 from '@/public/buildings4.jpg';

const Homepage = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-16 mx-auto">
        <div className="w-full h-screen relative">
          <div className="absolute inset-0 bg-black opacity-50 z-0" />

          <Image src={buildings4} width={1000} height={1000} alt={'public'} className='w-full h-screen object-cover' />

          {/* <video
            src="/investment.mp4"
            loop
            muted
            autoPlay
            className="w-full h-[40rem] object-cover"
          ></video> */}
        </div>
      </div>
    </div>
  )
}

export default Homepage