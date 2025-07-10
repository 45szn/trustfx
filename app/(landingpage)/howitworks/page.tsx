"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Play,
  Smartphone,
  Globe,
  Clock,
  HeadphonesIcon,
  Bell,
  Lock,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import InvestmentProcess from "./components/InvestmentProcess";
import { Card, CardContent } from "@/components/ui/card";
import SecurityProcess from "./components/SecurityProcess";
import FAQSection from "@/components/FAQs";

const features = [
  {
    icon: Smartphone,
    title: "Mobile-First Design",
    description:
      "Access your investments anywhere with our responsive web platform and mobile-optimized interface.",
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Globe,
    title: "Global Markets",
    description:
      "Invest in diverse markets worldwide including stocks, crypto, commodities, and emerging markets.",
    gradient: "from-green-500 to-emerald-500",
  },
  {
    icon: Clock,
    title: "Real-Time Updates",
    description:
      "Get instant notifications about your portfolio performance and market opportunities.",
    gradient: "from-purple-500 to-violet-500",
  },
  {
    icon: HeadphonesIcon,
    title: "24/7 Support",
    description:
      "Our expert support team is available around the clock to assist with any questions or concerns.",
    gradient: "from-orange-500 to-red-500",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description:
      "Receive personalized notifications about market movements and investment opportunities.",
    gradient: "from-teal-500 to-cyan-500",
  },
  {
    icon: Lock,
    title: "Bank-Level Security",
    description:
      "Your data and funds are protected with military-grade encryption and multi-layer security.",
    gradient: "from-indigo-500 to-purple-500",
  },
];

export default function HowItWorksHero() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 text-sm font-semibold">
            HOW IT WORKS
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Your Journey to
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Financial Freedom
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Discover how TrustFx makes investing simple, secure, and profitable.
            From account creation to portfolio growth, we guide you every step
            of the way.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/register">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
              >
                Start Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>

            <Button
              variant="outline"
              size="lg"
              className="border-2 border-gray-300 text-gray-700 px-8 py-4 text-lg font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
            >
              <Play className="w-5 h-5 mr-2" />
              Watch Demo
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">
              3 Min
            </div>
            <div className="text-gray-600">Account Setup</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
              $100
            </div>
            <div className="text-gray-600">Minimum Start</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-purple-600 mb-2">
              24/7
            </div>
            <div className="text-gray-600">Support Available</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-orange-600 mb-2">
              15K+
            </div>
            <div className="text-gray-600">Happy Investors</div>
          </div>
        </div>
      </div>

      <InvestmentProcess />

      <section className="py-20 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-sm font-semibold">
              PLATFORM FEATURES
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Built for Modern Investors
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform combines cutting-edge technology with user-friendly
              design to deliver an exceptional investment experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <Card
                  key={index}
                  className="hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-2 border-gray-100 hover:border-gray-200"
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
          </div>
        </div>
      </section>

      <SecurityProcess />

      <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 text-sm font-semibold">
              GET STARTED TODAY
            </Badge>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Ready to Begin Your Investment Journey?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Join thousands of successful investors who have chosen TrustFx as
              their trusted investment partner.
            </p>
          </div>

          <Card className="bg-white shadow-2xl border-2 border-gray-100">
            <CardContent className="p-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-6">
                    What You Get:
                  </h3>
                  <ul className="space-y-4">
                    {[
                      "Professional portfolio management",
                      "Real-time performance tracking",
                      "24/7 customer support",
                      "SIPC insurance protection",
                      "No hidden fees or charges",
                      "Flexible withdrawal options",
                    ].map((benefit, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                        <span className="text-gray-700 text-lg">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="text-center">
                  <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-8">
                    <div className="text-4xl font-bold text-gray-900 mb-2">
                      $100
                    </div>
                    <div className="text-gray-600 mb-4">Minimum Investment</div>
                    <div className="text-2xl font-bold text-green-600 mb-2">
                      Up to 25%
                    </div>
                    <div className="text-gray-600">Monthly Returns</div>
                  </div>

                  <Link href="/register">
                    <Button
                      size="lg"
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                      Create Account Now
                      <ArrowRight className="w-5 h-5 ml-2" />
                    </Button>
                  </Link>

                  <p className="text-sm text-gray-500 mt-4">
                    Account setup takes less than 3 minutes
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <FAQSection />
    </section>
  );
}
