"use client";

import { useState, useRef, useEffect } from "react";
import {
  ChevronDown,
  Search,
  HelpCircle,
  MessageCircle,
  Mail,
  Phone,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const faqs = [
  {
    id: 1,
    question: "How much can I withdraw?",
    answer:
      "You can withdraw the full amount of your account balance minus the funds that are used currently for supporting opened positions. The available withdrawal amount is always displayed in your dashboard, ensuring you have complete transparency over your accessible funds.",
    category: "Withdrawals",
    popular: true,
  },
  {
    id: 2,
    question: "How will I know that the withdrawal has been successful?",
    answer:
      "You will get an automatic notification once we send the funds and you can always check your transactions or account balance. Your chosen payment system dictates how long it will take for the funds to reach you. We provide real-time updates throughout the entire withdrawal process.",
    category: "Withdrawals",
    popular: true,
  },
  {
    id: 3,
    question: "I forgot my password, what should I do?",
    answer:
      "Visit the password reset page, type in your email address and click the 'Reset' button. You'll receive a secure link to create a new password. For additional security, we recommend using a strong password with a combination of letters, numbers, and special characters.",
    category: "Account",
    popular: false,
  },
  {
    id: 4,
    question: "How do I check my account balance?",
    answer:
      "You can see your account balance anytime on your accounts dashboard. The dashboard provides real-time updates of your balance, including available funds, invested amounts, and pending transactions. You can also set up balance alerts for important thresholds.",
    category: "Account",
    popular: true,
  },
  {
    id: 5,
    question: "When can I deposit/withdraw from my Investment account?",
    answer:
      "Deposit and withdrawal are available at any time, 24/7. However, be sure that your funds are not used in any ongoing trade before attempting withdrawal. The available amount for withdrawal is shown in your dashboard on the main page of the Investing platform, updated in real-time.",
    category: "Deposits",
    popular: true,
  },
];

const categories = ["All", "Withdrawals", "Deposits", "Account"];

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  // Filter FAQs based on search and category
  const filteredFAQs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Toggle accordion item
  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Intersection observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Stagger the FAQ item animations
            filteredFAQs.forEach((faq, index) => {
              setTimeout(() => {
                setVisibleItems((prev) => [...prev, faq.id]);
              }, index * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [filteredFAQs]);

  // Reset visible items when filters change
  useEffect(() => {
    setVisibleItems([]);
    setTimeout(() => {
      filteredFAQs.forEach((faq, index) => {
        setTimeout(() => {
          setVisibleItems((prev) => [...prev, faq.id]);
        }, index * 50);
      });
    }, 100);
  }, [searchTerm, selectedCategory]);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 text-sm font-semibold">
            HELP CENTER
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 bg-clip-text text-transparent">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find quick answers to common questions about your TrustFx investment
            account, withdrawals, and platform features.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 space-y-6">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              type="text"
              placeholder="Search FAQs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
            />
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  selectedCategory === category
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg scale-105"
                    : "bg-white text-gray-600 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Items */}
        <div ref={sectionRef} className="space-y-4 mb-16">
          {filteredFAQs.length === 0 ? (
            <div className="text-center py-12">
              <HelpCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 mb-2">
                No FAQs found
              </h3>
              <p className="text-gray-500">
                Try adjusting your search terms or category filter.
              </p>
            </div>
          ) : (
            filteredFAQs.map((faq, index) => {
              const isOpen = openItems.includes(faq.id);
              const isVisible = visibleItems.includes(faq.id);

              return (
                <Card
                  key={faq.id}
                  className={`transition-all duration-700 ease-out transform ${
                    isVisible
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-8"
                  } hover:shadow-lg border-2 border-gray-100 hover:border-gray-200`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:bg-gray-50"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg md:text-xl font-semibold text-gray-900 pr-8">
                              {faq.question}
                            </h3>
                            {faq.popular && (
                              <Badge className="bg-orange-100 text-orange-800 text-xs">
                                Popular
                              </Badge>
                            )}
                          </div>
                          <Badge
                            variant="outline"
                            className="text-xs text-gray-600"
                          >
                            {faq.category}
                          </Badge>
                        </div>
                        <ChevronDown
                          className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </button>

                    {/* Animated Answer */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-out ${
                        isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                      }`}
                    >
                      <div className="px-6 pb-6">
                        <div className="border-t border-gray-100 pt-4">
                          <p className="text-gray-700 leading-relaxed text-lg">
                            {faq.answer}
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>

        {/* Contact Support Section */}
        <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-100">
          <CardContent className="p-8 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white shadow-lg">
                <MessageCircle className="w-8 h-8" />
              </div>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still have questions?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
              Our support team is here to help you 24/7. Get in touch with us
              through your preferred channel.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={"/contact#livechat"}>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                  <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Live Chat Support
                </Button>
              </Link>

              <Link href={"/contact#emailsupport"}>
                <Button
                  variant="outline"
                  className="border-2 border-gray-300 text-gray-700 font-semibold px-8 py-3 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 group"
                >
                  <Mail className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Email Support
                </Button>
              </Link>

              <Link href={"/contact#callus"}>
                <Button
                  variant="outline"
                  className="border-2 border-gray-300 text-gray-700 font-semibold px-8 py-3 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 group"
                >
                  <Phone className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                  Call Us
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
