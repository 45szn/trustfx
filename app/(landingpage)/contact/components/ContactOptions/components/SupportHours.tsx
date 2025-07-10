// file: components/contact/SupportHours.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

export default function SupportHours() {
  return (
    <Card className="bg-gradient-to-r from-slate-50 to-gray-50 border-2 border-gray-200">
      <CardContent className="p-8 text-center">
        <div className="flex justify-center mb-4">
          <div className="p-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full text-white">
            <Clock className="w-6 h-6" />
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-6">
          🕒 Support Hours
        </h3>
        <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="font-semibold text-gray-900 mb-2">
              Monday – Friday
            </div>
            <div className="text-lg text-blue-600 font-medium">
              9:00 AM – 6:00 PM (EST)
            </div>
            <div className="text-sm text-gray-600">Full support available</div>
          </div>
          <div className="bg-white rounded-lg p-4 border border-gray-200">
            <div className="font-semibold text-gray-900 mb-2">
              Saturday – Sunday
            </div>
            <div className="text-lg text-orange-600 font-medium">
              10:00 AM – 3:00 PM
            </div>
            <div className="text-sm text-gray-600">Limited support</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
