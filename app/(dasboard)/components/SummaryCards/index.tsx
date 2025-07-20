// components/PortfolioSummaryCards.tsx
"use client";

import { Card, CardContent } from "@/components/ui/card";
import {
  ArrowUpRight,
  Calendar,
  DollarSign,
  Target,
  TrendingUp,
} from "lucide-react";

interface Props {
  totalValue: number;
  totalReturns: number;
  activeInvestments: number;
  nextPayout: {
    amount: number;
    inDays: number;
  } | null;
}

export default function SummaryCards({
  totalValue,
  totalReturns,
  activeInvestments,
  nextPayout,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="hover:shadow-xl transition-shadow">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">
                Total Portfolio Value
              </p>
              <p className="text-2xl font-bold text-gray-900">
                ${totalValue.toLocaleString()}
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
              <p className="text-sm font-medium text-gray-600">Total Returns</p>
              <p className="text-2xl font-bold text-gray-900">
                +${totalReturns.toFixed(0)}
              </p>
              <div className="flex items-center mt-1">
                <ArrowUpRight className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-500 font-medium">
                  +{((totalReturns / totalValue) * 100).toFixed(1)}%
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
              {nextPayout ? (
                <>
                  <p className="text-2xl font-bold text-gray-900">
                    ${nextPayout.amount.toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-500">
                    in {nextPayout.inDays}{" "}
                    {nextPayout.inDays === 1 ? "day" : "days"}
                  </p>
                </>
              ) : (
                <p className="text-sm text-gray-500">No upcoming payout</p>
              )}
            </div>
            <div className="h-12 w-12 bg-orange-100 rounded-lg flex items-center justify-center">
              <Calendar className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
