"use client";

import { motion } from "framer-motion";
import { Scale, Shield, AlertTriangle } from "lucide-react";

export function LegalHero() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900 via-slate-900 to-black" />
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=800&width=1200')] opacity-5" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-600/20 rounded-full">
                <Scale className="h-8 w-8 text-blue-400" />
              </div>
              <div className="p-3 bg-amber-600/20 rounded-full">
                <Shield className="h-8 w-8 text-amber-400" />
              </div>
              <div className="p-3 bg-red-600/20 rounded-full">
                <AlertTriangle className="h-8 w-8 text-red-400" />
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Legal Information
          </h1>

          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Important legal information including our Cookie Policy and Risk
            Disclaimers. Please read these carefully to understand your rights
            and responsibilities.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-400">
            <span className="flex items-center">
              <Shield className="h-4 w-4 mr-2" />
              Cookie Policy
            </span>
            <span className="flex items-center">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Risk Disclaimers
            </span>
            <span className="flex items-center">
              <Scale className="h-4 w-4 mr-2" />
              Legal Compliance
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
