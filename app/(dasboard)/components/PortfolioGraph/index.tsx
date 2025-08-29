"use client";

import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import type { ChartPeriod } from "@/hooks/usePortfolioPerformance";

interface Props {
  chartPeriod: ChartPeriod;
  setChartPeriod: (p: ChartPeriod) => void;
  chartData: { date: string; value: number }[];
}

const chartPeriods: ChartPeriod[] = ["7D", "1M", "3M", "YTD", "All"];

export default function PortfolioGraph({
  chartPeriod,
  setChartPeriod,
  chartData,
}: Props) {
  return (
    <Card className="h-fit lg:col-span-2">
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
            <LineChart data={chartData}>
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
                tickFormatter={(v) => `$${v.toLocaleString()}`}
              />
              <Tooltip
                formatter={(v) => [`$${v.toLocaleString()}`, "Portfolio Value"]}
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
  );
}
