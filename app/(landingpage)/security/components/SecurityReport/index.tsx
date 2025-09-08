"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  Mail,
  Phone,
  Shield,
  Clock,
  ArrowRight,
} from "lucide-react";

export default function SecurityReport() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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
    <section className="py-20 bg-gradient-to-br from-slate-900 via-red-900 to-purple-900">
      <div className="container mx-auto px-4 max-w-6xl">
        <div ref={sectionRef}>
          {/* Header */}
          <div className="text-center mb-16">
            <Badge className="mb-4 bg-gradient-to-r from-red-400 to-orange-500 text-white px-4 py-2 text-sm font-semibold">
              SECURITY REPORTING
            </Badge>
            <h2
              className={`text-4xl md:text-5xl font-bold text-white mb-6 transition-all duration-1000 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              📬 Report a Security Issue
            </h2>
            <p
              className={`text-xl text-gray-300 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              If you suspect any suspicious activity or have security concerns,
              we want to hear from you immediately. Your vigilance helps keep
              our entire community safe.
            </p>
          </div>

          {/* Emergency Contact */}
          <div
            className={`mb-12 transition-all duration-1000 delay-500 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Card className="bg-red-600/20 backdrop-blur-lg border-2 border-red-500/30 shadow-2xl">
              <CardContent className="p-8">
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-red-500 rounded-full text-white animate-pulse">
                    <AlertTriangle className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">
                      Emergency Security Contact
                    </h3>
                    <p className="text-red-200">
                      For immediate security concerns or suspected breaches
                    </p>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="bg-white/10 rounded-lg p-6 border border-white/20">
                    <div className="flex items-center gap-3 mb-4">
                      <Mail className="w-6 h-6 text-red-400" />
                      <h4 className="text-lg font-semibold text-white">
                        Security Email
                      </h4>
                    </div>
                    <p className="text-red-200 mb-3">trustradefxcustomerservice@gmail.com</p>
                    <p className="text-sm text-gray-300">
                      Monitored 24/7 for immediate response
                    </p>
                    <Button
                      className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold transition-all duration-300"
                      onClick={() => window.open("mailto:trustradefxcustomerservice@gmail.com")}
                    >
                      Send Security Email
                      <Mail className="w-4 h-4 ml-2" />
                    </Button>
                  </div>

                  <div className="bg-white/10 rounded-lg p-6 border border-white/20">
                    <div className="flex items-center gap-3 mb-4">
                      <Phone className="w-6 h-6 text-red-400" />
                      <h4 className="text-lg font-semibold text-white">
                        Emergency Hotline
                      </h4>
                    </div>
                    <p className="text-red-200 mb-3">+1 (845) 866-6018</p>
                    <p className="text-sm text-gray-300">
                      Available 24/7 for urgent security matters
                    </p>
                    <Button
                      className="w-full mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold transition-all duration-300"
                      onClick={() => window.open("tel:+18458666018")}
                    >
                      Call Emergency Line
                      <Phone className="w-4 h-4 ml-2" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* What to Report */}
          <div
            className={`grid lg:grid-cols-2 gap-8 mb-12 transition-all duration-1000 delay-700 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-orange-500 rounded-full text-white">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    What to Report
                  </h3>
                </div>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                    <span>
                      Suspicious account activity or unauthorized transactions
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                    <span>Phishing emails or suspicious communications</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                    <span>
                      Potential security vulnerabilities in our platform
                    </span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                    <span>Unusual login attempts or account access issues</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full mt-2"></div>
                    <span>Any other security-related concerns</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-blue-500 rounded-full text-white">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="text-xl font-bold text-white">
                    Response Times
                  </h3>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-white">
                        Critical Security Issues
                      </span>
                      <span className="text-red-400 font-bold\">1 Hour</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      Immediate response for account breaches or fraud
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-white">
                        High Priority Issues
                      </span>
                      <span className="text-orange-400 font-bold">4 Hours</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      Platform vulnerabilities and security concerns
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-semibold text-white">
                        General Security Inquiries
                      </span>
                      <span className="text-blue-400 font-bold">24 Hours</span>
                    </div>
                    <p className="text-sm text-gray-300">
                      Security questions and general concerns
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Bug Bounty Program */}
          <div
            className={`transition-all duration-1000 delay-900 ${
              isVisible
                ? "opacity-100 translate-y-0"
                : "opacity-0 translate-y-8"
            }`}
          >
            <Card className="bg-gradient-to-r from-green-600/20 to-blue-600/20 backdrop-blur-lg border border-white/20">
              <CardContent className="p-12 text-center">
                <div className="flex justify-center mb-6">
                  <div className="p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full text-white shadow-lg">
                    <Shield className="w-8 h-8" />
                  </div>
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Bug Bounty Program
                </h3>
                <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
                  Security researchers can report vulnerabilities for rewards.
                  Help us keep our platform secure and earn recognition for your
                  contributions.
                </p>
                <div className="grid md:grid-cols-3 gap-6 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400 mb-2">
                      $500 - $5,000
                    </div>
                    <div className="text-sm text-gray-300">Reward Range</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400 mb-2">
                      24/7
                    </div>
                    <div className="text-sm text-gray-300">
                      Submission Review
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400 mb-2">
                      Hall of Fame
                    </div>
                    <div className="text-sm text-gray-300">Recognition</div>
                  </div>
                </div>
                <Button className="bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold px-8 py-4 text-lg transition-all duration-300 hover:scale-105 group">
                  Learn About Bug Bounty
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
