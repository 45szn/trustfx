"use client";

import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import DashHead from "../components/DashHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DollarSign,
  TrendingUp,
  Calendar,
  ArrowUpRight,
  Clock,
  Target,
  PieChart,
  Loader2,
  ChevronRight,
} from "lucide-react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

// Mock data - replace with real data from your API
const portfolioData = [
  { date: "Jan", value: 8500 },
  { date: "Feb", value: 9200 },
  { date: "Mar", value: 8800 },
  { date: "Apr", value: 9500 },
  { date: "May", value: 10200 },
  { date: "Jun", value: 8500 },
];

const investments = [
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

const assetAllocation = [
  { name: "Growth Plan", value: 45, amount: 2500, color: "#3b82f6" },
  { name: "Fixed Plan", value: 30, amount: 5000, color: "#10b981" },
  { name: "Impact Plan", value: 25, amount: 1000, color: "#f59e0b" },
];

const recentTransactions = [
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

const Portfolio = () => {
  const { user, loading } = useAuth();
  const [statusFilter, setStatusFilter] = useState("all");
  const [chartPeriod, setChartPeriod] = useState("1M");

  // Show loading spinner while authentication is being checked
  if (loading) {
    return (
      <div className="container mx-auto p-6 flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-gray-600">Loading portfolio...</span>
        </div>
      </div>
    );
  }

  // Redirect or show login prompt if user is not authenticated
  if (!user) {
    return (
      <div className="container mx-auto p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Authentication Required
          </h2>
          <p className="text-gray-600">Please log in to view your portfolio.</p>
        </div>
      </div>
    );
  }

  const chartPeriods = ["7D", "1M", "3M", "YTD", "All"];
  // const statusFilters = ["all", "ongoing", "completed", "pending", "paused"]

  // Filter investments based on status
  const filteredInvestments = investments.filter(
    (investment) =>
      statusFilter === "all" || investment.status === statusFilter,
  );

  // Calculate total portfolio value
  const totalPortfolioValue = investments.reduce(
    (sum, inv) => sum + inv.amount,
    0,
  );
  const activeInvestments = investments.filter(
    (inv) => inv.status === "ongoing",
  ).length;
  const totalReturns = investments.reduce(
    (sum, inv) => sum + (inv.amount * inv.roi) / 100,
    0,
  );

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      ongoing: {
        label: "Ongoing",
        className: "bg-blue-100 text-blue-800 hover:bg-blue-200",
      },
      completed: {
        label: "Completed",
        className: "bg-green-100 text-green-800 hover:bg-green-200",
      },
      pending: {
        label: "Pending",
        className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
      },
      paused: {
        label: "Paused",
        className: "bg-gray-100 text-gray-800 hover:bg-gray-200",
      },
    };

    const config =
      statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  // const displayName = user.displayName || user.email?.split("@")[0] || "User"

  return (
    <div className="container mx-auto space-y-6">
      <DashHead title="Portfolio" />

      {/* Portfolio Overview */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Your Portfolio</h1>
        <p className="text-gray-600 mt-1">
          Track and manage all your investments in one place.
        </p>
      </div>

      {/* Portfolio Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Portfolio Value
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ${totalPortfolioValue.toLocaleString()}
                </p>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Returns
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  +${totalReturns.toFixed(0)}
                </p>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-500 font-medium">
                    +{((totalReturns / totalPortfolioValue) * 100).toFixed(1)}%
                  </span>
                </div>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Investments
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {activeInvestments}
                </p>
                <p className="text-sm text-gray-500">ongoing plans</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="hover:shadow-xl transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Next Payout</p>
                <p className="text-2xl font-bold text-gray-900">$125</p>
                <p className="text-sm text-gray-500">in 3 days</p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Graph */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Portfolio Performance</CardTitle>
              <div className="flex space-x-1">
                {chartPeriods.map((period) => (
                  <Button
                    key={period}
                    variant={chartPeriod === period ? "default" : "outline"}
                    size="sm"
                    onClick={() => setChartPeriod(period)}
                    className="text-xs"
                  >
                    {period}
                  </Button>
                ))}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={portfolioData}>
                  <XAxis
                    dataKey="date"
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                  />
                  <YAxis
                    axisLine={false}
                    tickLine={false}
                    tick={{ fontSize: 12, fill: "#6b7280" }}
                    tickFormatter={(value) => `$${value.toLocaleString()}`}
                  />
                  <Tooltip
                    formatter={(value) => [
                      `$${value.toLocaleString()}`,
                      "Portfolio Value",
                    ]}
                    labelStyle={{ color: "#374151" }}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                      boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    dot={false}
                    activeDot={{ r: 6, fill: "#3b82f6" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Asset Allocation */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <PieChart className="h-5 w-5 mr-2" />
              Asset Allocation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {assetAllocation.map((asset, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: asset.color }}
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {asset.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        ${asset.amount.toLocaleString()}
                      </p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900">
                    {asset.value}%
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Investment Plans Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Your Investments</CardTitle>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="ongoing">Ongoing</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="paused">Paused</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Plan</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Duration</TableHead>
                  <TableHead>ROI</TableHead>
                  <TableHead>Next Payout</TableHead>
                  <TableHead>Progress</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredInvestments.map((investment) => (
                  <TableRow key={investment.id} className="hover:bg-gray-50">
                    <TableCell className="font-medium">
                      {investment.plan}
                    </TableCell>
                    <TableCell>${investment.amount.toLocaleString()}</TableCell>
                    <TableCell>{getStatusBadge(investment.status)}</TableCell>
                    <TableCell>{investment.duration}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {investment.roi > 0 ? (
                          <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                        ) : (
                          <Clock className="h-4 w-4 text-gray-400 mr-1" />
                        )}
                        <span
                          className={
                            investment.roi > 0
                              ? "text-green-600 font-medium"
                              : "text-gray-500"
                          }
                        >
                          {investment.roi > 0
                            ? `+${investment.roi}%`
                            : "Pending"}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{investment.nextPayout}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <div className="w-16 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${investment.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600">
                          {investment.progress}%
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Activity
              <Button
                variant="ghost"
                size="sm"
                className="text-blue-600 hover:text-blue-700"
              >
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.slice(0, 5).map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                  <div
                    className={`text-sm font-semibold ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {transaction.amount > 0 ? "+" : ""}$
                    {Math.abs(transaction.amount).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Next Steps / Suggestions */}
        <Card>
          <CardHeader>
            <CardTitle>Next Steps</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg border border-green-200">
              <h4 className="font-medium text-green-900">
                Reinvest Completed Funds
              </h4>
              <p className="text-sm text-green-700 mt-1">
                Your Fixed Plan completed with $400 profit. Reinvest now?
              </p>
              <Button
                size="sm"
                className="mt-3 bg-green-600 hover:bg-green-700"
              >
                Reinvest Now
              </Button>
            </div>
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <h4 className="font-medium text-blue-900">Upgrade to Premium</h4>
              <p className="text-sm text-blue-700 mt-1">
                Premium Plan offers higher returns. Upgrade your portfolio.
              </p>
              <Button
                size="sm"
                variant="outline"
                className="mt-3 border-blue-300 text-blue-700 hover:bg-blue-100 bg-transparent"
              >
                Learn More
              </Button>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
              <h4 className="font-medium text-purple-900">
                Portfolio Consultation
              </h4>
              <p className="text-sm text-purple-700 mt-1">
                Schedule a call to optimize your investment strategy.
              </p>
              <Button
                size="sm"
                variant="outline"
                className="mt-3 border-purple-300 text-purple-700 hover:bg-purple-100 bg-transparent"
              >
                Schedule Call
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Portfolio;