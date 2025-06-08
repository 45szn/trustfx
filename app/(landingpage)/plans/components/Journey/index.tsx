"use client";

import { useEffect, useState, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, Users, ArrowRight } from "lucide-react";
import AnimatedText from "@/components/AnimatedText";

export default function Journey() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10" />

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-blue-500/20 rounded-full blur-xl animate-pulse" />
      <div className="absolute top-40 right-20 w-32 h-32 bg-purple-500/20 rounded-full blur-xl animate-pulse delay-1000" />
      <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-pink-500/20 rounded-full blur-xl animate-pulse delay-2000" />

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <div ref={sectionRef} className="text-center">
          {/* Header */}
          <div className="mb-12">
            <Badge className="mb-6 bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 text-sm font-semibold">
              INVESTMENT PLANS
            </Badge>

            <AnimatedText
              text={["Choose", "Your", "Investment", "Journey"]}
              className="text-4xl md:text-6xl font-bold text-white leading-tight mb-8"
              delay={300}
              wordDelay={200}
            />

            <div
              className={`transition-all duration-1000 delay-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
            >
              <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto mb-8">
                From beginners to seasoned investors, we have the perfect plan
                to match your goals, risk tolerance, and investment timeline.
              </p>
              <p className="text-lg text-gray-400 leading-relaxed max-w-3xl mx-auto">
                Every plan is designed with security, transparency, and your
                financial success in mind.
              </p>
            </div>
          </div>

          {/* Quick Benefits */}
          <div
            className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 transition-all duration-1000 delay-1500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-center">
              <div className="flex justify-center mb-3">
                <Shield className="w-8 h-8 text-green-400" />
              </div>
              <div className="text-lg font-semibold text-white mb-2">
                SIPC Insured
              </div>
              <div className="text-sm text-gray-300">
                Up to $500,000 protection
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-center">
              <div className="flex justify-center mb-3">
                <TrendingUp className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-lg font-semibold text-white mb-2">
                Proven Returns
              </div>
              <div className="text-sm text-gray-300">
                5-40% monthly potential
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 text-center">
              <div className="flex justify-center mb-3">
                <Users className="w-8 h-8 text-purple-400" />
              </div>
              <div className="text-lg font-semibold text-white mb-2">
                Expert Support
              </div>
              <div className="text-sm text-gray-300">
                Dedicated advisors available
              </div>
            </div>
          </div>

          {/* CTA */}
          <div
            className={`transition-all duration-1000 delay-2000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 group">
              Explore All Plans
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
