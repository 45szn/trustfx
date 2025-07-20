// components/TransactionsTable.tsx
"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Copy } from "lucide-react";
import { format } from "date-fns";
import { useEffect } from "react";

interface Transaction {
  id: string;
  date: string;
  type: string;
  details: string;
  amount: number;
  status: string;
  balanceAfter?: number;
}

interface Props {
  transactions: Transaction[];
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  onCopy: (id: string) => void;
  onExport: () => void;
  setCurrentPage: (page: number) => void;
}

const getTransactionIcon = (type: string) => {
  const icons = {
    withdrawal: <span className="text-red-600">↑</span>,
    investment: <span className="text-blue-600">📈</span>,
    return: <span className="text-green-600">💵</span>,
  };
  return (
    icons[type as keyof typeof icons] || (
      <span className="text-gray-600">💰</span>
    )
  );
};

const getStatusBadge = (status: string) => {
  const statusConfig = {
    completed: {
      label: "Completed",
      className: "bg-green-100 text-green-800 hover:bg-green-200",
    },
    pending: {
      label: "Pending",
      className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    },
    failed: {
      label: "Failed",
      className: "bg-red-100 text-red-800 hover:bg-red-200",
    },
  };
  const config =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  return (
    <span
      className={`text-xs font-medium px-2 py-1 rounded ${config.className}`}
    >
      {config.label}
    </span>
  );
};

export default function TransactionsTable({
  transactions,
  currentPage,
  totalPages,
  itemsPerPage,
  onCopy,
  onExport,
  setCurrentPage,
}: Props) {
  function calculateBalances(transactions: Transaction[]): Transaction[] {
    // Clone to avoid mutating original
    const sorted = [...transactions].sort(
      (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
    );

    let runningBalance = 0;

    return sorted.map((t) => {
      runningBalance += t.amount;
      return {
        ...t,
        balanceAfter: runningBalance,
      };
    });
  }

  const computedTransactions = calculateBalances(transactions).reverse();
  const paginated = computedTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  useEffect(() => {
    transactions.forEach((t) => {
      if (typeof t.balanceAfter !== "number") {
        console.warn("Missing balanceAfter for:", t.id);
      }
    });
  }, [transactions]);

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Transaction History</CardTitle>
          <Button onClick={onExport} variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" /> Export CSV
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Details</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Balance After</TableHead>
                <TableHead>ID</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {paginated.map((t) => (
                <TableRow key={t.id} className="hover:bg-gray-50">
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {format(new Date(t.date), "MMM dd, yyyy")}
                      </p>
                      <p className="text-xs text-gray-500">
                        {format(new Date(t.date), "HH:mm")}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      {getTransactionIcon(t.type)}
                      <span className="capitalize font-medium">{t.type}</span>
                    </div>
                  </TableCell>
                  <TableCell>{t.details}</TableCell>
                  <TableCell>
                    <span
                      className={`font-semibold ${t.amount > 0 ? "text-green-600" : "text-red-600"}`}
                    >
                      {t.amount > 0 ? "+" : ""}$
                      {Math.abs(t.amount).toLocaleString()}
                    </span>
                  </TableCell>
                  <TableCell>{getStatusBadge(t.status)}</TableCell>
                  <TableCell className="font-medium">
                    {typeof t.balanceAfter === "number" ? (
                      <>${t.balanceAfter.toLocaleString()}</>
                    ) : (
                      <span className="text-gray-400 italic">N/A</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-600">{t.id}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onCopy(t.id)}
                        className="h-6 w-6 p-0"
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-6">
            <p className="text-sm text-gray-600">
              Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
              {Math.min(currentPage * itemsPerPage, transactions.length)} of{" "}
              {transactions.length} transactions
            </p>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
