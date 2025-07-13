"use client";

import { useState, useMemo } from "react";
import useAuth from "@/hooks/useAuth";
import DashHead from "../components/DashHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DollarSign,
  ArrowUpRight,
  ArrowDownLeft,
  TrendingUp,
  Wallet,
  Search,
  Download,
  Copy,
  CalendarIcon,
  Filter,
  Loader2,
} from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

// Mock data - replace with real data from your API
const transactionsData = [
  {
    id: "TXN001",
    date: "2025-07-12T15:12:00Z",
    type: "deposit",
    details: "Wallet top-up",
    amount: 2500,
    status: "completed",
    balanceAfter: 12800,
  },
  {
    id: "TXN002",
    date: "2025-07-12T14:30:00Z",
    type: "investment",
    details: "Invested in Growth Plan",
    amount: -1500,
    status: "completed",
    balanceAfter: 10300,
  },
  {
    id: "TXN003",
    date: "2025-07-11T10:45:00Z",
    type: "return",
    details: "Growth Plan payout",
    amount: 125.5,
    status: "completed",
    balanceAfter: 11800,
  },
  {
    id: "TXN004",
    date: "2025-07-10T16:20:00Z",
    type: "withdrawal",
    details: "Bank transfer",
    amount: -800,
    status: "completed",
    balanceAfter: 11675,
  },
  {
    id: "TXN005",
    date: "2025-07-09T09:15:00Z",
    type: "fee",
    details: "Early withdrawal fee",
    amount: -25,
    status: "completed",
    balanceAfter: 12475,
  },
  {
    id: "TXN006",
    date: "2025-07-08T11:30:00Z",
    type: "investment",
    details: "Invested in Premium Plan",
    amount: -3000,
    status: "pending",
    balanceAfter: 12500,
  },
  {
    id: "TXN007",
    date: "2025-07-07T14:22:00Z",
    type: "return",
    details: "Fixed Plan completed",
    amount: 400,
    status: "completed",
    balanceAfter: 15500,
  },
  {
    id: "TXN008",
    date: "2025-07-06T08:45:00Z",
    type: "deposit",
    details: "Credit card deposit",
    amount: 1000,
    status: "completed",
    balanceAfter: 15100,
  },
  {
    id: "TXN009",
    date: "2025-07-05T13:10:00Z",
    type: "bonus",
    details: "Referral bonus",
    amount: 50,
    status: "completed",
    balanceAfter: 14100,
  },
  {
    id: "TXN010",
    date: "2025-07-04T17:35:00Z",
    type: "withdrawal",
    details: "PayPal withdrawal",
    amount: -500,
    status: "failed",
    balanceAfter: 14050,
  },
];

