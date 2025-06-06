import React from "react";
import Navbar from "../Navbar";
import Image from "next/image";
import buildings4 from "@/public/buildings4.jpg";
import AnimatedText from "../AnnimatedText";

const Homepage = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-16 mx-auto">
        <div className="w-full h-screen relative">
          <div className="absolute inset-0 bg-black opacity-50 z-0" />

          <Image
            src={buildings4}
            width={1000}
            height={1000}
            alt={"public"}
            className="w-full h-screen object-cover"
          />

          <div className="container mx-auto px-4 lg:px-0">
            <div className="absolute top-44 z-20">
              <AnimatedText
                text={[
                  "BUILT",
                  "ON",
                  "TRUST,",
                  <br key="br" className="hidden lg:block" />,
                  "DRIVEN",
                  "BY",
                  "RESULTS.",
                ]}
                className="text-7xl font-bold leading-[5rem] text-white"
                delay={800}
                wordDelay={300}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
