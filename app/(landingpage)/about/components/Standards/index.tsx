"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Lock, Award, CheckCircle, FileCheck } from "lucide-react"
import Image from "next/image"

export default function AboutStandards() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  const standards = [
    {
      icon: Shield,
      title: "SIPC Insured",
      description: "Up to $500,000",
      detail: "Your investments are protected by the Securities Investor Protection Corporation",
    },
    {
      icon: FileCheck,
      title: "PCI-DSS Compliant",
      description: "Via Flutterwave",
      detail: "Highest level of payment security standards",
    },
    {
      icon: Lock,
      title: "Bank-Level Encryption",
      description: "256-bit SSL",
      detail: "Military-grade encryption protects all your data",
    },
    {
      icon: CheckCircle,
      title: "Two-Factor Authentication",
      description: "Enhanced Security",
      detail: "Additional layer of protection for your account",
    },
    {
      icon: Award,
      title: "Licensed & Regulated",
      description: "Industry Partnerships",
      detail: "Working with licensed financial institutions",
    },
  ]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
          }
        })
      },
      { threshold: 0.2 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-blue-900 to-purple-900">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-gradient-to-r from-green-400 to-blue-500 text-white px-4 py-2 text-sm font-semibold">
            INDUSTRY STANDARDS
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Backed by Industry Standards</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Your security and trust are our top priorities. We meet and exceed all industry standards to ensure your
            investments are protected.
          </p>
        </div>

        {/* Standards Grid */}
        <div ref={sectionRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {standards.map((standard, index) => {
            const IconComponent = standard.icon
            return (
              <Card
                key={index}
                className={`bg-white/10 backdrop-blur-lg border border-white/20 transition-all duration-1000 hover:bg-white/20 hover:scale-105 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-8 text-center">
                  <div className="inline-flex p-4 rounded-2xl bg-gradient-to-r from-green-500 to-blue-500 text-white mb-6 shadow-lg">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">{standard.title}</h3>
                  <p className="text-green-400 font-semibold mb-3">{standard.description}</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{standard.detail}</p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Compliance Badges */}
        <div
          className={`transition-all duration-1000 delay-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <Card className="bg-white/5 backdrop-blur-lg border border-white/10">
            <CardContent className="p-12">
              <div className="text-center mb-12">
                <h3 className="text-2xl font-bold text-white mb-4">Trusted by Regulatory Bodies</h3>
                <p className="text-gray-300">
                  We maintain partnerships and compliance with leading financial regulatory organizations
                </p>
              </div>

              {/* Compliance Logos */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center">
                <div className="bg-white/10 rounded-xl p-6 w-full text-center">
                  <Image
                    src="/placeholder.svg?height=60&width=120"
                    alt="SIPC Logo"
                    width={120}
                    height={60}
                    className="mx-auto mb-2 opacity-80"
                  />
                  <p className="text-white text-sm font-semibold">SIPC Member</p>
                </div>
                <div className="bg-white/10 rounded-xl p-6 w-full text-center">
                  <Image
                    src="/placeholder.svg?height=60&width=120"
                    alt="SEC Logo"
                    width={120}
                    height={60}
                    className="mx-auto mb-2 opacity-80"
                  />
                  <p className="text-white text-sm font-semibold">SEC Regulated</p>
                </div>
                <div className="bg-white/10 rounded-xl p-6 w-full text-center">
                  <Image
                    src="/placeholder.svg?height=60&width=120"
                    alt="PCI DSS Logo"
                    width={120}
                    height={60}
                    className="mx-auto mb-2 opacity-80"
                  />
                  <p className="text-white text-sm font-semibold">PCI DSS Compliant</p>
                </div>
                <div className="bg-white/10 rounded-xl p-6 w-full text-center">
                  <Image
                    src="/placeholder.svg?height=60&width=120"
                    alt="Flutterwave Logo"
                    width={120}
                    height={60}
                    className="mx-auto mb-2 opacity-80"
                  />
                  <p className="text-white text-sm font-semibold">Payment Partner</p>
                </div>
              </div>

              {/* Security Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 pt-8 border-t border-white/20">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">99.9%</div>
                  <div className="text-gray-300 text-sm">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">256-bit</div>
                  <div className="text-gray-300 text-sm">Encryption</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">24/7</div>
                  <div className="text-gray-300 text-sm">Monitoring</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">$500K</div>
                  <div className="text-gray-300 text-sm">SIPC Coverage</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
