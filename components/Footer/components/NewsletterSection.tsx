// file: components/layout/footer/NewsletterSection.tsx
"use client";

import type React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Send } from "lucide-react";

interface Props {
  email: string;
  isSubscribed: boolean;
  setEmail: (value: string) => void;
  onSubmit: (e: React.FormEvent) => void;
}

export default function NewsletterSection({ email, isSubscribed, setEmail, onSubmit }: Props) {
  return (
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
          onSubmit={onSubmit}
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
  );
}
