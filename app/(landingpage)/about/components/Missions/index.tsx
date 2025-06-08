"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, Heart, Lightbulb, Users } from "lucide-react";

export default function AboutMission() {
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
    <section className="py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div ref={sectionRef} className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 text-sm font-semibold">
            OUR PURPOSE
          </Badge>
          <h2
            className={`text-4xl md:text-5xl font-bold text-gray-900 mb-6 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            Our Mission
          </h2>
          <div
            className={`max-w-4xl mx-auto transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
          >
            <p className="text-xl text-gray-600 leading-relaxed mb-8">
              We believe that investing shouldn&apos;t be a gamble — it should
              be a smart, guided journey toward financial independence. Our
              mission is to make high-quality investment opportunities
              accessible to everyone, not just the wealthy few.
            </p>
          </div>
        </div>

        {/* Mission Values */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: Target,
              title: "Purpose-Driven",
              description:
                "Every investment strategy is designed with your long-term financial goals in mind.",
              gradient: "from-blue-500 to-cyan-500",
              delay: 0,
            },
            {
              icon: Heart,
              title: "People First",
              description:
                "We put our investors' success and security above everything else.",
              gradient: "from-red-500 to-pink-500",
              delay: 200,
            },
            {
              icon: Lightbulb,
              title: "Innovation",
              description:
                "Leveraging cutting-edge technology to deliver superior investment outcomes.",
              gradient: "from-yellow-500 to-orange-500",
              delay: 400,
            },
            {
              icon: Users,
              title: "Accessibility",
              description:
                "Making professional-grade investing available to everyone, regardless of wealth.",
              gradient: "from-green-500 to-emerald-500",
              delay: 600,
            },
          ].map((value, index) => {
            const IconComponent = value.icon;
            return (
              <Card
                key={index}
                className={`transition-all duration-1000 hover:shadow-xl hover:-translate-y-2 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${value.delay}ms` }}
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${value.gradient} text-white mb-6 shadow-lg`}
                  >
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Mission Statement Card */}
        <div
          className={`mt-16 transition-all duration-1000 delay-800 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-100">
            <CardContent className="p-12 text-center">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  &quot;Democratizing wealth creation through intelligent,
                  secure, and transparent investing.&quot;
                </h3>
                <p className="text-lg text-gray-700 leading-relaxed">
                  At TrustFx, we&apos;re not just managing investments —
                  we&apos;re building a community of empowered investors who
                  have the tools, knowledge, and support they need to achieve
                  financial independence.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
