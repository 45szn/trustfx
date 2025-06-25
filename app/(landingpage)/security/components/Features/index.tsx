"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Lock,
  Shield,
  Smartphone,
  Cloud,
  UserCheck,
  Database,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

export default function SecurityFeatures() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const securityFeatures = [
    {
      id: 1,
      icon: Lock,
      title: "🔒 Data Encryption",
      description:
        "All data transmitted between your device and our servers is protected using 256-bit SSL encryption — the same level used by major banks and financial institutions.",
      features: [
        "256-bit SSL encryption for all data transmission",
        "End-to-end encryption for sensitive information",
        "Data encrypted both in transit and at rest",
        "Regular encryption key rotation",
      ],
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
    },
    {
      id: 2,
      icon: UserCheck,
      title: "🧑‍💻 Account Protection",
      description:
        "Multi-layered account security with advanced authentication methods and continuous monitoring to keep your account safe.",
      features: [
        "Two-Factor Authentication (2FA) for all accounts",
        "Biometric support (Face ID, fingerprint login)",
        "Session monitoring for unusual activity",
        "Device recognition and alerts",
      ],
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
    },
    {
      id: 3,
      icon: Cloud,
      title: "🛡️ Infrastructure Security",
      description:
        "Enterprise-grade infrastructure with continuous security monitoring and regular penetration testing by top cybersecurity firms.",
      features: [
        "Hosted on secure cloud providers (AWS/GCP)",
        "Regular penetration testing by security experts",
        "Bug bounty program for vulnerability discovery",
        "24/7 infrastructure monitoring",
      ],
      gradient: "from-purple-500 to-violet-500",
      bgGradient: "from-purple-50 to-violet-50",
    },
    {
      id: 4,
      icon: Database,
      title: "👥 Privacy & Data Handling",
      description:
        "We uphold your data rights with full transparency, limited data collection, and strict privacy controls.",
      features: [
        "GDPR & CCPA compliant data handling",
        "Limited data collection (only what's necessary)",
        "User anonymity protection",
        "No data sharing with third parties",
      ],
      gradient: "from-indigo-500 to-blue-500",
      bgGradient: "from-indigo-50 to-blue-50",
    },
    {
      id: 5,
      icon: AlertTriangle,
      title: "⚠️ Fraud Prevention",
      description:
        "AI-powered fraud detection and multi-layered verification processes to protect against unauthorized activities.",
      features: [
        "AI-powered fraud detection algorithms",
        "Real-time transaction monitoring",
        "Multi-layered verification for large transactions",
        "24/7 fraud response team",
      ],
      gradient: "from-red-500 to-pink-500",
      bgGradient: "from-red-50 to-pink-50",
    },
    {
      id: 6,
      icon: Smartphone,
      title: "📱 Mobile Security",
      description:
        "Advanced mobile security features including biometric authentication and secure app architecture.",
      features: [
        "Biometric authentication (Face ID, Touch ID)",
        "App-level encryption and security",
        "Secure mobile API endpoints",
        "Mobile device management",
      ],
      gradient: "from-teal-500 to-cyan-500",
      bgGradient: "from-teal-50 to-cyan-50",
    },
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            securityFeatures.forEach((feature, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, feature.id]);
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
    <section className="py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 text-sm font-semibold">
            SECURITY MEASURES
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Comprehensive Security Features
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Every aspect of our platform is designed with security in mind. From
            data encryption to fraud prevention, we&apos;ve got you covered.
          </p>
        </div>

        {/* Security Features Grid */}
        <div
          ref={sectionRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {securityFeatures.map((feature) => {
            const IconComponent = feature.icon;
            const isVisible = visibleCards.includes(feature.id);

            return (
              <Card
                key={feature.id}
                className={`relative overflow-hidden transition-all duration-1000 hover:shadow-xl hover:-translate-y-2 ${
                  isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-12 scale-95"
                }`}
              >
                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.bgGradient} opacity-50`}
                />

                <CardContent className="relative p-8 h-full">
                  {/* Icon */}
                  <div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} text-white mb-6 shadow-lg`}
                  >
                    <IconComponent className="w-8 h-8" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {feature.description}
                  </p>

                  {/* Features List */}
                  <ul className="space-y-3">
                    {feature.features.map((item, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-1 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Security Promise */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-green-600 to-blue-600 text-white border-0">
            <CardContent className="p-12 text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-white/20 rounded-full">
                  <Shield className="w-8 h-8 text-white" />
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-4">🙌 Your Trust Matters</h3>
              <p className="text-xl text-green-100 mb-8 max-w-3xl mx-auto">
                We understand that trust is earned — and security is how we keep
                it. At TrustFx, every line of code and every decision is made
                with your protection in mind.
              </p>
              <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">Bank-Level</div>
                  <div className="text-sm text-green-100">
                    Security Standards
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">24/7</div>
                  <div className="text-sm text-green-100">Monitoring</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold mb-1">Zero</div>
                  <div className="text-sm text-green-100">Data Breaches</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
