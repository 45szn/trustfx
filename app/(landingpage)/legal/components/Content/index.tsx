// file: components/legal/LegalContent.tsx
"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Calendar } from "lucide-react";
import CookiePolicy from "./components/CookiePolicy";
import RiskDisclaimer from "./components/RiskDisclaimer";

export function LegalContent() {
  const [expandedCookie, setExpandedCookie] = useState<string | null>(null);
  const [expandedRisk, setExpandedRisk] = useState<string | null>(null);

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <CookiePolicy expanded={expandedCookie} onToggle={setExpandedCookie} />

        <RiskDisclaimer expanded={expandedRisk} onToggle={setExpandedRisk} />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <div className="flex items-center justify-center text-sm text-gray-500">
            <Calendar className="h-4 w-4 mr-2" />
            Last updated: December 25, 2024
          </div>
        </motion.div>
      </div>
    </section>
  );
}
