"use client";

import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import DashHead from "../components/DashHead";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, CheckCircle, Loader2 } from "lucide-react";
import { Plans } from "./tabs/plans";
import ActiveInvestments from "./tabs/active";
import { History } from "./tabs/history";
import { useUserInvestments } from "@/hooks/useUserInvestments";

export const getStatusBadge = (status: string) => {
  const statusConfig = {
    active: {
      label: "Active",
      className: "bg-blue-100 text-blue-800",
      icon: <Loader2 className="h-3 w-3" />,
    },
    completed: {
      label: "Completed",
      className: "bg-green-100 text-green-800",
      icon: <CheckCircle className="h-3 w-3" />,
    },
    pending: {
      label: "Pending",
      className: "bg-yellow-100 text-yellow-800",
      icon: <Clock className="h-3 w-3" />,
    },
  };

  const config = statusConfig[status as keyof typeof statusConfig];
  return (
    <Badge className={`${config.className} flex items-center space-x-1`}>
      {config.icon}
      <span>{config.label}</span>
    </Badge>
  );
};

const Investments = () => {
  const { activeInvestments } = useUserInvestments();
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("plans");

  // Show loading spinner while authentication is being checked
  if (loading) {
    return (
      <div className="container mx-auto p-6 flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-gray-600">Loading investments...</span>
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
          <p className="text-gray-600">
            Please log in to view investment opportunities.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-6">
      <DashHead title="Investments" />

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Investments</h1>
        <p className="text-gray-600 mt-1">
          Explore investment plans, start new ones, and manage your portfolio.
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="flex justify-between w-fit">
          <TabsTrigger value="plans" className="text-xs md:text-sm">
            Investment Plans
          </TabsTrigger>
          <TabsTrigger value="active" className="text-xs md:text-sm">
            My Investments (
            {activeInvestments.filter((inv) => inv.status === "active").length})
          </TabsTrigger>
          <TabsTrigger value="history" className="text-xs md:text-sm">
            History
          </TabsTrigger>
        </TabsList>

        {/* Investment Plans Tab */}
        <Plans />

        {/* Active Investments Tab */}
        <ActiveInvestments />

        {/* Investment History Tab */}
        <History />
      </Tabs>
    </div>
  );
};

export default Investments;
