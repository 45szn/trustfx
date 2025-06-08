"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  Shield,
  Globe,
  Bot,
  Lock,
  CheckCircle,
  ArrowRight,
  Star,
} from "lucide-react";
import { useRouter } from "next/navigation"; // for routing
import useAuth from "@/hooks/useAuth"; // your auth hook
import Link from "next/link";

const plans = [
  {
    id: 1,
    name: "Starter Plan",
    emoji: "🌱",
    icon: Shield,
    tagline: "Perfect for Beginners",
    minInvestment: 100,
    expectedReturn: "5–8%",
    duration: "30 days",
    renewable: true,
    riskLevel: "Low",
    gradient: "from-green-400 to-emerald-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    features: [
      "Capital protected (limited risk exposure)",
      "Automated portfolio rebalancing",
      "Weekly performance reports",
      "Early withdrawal available with small fee",
    ],
    targetAudience: "Beginners, students, or cautious investors",
    popular: false,
  },
  {
    id: 2,
    name: "Growth Plan",
    emoji: "🚀",
    icon: TrendingUp,
    tagline: "Scale Your Portfolio",
    minInvestment: 500,
    expectedReturn: "10–15%",
    duration: "90 days",
    renewable: false,
    riskLevel: "Medium",
    gradient: "from-blue-400 to-indigo-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    features: [
      "Diversified portfolio (crypto, ETFs, commodities)",
      "Performance bonuses for consistent deposits",
      "Risk management tools included",
      "Free 1-on-1 consultation per month",
    ],
    targetAudience: "Intermediate investors looking for long-term growth",
    popular: true,
  },
  {
    id: 3,
    name: "Premium Plan",
    emoji: "💼",
    icon: Star,
    tagline: "Elite Investment Experience",
    minInvestment: 5000,
    expectedReturn: "20–25%",
    duration: "180 days",
    renewable: false,
    riskLevel: "Medium-High",
    gradient: "from-purple-400 to-violet-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    features: [
      "Dedicated financial advisor",
      "Real-time analytics dashboard",
      "Access to private investment opportunities",
      "Monthly investor report and quarterly audit",
    ],
    targetAudience: "High-net-worth individuals or professionals",
    popular: false,
  },
  {
    id: 4,
    name: "Impact Plan",
    emoji: "🌍",
    icon: Globe,
    tagline: "Invest for Good",
    minInvestment: 250,
    expectedReturn: "6–10%",
    duration: "60 days",
    renewable: true,
    riskLevel: "Low-Medium",
    gradient: "from-teal-400 to-cyan-600",
    bgColor: "bg-teal-50",
    borderColor: "border-teal-200",
    features: [
      "Green energy, tech for good, clean water projects",
      "Transparent project updates",
      "Certified impact investment partners",
      "Reinvest profits into ethical portfolios",
    ],
    targetAudience: "Socially-conscious investors",
    popular: false,
  },
  {
    id: 5,
    name: "Pro Trader Plan",
    emoji: "📈",
    icon: Bot,
    tagline: "AI-Powered Trading",
    minInvestment: 1000,
    expectedReturn: "25–40%",
    duration: "30–60 days",
    renewable: true,
    riskLevel: "High",
    gradient: "from-orange-400 to-red-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    features: [
      "AI-powered trading bots",
      "High-frequency trading strategies",
      "Stop-loss and exit strategy customization",
      "Daily performance tracking",
    ],
    targetAudience: "Risk-tolerant investors and active traders",
    popular: false,
  },
  {
    id: 6,
    name: "Fixed Return Plan",
    emoji: "🔐",
    icon: Lock,
    tagline: "Guaranteed Stability",
    minInvestment: 300,
    expectedReturn: "8%",
    duration: "3 months",
    renewable: false,
    riskLevel: "Very Low",
    gradient: "from-gray-400 to-slate-600",
    bgColor: "bg-gray-50",
    borderColor: "border-gray-200",
    features: [
      "Fixed interest payout (guaranteed)",
      "No market exposure",
      "Insurance-backed capital guarantee",
      "Predictable income without volatility",
    ],
    targetAudience: "Conservative investors who want stability",
    popular: false,
  },
];

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
          <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-12 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Choose Your Investment Plan
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Tailored investment strategies designed to meet your financial goals
            and risk tolerance. Start building your wealth today with our
            expertly crafted plans.
          </p>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => {
            const IconComponent = plan.icon;
            return (
              <Card
                key={plan.id}
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