"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { BookOpen, Video, HelpCircle, Users, ArrowRight, Shield, AlertCircle } from "lucide-react"

export default function SecurityEducation() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const sectionRef = useRef<HTMLDivElement>(null)

  const educationResources = [
    {
      id: 1,
      icon: BookOpen,
      title: "Security Tips & Guides",
      description: "Comprehensive guides on password safety, phishing detection, and personal security best practices.",
      features: [
        "Password security best practices",
        "Phishing and scam detection",
        "Safe browsing guidelines",
        "Mobile security tips",
      ],
      gradient: "from-blue-500 to-cyan-500",
      bgGradient: "from-blue-50 to-cyan-50",
    },
    {
      id: 2,
      icon: Video,
      title: "Live Security Webinars",
      description:
        "Interactive sessions hosted by security experts covering platform safeguards and personal protection.",
      features: [
        "Monthly security webinars",
        "Q&A with security experts",
        "Platform security updates",
        "Industry threat briefings",
      ],
      gradient: "from-purple-500 to-violet-500",
      bgGradient: "from-purple-50 to-violet-50",
    },
    {
      id: 3,
      icon: HelpCircle,
      title: "Security Help Center",
      description: "Step-by-step guides for account safety features and troubleshooting security-related issues.",
      features: [
        "Account security setup guides",
        "2FA configuration help",
        "Security troubleshooting",
        "Emergency response procedures",
      ],
      gradient: "from-green-500 to-emerald-500",
      bgGradient: "from-green-50 to-emerald-50",
    },
  ]

  const securityTips = [
    {
      icon: Shield,
      title: "Strong Password Practices",
      tip: "Use unique, complex passwords for your TrustFx account and enable 2FA for maximum security.",
    },
    {
      icon: AlertCircle,
      title: "Phishing Awareness",
      tip: "Always verify emails claiming to be from TrustFx. We'll never ask for passwords via email.",
    },
    {
      icon: Users,
      title: "Account Monitoring",
      tip: "Regularly review your account activity and report any suspicious transactions immediately.",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            educationResources.forEach((resource, index) => {
              setTimeout(() => {
                setVisibleCards((prev) => [...prev, resource.id])
              }, index * 200)
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 bg-gradient-to-br from-white to-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 text-sm font-semibold">
            SECURITY EDUCATION
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">🧠 Investor Education</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We believe informed users are secure users. That&apos;s why we offer comprehensive security education and
            resources to keep you protected.
          </p>
        </div>

        {/* Education Resources */}
        <div ref={sectionRef} className="grid lg:grid-cols-3 gap-8 mb-16">
          {educationResources.map((resource) => {
            const IconComponent = resource.icon
            const isVisible = visibleCards.includes(resource.id)

            return (
              <Card
                key={resource.id}
                className={`relative overflow-hidden transition-all duration-1000 hover:shadow-xl hover:-translate-y-2 ${
                  isVisible ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-12 scale-95"
                }`}
              >
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${resource.bgGradient} opacity-50`} />

                <CardContent className="relative p-8 h-full">
                  {/* Icon */}
                  <div
                    className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${resource.gradient} text-white mb-6 shadow-lg`}
                  >
                    <IconComponent className="w-8 h-8" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{resource.title}</h3>
                  <p className="text-gray-700 leading-relaxed mb-6">{resource.description}</p>

                  {/* Features */}
                  <ul className="space-y-2 mb-6">
                    {resource.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-700">
                        <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <Button
                    className={`w-full bg-gradient-to-r ${resource.gradient} text-white font-semibold transition-all duration-300 hover:scale-105`}
                  >
                    Access Resources
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Quick Security Tips */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Quick Security Tips</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {securityTips.map((tip, index) => {
              const IconComponent = tip.icon
              return (
                <Card key={index} className="border-2 border-gray-200 hover:border-blue-300 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex p-3 rounded-full bg-blue-100 text-blue-600 mb-4">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <h4 className="font-bold text-gray-900 mb-3">{tip.title}</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">{tip.tip}</p>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>

        {/* Security Newsletter Signup */}
        <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white border-0">
          <CardContent className="p-12 text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 rounded-full">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className="text-3xl font-bold mb-4">Stay Informed About Security</h3>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Subscribe to our security newsletter for the latest updates, tips, and threat alerts to keep your
              investments safe.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button className="bg-white text-blue-600 hover:bg-gray-100 font-semibold px-6 py-3 transition-all duration-300">
                Subscribe
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
