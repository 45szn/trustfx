"use client";

import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import DashHead from "../components/DashHead";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Loader2 } from "lucide-react";
import { Plans } from "./tabs/plans";
import ActiveInvestments from "./tabs/active";
import { History } from "./tabs/history";
import { useUserInvestments } from "@/hooks/useUserInvestments";

const Investments = () => {
  const { activeInvestments } = useUserInvestments();
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("plans");

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

        {activeTab === "plans" && (
          <TabsContent value="plans">
            <Plans />
          </TabsContent>
        )}
        {activeTab === "active" && (
          <TabsContent value="active">
            <ActiveInvestments />
          </TabsContent>
        )}
        {activeTab === "history" && (
          <TabsContent value="history">
            <History />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};

export default Investments;
