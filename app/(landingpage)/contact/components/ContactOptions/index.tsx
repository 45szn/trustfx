"use client";

import { useEffect, useRef, useState } from "react";
import { contactOptions } from "./components/ContactOptionsData";
import ContactCard from "./components/ContactCard";
import SupportHours from "./components/SupportHours";
import { Badge } from "@/components/ui/badge";

export default function ContactOptions() {
  const [visibleCards, setVisibleCards] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

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

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
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

        <div ref={sectionRef} className="grid lg:grid-cols-3 gap-8">
          {contactOptions.map((option) => (
            <ContactCard
              key={option.id}
              option={option}
              isVisible={visibleCards.includes(option.id)}
            />
          ))}
        </div>

        <div className="mt-16">
          <SupportHours />
        </div>
      </div>
    </section>
  );
}
