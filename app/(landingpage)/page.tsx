import React from "react";
import AnimatedCounter from "./components/AnimatedCounter";
import Plans from "@/components/Plans";
import WhyTrustFx from "./components/WhyTrustfx";
import FAQSection from "./components/FAQs";
import Testimonials from "./Testimonials/page";

const Homepage = () => {
  return (
    <div>
      <div className="mx-auto">
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

        <WhyTrustFx />

        <section>
          <Plans />
        </section>

        <section>
          <div className="bg-[#16161635] py-20">
            <div className="container mx-auto px-4 xl:px-0">
              <h1 className="text-4xl font-bold text-center lg:text-5xl">
                You want to start investing with TRUSTFX?
              </h1>

              <div className="flex flex-col gap-8 my-14 lg:flex-row">
                <div className="bg-[#161616] text-white text-center rounded-xl flex flex-col gap-3 p-10 shadow-xl">
                  <div className="bg-black mx-auto rounded-full w-[3.25rem] p-3">
                    <span className="font-bold text-xl">1</span>
                  </div>
                  <p className="text-[1.4rem] font-bold">Create an account</p>
                  <p className="text-sm font-semibold">
                    Create an account providing your valid information.
                  </p>
                </div>
                <div className="bg-[#161616] text-white text-center rounded-xl flex flex-col gap-3 p-10 shadow-xl">
                  <div className="bg-black mx-auto rounded-full w-[3.25rem] p-3">
                    <span className="font-bold text-xl">2</span>
                  </div>
                  <p className="text-[1.4rem] font-bold">Choose plan</p>
                  <p className="text-sm font-semibold">
                    Make investment to get profit from our system.
                  </p>
                </div>
                <div className="bg-[#161616] text-white text-center rounded-xl flex flex-col gap-3 p-10 shadow-xl">
                  <div className="bg-black mx-auto rounded-full w-[3.25rem] p-3">
                    <span className="font-bold text-xl">3 </span>
                  </div>
                  <p className="text-[1.4rem] font-bold">Get profit</p>
                  <p className="text-sm font-semibold">
                    Withdraw your profit you earned from your investments.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <Testimonials />

        <FAQSection />
      </div>
    </div>
  );
};

export default Homepage;
