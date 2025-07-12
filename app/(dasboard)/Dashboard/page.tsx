"use client";

import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import DashHead from "@/components/DashHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  TrendingUp,
  Briefcase,
  Wallet,
  ArrowUpRight,
  Plus,
  Minus,
  FileText,
  Phone,
  Bell,
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
  { date: "Jan", value: 10000 },
  { date: "Feb", value: 10500 },
  { date: "Mar", value: 11200 },
  { date: "Apr", value: 10800 },
  { date: "May", value: 11800 },
  { date: "Jun", value: 12480 },
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
];

const notifications = [
  {
    id: 1,
    title: "New earnings available",
    description: "Your Growth Plan earned $25",
    time: "1 hour ago",
    unread: true,
  },
  {
    id: 2,
    title: "Investment completed",
    description: "Premium Plan cycle completed",
    time: "2 days ago",
    unread: true,
  },
  {
    id: 3,
    title: "System maintenance",
    description: "Scheduled maintenance tonight",
    time: "3 days ago",
    unread: false,
  },
];

const Dashboard = () => {
  const { user } = useAuth();
  const [chartPeriod, setChartPeriod] = useState("1M");

  if (!user) {
    return null;
  }

  const chartPeriods = ["7D", "1M", "3M", "YTD", "All"];

  return (
    <div className="container mx-auto p-6 space-y-6">
      <DashHead title="Dashboard" />

      {/* Welcome Section */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Welcome {user.displayName || user.email}!
        </h1>
        <p className="text-gray-600 mt-1">
          Here&apos;s how your investments are doing today.
        </p>
      </div>

      {/* Account Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Portfolio Value
                </p>
                <p className="text-2xl font-bold text-gray-900">$12,480</p>
              </div>
              <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Returns
                </p>
                <p className="text-2xl font-bold text-gray-900">+$1,120</p>
                <div className="flex items-center mt-1">
                  <ArrowUpRight className="h-4 w-4 text-green-500" />
                  <span className="text-sm text-green-500 font-medium">
                    +9.9%
                  </span>
                </div>
              </div>
              <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Active Investments
                </p>
                <p className="text-2xl font-bold text-gray-900">4</p>
                <p className="text-sm text-gray-500">ongoing plans</p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Briefcase className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Available Balance
                </p>
                <p className="text-2xl font-bold text-gray-900">$1,320</p>
                <p className="text-sm text-gray-500">ready to invest</p>
              </div>
              <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <Wallet className="h-6 w-6 text-orange-600" />
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
                  <XAxis dataKey="date" axisLine={false} tickLine={false} />
                  <YAxis axisLine={false} tickLine={false} />
                  <Tooltip
                    formatter={(value: unknown) => [
                      `$${value}`,
                      "Portfolio Value",
                    ]}
                    labelStyle={{ color: "#374151" }}
                    contentStyle={{
                      backgroundColor: "white",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Recent Activity
              <Button variant="ghost" size="sm">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.slice(0, 4).map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {transaction.description}
                    </p>
                    <p className="text-xs text-gray-500">{transaction.date}</p>
                  </div>
                  <div
                    className={`text-sm font-medium ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}
                  >
                    {transaction.amount > 0 ? "+" : ""}$
                    {Math.abs(transaction.amount)}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recommendations */}
        <Card>
          <CardHeader>
            <CardTitle>Recommendations</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h4 className="font-medium text-blue-900">Reinvest Idle Funds</h4>
              <p className="text-sm text-blue-700 mt-1">
                You have $1,300 idle — reinvest now?
              </p>
              <Button size="sm" className="mt-2">
                Explore Plans
              </Button>
            </div>
            <div className="p-4 bg-purple-50 rounded-lg">
              <h4 className="font-medium text-purple-900">
                Premium Plan Available
              </h4>
              <p className="text-sm text-purple-700 mt-1">
                Premium Plan just opened for new investors.
              </p>
              <Button
                size="sm"
                variant="outline"
                className="mt-2 bg-transparent"
              >
                View Details
              </Button>
            </div>
            <div className="p-4 bg-green-50 rounded-lg">
              <h4 className="font-medium text-green-900">AI Trader Plan</h4>
              <p className="text-sm text-green-700 mt-1">
                Try the AI Trader Plan — now trending
              </p>
              <Button
                size="sm"
                variant="outline"
                className="mt-2 bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Notifications Preview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              Notifications
              <Button variant="ghost" size="sm">
                <Bell className="h-4 w-4 mr-1" />
                Go to Notifications
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {notifications.slice(0, 3).map((notification) => (
                <div
                  key={notification.id}
                  className="flex items-start space-x-3"
                >
                  <div
                    className={`w-2 h-2 rounded-full mt-2 ${notification.unread ? "bg-blue-500" : "bg-gray-300"}`}
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {notification.title}
                    </p>
                    <p className="text-xs text-gray-500">
                      {notification.description}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {notification.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Button
              variant="outline"
              className="flex flex-col items-center p-4 h-auto bg-transparent"
            >
              <Plus className="h-6 w-6 mb-2 text-green-600" />
              <span className="text-sm">Deposit Funds</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center p-4 h-auto bg-transparent"
            >
              <Minus className="h-6 w-6 mb-2 text-red-600" />
              <span className="text-sm">Withdraw</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center p-4 h-auto bg-transparent"
            >
              <TrendingUp className="h-6 w-6 mb-2 text-blue-600" />
              <span className="text-sm">New Investment</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center p-4 h-auto bg-transparent"
            >
              <FileText className="h-6 w-6 mb-2 text-purple-600" />
              <span className="text-sm">View Statements</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col items-center p-4 h-auto bg-transparent"
            >
              <Phone className="h-6 w-6 mb-2 text-orange-600" />
              <span className="text-sm">Schedule Call</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
