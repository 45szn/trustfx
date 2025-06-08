"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

export default function PlansComparison() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const plans = [
    {
      name: "Starter Plan",
      minInvestment: "$100",
      returns: "5–8%",
      advisorSupport: false,
      reports: "Basic",
      withdrawal: "After 30 days",
      popular: false,
      gradient: "from-green-400 to-emerald-600",
    },
    {
      name: "Growth Plan",
      minInvestment: "$500",
      returns: "10–15%",
      advisorSupport: "Email Support",
      reports: "Standard",
      withdrawal: "Flexible",
      popular: true,
      gradient: "from-blue-400 to-indigo-600",
    },
    {
      name: "Premium Plan",
      minInvestment: "$5,000",
      returns: "20–25%",
      advisorSupport: "Dedicated Advisor",
      reports: "Advanced",
      withdrawal: "Custom Terms",
      popular: false,
      gradient: "from-purple-400 to-violet-600",
    },
    {
      name: "Pro Trader Plan",
      minInvestment: "$1,000",
      returns: "25–40%",
      advisorSupport: "AI + Human Support",
      reports: "Real-time Analytics",
      withdrawal: "Flexible",
      popular: false,
      gradient: "from-orange-400 to-red-600",
    },
    {
      name: "Impact Plan",
      minInvestment: "$250",
      returns: "6–10%",
      advisorSupport: "Email Support",
      reports: "Impact Reports",
      withdrawal: "After 60 days",
      popular: false,
      gradient: "from-teal-400 to-cyan-600",
    },
    {
      name: "Fixed Return Plan",
      minInvestment: "$300",
      returns: "8% (Fixed)",
      advisorSupport: "Basic Support",
      reports: "Monthly Statements",
      withdrawal: "After 3 months",
      popular: false,
      gradient: "from-gray-400 to-slate-600",
    },
  ];

  const features = [
    { label: "Min. Investment", key: "minInvestment" },
    { label: "Monthly Returns", key: "returns" },
    { label: "Advisor Support", key: "advisorSupport" },
    { label: "Reports & Insights", key: "reports" },
    { label: "Withdrawal Terms", key: "withdrawal" },
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
    <section id="compare" className="py-20 bg-gradient-to-br from-slate-50 to-gray-100">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-sm font-semibold">
            PLAN COMPARISON
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Compare All Plans
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find the perfect plan for your investment goals. Compare features,
            returns, and support levels across all our offerings.
          </p>
        </div>

        {/* Comparison Table */}
        <div ref={sectionRef} className="overflow-x-auto">
          <div className="min-w-full">
            {/* Desktop View */}
            <div className="hidden lg:block">
              <Card className="overflow-hidden">
                <CardContent className="p-0">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-50 border-b">
                        <th className="text-left p-6 font-semibold text-gray-900">
                          Feature
                        </th>
                        {plans.map((plan, index) => (
                          <th key={index} className="text-center p-6 relative">
                            {plan.popular && (
                              <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                                Most Popular
                              </Badge>
                            )}
                            <div className="font-bold text-gray-900 mt-2">
                              {plan.name}
                            </div>
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {features.map((feature, featureIndex) => (
                        <tr
                          key={featureIndex}
                          className={`border-b transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
                          style={{ transitionDelay: `${featureIndex * 100}ms` }}
                        >
                          <td className="p-6 font-medium text-gray-900">
                            {feature.label}
                          </td>
                          {plans.map((plan, planIndex) => (
                            <td key={planIndex} className="p-6 text-center">
                              {feature.key === "advisorSupport" ? (
                                plan[feature.key as keyof typeof plan] ===
                                false ? (
                                  <X className="w-5 h-5 text-red-500 mx-auto" />
                                ) : (
                                  <div className="text-sm font-medium text-gray-700">
                                    {
                                      plan[
                                        feature.key as keyof typeof plan
                                      ] as string
                                    }
                                  </div>
                                )
                              ) : (
                                <div className="text-sm font-medium text-gray-700">
                                  {
                                    plan[
                                      feature.key as keyof typeof plan
                                    ] as string
                                  }
                                </div>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                      <tr>
                        <td className="p-6"></td>
                        {plans.map((plan, index) => (
                          <td key={index} className="p-6 text-center">
                            <Button
                              className={`w-full bg-gradient-to-r ${plan.gradient} text-white font-semibold transition-all duration-300 hover:scale-105`}
                            >
                              Choose Plan
                            </Button>
                          </td>
                        ))}
                      </tr>
                    </tbody>
                  </table>
                </CardContent>
              </Card>
            </div>

            {/* Mobile View */}
            <div className="lg:hidden space-y-6">
              {plans.map((plan, index) => (
                <Card
                  key={index}
                  className={`transition-all duration-1000 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-xl">{plan.name}</CardTitle>
                      {plan.popular && (
                        <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                          Most Popular
                        </Badge>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex justify-between items-center"
                      >
                        <span className="font-medium text-gray-700">
                          {feature.label}:
                        </span>
                        <span className="text-gray-900">
                          {feature.key === "advisorSupport" &&
                          plan[feature.key as keyof typeof plan] === false ? (
                            <X className="w-5 h-5 text-red-500" />
                          ) : (
                            (plan[feature.key as keyof typeof plan] as string)
                          )}
                        </span>
                      </div>
                    ))}
                    <Button
                      className={`w-full bg-gradient-to-r ${plan.gradient} text-white font-semibold transition-all duration-300 hover:scale-105 mt-4`}
                    >
                      Choose Plan
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
