// file: components/help/FAQItem.tsx
"use client";

import { ChevronDown } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FAQ } from "./faqData";

interface FAQItemProps {
  faq: FAQ;
  isOpen: boolean;
  isVisible: boolean;
  delay: number;
  onToggle: () => void;
}

export default function FAQItem({ faq, isOpen, isVisible, delay, onToggle }: FAQItemProps) {
  return (
    <Card
      className={`transition-all duration-700 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
      } hover:shadow-lg border-2 border-gray-100 hover:border-gray-200`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      <CardContent className="p-0">
        <button
          onClick={onToggle}
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
}
