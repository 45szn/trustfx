// file: components/contact/contactOptionsData.ts
import { Mail, Phone, MessageCircle } from "lucide-react";
import { ContactOption } from "./types";

export const contactOptions: ContactOption[] = [
  {
    id: 1,
    sectionid: "emailsupport",
    icon: Mail,
    title: "Email Us",
    description: "For general inquiries or support",
    details: [
      {
        label: "General Support",
        value: "trustradefxcustomerservice@gmail.com",
        note: "Responds within 24 hours",
      },
      {
        label: "Investment Inquiries",
        value: "trustradefxcustomerservice@gmail.com",
        note: "For partnership/investment questions",
      },
    ],
    gradient: "from-blue-500 to-cyan-500",
    bgGradient: "from-blue-50 to-cyan-50",
  },
  {
    id: 2,
    sectionid: "callus",
    icon: Phone,
    title: "Call or WhatsApp",
    description: "Our support team is available during business hours",
    details: [
      {
        label: "Phone",
        value: "+1 (845) 866-6018",
        note: "Business hours support",
      },
      {
        label: "WhatsApp",
        value: "+1 (845) 866-6018",
        note: "Quick messaging support",
      },
    ],
    gradient: "from-green-500 to-emerald-500",
    bgGradient: "from-green-50 to-emerald-50",
  },
  {
    id: 3,
    sectionid: "livechat",
    icon: MessageCircle,
    title: "Live Chat",
    description: "Real-time help during market hours",
    details: [
      {
        label: "Status",
        value: "Coming Soon",
        note: "Launching soon — stay tuned!",
      },
      {
        label: "Availability",
        value: "Market Hours",
        note: "Real-time support when markets are open",
      },
    ],
    gradient: "from-purple-500 to-violet-500",
    bgGradient: "from-purple-50 to-violet-50",
    comingSoon: true,
  },
];
