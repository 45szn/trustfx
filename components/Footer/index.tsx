// file: components/layout/Footer.tsx
"use client";

import { useState } from "react";
import type React from "react";
import NewsletterSection from "./components/NewsletterSection";
import FooterMain from "./components/FooterMain";
import FooterSocial from "./components/FooterSocial";
import FooterLegal from "./components/FooterLegal";

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
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-purple-600/5 to-pink-600/5" />
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
      <div className="container mx-auto px-4 relative z-10">
        <NewsletterSection
          email={email}
          isSubscribed={isSubscribed}
          setEmail={setEmail}
          onSubmit={handleNewsletterSubmit}
        />
        <FooterMain />
        <FooterSocial onScrollTop={scrollToTop} />
        <FooterLegal />
      </div>
    </footer>
  );
}