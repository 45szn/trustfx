"use client";

import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import DashHead from "../components/DashHead";
import { Loader2 } from "lucide-react";
import SummaryCards from "../components/SummaryCards";
import InvestmentPlansTable from "./components/InvestmentsTable";
import RecentActivity from "../components/RecentActivity";
import { useUserInvestments } from "@/hooks/useUserInvestments";
import { parseISO, differenceInDays } from "date-fns";
import { usePortfolioPerformance } from "@/hooks/usePortfolioPerformance";
import type { ChartPeriod } from "@/hooks/usePortfolioPerformance";
import PortfolioGraph from "../components/PortfolioGraph";
import AssetAllocation from "./components/AssetAllocation";
import { Recommendations } from "../components/Reccomendations";

const Portfolio = () => {
  const { user, loading } = useAuth();
  const [statusFilter, setStatusFilter] = useState("all");
  const [chartPeriod, setChartPeriod] = useState<ChartPeriod>("1M");
  const { activeInvestments: activeInvestmentsData, transactions } =
    useUserInvestments();
  const chartData = usePortfolioPerformance(chartPeriod);

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

  const displayName = user.displayName || user.email?.split("@")[0] || "User";

  return (
    <div className="container mx-auto space-y-6">
      {/* <DashHead title="Portfolio" /> */}

      {/* Portfolio Overview */}
      <div className="my-8">
        <h1 className="text-2xl font-bold text-gray-900">
          {displayName}&apos;s Portfolio
        </h1>
        <p className="text-gray-600 mt-1">
          Track and manage all your investments in one place.
        </p>
      </div>

      {/* Portfolio Summary Cards */}
      <SummaryCards
        totalValue={totalPortfolioValue}
        totalReturns={totalReturns}
        activeInvestments={activeInvestments}
        nextPayout={nextPayout}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PortfolioGraph
          chartData={chartData}
          chartPeriod={chartPeriod}
          setChartPeriod={setChartPeriod}
        />
        <AssetAllocation activeInvestments={activeInvestmentsData} />
      </div>

      {/* Investment Plans Table 81 */}
      <InvestmentPlansTable
        investments={activeInvestmentsData}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentActivity transactions={transactions} />

        <Recommendations />
      </div>
    </div>
  );
};

export default Portfolio;
