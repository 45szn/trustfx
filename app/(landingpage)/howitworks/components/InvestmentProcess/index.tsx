"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  UserPlus,
  CreditCard,
  TrendingUp,
  Wallet,
  BarChart3,
  Shield,
} from "lucide-react";

const processSteps = [
  {
    id: 1,
    icon: UserPlus,
    title: "Create Your Account",
    description:
      "Sign up with your email and verify your identity. Our secure onboarding process takes just 3 minutes.",
    details: [
      "Provide basic personal information",
      "Verify your email address",
      "Complete identity verification",
      "Set up two-factor authentication",
    ],
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50",
    duration: "2-3 minutes",
  },
  {
    id: 2,
    icon: CreditCard,
    title: "Fund Your Account",
    description:
      "Deposit funds using your preferred payment method. All transactions are encrypted and secure.",
    details: [
      "Multiple payment options available",
      "Bank transfer, credit/debit cards",
      "Cryptocurrency deposits accepted",
      "Instant deposit confirmation",
    ],
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-50 to-emerald-50",
    duration: "Instant",
  },
  {
    id: 3,
    icon: TrendingUp,
    title: "Choose Your Plan",
    description:
      "Select an investment plan that matches your risk tolerance and financial goals.",
    details: [
      "6 different investment plans",
      "Risk levels from low to high",
      "Flexible investment amounts",
      "Detailed plan comparisons",
    ],
    gradient: "from-purple-500 to-violet-500",
    bgGradient: "from-purple-50 to-violet-50",
    duration: "5 minutes",
  },
  {
    id: 4,
    icon: BarChart3,
    title: "AI Optimization",
    description:
      "Our advanced AI algorithms optimize your portfolio for maximum returns while managing risk.",
    details: [
      "Real-time market analysis",
      "Automated portfolio rebalancing",
      "Risk management protocols",
      "Performance optimization",
    ],
    gradient: "from-orange-500 to-red-500",
    bgGradient: "from-orange-50 to-red-50",
    duration: "Continuous",
  },
  {
    id: 5,
    icon: Shield,
    title: "Monitor & Protect",
    description:
      "Track your investments with real-time updates and comprehensive security measures.",
    details: [
      "Live portfolio dashboard",
      "Performance analytics",
      "Security monitoring",
      "Regular reports and updates",
    ],
    gradient: "from-teal-500 to-cyan-500",
    bgGradient: "from-teal-50 to-cyan-50",
    duration: "24/7",
  },
  {
    id: 6,
    icon: Wallet,
    title: "Withdraw Profits",
    description:
      "Access your profits anytime with our flexible withdrawal system and multiple payout options.",
    details: [
      "Flexible withdrawal schedules",
      "Multiple payout methods",
      "Fast processing times",
      "No hidden withdrawal fees",
    ],
    gradient: "from-indigo-500 to-purple-500",
    bgGradient: "from-indigo-50 to-purple-50",
    duration: "1-3 days",
  },
];

export default function InvestmentProcess() {
  const [visibleSteps, setVisibleSteps] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            processSteps.forEach((step, index) => {
              setTimeout(() => {
                setVisibleSteps((prev) => [...prev, step.id]);
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
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 text-sm font-semibold">
            INVESTMENT PROCESS
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            How Your Money Works for You
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our streamlined process makes investing accessible to everyone.
            Follow these simple steps to start building your wealth.
          </p>
        </div>

        <div
          ref={sectionRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {processSteps.map((step) => {
            const IconComponent = step.icon;
            const isVisible = visibleSteps.includes(step.id);

            return (
              <Card
                key={step.id}
                className={`relative overflow-hidden transition-all duration-1000 hover:shadow-2xl hover:-translate-y-2 ${
                  isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-12 scale-95"
                }`}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${step.bgGradient} opacity-50`}
                />

                {/* Step Number */}
                <div className="absolute top-4 right-4">
                  <div
                    className={`w-8 h-8 rounded-full bg-gradient-to-r ${step.gradient} text-white flex items-center justify-center text-sm font-bold`}
                  >
                    {step.id}
                  </div>
                </div>

                <CardContent className="relative p-8 h-full">
                  <div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${step.gradient} text-white mb-6 shadow-lg`}
                  >
                    <IconComponent className="w-8 h-8" />
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {step.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {step.description}
                  </p>

                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-sm font-semibold text-gray-600">
                        PROCESS TIME
                      </span>
                      <span
                        className={`text-sm font-bold bg-gradient-to-r ${step.gradient} bg-clip-text text-transparent`}
                      >
                        {step.duration}
                      </span>
                    </div>
                  </div>

                  <ul className="space-y-2">
                    {step.details.map((detail, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <div
                          className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${step.gradient} mt-2 flex-shrink-0`}
                        />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
