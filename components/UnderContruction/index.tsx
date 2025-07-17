"use client"

import type React from "react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Construction, Clock, ArrowLeft, Mail, Bell } from "lucide-react"
import { useState } from "react"
import LinkWithLoader from "../LinkWithLoader"

interface UnderConstructionProps {
  pageName: string
  description?: string
  estimatedCompletion?: string
  showNotifyMe?: boolean
}

export default function UnderConstruction({
  pageName,
  description = "We're working hard to bring you an amazing experience.",
  estimatedCompletion = "Coming Soon",
  showNotifyMe = true,
}: UnderConstructionProps) {
  const [email, setEmail] = useState("")
  const [isSubscribed, setIsSubscribed] = useState(false)

  const handleNotifySubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubscribed(true)
    setEmail("")
  }

  return (
    <section className="min-h-screen py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 text-sm font-semibold animate-pulse">
            UNDER CONSTRUCTION
          </Badge>

          <div className="mb-8">
            <div className="inline-flex p-6 rounded-full bg-gradient-to-r from-orange-400 to-red-500 text-white mb-6 shadow-2xl animate-bounce">
              <Construction className="w-16 h-16" />
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            {pageName}
            <span className="bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
              {" "}
              Coming Soon
            </span>
          </h1>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">{description}</p>

          <div className="flex items-center justify-center gap-3 text-lg text-gray-700 mb-12">
            <Clock className="w-6 h-6 text-orange-500" />
            <span className="font-semibold">{estimatedCompletion}</span>
          </div>
        </div>

        {/* Progress Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <Card className="text-center p-6 bg-white shadow-lg border border-gray-100">
            <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white mb-4">
              <div className="w-6 h-6 rounded-full bg-white/30 animate-pulse" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Planning</h3>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full w-full"></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Complete</p>
          </Card>

          <Card className="text-center p-6 bg-white shadow-lg border border-gray-100">
            <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-orange-500 to-red-500 text-white mb-4">
              <div className="w-6 h-6 rounded-full bg-white/30 animate-pulse" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Development</h3>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full w-3/4 animate-pulse"></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">In Progress</p>
          </Card>

          <Card className="text-center p-6 bg-white shadow-lg border border-gray-100">
            <div className="inline-flex p-3 rounded-full bg-gray-300 text-gray-600 mb-4">
              <div className="w-6 h-6 rounded-full bg-white/50" />
            </div>
            <h3 className="text-lg font-bold text-gray-900 mb-2">Launch</h3>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-gray-300 h-2 rounded-full w-1/4"></div>
            </div>
            <p className="text-sm text-gray-600 mt-2">Upcoming</p>
          </Card>
        </div>

        {/* Notify Me Section */}
        {showNotifyMe && (
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-100 mb-12">
            <CardContent className="p-8 text-center">
              <div className="inline-flex p-3 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white mb-6">
                <Bell className="w-6 h-6" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Notified When It&apos;s Ready</h3>
              <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
                Be the first to know when this page launches. We&apos;ll send you an email as soon as it&apos;s available.
              </p>

              {!isSubscribed ? (
                <form onSubmit={handleNotifySubmit} className="max-w-md mx-auto">
                  <div className="flex gap-3">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-lg focus:border-blue-500 focus:outline-none transition-colors"
                    />
                    <Button
                      type="submit"
                      className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 font-semibold hover:opacity-90 transition-opacity"
                    >
                      Notify Me
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="max-w-md mx-auto">
                  <div className="flex items-center justify-center gap-3 text-green-600 mb-4">
                    <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <span className="font-semibold">You&apos;re on the list!</span>
                  </div>
                  <p className="text-gray-600">We&apos;ll email you as soon as this page is ready.</p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Navigation Options */}
        <div className="text-center space-y-6">
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <LinkWithLoader href="/">
              <Button
                variant="outline"
                size="lg"
                className="flex items-center gap-3 border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                Back to Home
              </Button>
            </LinkWithLoader>

            <LinkWithLoader href="/helpcenter">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold hover:opacity-90 transition-opacity"
              >
                Visit Help Center
              </Button>
            </LinkWithLoader>

            <LinkWithLoader href="/contact">
              <Button
                variant="outline"
                size="lg"
                className="flex items-center gap-3 border-2 border-blue-200 text-blue-600 hover:bg-blue-50 transition-colors"
              >
                <Mail className="w-5 h-5" />
                Contact Support
              </Button>
            </LinkWithLoader>
          </div>

          <p className="text-sm text-gray-500 max-w-2xl mx-auto">
            In the meantime, explore our other pages or get in touch if you have any questions about TrustFx.
          </p>
        </div>
      </div>
    </section>
  )
}
