"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Mail,
  Phone,
  MessageCircle,
  Clock,
  ExternalLink,
  Copy,
} from "lucide-react";

export default function ContactOptions() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const contactOptions = [
    {
      id: 1,
      sectionid: "emailsupport",
      icon: Mail,
      title: "Email Us",
      description: "For general inquiries or support",
      details: [
        {
          label: "General Support",
          value: "support@trustfx.com",
          note: "Responds within 24 hours",
        },
        {
          label: "Investment Inquiries",
          value: "invest@trustfx.com",
          note: "For partnership/investment questions",
        },
      ],
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
    },
    {
      id: 2,
      sectionid: "callus",
      icon: Phone,
      title: "Call or WhatsApp",
      description: "Our support team is available during business hours",
      details: [
        {
          label: "Phone",
          value: "+1 (555) 123-4567",
          note: "Business hours support",
        },
        {
          label: "WhatsApp",
          value: "+1 (555) 987-6543",
          note: "Quick messaging support",
        },
      ],
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
    },
    {
      id: 3,
      sectionid: "livechat",
      icon: MessageCircle,
      title: "Live Chat",
      description: "Real-time help during market hours",
      details: [
        {
          label: "Status",
          value: "Coming Soon",
          note: "Launching soon — stay tuned!",
        },
        {
          label: "Availability",
          value: "Market Hours",
          note: "Real-time support when markets are open",
        },
      ],
      gradient: "from-purple-500 to-violet-500",
      bgGradient: "from-purple-50 to-violet-50",
      comingSoon: true,
    },
  ];

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            contactOptions.forEach((option, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, option.id]);
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
  }, [contactOptions]);

  return (
    <section className="py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 text-sm font-semibold">
            CONTACT OPTIONS
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Choose How to Reach Us
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We offer multiple ways to get in touch. Choose the option that works
            best for you and we&apos;ll respond as quickly as possible.
          </p>
        </div>

        {/* Contact Options Grid */}
        <div ref={sectionRef} className="grid lg:grid-cols-3 gap-8">
          {contactOptions.map((option) => {
            const IconComponent = option.icon;
            const isVisible = visibleCards.includes(option.id);

            return (
              <Card
                key={option.id}
                id={option.sectionid}
                className={`relative overflow-hidden transition-all duration-1000 hover:shadow-xl hover:-translate-y-2 ${
                  isVisible
                    ? "opacity-100 translate-y-0 scale-100"
                    : "opacity-0 translate-y-12 scale-95"
                } ${option.comingSoon ? "opacity-75" : ""}`}
              >
                {/* Coming Soon Badge */}
                {option.comingSoon && (
                  <div className="absolute top-4 right-4 z-10">
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold px-3 py-1">
                      Coming Soon
                    </Badge>
                  </div>
                )}

                {/* Background Gradient */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${option.bgGradient} opacity-50`}
                />

                <CardContent className="relative p-8 h-full">
                  {/* Icon */}
                  <div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${option.gradient} text-white mb-6 shadow-lg`}
                  >
                    <IconComponent className="w-8 h-8" />
                  </div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-gray-900 mb-4">
                    {option.title}
                  </h3>
                  <p className="text-gray-700 leading-relaxed mb-6">
                    {option.description}
                  </p>

                  {/* Contact Details */}
                  <div className="space-y-4">
                    {option.details.map((detail, index) => (
                      <div
                        key={index}
                        className="bg-white/80 rounded-lg p-4 border border-gray-200"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900">
                            {detail.label}:
                          </span>
                          {!option.comingSoon && detail.value.includes("@") && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => copyToClipboard(detail.value)}
                              className="h-8 w-8 p-0"
                            >
                              <Copy className="w-4 h-4" />
                            </Button>
                          )}
                          {!option.comingSoon &&
                            detail.value.includes("+1") && (
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => copyToClipboard(detail.value)}
                                className="h-8 w-8 p-0"
                              >
                                <Copy className="w-4 h-4" />
                              </Button>
                            )}
                        </div>
                        <div className="text-lg font-medium text-gray-800 mb-1">
                          {detail.value}
                        </div>
                        <div className="text-sm text-gray-600">
                          {detail.note}
                        </div>
                        {copiedText === detail.value && (
                          <div className="text-xs text-green-600 mt-1">
                            ✓ Copied to clipboard!
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  {!option.comingSoon && (
                    <div className="mt-6">
                      {option.id === 1 && (
                        <Button
                          className={`w-full bg-gradient-to-r ${option.gradient} text-white font-semibold transition-all duration-300 hover:scale-105`}
                          onClick={() =>
                            window.open("mailto:support@trustfx.com")
                          }
                        >
                          Send Email
                          <ExternalLink className="w-4 h-4 ml-2" />
                        </Button>
                      )}
                      {option.id === 2 && (
                        <div className="space-y-2">
                          <Button
                            className={`w-full bg-gradient-to-r ${option.gradient} text-white font-semibold transition-all duration-300 hover:scale-105`}
                            onClick={() => window.open("tel:+15551234567")}
                          >
                            Call Now
                            <Phone className="w-4 h-4 ml-2" />
                          </Button>
                          <Button
                            variant="outline"
                            className="w-full border-2 border-green-500 text-green-600 hover:bg-green-50"
                            onClick={() =>
                              window.open("https://wa.me/15559876543")
                            }
                          >
                            WhatsApp
                            <MessageCircle className="w-4 h-4 ml-2" />
                          </Button>
                        </div>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Support Hours */}
        <div className="mt-16">
          <Card className="bg-gradient-to-r from-slate-50 to-gray-50 border-2 border-gray-200">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white">
                  <Clock className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                🕒 Support Hours
              </h3>
              <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="font-semibold text-gray-900 mb-2">
                    Monday – Friday
                  </div>
                  <div className="text-lg text-blue-600 font-medium">
                    9:00 AM – 6:00 PM (EST)
                  </div>
                  <div className="text-sm text-gray-600">
                    Full support available
                  </div>
                </div>
                <div className="bg-white rounded-lg p-4 border border-gray-200">
                  <div className="font-semibold text-gray-900 mb-2">
                    Saturday – Sunday
                  </div>
                  <div className="text-lg text-orange-600 font-medium">
                    10:00 AM – 3:00 PM
                  </div>
                  <div className="text-sm text-gray-600">Limited support</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
