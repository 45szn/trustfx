"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Globe, Shield } from "lucide-react";

export default function ContactInfo() {
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
    <section className="py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 text-sm font-semibold">
            COMPANY INFO
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our Office & Information
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Learn more about TrustFx, our location, and how we operate to serve
            our global investor community.
          </p>
        </div>

        <div
          ref={sectionRef}
          className="grid lg:grid-cols-2 gap-12 items-center"
        >
          {/* Office Information */}
          <div
            className={`transition-all duration-1000 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
          >
            <Card className="shadow-xl border-2 border-gray-100">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    TrustFx Headquarters
                  </h3>
                </div>

                <div className="space-y-4 mb-8">
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="font-semibold text-gray-900 mb-2">
                      Address:
                    </div>
                    <div className="text-gray-700">
                      123 Market Street, Suite 10B
                      <br />
                      New York, NY 10004
                      <br />
                      United States
                    </div>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="font-semibold text-gray-900 mb-2">
                      Business Registration:
                    </div>
                    <div className="text-gray-700">
                      Licensed financial services provider
                      <br />
                      SEC Regulated • SIPC Member
                    </div>
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <div className="text-2xl font-bold text-blue-600 mb-1">
                      5+
                    </div>
                    <div className="text-sm text-gray-600">
                      Years Experience
                    </div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      15K+
                    </div>
                    <div className="text-sm text-gray-600">Global Clients</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Additional Information */}
          <div
            className={`space-y-6 transition-all duration-1000 delay-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}
          >
            {/* Operating Hours */}
            <Card className="shadow-lg border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg text-white">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">
                    Operating Hours
                  </h4>
                </div>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Monday - Friday:</span>
                    <span className="font-semibold text-gray-900">
                      9:00 AM - 6:00 PM EST
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Saturday - Sunday:</span>
                    <span className="font-semibold text-gray-900">
                      10:00 AM - 3:00 PM EST
                    </span>
                  </div>
                  <div className="text-sm text-gray-600 mt-3 p-3 bg-yellow-50 rounded-lg">
                    <strong>Note:</strong> Limited support on weekends. For
                    urgent matters, please email us and we&apos;ll respond as
                    soon as possible.
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Global Reach */}
            <Card className="shadow-lg border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-r from-purple-500 to-violet-500 rounded-lg text-white">
                    <Globe className="w-5 h-5" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">
                    Global Reach
                  </h4>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">
                      Serving clients in 45+ countries
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">
                      24/7 platform availability
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">
                      Multi-language support
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Security & Compliance */}
            <Card className="shadow-lg border border-gray-200">
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg text-white">
                    <Shield className="w-5 h-5" />
                  </div>
                  <h4 className="text-xl font-bold text-gray-900">
                    Security & Compliance
                  </h4>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">
                      SIPC insured up to $500,000
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Bank-level encryption</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">
                      Regular security audits
                    </span>
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
