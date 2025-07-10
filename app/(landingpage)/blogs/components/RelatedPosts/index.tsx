"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const relatedPosts = [
  {
    id: 2,
    title:
      "Market Volatility in 2024: Strategies for Protecting Your Portfolio",
    excerpt:
      "Navigate uncertain markets with proven strategies that have helped our investors maintain steady growth.",
    category: "Market Analysis",
    author: "Michael Rodriguez",
    publishDate: "Dec 12, 2024",
    readTime: "6 min read",
    image: "/placeholder.svg?height=200&width=300",
    slug: "market-volatility-2024-strategies",
  },
  {
    id: 4,
    title: "Understanding Cryptocurrency Integration in Traditional Portfolios",
    excerpt:
      "Explore how digital assets can complement traditional investments and best practices for crypto allocation.",
    category: "Technology",
    author: "David Kim",
    publishDate: "Dec 8, 2024",
    readTime: "9 min read",
    image: "/placeholder.svg?height=200&width=300",
    slug: "cryptocurrency-traditional-portfolios",
  },
  {
    id: 6,
    title: " 101: Protecting Your IRisk Managementnvestments",
    excerpt:
      "Master the fundamentals of investment risk management with practical strategies used by professionals.",
    category: "Education",
    author: "Robert Chen",
    publishDate: "Dec 3, 2024",
    readTime: "8 min read",
    image: "/placeholder.svg?height=200&width=300",
    slug: "risk-management-101",
  },
];

export default function RelatedPosts() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 text-sm font-semibold">
            RELATED ARTICLES
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Continue Reading
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Explore more insights and strategies to enhance your investment
            knowledge.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {relatedPosts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="relative">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={300}
                  height={200}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs">
                    {post.category}
                  </Badge>
                </div>
              </div>

              <CardContent className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4 line-clamp-2">
                  {post.excerpt}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{post.publishDate}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    <span>{post.readTime}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-sm font-semibold text-gray-900">
                    {post.author}
                  </div>
                  <Link href={`/blog/${post.slug}`}>
                    <button className="flex items-center gap-1 text-blue-600 font-semibold hover:text-blue-700 transition-colors group text-sm">
                      Read
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
