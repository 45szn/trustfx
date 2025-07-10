"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, FileText, Scale, Clock } from "lucide-react";
import Link from "next/link";

export default function TermsContact() {
  return (
    <section className="py-20 bg-gradient-to-br from-slate-600 to-blue-600">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-white/20 text-white px-4 py-2 text-sm font-semibold">
            LEGAL SUPPORT
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Questions About These Terms?
          </h2>
          <p className="text-xl text-slate-100 max-w-3xl mx-auto">
            Our legal and compliance team is available to help clarify any
            questions about our Terms of Service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 text-center">
            <CardContent className="p-8">
              <div className="inline-flex p-4 rounded-full bg-white/20 text-white mb-6">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Legal Department
              </h3>
              <p className="text-slate-100 mb-6">
                Direct contact for legal inquiries and contract questions.
              </p>
              <a
                href="mailto:legal@trustfx.com"
                className="text-white font-semibold hover:text-slate-200 transition-colors"
              >
                legal@trustfx.com
              </a>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 text-center">
            <CardContent className="p-8">
              <div className="inline-flex p-4 rounded-full bg-white/20 text-white mb-6">
                <Scale className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Compliance Office
              </h3>
              <p className="text-slate-100 mb-6">
                Regulatory compliance and terms interpretation support.
              </p>
              <a
                href="mailto:compliance@trustfx.com"
                className="text-white font-semibold hover:text-slate-200 transition-colors"
              >
                compliance@trustfx.com
              </a>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 text-center">
            <CardContent className="p-8">
              <div className="inline-flex p-4 rounded-full bg-white/20 text-white mb-6">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Legal Hotline
              </h3>
              <p className="text-slate-100 mb-6">
                Speak with our legal team for urgent contract matters.
              </p>
              <a
                href="tel:+15551234567"
                className="text-white font-semibold hover:text-slate-200 transition-colors"
              >
                +1 (555) 123-LEGAL
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Dispute Resolution */}
        <Card className="bg-white/10 backdrop-blur-lg border border-white/20 mb-16">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Dispute Resolution Process
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="inline-flex p-3 rounded-full bg-white/20 text-white mb-4">
                  <FileText className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-white mb-2">
                  1. Direct Contact
                </h4>
                <p className="text-sm text-slate-100">
                  Contact our legal team to discuss the issue
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex p-3 rounded-full bg-white/20 text-white mb-4">
                  <Scale className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-white mb-2">2. Mediation</h4>
                <p className="text-sm text-slate-100">
                  Attempt resolution through mediation
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex p-3 rounded-full bg-white/20 text-white mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-white mb-2">
                  3. Arbitration
                </h4>
                <p className="text-sm text-slate-100">
                  Binding arbitration as final resolution
                </p>
              </div>
            </div>
            <div className="text-center mt-8">
              <Button
                size="lg"
                className="bg-white text-slate-600 hover:bg-slate-100 font-semibold px-8 py-3"
              >
                File a Legal Dispute
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Legal Resources */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-6">
            Additional Legal Resources
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/privacy">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-3"
              >
                Privacy Policy
              </Button>
            </Link>
            <Link href="/security">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-3"
              >
                Security Information
              </Button>
            </Link>
            <Link href="/help">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-3"
              >
                Help Center
              </Button>
            </Link>
          </div>

          <div className="mt-8 p-6 bg-white/10 rounded-xl border border-white/20">
            <p className="text-slate-100 text-sm">
              <strong>Mailing Address:</strong> TrustFx Legal Department, 123
              Financial District, New York, NY 10001
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
