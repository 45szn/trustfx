// hooks/usePortfolioPerformance.ts
import { useEffect, useState } from "react";
import { useUserInvestments } from "@/hooks/useUserInvestments";
import { format, addDays, isBefore } from "date-fns";

export type ChartPeriod = "7D" | "1M" | "3M" | "YTD" | "All";

export function usePortfolioPerformance(chartPeriod: ChartPeriod) {
  const { activeInvestments } = useUserInvestments();
  const [data, setData] = useState<{ date: string; value: number }[]>([]);

  useEffect(() => {
    if (!activeInvestments.length) return;

    const now = new Date();
    let start: Date;

    switch (chartPeriod) {
      case "7D":
        start = addDays(now, -7);
        break;
      case "1M":
        start = addDays(now, -30);
        break;
      case "3M":
        start = addDays(now, -90);
        break;
      case "YTD":
        start = new Date(now.getFullYear(), 0, 1);
        break;
      default:
        start = new Date(Math.min(...activeInvestments.map(inv => new Date(inv.dateStarted).getTime())));
        break;
    }

    const days: { date: string; value: number }[] = [];
    const dayCount = Math.floor((now.getTime() - start.getTime()) / (1000 * 60 * 60 * 24));

    for (let i = 0; i <= dayCount; i++) {
      const day = addDays(start, i);
      const dateStr = format(day, "MMM d");

      const value = activeInvestments.reduce((sum, inv) => {
        const startDate = new Date(inv.dateStarted);
        const maturityDate = new Date(inv.maturityDate);
        if (isBefore(startDate, day) && isBefore(day, maturityDate)) {
          return sum + inv.investedAmount;
        }
        return sum;
      }, 0);

      days.push({ date: dateStr, value });
    }

    setData(days);
  }, [chartPeriod, activeInvestments]);

  return data;
}
