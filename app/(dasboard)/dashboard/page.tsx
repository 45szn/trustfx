"use client";

import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import DashHead from "../components/DashHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { TrendingUp, Plus, Minus, FileText, Phone, Bell } from "lucide-react";
import SummaryCards from "../components/SummaryCards";
import { useUserInvestments } from "@/hooks/useUserInvestments";
import { differenceInDays, parseISO } from "date-fns";
import PortfolioGraph from "../components/PortfolioGraph";
import { usePortfolioPerformance } from "@/hooks/usePortfolioPerformance";
import type { ChartPeriod } from "@/hooks/usePortfolioPerformance";
import RecentActivity from "../components/RecentActivity";
import { Recommendations } from "../components/Reccomendations";

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
  const { activeInvestments: activeInvestmentsData, transactions } =
    useUserInvestments();
  const [chartPeriod, setChartPeriod] = useState<ChartPeriod>("1M");
  const chartData = usePortfolioPerformance(chartPeriod);

  const totalPortfolioValue = activeInvestmentsData
    .filter((inv) => inv.status === "active" && !isNaN(inv.investedAmount))
    .reduce((sum, inv) => sum + inv.investedAmount, 0);

  const totalReturns = activeInvestmentsData
    .filter((inv) => inv.status === "active")
    .reduce((sum, inv) => {
      const invested = Number(inv.investedAmount) || 0;
      const expected = Number(inv.expectedReturn) || 0;
      return sum + (expected - invested);
    }, 0);

  const activeInvestments = activeInvestmentsData.length;

  const nextPayoutInvestment = activeInvestmentsData
    .filter((inv) => new Date(inv.maturityDate) > new Date())
    .sort(
      (a, b) =>
        new Date(a.maturityDate).getTime() - new Date(b.maturityDate).getTime(),
    )[0];

  const nextPayout = nextPayoutInvestment
    ? {
        amount: nextPayoutInvestment.expectedReturn,
        inDays: differenceInDays(
          parseISO(nextPayoutInvestment.maturityDate),
          new Date(),
        ),
      }
    : null;

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto space-y-6">
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
      <SummaryCards
        totalValue={totalPortfolioValue}
        totalReturns={totalReturns}
        activeInvestments={activeInvestments}
        nextPayout={nextPayout}
      />

      <div className="">
        <PortfolioGraph
          chartData={chartData}
          chartPeriod={chartPeriod}
          setChartPeriod={setChartPeriod}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <RecentActivity transactions={transactions} />

        <Recommendations />

        {/* Notifications Preview */}
        {/* <Card>
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
        </Card> */}
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
