import React from 'react'
import Navbar from '../Navbar'

const Homepage = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-16 mx-auto">
        <div>
          <video
            src="/investment.mp4"
            loop
            muted
            autoPlay
            className="w-full h-[40rem] object-cover"
          ></video>
        </div>
      </div>
    </div>
  )
}

export default Homepage