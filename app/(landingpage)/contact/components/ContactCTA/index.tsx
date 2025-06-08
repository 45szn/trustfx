"use client";

import { useEffect, useState, useRef } from "react";
// import { Card, CardContent } from "@/components/ui/card";
import { Card, CardContent } from "../../../../../components/ui/card";
// import { Button } from "@/components/ui/button";
import { Button } from "../../../../../components/ui/button";
import { HelpCircle, ArrowRight, MessageCircle, Phone } from "lucide-react";
import Link from "next/link";

export default function ContactCTA() {
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
      <div className="container mx-auto px-4 max-w-4xl">
        <div ref={sectionRef}>
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl overflow-hidden">
            <CardContent className="p-12 text-center">
              <div
                className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
              >
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white shadow-lg">
                    <HelpCircle className="w-8 h-8" />
                  </div>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                  🧲 Need Quick Answers?
                </h2>
                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto leading-relaxed">
                  Check our FAQ section for instant answers to common questions,
                  or send us a message below. We&apos;re happy to help!
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
                  <Link href="/faq">
                    <Button className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 group">
                      Check FAQ Section
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    className="border-2 border-white/30 text-white hover:bg-white/10 backdrop-blur-sm px-8 py-4 text-lg transition-all duration-300"
                    onClick={() =>
                      window.scrollTo({ top: 0, behavior: "smooth" })
                    }
                  >
                    Send Message Above
                  </Button>
                </div>

                {/* Quick Contact Options */}
                <div className="grid md:grid-cols-2 gap-4 max-w-md mx-auto">
                  <Button
                    variant="outline"
                    className="border border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 group"
                    onClick={() => window.open("tel:+15551234567")}
                  >
                    <Phone className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Call Us
                  </Button>
                  <Button
                    variant="outline"
                    className="border border-white/30 text-white hover:bg-white/10 backdrop-blur-sm transition-all duration-300 group"
                    onClick={() => window.open("mailto:support@trustfx.com")}
                  >
                    <MessageCircle className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                    Email Us
                  </Button>
                </div>

                {/* Response Time */}
                <div className="mt-8 pt-6 border-t border-white/20">
                  <p className="text-gray-400 text-sm">
                    📧 Email responses within 24 hours • 📞 Phone support during
                    business hours
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
