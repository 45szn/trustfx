// Mock data - replace with real data from your API
export const userBalance = 15000; // This should come from your API

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
  },
];

export const activeInvestments = [
  {
    id: "INV001",
    planName: "Growth Plan",
    planIcon: "📈",
    investedAmount: 2500,
    dateStarted: "2025-05-15",
    duration: "90 days",
    maturityDate: "2025-08-13",
    status: "active",
    expectedReturn: 2800,
    progress: 65,
  },
  {
    id: "INV002",
    planName: "Premium Plan",
    planIcon: "💎",
    investedAmount: 5000,
    dateStarted: "2025-06-01",
    duration: "180 days",
    maturityDate: "2025-11-28",
    status: "active",
    expectedReturn: 6000,
    progress: 25,
  },
  {
    id: "INV003",
    planName: "Starter Plan",
    planIcon: "🌱",
    investedAmount: 1000,
    dateStarted: "2025-04-10",
    duration: "30 days",
    maturityDate: "2025-05-10",
    status: "completed",
    expectedReturn: 1050,
    progress: 100,
  },
];

export const investmentHistory = [
  {
    id: "INV004",
    planName: "Growth Plan",
    planIcon: "📈",
    investedAmount: 1500,
    dateStarted: "2025-02-15",
    dateCompleted: "2025-05-16",
    duration: "90 days",
    status: "completed",
    actualReturn: 1680,
    profit: 180,
  },
  {
    id: "INV005",
    planName: "Starter Plan",
    planIcon: "🌱",
    investedAmount: 500,
    dateStarted: "2025-01-20",
    dateCompleted: "2025-02-19",
    duration: "30 days",
    status: "completed",
    actualReturn: 525,
    profit: 25,
  },
];
