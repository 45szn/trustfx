"use client"

import { Badge } from "@/components/ui/badge"
import { FileText, Calendar, Scale } from "lucide-react"

export default function TermsHero() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-gradient-to-r from-slate-600 to-blue-600 text-white px-6 py-3 text-sm font-semibold">
            LEGAL AGREEMENT
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Terms of
            <span className="bg-gradient-to-r from-slate-600 to-blue-600 bg-clip-text text-transparent"> Service</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Please read these terms carefully before using TrustFx services. By accessing our platform, you agree to be
            bound by these terms and conditions.
          </p>

          {/* Key Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center gap-3 p-4 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="p-2 rounded-full bg-gradient-to-r from-slate-500 to-blue-500 text-white">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Effective Date</div>
                <div className="text-sm text-gray-600">December 15, 2024</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white">
                <Scale className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Governing Law</div>
                <div className="text-sm text-gray-600">New York, USA</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="p-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                <FileText className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Version 4.1</div>
                <div className="text-sm text-gray-600">Current Terms</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
