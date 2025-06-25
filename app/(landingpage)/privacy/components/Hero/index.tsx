"use client"

import { Badge } from "@/components/ui/badge"
import { Shield, Calendar, FileText } from "lucide-react"

export default function PrivacyHero() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 text-sm font-semibold">
            LEGAL DOCUMENT
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Privacy
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Policy</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Your privacy is fundamental to our relationship. Learn how we collect, use, and protect your personal
            information at TrustFx.
          </p>

          {/* Key Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-center justify-center gap-3 p-4 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white">
                <Calendar className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Last Updated</div>
                <div className="text-sm text-gray-600">December 15, 2024</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="p-2 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                <Shield className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">GDPR Compliant</div>
                <div className="text-sm text-gray-600">EU Data Protection</div>
              </div>
            </div>
            <div className="flex items-center justify-center gap-3 p-4 bg-white rounded-xl shadow-lg border border-gray-100">
              <div className="p-2 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 text-white">
                <FileText className="w-5 h-5" />
              </div>
              <div className="text-left">
                <div className="font-semibold text-gray-900">Version 3.2</div>
                <div className="text-sm text-gray-600">Current Policy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
