"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight, Star, Quote, MapPin } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

const testimonials = [
  {
    id: 1,
    quote: "TrustFx didn't just grow my portfolio — it grew my confidence in investing.",
    content:
      "I started with just $200 and a lot of skepticism. But within months, I saw real returns and even better communication. Their updates, guidance, and dashboard made me feel in control the whole time. This isn't just another trading app — it's a platform that actually cares.",
    name: "Jared K.",
    location: "Atlanta, GA",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    investment: "$200",
    returns: "127%",
  },
  {
    id: 2,
    quote: "Finally, an investment platform that doesn't treat you like just another number.",
    content:
      "From the moment I joined TrustFx, I felt seen. The interface is user-friendly, the returns are realistic, and the transparency is unlike anything I've experienced. Their team is responsive, and every decision feels intentional.",
    name: "Nina M.",
    location: "London, UK",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    investment: "$1,500",
    returns: "89%",
  },
  {
    id: 3,
    quote: "What stood out most? Trust.",
    content:
      "There are thousands of platforms promising profits. TrustFx actually delivers — with accountability, smart insights, and real-time results. I've recommended it to my friends, family, and even my accountant.",
    name: "Tosin A.",
    location: "Lagos, Nigeria",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    investment: "$800",
    returns: "156%",
  },
  {
    id: 4,
    quote: "From confused to confident.",
    content:
      "I knew nothing about investing when I signed up. Now I'm managing my own plans, understanding market movements, and even teaching my daughter. TrustFx made me believe I could do this.",
    name: "Laura T.",
    location: "Cape Town, South Africa",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    investment: "$350",
    returns: "94%",
  },
  {
    id: 5,
    quote: "One word: seamless.",
    content: "Deposit. Invest. Track. Withdraw. Everything works perfectly — and the returns speak for themselves.",
    name: "Michael D.",
    location: "Toronto, Canada",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    investment: "$2,200",
    returns: "112%",
  },
  {
    id: 6,
    quote: "My experience with TrustFx has been nothing short of phenomenal.",
    content:
      "I've been investing for over a decade and have never felt more informed or supported. Their team provides data-backed recommendations, and the app itself is intuitive and elegant. But what truly sets them apart is their ethics. They don't overpromise — they overdeliver.",
    name: "Chloe S.",
    location: "New York, NY",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    investment: "$5,000",
    returns: "143%",
  },
  {
    id: 7,
    quote: "I'm not just making money — I'm building something.",
    content:
      "Every dollar I've invested with TrustFx feels intentional. This is the kind of long-term platform that helps you plan for retirement, your kids, or just financial peace. I'm not gambling here — I'm growing.",
    name: "Omar R.",
    location: "Dubai, UAE",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    investment: "$3,800",
    returns: "178%",
  },
  {
    id: 8,
    quote: "Security was my biggest concern — and they nailed it.",
    content:
      "Encrypted transactions, two-factor authentication, SIPC insurance, and a crystal-clear history of every move. I sleep well knowing my money's in good hands.",
    name: "Samantha J.",
    location: "Dublin, Ireland",
    avatar: "/placeholder.svg?height=80&width=80",
    rating: 5,
    investment: "$1,200",
    returns: "98%",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const sectionRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  // Auto-play functionality
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    // Reset the interval when user manually navigates
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, 6000)
    }
  }

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    // Reset the interval when user manually navigates
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, 6000)
    }
  }

  const goToTestimonial = (index: number) => {
    setCurrentIndex(index)
    // Reset the interval when user manually navigates
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % testimonials.length)
      }, 6000)
    }
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=1080&width=1920')] opacity-5" />
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-4 py-2 text-sm font-semibold">
            CUSTOMER STORIES
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">What Our Customers Say</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Real stories from real investors who&apos;ve transformed their financial future with TrustFx
          </p>
        </div>

        {/* Main Carousel */}
        <div ref={sectionRef} className="relative">
          {/* Main Testimonial Card */}
          <Card className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl mb-8">
            <CardContent className="p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                {/* Content Side */}
                <div className="space-y-6">
                  <div className="flex items-center gap-2 mb-4">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>

                  <Quote className="w-12 h-12 text-blue-400 mb-4" />

                  <blockquote className="text-2xl md:text-3xl font-bold text-white leading-relaxed mb-6">
                    &quot;{currentTestimonial.quote}&quot;
                  </blockquote>

                  <p className="text-lg text-gray-300 leading-relaxed mb-6">{currentTestimonial.content}</p>

                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <Image
                        src={currentTestimonial.avatar || "/placeholder.svg"}
                        alt={currentTestimonial.name}
                        width={60}
                        height={60}
                        className="rounded-full border-3 border-white/30 shadow-lg"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-white" />
                    </div>
                    <div>
                      <h4 className="text-xl font-semibold text-white">{currentTestimonial.name}</h4>
                      <div className="flex items-center gap-2 text-gray-300">
                        <MapPin className="w-4 h-4" />
                        <span>{currentTestimonial.location}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Stats Side */}
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                      <div className="text-3xl font-bold text-green-400 mb-2">{currentTestimonial.investment}</div>
                      <div className="text-sm text-gray-300">Initial Investment</div>
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center border border-white/20">
                      <div className="text-3xl font-bold text-blue-400 mb-2">+{currentTestimonial.returns}</div>
                      <div className="text-sm text-gray-300">Total Returns</div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-xl p-6 border border-white/20">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-white mb-2">Verified Investor</div>
                      <div className="text-sm text-gray-300">Member since 2023</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Simple Navigation Controls */}
          <div className="flex flex-col items-center justify-center gap-6 mb-8 lg:flex-row">
            <Button
              onClick={prevTestimonial}
              variant="outline"
              size="lg"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              <ChevronLeft className="w-5 h-5 mr-2" />
              Previous
            </Button>

            <div className="flex items-center gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToTestimonial(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex ? "bg-blue-400 scale-125" : "bg-white/30 hover:bg-white/50"
                  }`}
                />
              ))}
            </div>

            <Button
              onClick={nextTestimonial}
              variant="outline"
              size="lg"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105"
            >
              Next
              <ChevronRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-white mb-2">15,000+</div>
            <div className="text-gray-300">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-green-400 mb-2">4.9/5</div>
            <div className="text-gray-300">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-blue-400 mb-2">$50M+</div>
            <div className="text-gray-300">Total Invested</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">127%</div>
            <div className="text-gray-300">Avg. Returns</div>
          </div>
        </div>
      </div>
    </section>
  )
}
