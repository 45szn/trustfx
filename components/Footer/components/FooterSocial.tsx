// file: components/layout/footer/FooterSocial.tsx
"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Facebook, Twitter, Instagram, Linkedin, Youtube, ArrowUp } from "lucide-react";

interface Props {
  onScrollTop: () => void;
}

export default function FooterSocial({ onScrollTop }: Props) {
  return (
    <div className="py-8 border-t border-gray-800">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
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

        <Button
          onClick={onScrollTop}
          variant="outline"
          className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
        >
          <ArrowUp className="w-4 h-4 mr-2" />
          Back to Top
        </Button>
      </div>
    </div>
  );
}
