import React from "react";
import Navbar from "../../../components/Navbar";
import Image from "next/image";
import buildings4 from "@/public/buildings4.jpg";
import AnimatedText from "../components/AnimatedText";
import Link from "next/link";
import { Button } from "../../../components/ui/button";
import AnimatedCounter from "../components/AnimatedCounter";
import Plans from "@/components/Plans";

const Homepage = () => {
  return (
    <div>
      <Navbar />
      <div className="mt-16 mx-auto">
        <section>
          <div className="w-full h-screen relative">
            <div className="absolute inset-0 bg-black opacity-50 z-0" />

            <Image
              src={buildings4}
              width={1000}
              height={1000}
              alt={"public"}
              className="w-full h-screen object-cover"
            />

            <div className="container mx-auto px-4 xl:px-0">
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
                    <br key="br" />,
                    <div key={"link"}>
                      <Link href={"/register"}>
                        <Button className="bg-white w-80 text-gray-900 hover:text-gray-50 hover:bg-gray-800 font-semibold transition-all mt-8 py-8 text-xl lg:mt-16">
                          Get Started
                        </Button>
                      </Link>
                    </div>,
                  ]}
                  className="text-5xl font-bold leading-[5rem] text-white lg:text-7xl"
                  delay={500}
                  wordDelay={500}
                />
              </div>
            </div>
          </div>
        </section>

        <section>
          <div className="container mx-auto px-4 my-20 lg:px-0 lg:my-40">
            <div className="flex flex-col justify-between items-center gap-10 space-x-1 lg:flex-row">
              <div className="w-64 text-center font-bold">
                <p className="text-2xl mb-[0.35rem] lg:text-4xl">
                  <AnimatedCounter end={10341} duration={2500} delay={200} />
                </p>
                <p>Total investors in 2022</p>
              </div>

              <div className="w-64 text-center font-bold">
                <p className="text-2xl mb-[0.35rem] lg:text-4xl">
                  <AnimatedCounter
                    end={625430}
                    duration={2500}
                    delay={400}
                    prefix="$"
                  />
                </p>
                <p>Total deposit in June</p>
              </div>

              <div className="w-64 text-center font-bold">
                <p className="text-2xl mb-[0.35rem] lg:text-4xl">
                  <AnimatedCounter
                    end={1210500}
                    duration={2500}
                    delay={600}
                    prefix="$"
                  />
                </p>
                <p>Total withdraw in June</p>
              </div>

              <div className="w-64 text-center font-bold">
                <p className="text-2xl mb-[0.35rem] lg:text-4xl">
                  <AnimatedCounter
                    end={3435200}
                    duration={2500}
                    delay={800}
                    prefix="$"
                  />
                </p>
                <p>Total deposit in 2022</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <Plans />
        </section>
      </div>
    </div>
  );
};

export default Homepage;
