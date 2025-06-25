"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Shield, Handshake, CheckCircle } from "lucide-react";
import Link from "next/link";

export default function SetUsApart() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const differentiators = [
    {
      id: 1,
      icon: BarChart3,
      title: "Data-Driven Approach",
      description:
        "We combine advanced analytics with real-world market experience to drive consistent growth.",
      features: [
        "AI-powered market analysis",
        "Real-time portfolio optimization",
        "Predictive risk modeling",
        "Performance tracking & insights",
      ],
      gradient: "from-blue-500 to-indigo-600",
      bgGradient: "from-blue-50 to-indigo-50",
    },
    {
      id: 2,
      icon: Shield,
      title: "Security First",
      description:
        "From bank-level encryption to SIPC-insured portfolios, your investments are protected at every step.",
      features: [
        "Bank-level encryption",
        "SIPC insurance up to $500,000",
        "Two-factor authentication",
        "Regular security audits",
      ],
      gradient: "from-green-500 to-emerald-600",
      bgGradient: "from-green-50 to-emerald-50",
    },
    {
      id: 3,
      icon: Handshake,
      title: "Transparent Partnership",
      description:
        "We provide regular insights, updates, and full visibility into your funds — no hidden fees or confusing terms.",
      features: [
        "Real-time portfolio visibility",
        "No hidden fees",
        "Regular performance reports",
        "24/7 customer support",
      ],
      gradient: "from-purple-500 to-violet-600",
      bgGradient: "from-purple-50 to-violet-50",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            differentiators.forEach((diff, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, diff.id]);
              }, index * 200);
            });
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
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-sm font-semibold">
            OUR ADVANTAGES
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What Sets Us Apart
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We&apos;ve built TrustFx on three core pillars that ensure your
            investment success and peace of mind.
          </p>
        </div>

        {/* Differentiators Grid */}
        <div ref={sectionRef} className="grid lg:grid-cols-3 gap-8">
          {differentiators.map((diff) => {
            const IconComponent = diff.icon;
            const isVisible = visibleCards.includes(diff.id);

            return (
              <Card
                key={diff.id}
                className={`relative overflow-hidden transition-all duration-1000 hover:shadow-2xl hover:-translate-y-2 ${
                  isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-12 scale-95"
                }`}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${diff.bgGradient} opacity-50`}
                />

                <CardContent className="relative p-8 h-full">
                  {/* Icon */}
                  <div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${diff.gradient} text-white mb-6 shadow-lg`}
                  >
                    <IconComponent className="w-8 h-8" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {diff.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {diff.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3">
                    {diff.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
            <CardContent className="p-12">
              <h3 className="text-3xl font-bold mb-4">
                Ready to Experience the Difference?
              </h3>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Join thousands of investors who&apos;ve chosen TrustFx for
                secure, transparent, and profitable investing.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href={"/register"}>
                  <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                    Start Investing Today
                  </button>
                </Link>

                <button className="px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white/10 transition-all duration-300">
                  Schedule a Consultation
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
