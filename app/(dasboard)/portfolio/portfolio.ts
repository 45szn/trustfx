// Mock data - replace with real data from your API
export const portfolioData = [
  { date: "Jan", value: 8500 },
  { date: "Feb", value: 9200 },
  { date: "Mar", value: 8800 },
  { date: "Apr", value: 9500 },
  { date: "May", value: 10200 },
  { date: "Jun", value: 8500 },
];

export const investments = [
  {
    id: 1,
    plan: "Growth Plan",
    amount: 2500,
    status: "ongoing",
    duration: "90 days",
    roi: 10.2,
    nextPayout: "Aug 2, 2025",
    startDate: "May 3, 2025",
    progress: 65,
  },
  {
    id: 2,
    plan: "Impact Plan",
    amount: 1000,
    status: "ongoing",
    duration: "60 days",
    roi: 6.8,
    nextPayout: "Jul 30, 2025",
    startDate: "May 30, 2025",
    progress: 80,
  },
  {
    id: 3,
    plan: "Fixed Plan",
    amount: 5000,
    status: "completed",
    duration: "3 months",
    roi: 8.0,
    nextPayout: "Completed",
    startDate: "Apr 10, 2025",
    progress: 100,
  },
  {
    id: 4,
    plan: "Premium Plan",
    amount: 3000,
    status: "pending",
    duration: "120 days",
    roi: 0,
    nextPayout: "Pending approval",
    startDate: "Jul 1, 2025",
    progress: 0,
  },
];

export const assetAllocation = [
  { name: "Growth Plan", value: 45, amount: 2500, color: "#3b82f6" },
  { name: "Fixed Plan", value: 30, amount: 5000, color: "#10b981" },
  { name: "Impact Plan", value: 25, amount: 1000, color: "#f59e0b" },
];

export const recentTransactions = [
  {
    id: 1,
    type: "investment",
    description: "Invested $500 in Growth Plan",
    amount: -500,
    date: "2 hours ago",
  },
  {
    id: 2,
    type: "payout",
    description: "Received $45 interest payout",
    amount: 45,
    date: "1 day ago",
  },
  {
    id: 3,
    type: "withdrawal",
    description: "Withdrew $200 to bank account",
    amount: -200,
    date: "3 days ago",
  },
  {
    id: 4,
    type: "investment",
    description: "Invested $1000 in Premium Plan",
    amount: -1000,
    date: "1 week ago",
  },
  {
    id: 5,
    type: "payout",
    description: "Fixed Plan completed - $400 profit",
    amount: 400,
    date: "2 weeks ago",
  },
];
