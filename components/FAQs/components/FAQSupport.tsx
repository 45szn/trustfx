// file: components/help/FAQSupport.tsx
"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Phone } from "lucide-react";

export default function FAQSupport() {
  return (
    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-100">
      <CardContent className="p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white shadow-lg">
            <MessageCircle className="w-8 h-8" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          Still have questions?
        </h3>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
          Our support team is here to help you 24/7. Get in touch with us
          through your preferred channel.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contact#livechat">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-500 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
              <MessageCircle className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Live Chat Support
            </Button>
          </Link>

          <Link href="/contact#emailsupport">
            <Button
              variant="outline"
              className="border-2 border-gray-300 text-gray-700 font-semibold px-8 py-3 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 group"
            >
              <Mail className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Email Support
            </Button>
          </Link>

          <Link href="/contact#callus">
            <Button
              variant="outline"
              className="border-2 border-gray-300 text-gray-700 font-semibold px-8 py-3 rounded-xl hover:border-gray-400 hover:bg-gray-50 transition-all duration-300 group"
            >
              <Phone className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              Call Us
            </Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
