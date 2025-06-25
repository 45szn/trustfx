"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Eye, FileCheck } from "lucide-react"

export default function SecurityProcess() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 text-white">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 text-sm font-semibold">
            SECURITY FIRST
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6">How We Protect Your Investments</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Security isn&apos;t an afterthought—it&apos;s built into every aspect of our platform from the ground up.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-gradient-to-r from-blue-400 to-cyan-400 text-white">
                  <Shield className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold">Multi-Layer Protection</h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                  <span>256-bit SSL encryption for all data transmission</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                  <span>Cold storage for cryptocurrency assets</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                  <span>Regular security audits and penetration testing</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-blue-400 mt-2 flex-shrink-0" />
                  <span>Advanced fraud detection systems</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-gradient-to-r from-green-400 to-emerald-400 text-white">
                  <Lock className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold">Account Security</h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                  <span>Two-factor authentication (2FA) required</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                  <span>Biometric login options available</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                  <span>Session timeout and device management</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400 mt-2 flex-shrink-0" />
                  <span>Suspicious activity monitoring</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-gradient-to-r from-purple-400 to-violet-400 text-white">
                  <Eye className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold">Transparency</h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Real-time portfolio tracking and reporting</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Complete transaction history access</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Detailed performance analytics</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-purple-400 mt-2 flex-shrink-0" />
                  <span>Open communication about risks and fees</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border border-white/20">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 rounded-full bg-gradient-to-r from-orange-400 to-red-400 text-white">
                  <FileCheck className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold">Compliance</h3>
              </div>
              <ul className="space-y-3 text-gray-300">
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
                  <span>SIPC insurance up to $500,000</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
                  <span>SEC registered and compliant</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
                  <span>Regular regulatory reporting</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-orange-400 mt-2 flex-shrink-0" />
                  <span>Anti-money laundering (AML) protocols</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
