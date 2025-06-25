"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

const featuredPosts = [
  {
    id: 1,
    title: "The Future of AI in Investment Management: What Investors Need to Know",
    excerpt:
      "Artificial Intelligence is revolutionizing how we approach investment decisions. Learn how AI-powered strategies are delivering superior returns while managing risk more effectively.",
    category: "Technology",
    author: "Dr. Sarah Chen",
    authorRole: "Chief Investment Officer",
    publishDate: "Dec 15, 2024",
    readTime: "8 min read",
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
    slug: "ai-investment-management-future",
  },
  {
    id: 2,
    title: "Market Volatility in 2024: Strategies for Protecting Your Portfolio",
    excerpt:
      "Navigate uncertain markets with proven strategies that have helped our investors maintain steady growth even during turbulent times.",
    category: "Market Analysis",
    author: "Michael Rodriguez",
    authorRole: "Senior Market Analyst",
    publishDate: "Dec 12, 2024",
    readTime: "6 min read",
    image: "/placeholder.svg?height=400&width=600",
    featured: true,
    slug: "market-volatility-2024-strategies",
  },
]

export default function FeaturedPosts() {
  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 text-sm font-semibold">
            FEATURED ARTICLES
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Editor&apos;s Picks</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our most popular and impactful articles, handpicked by our editorial team for their insights and relevance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {featuredPosts.map((post) => (
            <Card
              key={post.id}
              className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
            >
              <div className="relative">
                <Image
                  src={post.image || "/placeholder.svg"}
                  alt={post.title}
                  width={600}
                  height={400}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <Badge className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">{post.category}</Badge>
                </div>
                {post.featured && (
                  <div className="absolute top-4 right-4">
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">Featured</Badge>
                  </div>
                )}
              </div>

              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors">
                  {post.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-6">{post.excerpt}</p>

                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.publishDate}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{post.readTime}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-semibold">
                      {post.author
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">{post.author}</div>
                      <div className="text-sm text-gray-500">{post.authorRole}</div>
                    </div>
                  </div>

                  <Link href={`/blog/${post.slug}`}>
                    <button className="flex items-center gap-2 text-blue-600 font-semibold hover:text-blue-700 transition-colors group">
                      Read More
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
  )
}
