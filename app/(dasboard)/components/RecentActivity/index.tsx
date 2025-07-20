// components/RecentActivity.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { format, formatDistanceToNow } from "date-fns";

interface Transaction {
  id: string | number;
  details: string;
  date: string;
  amount: number;
}

interface Props {
  transactions: Transaction[];
}

export default function RecentActivity({ transactions }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          Recent Activity
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-700"
          >
            View All <ChevronRight className="h-4 w-4 ml-1" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.slice(0, 5).map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between p-3 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">
                  {transaction.details}
                </p>
                {/* {format(new Date(transaction.date), "MMM dd, yyyy")} */}
                <p className="text-xs text-gray-500 my-1">
                  {format(new Date(transaction.date), "MMM dd, yyyy")}
                </p>
                <p className="text-xs text-gray-500">
                  {formatDistanceToNow(new Date(transaction.date), {
                    addSuffix: true,
                  })}
                </p>
              </div>
              <div
                className={`text-sm font-semibold ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}
              >
                {transaction.amount > 0 ? "+" : ""}$
                {Math.abs(transaction.amount).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
