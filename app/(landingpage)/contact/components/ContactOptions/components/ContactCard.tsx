// file: components/contact/ContactCard.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Phone, MessageCircle } from "lucide-react";
import ContactDetail from "./ContactDetail";
import { ContactOption } from "./types";

interface Props {
  option: ContactOption;
  isVisible: boolean;
}

export default function ContactCard({ option, isVisible }: Props) {
  const IconComponent = option.icon;

  return (
    <Card
      id={option.sectionid}
      className={`relative overflow-hidden transition-all duration-1000 hover:shadow-xl hover:-translate-y-2 ${
        isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 translate-y-12 scale-95"
      } ${option.comingSoon ? "opacity-75" : ""}`}
    >
      {option.comingSoon && (
        <div className="absolute top-4 right-4 z-10">
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold px-3 py-1">
            Coming Soon
          </Badge>
        </div>
      )}

      <div
        className={`absolute inset-0 bg-gradient-to-br ${option.bgGradient} opacity-50`}
      />

      <CardContent className="relative p-8 h-full">
        <div
          className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${option.gradient} text-white mb-6 shadow-lg`}
        >
          <IconComponent className="w-8 h-8" />
        </div>

        <h3 className="text-2xl font-bold text-gray-900 mb-4">
          {option.title}
        </h3>
        <p className="text-gray-700 leading-relaxed mb-6">
          {option.description}
        </p>

        <div className="space-y-4">
          {option.details.map((detail, i) => (
            <ContactDetail
              key={i}
              detail={detail}
              comingSoon={!!option.comingSoon}
            />
          ))}
        </div>

        {!option.comingSoon && (
          <div className="mt-6">
            {option.id === 1 && (
              <Button
                className={`w-full bg-gradient-to-r ${option.gradient} text-white font-semibold transition-all duration-300 hover:scale-105`}
                onClick={() => window.open("mailto:trustradefxcustomerservice@gmail.com")}
              >
                Send Email
                <ExternalLink className="w-4 h-4 ml-2" />
              </Button>
            )}
            {option.id === 2 && (
              <div className="space-y-2">
                <Button
                  className={`w-full bg-gradient-to-r ${option.gradient} text-white font-semibold transition-all duration-300 hover:scale-105`}
                  onClick={() => window.open("tel:+18458666018")}
                >
                  Call Now
                  <Phone className="w-4 h-4 ml-2" />
                </Button>
                <Button
                  variant="outline"
                  className="w-full border-2 border-green-500 text-green-600 hover:bg-green-50"
                  onClick={() => window.open("https://wa.me/18458666018")}
                >
                  WhatsApp
                  <MessageCircle className="w-4 h-4 ml-2" />
                </Button>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
