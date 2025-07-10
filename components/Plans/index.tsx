"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  CheckCircle,
  ArrowRight
} from "lucide-react";
import { useRouter } from "next/navigation";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import { plans } from "./plans";

const getRiskColor = (risk: string) => {
  switch (risk) {
    case "Very Low":
    case "Low":
      return "bg-green-100 text-green-800";
    case "Low-Medium":
    case "Medium":
      return "bg-yellow-100 text-yellow-800";
    case "Medium-High":
      return "bg-orange-100 text-orange-800";
    case "High":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export default function InvestmentPlans() {
  const router = useRouter();
  const { user, loading } = useAuth(); // get auth state

  const handleGetStarted = (planName: string) => {
    if (loading) return; // optionally block routing until auth finishes

    const encodedPlan = encodeURIComponent(planName); // just in case

    if (user) {
      router.push(`/investments?plan=${encodedPlan}`);
    } else {
      router.push(`/register?investments=${encodedPlan}`);
    }
  };

  return (
    <section>
      <div id="plans" className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-12 px-4">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Choose Your Investment Plan
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Tailored investment strategies designed to meet your financial
              goals and risk tolerance. Start building your wealth today with
              our expertly crafted plans.
            </p>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {plans.map((plan) => {
              const IconComponent = plan.icon;
              return (
                <Card
                  key={plan.id}
                  id={plan.sectionid}
                  className={`relative overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${plan.bgColor} ${plan.borderColor} border-2`}
                >
                  {/* Popular Badge */}
                  {plan.popular && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold px-3 py-1">
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  {/* Gradient Header */}
                  <div className={`h-2 bg-gradient-to-r ${plan.gradient}`} />

                  <CardHeader className="pb-4">
                    <div className="flex items-center gap-3 mb-2">
                      <div
                        className={`p-3 rounded-full bg-gradient-to-r ${plan.gradient} text-white`}
                      >
                        <IconComponent className="w-6 h-6" />
                      </div>
                      <div>
                        <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                          {plan.name}
                          <span className="text-2xl">{plan.emoji}</span>
                        </CardTitle>
                        <p className="text-sm text-gray-600 font-medium">
                          {plan.tagline}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <Badge className={getRiskColor(plan.riskLevel)}>
                        {plan.riskLevel} Risk
                      </Badge>
                      {plan.renewable && (
                        <Badge variant="outline" className="text-xs">
                          Renewable
                        </Badge>
                      )}
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-6">
                    {/* Key Metrics */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-white rounded-lg border">
                        <p className="text-sm text-gray-600 mb-1">
                          Min Investment
                        </p>
                        <p className="text-xl font-bold text-gray-900">
                          ${plan.minInvestment.toLocaleString()}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-white rounded-lg border">
                        <p className="text-sm text-gray-600 mb-1">
                          Monthly Return
                        </p>
                        <p className="text-xl font-bold text-green-600">
                          {plan.expectedReturn}
                        </p>
                      </div>
                    </div>

                    <div className="text-center p-3 bg-white rounded-lg border">
                      <p className="text-sm text-gray-600 mb-1">Duration</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {plan.duration}
                      </p>
                    </div>

                    {/* Features */}
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">
                        Key Features:
                      </h4>
                      <ul className="space-y-2">
                        {plan.features.map((feature, index) => (
                          <li
                            key={index}
                            className="flex items-start gap-2 text-sm text-gray-700"
                          >
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Target Audience */}
                    <div className="p-3 bg-white rounded-lg border">
                      <p className="text-xs text-gray-500 mb-1">IDEAL FOR:</p>
                      <p className="text-sm font-medium text-gray-700">
                        {plan.targetAudience}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <Button
                      onClick={() => handleGetStarted(plan.name)}
                      className={`w-full bg-gradient-to-r ${plan.gradient} hover:opacity-90 text-white font-semibold py-3 transition-all duration-300 group`}
                    >
                      Get Started
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Bottom CTA */}
          <div className="text-center mt-16 p-8 bg-white rounded-2xl shadow-lg border">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Need Help Choosing the Right Plan?
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Our financial advisors are here to help you select the perfect
              investment strategy based on your goals, risk tolerance, and
              timeline.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={"/contact"}>
                <Button variant="outline" size="lg" className="font-semibold">
                  Schedule Consultation
                </Button>
              </Link>

              <Link href="/plans#compare">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold"
                >
                  Compare All Plans
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}