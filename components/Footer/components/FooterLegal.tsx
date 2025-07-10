// file: components/layout/footer/FooterLegal.tsx
"use client";

import Link from "next/link";

export default function FooterLegal() {
  return (
    <div className="py-6 border-t border-gray-800">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
        <div className="flex flex-wrap items-center gap-6">
          <span>© 2024 TrustFx. All rights reserved.</span>
          <Link href="/privacy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/termsofservices" className="hover:text-white transition-colors">
            Terms of Service
          </Link>
          <Link href="/legal#cookiepolicy" className="hover:text-white transition-colors">
            Cookie Policy
          </Link>
          <Link href="/legal#riskdisclaimer" className="hover:text-white transition-colors">
            Risk Disclaimer
          </Link>
        </div>
        <div className="text-gray-500">
          <span>Regulated by SEC • SIPC Member • FINRA Member</span>
        </div>
      </div>
    </div>
  );
}
