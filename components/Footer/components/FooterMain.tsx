// file: components/layout/footer/FooterMain.tsx
"use client";

import { Phone, Mail, Shield, Award, Clock, TrendingUp } from "lucide-react";
import LinkWithLoader from "@/components/LinkWithLoader";

export default function FooterMain() {
  return (
    <div className="py-16">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Company Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold">TrustFx</h3>
            </div>
            <p className="text-gray-300 leading-relaxed">
              Building wealth through intelligent investing. Your trusted
              partner for financial growth and security.
            </p>
          </div>

          <div className="space-y-3">
            {/* <div className="flex items-center gap-3 text-gray-300">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span>123 Financial District, New York, NY 10004</span>
            </div> */}
            <div className="flex items-center gap-3 text-gray-300">
              <Phone className="w-5 h-5 text-green-400" />
              <span>+1 (555) 123-4567</span>
            </div>
            <div className="flex items-center gap-3 text-gray-300">
              <Mail className="w-5 h-5 text-purple-400" />
              <span>support@trustfx.com</span>
            </div>
          </div>

          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-green-400" />
              <span className="text-sm text-gray-300">SIPC Insured up to $500,000</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-yellow-400" />
              <span className="text-sm text-gray-300">SEC Regulated</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-blue-400" />
              <span className="text-sm text-gray-300">24/7 Customer Support</span>
            </div>
          </div>
        </div>

        {/* Investment Plans */}
        <div>
          <h4 className="text-xl font-semibold mb-6 text-white">Investment Plans</h4>
          <ul className="space-y-3">
            {[
              { href: "/plans#starter", label: "Starter Plan" },
              { href: "/plans#growth", label: "Growth Plan" },
              { href: "/plans#premium", label: "Premium Plan" },
              { href: "/plans#impact", label: "Impact Plan" },
              { href: "/plans#protrader", label: "Pro Trader Plan" },
              { href: "/plans#fixedreturn", label: "Fixed Return Plan" },
            ].map(({ href, label }) => (
              <li key={label}>
                <LinkWithLoader
                  href={href}
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  {label}
                </LinkWithLoader>
              </li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="text-xl font-semibold mb-6 text-white">Company</h4>
          <ul className="space-y-3">
            {["About", "How It Works", "Security"].map((label) => (
              <li key={label}>
                <LinkWithLoader
                  href={`/${label.toLowerCase().replace(/\s+/g, "")}`}
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  {label}
                </LinkWithLoader>
              </li>
            ))}
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-xl font-semibold mb-6 text-white">Support</h4>
          <ul className="space-y-3">
            {[
              { href: "/helpcenter", label: "Help Center" },
              { href: "/contact", label: "Contact Us" },
              { href: "/contact#livechat", label: "Live Chat" },
              { href: "/videotutorials", label: "Video Tutorials" },
              { href: "/webinars", label: "Webinars" },
            ].map(({ href, label }) => (
              <li key={label}>
                <LinkWithLoader
                  href={href}
                  className="text-gray-300 hover:text-blue-400 transition-colors"
                >
                  {label}
                </LinkWithLoader>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
