"use client";

import { useEffect, useState, useRef } from "react";
import {
  Shield,
  Lock,
  FileCheck,
  Heart,
  CheckCircle,
  TrendingUp,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CTASection from "../CTA";

const features = [
  {
    id: 1,
    icon: Shield,
    title: "Bank Level Security",
    description:
      "We use state-of-the-art data encryption when handling your financial information and two-factor authentication (2FA) protection. We're backed by top financial market operators and we not only meet traditional banking security standards, we exceed them.",
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50",
    delay: 0,
  },
  {
    id: 2,
    icon: Lock,
    title: "SIPC Insured",
    description:
      "Your US stocks portfolio is insured by the United States SIPC up to $500,000.",
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-50 to-emerald-50",
    delay: 200,
  },
  {
    id: 3,
    icon: FileCheck,
    title: "Covered by US SEC",
    description:
      "Our payment processor Flutterwave is PADSS & PCIDSS compliant satisfying the highest level of security audit available.",
    gradient: "from-purple-500 to-violet-500",
    bgGradient: "from-purple-50 to-violet-50",
    delay: 400,
  },
  {
    id: 4,
    icon: Heart,
    title: "Partnership Approach",
    description:
      "Your investment isn't just a transaction — it's a partnership. At TrustFx, we're here to grow with you. Every dollar you commit is matched by our dedication to transparency, strategy, and shared success.",
    gradient: "from-rose-500 to-pink-500",
    bgGradient: "from-rose-50 to-pink-50",
    delay: 600,
  },
];

const stats = [
  { label: "Security Audits", value: "99.9%", suffix: " Uptime" },
  { label: "Protected Assets", value: "$500K", suffix: " SIPC Coverage" },
  { label: "Compliance Level", value: "AAA", suffix: " Rating" },
  { label: "Trust Score", value: "5.0", suffix: "/5.0" },
];

export default function WhyTrustFx() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [visibleStats, setVisibleStats] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === sectionRef.current) {
              // Stagger the card animations
              features.forEach((feature) => {
                setTimeout(() => {
                  setVisibleCards((prev) => [...prev, feature.id]);
                }, feature.delay);
              });
            }
            if (entry.target === statsRef.current) {
              setVisibleStats(true);
            }
          }
        });
      },
      { threshold: 0.2 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    if (statsRef.current) observer.observe(statsRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-gray-50 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header with animated entrance */}
        <div className="text-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 blur-3xl -z-10" />
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 text-sm font-semibold">
            TRUSTED BY THOUSANDS
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
            Why Invest with TrustFx?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your financial security and success are our top priorities.
            Here&apos;s why thousands of investors trust us with their financial
            future.
          </p>
        </div>

        {/* Animated Stats Bar */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16 p-6 bg-white rounded-2xl shadow-lg border"
        >
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center transition-all duration-1000 ease-out ${
                visibleStats
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                {stat.value}
                <span className="text-lg text-gray-600">{stat.suffix}</span>
              </div>
              <div className="text-sm text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Feature Cards */}
        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16"
        >
          {features.map((feature) => {
            const IconComponent = feature.icon;
            const isVisible = visibleCards.includes(feature.id);

            return (
              <Card
                key={feature.id}
                className={`relative overflow-hidden transition-all duration-1000 ease-out transform ${
                  isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-12 scale-95"
                } hover:shadow-2xl hover:-translate-y-2 group`}
              >
                {/* Animated background gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-50 group-hover:opacity-70 transition-opacity duration-500`}
                />

                {/* Floating particles effect */}
                <div className="absolute inset-0 overflow-hidden">
                  <div
                    className={`absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br ${feature.gradient} rounded-full opacity-10 group-hover:opacity-20 transition-all duration-700 group-hover:scale-110`}
                  />
                  <div
                    className={`absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-full opacity-10 group-hover:opacity-20 transition-all duration-700 group-hover:scale-110`}
                  />
                </div>

                <CardContent className="relative p-8 h-full">
                  <div className="flex items-start gap-4 mb-6">
                    <div
                      className={`p-4 rounded-2xl bg-gradient-to-br ${feature.gradient} text-white shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110`}
                    >
                      <IconComponent className="w-8 h-8" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2 group-hover:text-gray-800 transition-colors">
                        {feature.title}
                      </h3>
                      {feature.id === 2 && (
                        <Badge className="mb-3 bg-green-100 text-green-800 hover:bg-green-200">
                          Up to $500,000 Coverage
                        </Badge>
                      )}
                      {feature.id === 3 && (
                        <Badge className="mb-3 bg-purple-100 text-purple-800 hover:bg-purple-200">
                          SEC Compliant
                        </Badge>
                      )}
                    </div>
                  </div>

                  <p className="text-gray-700 leading-relaxed text-lg group-hover:text-gray-800 transition-colors">
                    {feature.description}
                  </p>

                  {/* Animated check mark for partnership */}
                  {feature.id === 4 && (
                    <div className="mt-6 flex items-center gap-3 text-green-600">
                      <CheckCircle className="w-5 h-5" />
                      <span className="font-semibold">
                        Let&apos;s build something valuable — and lasting —
                        together.
                      </span>
                    </div>
                  )}
                </CardContent>

                {/* Hover border effect */}
                <div
                  className={`absolute inset-0 border-2 border-transparent group-hover:border-gradient-to-r group-hover:${feature.gradient} rounded-lg transition-all duration-500 opacity-0 group-hover:opacity-100`}
                />
              </Card>
            );
          })}
        </div>

        {/* Bottom CTA with animated elements */}
        <CTASection
          title="Ready to Start Your Investment Journey?"
          description="Join thousands of satisfied investors who trust TrustFx with their financial future. Your success is our mission."
          primaryAction={{
            label: "Start Investing Today",
            href: "/register",
            icon: <TrendingUp className="w-5 h-5" />,
          }}
          secondaryAction={{
            label: "Learn More About Security",
            href: "/security",
          }}
          variant="light"
        />
      </div>
    </section>
  );
}
