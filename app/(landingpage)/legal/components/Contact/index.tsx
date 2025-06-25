"use client"

import { motion } from "framer-motion"
import { Mail, Phone, MapPin, Clock, FileText, Shield } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function LegalContact() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Legal Support & Contact</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Have questions about our legal policies or need assistance? Our legal team is here to help.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-blue-100 rounded-lg mr-4">
                    <FileText className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Legal Department</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-5 w-5 mr-3 text-gray-400" />
                    <span>legal@trustfx.com</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-5 w-5 mr-3 text-gray-400" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-start text-gray-600">
                    <MapPin className="h-5 w-5 mr-3 mt-1 text-gray-400" />
                    <span>
                      123 Financial District
                      <br />
                      New York, NY 10004
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-3 text-gray-400" />
                    <span>Mon-Fri: 9:00 AM - 6:00 PM EST</span>
                  </div>
                </div>

                <Button className="w-full mt-6">Contact Legal Team</Button>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="h-full">
              <CardContent className="p-8">
                <div className="flex items-center mb-6">
                  <div className="p-3 bg-green-100 rounded-lg mr-4">
                    <Shield className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">Compliance Office</h3>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center text-gray-600">
                    <Mail className="h-5 w-5 mr-3 text-gray-400" />
                    <span>compliance@trustfx.com</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Phone className="h-5 w-5 mr-3 text-gray-400" />
                    <span>+1 (555) 123-4568</span>
                  </div>
                  <div className="flex items-start text-gray-600">
                    <MapPin className="h-5 w-5 mr-3 mt-1 text-gray-400" />
                    <span>
                      123 Financial District
                      <br />
                      New York, NY 10004
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-5 w-5 mr-3 text-gray-400" />
                    <span>Mon-Fri: 8:00 AM - 7:00 PM EST</span>
                  </div>
                </div>

                <Button variant="outline" className="w-full mt-6">
                  Report Compliance Issue
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Card>
            <CardContent className="p-8">
              <h3 className="text-xl font-semibold text-gray-900 mb-6 text-center">Quick Legal Resources</h3>

              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button variant="outline" className="h-auto p-4 flex flex-col items-center">
                  <FileText className="h-6 w-6 mb-2 text-blue-600" />
                  <span className="text-sm">Terms of Service</span>
                </Button>

                <Button variant="outline" className="h-auto p-4 flex flex-col items-center">
                  <Shield className="h-6 w-6 mb-2 text-green-600" />
                  <span className="text-sm">Privacy Policy</span>
                </Button>

                <Button variant="outline" className="h-auto p-4 flex flex-col items-center">
                  <Mail className="h-6 w-6 mb-2 text-purple-600" />
                  <span className="text-sm">Data Request</span>
                </Button>

                <Button variant="outline" className="h-auto p-4 flex flex-col items-center">
                  <Phone className="h-6 w-6 mb-2 text-orange-600" />
                  <span className="text-sm">Legal Hotline</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Important Notice */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-12"
        >
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6">
            <div className="flex items-start">
              <Shield className="h-6 w-6 text-amber-600 mt-1 mr-3 flex-shrink-0" />
              <div>
                <h4 className="text-lg font-semibold text-amber-800 mb-2">Legal Notice</h4>
                <p className="text-amber-700 text-sm leading-relaxed">
                  This page contains important legal information that affects your use of our services. By continuing to
                  use TrustFx, you acknowledge that you have read, understood, and agree to be bound by these terms. If
                  you have any questions or concerns, please contact our legal department before proceeding.
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
