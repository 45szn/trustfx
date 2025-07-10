"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mail, Phone, MapPin, Shield, FileText, Clock } from "lucide-react";
import Link from "next/link";

export default function PrivacyContact() {
  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-white/20 text-white px-4 py-2 text-sm font-semibold">
            PRIVACY SUPPORT
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Questions About Your Privacy?
          </h2>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Our privacy team is here to help you understand and exercise your
            privacy rights.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 text-center">
            <CardContent className="p-8">
              <div className="inline-flex p-4 rounded-full bg-white/20 text-white mb-6">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Privacy Email
              </h3>
              <p className="text-blue-100 mb-6">
                Direct line to our privacy team for all privacy-related
                inquiries.
              </p>
              <a
                href="mailto:privacy@trustfx.com"
                className="text-white font-semibold hover:text-blue-200 transition-colors"
              >
                privacy@trustfx.com
              </a>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 text-center">
            <CardContent className="p-8">
              <div className="inline-flex p-4 rounded-full bg-white/20 text-white mb-6">
                <Shield className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Data Protection Officer
              </h3>
              <p className="text-blue-100 mb-6">
                Specialized support for GDPR and regulatory privacy matters.
              </p>
              <a
                href="mailto:dpo@trustfx.com"
                className="text-white font-semibold hover:text-blue-200 transition-colors"
              >
                dpo@trustfx.com
              </a>
            </CardContent>
          </Card>

          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 text-center">
            <CardContent className="p-8">
              <div className="inline-flex p-4 rounded-full bg-white/20 text-white mb-6">
                <Phone className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Privacy Hotline
              </h3>
              <p className="text-blue-100 mb-6">
                Speak directly with our privacy specialists for urgent matters.
              </p>
              <a
                href="tel:+15551234567"
                className="text-white font-semibold hover:text-blue-200 transition-colors"
              >
                +1 (555) 123-PRIVACY
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Privacy Request Options */}
        <Card className="bg-white/10 backdrop-blur-lg border border-white/20 mb-16">
          <CardContent className="p-8">
            <h3 className="text-2xl font-bold text-white mb-6 text-center">
              Submit a Privacy Request
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="inline-flex p-3 rounded-full bg-white/20 text-white mb-4">
                  <FileText className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-white mb-2">Data Access</h4>
                <p className="text-sm text-blue-100">
                  Request a copy of your personal data
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex p-3 rounded-full bg-white/20 text-white mb-4">
                  <Shield className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-white mb-2">
                  Data Correction
                </h4>
                <p className="text-sm text-blue-100">
                  Update or correct your information
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex p-3 rounded-full bg-white/20 text-white mb-4">
                  <Clock className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-white mb-2">Data Deletion</h4>
                <p className="text-sm text-blue-100">
                  Request removal of your data
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex p-3 rounded-full bg-white/20 text-white mb-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <h4 className="font-semibold text-white mb-2">
                  Data Portability
                </h4>
                <p className="text-sm text-blue-100">
                  Export your data in a standard format
                </p>
              </div>
            </div>
            <div className="text-center mt-8">
              <Button
                size="lg"
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 py-3"
              >
                Submit Privacy Request
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Additional Resources */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-white mb-6">
            Additional Resources
          </h3>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/terms">
              <Button
                variant="outline"
                size="lg"
                className="border-2 border-white text-white hover:bg-white/10 font-semibold px-8 py-3"
              >
                Terms of Service
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
        </div>
      </div>
    </section>
  );
}
