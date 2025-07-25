// Mock data - replace with real data from your API
export const notificationsData = [
  {
    id: "1",
    type: "investment",
    title: "Investment Completed",
    message:
      "Your Growth Plan has matured successfully. You earned $125 in returns.",
    timestamp: "2025-07-12T14:30:00Z",
    read: false,
    icon: "💰",
    cta: "View Investment",
    ctaLink: "/portfolio",
  },
  {
    id: "2",
    type: "transaction",
    title: "Deposit Confirmed",
    message:
      "Your deposit of $2,500 has been successfully processed and added to your wallet.",
    timestamp: "2025-07-12T10:15:00Z",
    read: false,
    icon: "💳",
    cta: "View Transaction",
    ctaLink: "/transactions",
  },
  {
    id: "3",
    type: "system",
    title: "Security Alert",
    message:
      "New login detected from Chrome on Windows. If this wasn't you, please secure your account.",
    timestamp: "2025-07-11T18:45:00Z",
    read: true,
    icon: "🔒",
    cta: "Review Security",
    ctaLink: "/settings",
  },
  {
    id: "4",
    type: "investment",
    title: "Investment Maturity Alert",
    message:
      "Your Premium Plan will mature in 3 days. Expected return: $6,000.",
    timestamp: "2025-07-11T09:20:00Z",
    read: false,
    icon: "⏰",
    cta: "View Details",
    ctaLink: "/portfolio",
  },
  {
    id: "5",
    type: "promotion",
    title: "New Elite Plan Available",
    message:
      "Introducing our Elite Plan with up to 35% returns. Limited time offer for premium members.",
    timestamp: "2025-07-10T16:30:00Z",
    read: true,
    icon: "🎉",
    cta: "Explore Plan",
    ctaLink: "/investments",
  },
  {
    id: "6",
    type: "transaction",
    title: "Withdrawal Processed",
    message:
      "Your withdrawal request of $800 has been processed and sent to your bank account.",
    timestamp: "2025-07-10T11:10:00Z",
    read: true,
    icon: "💸",
    cta: "View Transaction",
    ctaLink: "/transactions",
  },
  {
    id: "7",
    type: "investment",
    title: "Monthly Returns Credited",
    message:
      "Your Starter Plan has generated $42 in returns this month. Keep growing!",
    timestamp: "2025-07-09T08:00:00Z",
    read: true,
    icon: "📈",
    cta: "View Portfolio",
    ctaLink: "/portfolio",
  },
  {
    id: "8",
    type: "system",
    title: "Scheduled Maintenance",
    message:
      "System maintenance scheduled for tonight 2:00 AM - 4:00 AM EST. Services may be temporarily unavailable.",
    timestamp: "2025-07-08T15:45:00Z",
    read: true,
    icon: "🔧",
    cta: null,
    ctaLink: null,
  },
];
