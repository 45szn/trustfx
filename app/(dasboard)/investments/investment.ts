// Mock data - replace with real data from your API
// export const userBalance = 15000;

export const investmentPlans = [
  {
    id: "starter",
    name: "Starter Plan",
    icon: "🌱",
    minAmount: 100,
    duration: "30 days",
    expectedReturn: 5,
    riskLevel: "low" as const,
    features: [
      "Low risk investment",
      "Monthly returns",
      "Easy withdrawal",
      "24/7 support",
    ],
    description:
      "Perfect for beginners looking to start their investment journey with minimal risk.",
    popular: false,
    renewable: true,
  },
  {
    id: "growth",
    name: "Growth Plan",
    icon: "📈",
    minAmount: 500,
    duration: "90 days",
    expectedReturn: 12,
    riskLevel: "medium" as const,
    features: [
      "Balanced risk-reward",
      "Quarterly returns",
      "Portfolio diversification",
      "Expert management",
    ],
    description:
      "Ideal for investors seeking steady growth with moderate risk exposure.",
    popular: true,
    renewable: true,
  },
  {
    id: "premium",
    name: "Premium Plan",
    icon: "💎",
    minAmount: 2000,
    duration: "180 days",
    expectedReturn: 20,
    riskLevel: "medium" as const,
    features: [
      "Higher returns",
      "Premium support",
      "Advanced strategies",
      "Priority withdrawals",
    ],
    description:
      "For experienced investors looking for higher returns with professional management.",
    popular: false,
    renewable: true,
  },
  {
    id: "elite",
    name: "Elite Plan",
    icon: "🏆",
    minAmount: 10000,
    duration: "365 days",
    expectedReturn: 35,
    riskLevel: "high" as const,
    features: [
      "Maximum returns",
      "VIP treatment",
      "Exclusive opportunities",
      "Personal advisor",
    ],
    description:
      "Our highest tier plan for serious investors seeking maximum growth potential.",
    popular: false,
    renewable: true,
  },
];
