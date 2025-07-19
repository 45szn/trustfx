"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { PieChart as LucidePieChart } from "lucide-react";
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip as RechartsTooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface Investment {
  planName: string;
  investedAmount: number;
}

interface Props {
  activeInvestments: Investment[];
}

const assetColorMap = ["#3b82f6", "#10b981", "#f59e0b", "#8b5cf6", "#ef4444"];

export default function AssetAllocation({ activeInvestments }: Props) {
  const allocationData = Object.values(
    activeInvestments.reduce<Record<string, { name: string; value: number }>>(
      (acc, inv) => {
        const name = inv.planName;
        acc[name] = acc[name] || { name, value: 0 };
        acc[name].value += inv.investedAmount;
        return acc;
      },
      {},
    ),
  );

  const COLORS = allocationData.map(
    (_, idx) => assetColorMap[idx % assetColorMap.length],
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <LucidePieChart className="h-5 w-5 mr-2" />
          Asset Allocation
        </CardTitle>
      </CardHeader>
      <CardContent>
        {allocationData.length ? (
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPieChart>
                <Pie
                  data={allocationData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  label
                >
                  {allocationData.map((_, index) => (
                    <Cell key={index} fill={COLORS[index]} />
                  ))}
                </Pie>
                <RechartsTooltip
                  formatter={(value: number) => `$${value.toLocaleString()}`}
                />
                <Legend verticalAlign="bottom" height={36} />
              </RechartsPieChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <p className="text-sm text-gray-500">
            No asset allocation data available
          </p>
        )}
      </CardContent>
    </Card>
  );
}
