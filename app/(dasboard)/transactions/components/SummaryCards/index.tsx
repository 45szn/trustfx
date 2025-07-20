"use client";
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowDownLeft, ArrowUpRight, TrendingUp, Wallet } from "lucide-react";
import { useUserInvestments } from "@/hooks/useUserInvestments";

interface SummaryProps {
  summary: {
    investments: number;
    withdrawals: number;
    returns: number;
    currentBalance: number;
  };
}

export default function Summary({ summary }: SummaryProps) {
  const { balance } = useUserInvestments();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Investments
              </p>
              <p className="text-2xl font-bold text-gray-900">
                ${summary.investments.toLocaleString()}
              </p>
            </div>
            <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
              <ArrowDownLeft className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Withdrawn
              </p>
              <p className="text-2xl font-bold text-gray-900">
                ${summary.withdrawals.toLocaleString()}
              </p>
            </div>
            <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
              <ArrowUpRight className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Returns</p>
              <p className="text-2xl font-bold text-gray-900">
                ${summary.returns.toLocaleString()}
              </p>
            </div>
            <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="hover:shadow-lg transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Current Balance
              </p>
              <p className="text-2xl font-bold text-gray-900">
                ${balance?.toLocaleString()}
              </p>
            </div>
            <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Wallet className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
