"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const faqs = [
  {
    id: 1,
    question: "Can I upgrade from one plan to another?",
    answer:
      "Yes, you can upgrade your plan at any time. When you upgrade, your existing investment will be transferred to the new plan with its enhanced features and return potential. Any difference in minimum investment requirements will need to be met.",
  },
  {
    id: 2,
    question: "Is there a lock-in period?",
    answer:
      "Lock-in periods vary by plan. The Starter Plan has a 30-day minimum, Impact Plan has 60 days, and Fixed Return Plan has 3 months. Growth, Premium, and Pro Trader plans offer more flexible terms. Check your specific plan details for exact terms.",
  },
  {
    id: 3,
    question: "How are returns paid?",
    answer:
      "Returns are calculated monthly and can be reinvested automatically or withdrawn to your linked bank account. You'll receive detailed statements showing your earnings, and payments are processed within 2-3 business days of withdrawal requests.",
  },
  {
    id: 4,
    question: "What happens if I cancel early?",
    answer:
      "Early withdrawal terms depend on your plan. Some plans allow early withdrawal with a small fee, while others like the Fixed Return Plan have mandatory lock-in periods. Your principal is always protected, but early withdrawal may affect potential returns.",
  },
  {
    id: 5,
    question: "Are there any hidden fees?",
    answer:
      "No, we believe in complete transparency. All fees are clearly outlined in your plan agreement. We charge no hidden fees, and our management fees are competitive and clearly disclosed upfront.",
  },
  {
    id: 6,
    question: "How do I switch between plans?",
    answer:
      "You can request a plan change through your investor portal or by contacting your advisor. Plan changes are typically processed within 24-48 hours, and you'll receive confirmation once the switch is complete.",
  },
];

export default function PlansFAQ() {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const toggleItem = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            faqs.forEach((faq, index) => {
              setTimeout(() => {
                setVisibleItems((prev) => [...prev, faq.id]);
              }, index * 100);
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
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 text-sm font-semibold">
            FREQUENTLY ASKED
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Plan Questions & Answers
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get answers to the most common questions about our investment plans
            and how they work.
          </p>
        </div>

        {/* FAQ Items */}
        <div ref={sectionRef} className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openItems.includes(faq.id);
            const isVisible = visibleItems.includes(faq.id);

            return (
              <Card
                key={faq.id}
                className={`transition-all duration-700 ease-out ${
                  isVisible
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                } hover:shadow-lg border-2 border-gray-100 hover:border-gray-200`}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg md:text-xl font-semibold text-gray-900 pr-8">
                        {faq.question}
                      </h3>
                      <ChevronDown
                        className={`w-6 h-6 text-gray-400 transition-transform duration-300 flex-shrink-0 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      />
                    </div>
                  </button>

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
          })}
        </div>

        {/* Contact Support */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-100">
            <CardContent className="p-8">
              <div className="flex justify-center mb-4">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white">
                  <HelpCircle className="w-6 h-6" />
                </div>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">
                Still have questions?
              </h3>
              <p className="text-gray-600 mb-6">
                Our investment advisors are here to help you choose the perfect
                plan for your goals.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all duration-300">
                  Contact an Advisor
                </button>
                <button className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-semibold rounded-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
                  Schedule a Call
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
