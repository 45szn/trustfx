"use client";

import type React from "react";

import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Mail, CheckCircle } from "lucide-react";

export default function BlogNewsletter() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    setIsSubscribed(true);
    setEmail("");
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-600 to-purple-600">
      <div className="container mx-auto px-4 max-w-4xl">
        <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl">
          <CardContent className="p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-full">
                <Mail className="w-8 h-8 text-white" />
              </div>
            </div>

            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Stay Informed with Our Newsletter
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Get weekly investment insights, market analysis, and exclusive
              content delivered straight to your inbox.
            </p>

            {!isSubscribed ? (
              <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                <div className="flex gap-4">
                  <Input
                    type="email"
                    placeholder="Enter your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 bg-white/20 border-white/30 text-white placeholder:text-white/70 focus:border-white/50"
                  />
                  <Button
                    type="submit"
                    className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-8 transition-colors"
                  >
                    Subscribe
                  </Button>
                </div>
                <p className="text-sm text-blue-100 mt-4">
                  Join 25,000+ investors who trust our insights. Unsubscribe
                  anytime.
                </p>
              </form>
            ) : (
              <div className="max-w-md mx-auto">
                <div className="flex items-center justify-center gap-3 text-green-300 mb-4">
                  <CheckCircle className="w-6 h-6" />
                  <span className="text-lg font-semibold">
                    Successfully Subscribed!
                  </span>
                </div>
                <p className="text-blue-100">
                  Thank you for subscribing. You&apos;ll receive our next
                  newsletter within the week.
                </p>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/20">
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">Weekly</div>
                <div className="text-blue-100">Market Updates</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">Expert</div>
                <div className="text-blue-100">Analysis & Tips</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-white mb-2">
                  Exclusive
                </div>
                <div className="text-blue-100">Investment Insights</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
