"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  Send,
  TrendingUp,
  Shield,
  Award,
  Clock,
  ArrowUp,
} from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail("");
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-gray-900 to-black text-white relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Newsletter Section */}
        <div className="py-16 border-b border-gray-800">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-8">
              <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 text-sm font-semibold">
                STAY UPDATED
              </Badge>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                Get Market Insights & Investment Tips
              </h3>
              <p className="text-xl text-gray-300 mb-8">
                Join 50,000+ investors receiving weekly market analysis and
                exclusive investment opportunities.
              </p>
            </div>

            <form
              onSubmit={handleNewsletterSubmit}
              className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
            >
              <Input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-gray-400 focus:border-blue-500 backdrop-blur-sm"
                required
              />
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold px-8 transition-all duration-300 hover:scale-105"
              >
                <Send className="w-4 h-4 mr-2" />
                Subscribe
              </Button>
            </form>

            {isSubscribed && (
              <div className="mt-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg text-green-300 animate-fade-in">
                ✅ Successfully subscribed! Check your email for confirmation.
              </div>
            )}
          </div>
        </div>

        {/* Main Footer Content */}
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
                <div className="flex items-center gap-3 text-gray-300">
                  <MapPin className="w-5 h-5 text-blue-400" />
                  <span>123 Financial District, New York, NY 10004</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Phone className="w-5 h-5 text-green-400" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3 text-gray-300">
                  <Mail className="w-5 h-5 text-purple-400" />
                  <span>support@trustfx.com</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-green-400" />
                  <span className="text-sm text-gray-300">
                    SIPC Insured up to $500,000
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-yellow-400" />
                  <span className="text-sm text-gray-300">SEC Regulated</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-blue-400" />
                  <span className="text-sm text-gray-300">
                    24/7 Customer Support
                  </span>
                </div>
              </div>
            </div>

            {/* Investment Plans */}
            <div>
              <h4 className="text-xl font-semibold mb-6 text-white">
                Investment Plans
              </h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/plans/starter"
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    Starter Plan
                  </Link>
                </li>
                <li>
                  <Link
                    href="/plans/growth"
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    Growth Plan
                  </Link>
                </li>
                <li>
                  <Link
                    href="/plans/premium"
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    Premium Plan
                  </Link>
                </li>
                <li>
                  <Link
                    href="/plans/impact"
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    Impact Plan
                  </Link>
                </li>
                <li>
                  <Link
                    href="/plans/pro-trader"
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    Pro Trader Plan
                  </Link>
                </li>
                <li>
                  <Link
                    href="/plans/fixed-return"
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    Fixed Return Plan
                  </Link>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-xl font-semibold mb-6 text-white">Company</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/about"
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    About Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/how-it-works"
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    How It Works
                  </Link>
                </li>
                <li>
                  <Link
                    href="/security"
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    Security
                  </Link>
                </li>
                <li>
                  <Link
                    href="/careers"
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="/press"
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    Press
                  </Link>
                </li>
                <li>
                  <Link
                    href="/blog"
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="text-xl font-semibold mb-6 text-white">Support</h4>
              <ul className="space-y-3">
                <li>
                  <Link
                    href="/help"
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link
                    href="/contact"
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link
                    href="/faq"
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    FAQ
                  </Link>
                </li>
                <li>
                  <Link
                    href="/live-chat"
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    Live Chat
                  </Link>
                </li>
                <li>
                  <Link
                    href="/tutorials"
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    Video Tutorials
                  </Link>
                </li>
                <li>
                  <Link
                    href="/webinars"
                    className="text-gray-300 hover:text-blue-400 transition-colors"
                  >
                    Webinars
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social Media & Legal */}
        <div className="py-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            {/* Social Media */}
            <div className="flex items-center gap-4">
              <span className="text-gray-300 font-medium">Follow Us:</span>
              <div className="flex gap-3">
                <Link
                  href="https://facebook.com/trustfx"
                  className="p-2 bg-white/10 rounded-lg hover:bg-blue-600 transition-all duration-300 hover:scale-110"
                >
                  <Facebook className="w-5 h-5" />
                </Link>
                <Link
                  href="https://twitter.com/trustfx"
                  className="p-2 bg-white/10 rounded-lg hover:bg-sky-500 transition-all duration-300 hover:scale-110"
                >
                  <Twitter className="w-5 h-5" />
                </Link>
                <Link
                  href="https://instagram.com/trustfx"
                  className="p-2 bg-white/10 rounded-lg hover:bg-pink-600 transition-all duration-300 hover:scale-110"
                >
                  <Instagram className="w-5 h-5" />
                </Link>
                <Link
                  href="https://linkedin.com/company/trustfx"
                  className="p-2 bg-white/10 rounded-lg hover:bg-blue-700 transition-all duration-300 hover:scale-110"
                >
                  <Linkedin className="w-5 h-5" />
                </Link>
                <Link
                  href="https://youtube.com/trustfx"
                  className="p-2 bg-white/10 rounded-lg hover:bg-red-600 transition-all duration-300 hover:scale-110"
                >
                  <Youtube className="w-5 h-5" />
                </Link>
              </div>
            </div>

            {/* Back to Top */}
            <Button
              onClick={scrollToTop}
              variant="outline"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              <ArrowUp className="w-4 h-4 mr-2" />
              Back to Top
            </Button>
          </div>
        </div>

        {/* Bottom Legal */}
        <div className="py-6 border-t border-gray-800">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-gray-400">
            <div className="flex flex-wrap items-center gap-6">
              <span>© 2024 TrustFx. All rights reserved.</span>
              <Link
                href="/privacy"
                className="hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                href="/cookies"
                className="hover:text-white transition-colors"
              >
                Cookie Policy
              </Link>
              <Link
                href="/disclaimer"
                className="hover:text-white transition-colors"
              >
                Risk Disclaimer
              </Link>
            </div>
            <div className="text-gray-500">
              <span>Regulated by SEC • SIPC Member • FINRA Member</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
