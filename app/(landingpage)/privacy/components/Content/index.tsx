"use client";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronDown } from "lucide-react";
import { sections } from "./sections";

export default function PrivacyContent() {
  const [openSections, setOpenSections] = useState<string[]>(["overview"]);

  const toggleSection = (sectionId: string) => {
    setOpenSections((prev) =>
      prev.includes(sectionId)
        ? prev.filter((id) => id !== sectionId)
        : [...prev, sectionId],
    );
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="space-y-6">
          {sections.map((section) => {
            const IconComponent = section.icon;
            const isOpen = openSections.includes(section.id);

            return (
              <Card
                key={section.id}
                className="border-2 border-gray-100 hover:border-gray-200 transition-colors"
              >
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleSection(section.id)}
                    className="w-full p-6 text-left hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:bg-gray-50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <h2 className="text-xl md:text-2xl font-bold text-gray-900">
                          {section.title}
                        </h2>
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
                      isOpen
                        ? "max-h-[2000px] opacity-100"
                        : "max-h-0 opacity-0"
                    }`}
                  >
                    <div className="px-6 pb-6">
                      <div className="border-t border-gray-100 pt-6">
                        <div
                          className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
                          dangerouslySetInnerHTML={{ __html: section.content }}
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Quick Summary */}
        <Card className="mt-16 bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-100">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Privacy Policy Summary
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  What We Collect
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Account and identity information</li>
                  <li>• Financial and investment data</li>
                  <li>• Usage and device information</li>
                  <li>• Communication records</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-3">
                  How We Protect It
                </h4>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Bank-level encryption</li>
                  <li>• Strict access controls</li>
                  <li>• Regular security audits</li>
                  <li>• GDPR and CCPA compliance</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
