"use client";

import type React from "react";

import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, TrendingUp, BookOpen, Users } from "lucide-react";
import { useState } from "react";

export default function BlogHero() {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality
    console.log("Searching for:", searchTerm);
  };

  return (
    <section className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 text-sm font-semibold">
            INVESTMENT INSIGHTS
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            TrustFx
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              {" "}
              Investment Blog
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12 leading-relaxed">
            Stay informed with the latest market insights, investment
            strategies, and financial education from our team of experts.
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search articles, topics, or keywords..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 pr-32 py-4 text-lg border-2 border-gray-200 rounded-xl focus:border-blue-500 transition-colors"
              />
              <Button
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-2 rounded-lg hover:opacity-90 transition-opacity"
              >
                Search
              </Button>
            </div>
          </form>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">150+</div>
            <div className="text-gray-600">Expert Articles</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white mb-4">
              <TrendingUp className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">25K+</div>
            <div className="text-gray-600">Monthly Readers</div>
          </div>
          <div className="text-center p-6 bg-white rounded-2xl shadow-lg border border-gray-100">
            <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-purple-500 to-violet-500 text-white mb-4">
              <Users className="w-6 h-6" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">15</div>
            <div className="text-gray-600">Expert Authors</div>
          </div>
        </div>
      </div>
    </section>
  );
}
