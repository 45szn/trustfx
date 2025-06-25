"use client"

import { Badge } from "@/components/ui/badge"
import { TrendingUp, BookOpen, Shield, Lightbulb, Globe, BarChart3 } from "lucide-react"

const categories = [
  {
    name: "Market Analysis",
    icon: TrendingUp,
    count: 24,
    color: "from-blue-500 to-cyan-500",
    description: "Latest market trends and analysis",
  },
  {
    name: "Investment Strategies",
    icon: BarChart3,
    count: 18,
    color: "from-green-500 to-emerald-500",
    description: "Proven strategies for portfolio growth",
  },
  {
    name: "Education",
    icon: BookOpen,
    count: 32,
    color: "from-purple-500 to-violet-500",
    description: "Learn the fundamentals of investing",
  },
  {
    name: "Security & Compliance",
    icon: Shield,
    count: 12,
    color: "from-orange-500 to-red-500",
    description: "Platform security and regulatory updates",
  },
  {
    name: "Technology",
    icon: Lightbulb,
    count: 15,
    color: "from-teal-500 to-cyan-500",
    description: "Innovation in financial technology",
  },
  {
    name: "Global Markets",
    icon: Globe,
    count: 21,
    color: "from-indigo-500 to-purple-500",
    description: "International investment opportunities",
  },
]

export default function BlogCategories() {
  return (
    <section className="py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 text-sm font-semibold">
            EXPLORE TOPICS
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Browse by Category</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Find articles tailored to your interests and investment goals across our comprehensive topic categories.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => {
            const IconComponent = category.icon
            return (
              <button
                key={index}
                className="group p-8 bg-white rounded-2xl border-2 border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2 text-left"
              >
                <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${category.color} text-white mb-6`}>
                  <IconComponent className="w-8 h-8" />
                </div>

                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <Badge variant="outline" className="text-xs">
                    {category.count} articles
                  </Badge>
                </div>

                <p className="text-gray-600 leading-relaxed">{category.description}</p>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
