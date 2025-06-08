"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Shield, Users, ArrowRight, Star } from "lucide-react";

export default function PlansCTA() {
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
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 max-w-6xl">
        <div ref={sectionRef}>
          {/* Main CTA Card */}
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl overflow-hidden">
            <CardContent className="p-12 text-center">
              <div
                className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full text-white shadow-lg">
                    <Star className="w-8 h-8" />
                  </div>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  Ready to Start Your Investment Journey?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                  Join thousands of successful investors who&apos;ve chosen
                  TrustFx to grow their wealth. Start with any plan and upgrade
                  as your portfolio grows.
                </p>

                {/* Benefits */}
                <div className="grid md:grid-cols-3 gap-6 mb-10">
                  <div className="flex items-center justify-center gap-3 text-white">
                    <Shield className="w-6 h-6 text-green-400" />
                    <span className="font-semibold">SIPC Insured</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-white">
                    <TrendingUp className="w-6 h-6 text-blue-400" />
                    <span className="font-semibold">Proven Returns</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-white">
                    <Users className="w-6 h-6 text-purple-400" />
                    <span className="font-semibold">Expert Support</span>
                  </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 group">
                    Start Investing Today
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button
                    variant="outline"
                    className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg transition-all duration-300"
                  >
                    Schedule Consultation
                  </Button>
                </div>

                {/* Trust Indicators */}
                <div className="mt-10 pt-8 border-t border-white/20">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-400 mb-1">
                        15,000+
                      </div>
                      <div className="text-sm text-gray-300">
                        Active Investors
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-400 mb-1">
                        $50M+
                      </div>
                      <div className="text-sm text-gray-300">
                        Assets Managed
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-400 mb-1">
                        4.9/5
                      </div>
                      <div className="text-sm text-gray-300">
                        Customer Rating
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-yellow-400 mb-1">
                        5 Years
                      </div>
                      <div className="text-sm text-gray-300">Track Record</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Secondary CTA */}
          <div
            className={`mt-12 text-center transition-all duration-1000 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <p className="text-gray-300 mb-4">
              Not sure which plan is right for you? Our advisors can help you
              choose.
            </p>
            <Button
              variant="outline"
              className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300"
            >
              Get Personalized Recommendations
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