const Transactions = () => {
  const { user, loading } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  // const [dateRange, setDateRange] = useState<{ from?: Date; to?: Date }>({})
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Calculate summary data
  const summaryData = useMemo(() => {
    const deposits = transactionsData
      .filter((t) => t.type === "deposit" && t.status === "completed")
      .reduce((sum, t) => sum + t.amount, 0);

    const withdrawals = transactionsData
      .filter((t) => t.type === "withdrawal" && t.status === "completed")
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const returns = transactionsData
      .filter((t) => t.type === "return" && t.status === "completed")
      .reduce((sum, t) => sum + t.amount, 0);

    const currentBalance = 10800; // This should come from your API

    return { deposits, withdrawals, returns, currentBalance };
  }, []);

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    return transactionsData.filter((transaction) => {
      const matchesSearch =
        searchTerm === "" ||
        transaction.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.amount.toString().includes(searchTerm);

      const matchesType =
        typeFilter === "all" || transaction.type === typeFilter;
      const matchesStatus =
        statusFilter === "all" || transaction.status === statusFilter;

      const transactionDate = new Date(transaction.date);
      // const matchesDateRange =
      //   (!dateRange?.from || transactionDate >= dateRange.from) && (!dateRange?.to || transactionDate <= dateRange.to)
      const matchesDateRange =
        (!dateRange?.from || transactionDate >= dateRange.from) &&
        (!dateRange?.to || transactionDate <= dateRange.to);

      return matchesSearch && matchesType && matchesStatus && matchesDateRange;
    });
  }, [searchTerm, typeFilter, statusFilter, dateRange]);

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  const paginatedTransactions = filteredTransactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  const getTransactionIcon = (type: string) => {
    const icons = {
      deposit: <ArrowDownLeft className="h-4 w-4 text-green-600" />,
      withdrawal: <ArrowUpRight className="h-4 w-4 text-red-600" />,
      investment: <TrendingUp className="h-4 w-4 text-blue-600" />,
      return: <DollarSign className="h-4 w-4 text-green-600" />,
      fee: <ArrowUpRight className="h-4 w-4 text-red-600" />,
      bonus: <DollarSign className="h-4 w-4 text-green-600" />,
    };
    return (
      icons[type as keyof typeof icons] || (
        <DollarSign className="h-4 w-4 text-gray-600" />
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
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const copyTransactionId = (id: string) => {
    navigator.clipboard.writeText(id);
    // You can add a toast notification here
  };

  const exportTransactions = () => {
    // Implement CSV export functionality
    const csvContent = [
      ["Date", "Type", "Details", "Amount", "Status", "ID"],
      ...filteredTransactions.map((t) => [
        format(new Date(t.date), "yyyy-MM-dd HH:mm:ss"),
        t.type,
        t.details,
        t.amount,
        t.status,
        t.id,
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
    window.URL.revokeObjectURL(url);
  };

  // const displayName = user.displayName || user.email?.split("@")[0] || "User"

  // Show loading spinner while authentication is being checked
  if (loading) {
    return (
      <div className="container mx-auto p-6 flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-gray-600">Loading transactions...</span>
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
            Please log in to view your transactions.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-6">
      <DashHead title="Transactions" />

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Transactions</h1>
        <p className="text-gray-600 mt-1">
          A complete log of your account activity and movement of funds.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="hover:shadow-lg transition-shadow">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Deposits
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ${summaryData.deposits.toLocaleString()}
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
                  ${summaryData.withdrawals.toLocaleString()}
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
                <p className="text-sm font-medium text-gray-600">
                  Total Returns
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  ${summaryData.returns.toLocaleString()}
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
                  ${summaryData.currentBalance.toLocaleString()}
                </p>
              </div>
              <div className="h-12 w-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Wallet className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters & Search */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filters
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search transactions..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Type Filter */}
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Transaction Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="deposit">Deposit</SelectItem>
                <SelectItem value="withdrawal">Withdrawal</SelectItem>
                <SelectItem value="investment">Investment</SelectItem>
                <SelectItem value="return">Return</SelectItem>
                <SelectItem value="fee">Fee</SelectItem>
                <SelectItem value="bonus">Bonus</SelectItem>
              </SelectContent>
            </Select>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="failed">Failed</SelectItem>
              </SelectContent>
            </Select>

            {/* Date Range */}
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="justify-start text-left font-normal bg-transparent"
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {dateRange?.from ? (
                    dateRange.to ? (
                      <>
                        {format(dateRange.from, "LLL dd, y")} -{" "}
                        {format(dateRange.to, "LLL dd, y")}
                      </>
                    ) : (
                      format(dateRange.from, "LLL dd, y")
                    )
                  ) : (
                    <span>Pick a date range</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange?.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                />

                {/* <Calendar
                  initialFocus
                  mode="range"
                  defaultMonth={dateRange.from}
                  selected={dateRange}
                  onSelect={setDateRange}
                  numberOfMonths={2}
                /> */}
              </PopoverContent>
            </Popover>
          </div>
        </CardContent>
      </Card>

      {/* Transactions Table */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Transaction History</CardTitle>
            <Button onClick={exportTransactions} variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
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
                {paginatedTransactions.map((transaction) => (
                  <TableRow key={transaction.id} className="hover:bg-gray-50">
                    <TableCell>
                      <div>
                        <p className="font-medium">
                          {format(new Date(transaction.date), "MMM dd, yyyy")}
                        </p>
                        <p className="text-xs text-gray-500">
                          {format(new Date(transaction.date), "HH:mm")}
                        </p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        {getTransactionIcon(transaction.type)}
                        <span className="capitalize font-medium">
                          {transaction.type}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{transaction.details}</TableCell>
                    <TableCell>
                      <span
                        className={`font-semibold ${transaction.amount > 0 ? "text-green-600" : "text-red-600"}`}
                      >
                        {transaction.amount > 0 ? "+" : ""}$
                        {Math.abs(transaction.amount).toLocaleString()}
                      </span>
                    </TableCell>
                    <TableCell>{getStatusBadge(transaction.status)}</TableCell>
                    <TableCell className="font-medium">
                      ${transaction.balanceAfter.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">
                          {transaction.id}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => copyTransactionId(transaction.id)}
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

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-gray-600">
                Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
                {Math.min(
                  currentPage * itemsPerPage,
                  filteredTransactions.length,
                )}{" "}
                of {filteredTransactions.length} transactions
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
    </div>
  );
};

export default Transactions;

// "use client";
// import React from "react";
// import useAuth from "@/hooks/useAuth";
// import DashHead from "@/app/(dasboard)/components/DashHead";

// const Transactions = () => {
//   const { user } = useAuth();

//   if (!user) {
//     return null;
//   }

//   return (
//     <>
//       <DashHead title="Transactions" />
//     </>
//   );
// };

// export default Transactions;
