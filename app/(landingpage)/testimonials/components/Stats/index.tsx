"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  DollarSign,
  ThumbsUp,
  Star,
  TrendingUp,
  Shield,
  Globe,
  Award,
} from "lucide-react";
import AnimatedCounter from "@/components/AnimatedCounter";

export default function TestimonialsStats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats = [
    {
      icon: Users,
      value: 15000,
      suffix: "+",
      label: "Active Users",
      description: "Investors trust us with their financial future",
      gradient: "from-blue-500 to-cyan-500",
      delay: 0,
    },
    {
      icon: DollarSign,
      value: 50,
      prefix: "$",
      suffix: "M+",
      label: "Total Invested",
      description: "Assets under management through TrustFx",
      gradient: "from-green-500 to-emerald-500",
      delay: 200,
    },
    {
      icon: ThumbsUp,
      value: 96,
      suffix: "%",
      label: "User Satisfaction",
      description: "Customer satisfaction rate based on surveys",
      gradient: "from-purple-500 to-violet-500",
      delay: 400,
    },
    {
      icon: Star,
      value: 4.9,
      suffix: "/5.0",
      label: "Average Rating",
      description: "Rated by real investors on our platform",
      gradient: "from-yellow-500 to-orange-500",
      delay: 600,
    },
    {
      icon: TrendingUp,
      value: 127,
      suffix: "%",
      label: "Average Returns",
      description: "Average portfolio growth across all plans",
      gradient: "from-pink-500 to-rose-500",
      delay: 800,
    },
    {
      icon: Shield,
      value: 500,
      prefix: "$",
      suffix: "K",
      label: "SIPC Coverage",
      description: "Maximum insurance protection per account",
      gradient: "from-indigo-500 to-blue-500",
      delay: 1000,
    },
    {
      icon: Globe,
      value: 45,
      suffix: "+",
      label: "Countries",
      description: "Global reach with investors worldwide",
      gradient: "from-teal-500 to-cyan-500",
      delay: 1200,
    },
    {
      icon: Award,
      value: 99.9,
      suffix: "%",
      label: "Uptime",
      description: "Platform reliability and availability",
      gradient: "from-red-500 to-pink-500",
      delay: 1400,
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.1 },
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 text-sm font-semibold">
            PROVEN RESULTS
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            The Numbers Speak for Themselves
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our success is measured by your success. Here are the metrics that
            matter most to our investor community.
          </p>
        </div>

        {/* Stats Grid */}
        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <Card
                key={index}
                className={`transition-all duration-1000 hover:shadow-xl hover:-translate-y-2 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${stat.delay}ms` }}
              >
                <CardContent className="p-8 text-center">
                  {/* Icon */}
                  <div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${stat.gradient} text-white mb-6 shadow-lg`}
                  >
                    <IconComponent className="w-8 h-8" />
                  </div>

                  {/* Value */}
                  <div className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                    {isVisible && (
                      <AnimatedCounter
                        end={stat.value}
                        duration={2500}
                        delay={stat.delay + 500}
                        prefix={stat.prefix}
                        suffix={stat.suffix}
                      />
                    )}
                  </div>

                  {/* Label */}
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {stat.label}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {stat.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div
          className={`mt-16 transition-all duration-1000 delay-1600 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <CardContent className="p-12 text-center">
              <h3 className="text-3xl font-bold mb-4">
                Ready to Join Our Success Story?
              </h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Become part of a community that&apos;s redefining what it means
                to invest with confidence and achieve real results.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Start Your Investment Journey
                </button>
                <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300">
                  Read More Stories
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}