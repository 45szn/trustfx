"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Award, FileCheck, Shield, Globe, CheckCircle } from "lucide-react";
import Image from "next/image";

export default function SecurityCompliance() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const certifications = [
    {
      icon: Award,
      title: "SOC 2 Type II",
      status: "In Progress",
      description:
        "Comprehensive security, availability, and confidentiality audit",
      color: "text-blue-500",
      bgColor: "bg-blue-50",
    },
    {
      icon: FileCheck,
      title: "PCI-DSS Compliant",
      status: "Certified",
      description: "Secure handling of payment card data and transactions",
      color: "text-green-500",
      bgColor: "bg-green-50",
    },
    {
      icon: Shield,
      title: "SIPC Member",
      status: "Active",
      description:
        "Securities Investor Protection Corporation coverage up to $500,000",
      color: "text-purple-500",
      bgColor: "bg-purple-50",
    },
    {
      icon: Globe,
      title: "GDPR & CCPA",
      status: "Compliant",
      description: "Full compliance with global data protection regulations",
      color: "text-indigo-500",
      bgColor: "bg-indigo-50",
    },
  ];

  const regulations = [
    "Securities and Exchange Commission (SEC) oversight",
    "Financial Industry Regulatory Authority (FINRA) member",
    "Anti-Money Laundering (AML) compliance",
    "Know Your Customer (KYC) verification processes",
    "Bank Secrecy Act (BSA) adherence",
    "International data protection standards",
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
      { threshold: 0.2 },
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
            COMPLIANCE & CERTIFICATIONS
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            🧾 Regulatory Compliance
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We maintain the highest standards of regulatory compliance and
            security certifications to protect your investments and personal
            data.
          </p>
        </div>

        <div ref={sectionRef}>
          {/* Certifications Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {certifications.map((cert, index) => {
              const IconComponent = cert.icon;
              return (
                <Card
                  key={index}
                  className={`transition-all duration-1000 hover:shadow-xl hover:-translate-y-2 ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <CardContent className="p-6 text-center">
                    <div
                      className={`inline-flex p-4 rounded-2xl ${cert.bgColor} mb-4`}
                    >
                      <IconComponent className={`w-8 h-8 ${cert.color}`} />
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">
                      {cert.title}
                    </h3>
                    <Badge
                      className={`mb-3 ${
                        cert.status === "Certified" ||
                        cert.status === "Active" ||
                        cert.status === "Compliant"
                          ? "bg-green-100 text-green-800"
                          : "bg-yellow-100 text-yellow-800"
                      }`}
                    >
                      {cert.status}
                    </Badge>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {cert.description}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Regulatory Compliance */}
          <div
            className={`transition-all duration-1000 delay-600 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Card className="bg-gradient-to-r from-slate-50 to-gray-50 border-2 border-gray-200">
              <CardContent className="p-12">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  {/* Content */}
                  <div>
                    <h3 className="text-3xl font-bold text-gray-900 mb-6">
                      Regulatory Oversight
                    </h3>
                    <p className="text-lg text-gray-700 mb-8 leading-relaxed">
                      TrustFx operates under strict regulatory oversight and
                      maintains compliance with all applicable financial
                      regulations and data protection laws.
                    </p>

                    <div className="space-y-3">
                      {regulations.map((regulation, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{regulation}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Compliance Logos */}
                  <div className="space-y-6">
                    <h4 className="text-xl font-bold text-gray-900 text-center">
                      Trusted by Regulatory Bodies
                    </h4>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-200">
                        <Image
                          src="/placeholder.svg?height=60&width=120"
                          alt="SEC Logo"
                          width={120}
                          height={60}
                          className="mx-auto mb-2 opacity-80"
                        />
                        <p className="text-sm font-semibold text-gray-700">
                          SEC Oversight
                        </p>
                      </div>
                      <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-200">
                        <Image
                          src="/placeholder.svg?height=60&width=120"
                          alt="SIPC Logo"
                          width={120}
                          height={60}
                          className="mx-auto mb-2 opacity-80"
                        />
                        <p className="text-sm font-semibold text-gray-700">
                          SIPC Member
                        </p>
                      </div>
                      <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-200">
                        <Image
                          src="/placeholder.svg?height=60&width=120"
                          alt="FINRA Logo"
                          width={120}
                          height={60}
                          className="mx-auto mb-2 opacity-80"
                        />
                        <p className="text-sm font-semibold text-gray-700">
                          FINRA Member
                        </p>
                      </div>
                      <div className="bg-white rounded-xl p-6 text-center shadow-lg border border-gray-200">
                        <Image
                          src="/placeholder.svg?height=60&width=120"
                          alt="PCI DSS Logo"
                          width={120}
                          height={60}
                          className="mx-auto mb-2 opacity-80"
                        />
                        <p className="text-sm font-semibold text-gray-700">
                          PCI DSS Certified
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
