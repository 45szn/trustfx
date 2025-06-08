"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  Lock,
  FileText,
  ArrowUpDown,
  Monitor,
  CheckCircle,
} from "lucide-react";

export default function PlansIncluded() {
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const features = [
    {
      id: 1,
      icon: Lock,
      title: "Encrypted Transactions & 2FA Security",
      description:
        "Bank-level encryption and two-factor authentication protect every transaction",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      id: 2,
      icon: Shield,
      title: "SIPC-Insured Portfolios",
      description:
        "U.S. stock assets protected up to $500,000 by SIPC insurance",
      gradient: "from-green-500 to-emerald-500",
    },
    {
      id: 3,
      icon: FileText,
      title: "Transparent Reporting & No Hidden Fees",
      description:
        "Complete visibility into your investments with clear, honest fee structure",
      gradient: "from-purple-500 to-violet-500",
    },
    {
      id: 4,
      icon: ArrowUpDown,
      title: "Flexible Withdrawal Options",
      description:
        "Withdraw anytime based on your plan terms and investment timeline",
      gradient: "from-orange-500 to-red-500",
    },
    {
      id: 5,
      icon: Monitor,
      title: "TrustFx Investor Portal Access",
      description:
        "24/7 access to your dashboard, analytics, and investment management tools",
      gradient: "from-indigo-500 to-purple-500",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            features.forEach((feature, index) => {
              setTimeout(() => {
                setVisibleItems((prev) => [...prev, feature.id]);
              }, index * 150);
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
          <Badge className="mb-4 bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 text-sm font-semibold">
            STANDARD FEATURES
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            What&apos;s Included With Every Plan
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            No matter which plan you choose, you&apos;ll get these essential
            features that make TrustFx the trusted choice for smart investors.
          </p>
        </div>

        {/* Features Grid */}
        <div
          ref={sectionRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {features.map((feature) => {
            const IconComponent = feature.icon;
            const isVisible = visibleItems.includes(feature.id);

            return (
              <Card
                key={feature.id}
                className={`transition-all duration-1000 hover:shadow-xl hover:-translate-y-2 ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
              >
                <CardContent className="p-8 text-center">
                  <div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white mb-6 shadow-lg`}
                  >
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            );
          })}

          {/* Additional Benefits Card */}
          <Card className="md:col-span-2 lg:col-span-1 bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-100">
            <CardContent className="p-8 text-center">
              <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-500 text-white mb-6 shadow-lg">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Plus Much More
              </h3>
              <ul className="text-left space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Real-time portfolio tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Mobile app access</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Educational resources</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Community forum access</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
