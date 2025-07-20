"use client";

import { useState, useEffect, useMemo } from "react";
import useAuth from "@/hooks/useAuth";
import DashHead from "../components/DashHead";
import { Loader2 } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import TransactionsTable from "./components/TransactionsTable";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Summary from "./components/SummaryCards";
import Filters from "./components/Filters";
import { useToast } from "@/hooks/use-toast";

const Transactions = () => {
  const { user, loading } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [transactionsData, setTransactionsData] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);
  const { toast } = useToast();

  // Fetch transactions from Firestore
  useEffect(() => {
    const fetchTransactions = async () => {
      if (!user?.uid) return;

      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const userData = docSnap.data();
          console.log(userData);
          setTransactionsData(userData.transactions || []);
        }
      } catch (err) {
        console.error("Failed to fetch transactions:", err);
      } finally {
        setFetching(false);
      }
    };

    fetchTransactions();
  }, [user]);

  // Calculate summary data
  const summaryData = useMemo(() => {
    const investments = transactionsData
      .filter((t) => t.type === "investment" && t.status === "completed")
      .reduce((sum, t) => sum + t.amount, 0);

    const withdrawals = transactionsData
      .filter((t) => t.type === "withdrawal" && t.status === "completed")
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);

    const returns = transactionsData
      .filter((t) => t.type === "return" && t.status === "completed")
      .reduce((sum, t) => sum + t.amount, 0);

    const currentBalance =
      transactionsData
        .filter((t) => t.status === "completed")
        .reduce((acc, t) => {
          if (t.type === "deposit" || t.type === "return")
            return acc + t.amount;
          if (t.type === "withdrawal" || t.type === "investment")
            return acc - t.amount;
          return acc;
        }, 0) || 0;

    return { investments, withdrawals, returns, currentBalance };
  }, [transactionsData]);

  // Filter transactions
  const filteredTransactions = useMemo(() => {
    const filtered = transactionsData.filter((transaction) => {
      const matchesSearch =
        searchTerm === "" ||
        transaction.details?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        transaction.amount?.toString().includes(searchTerm);

      const matchesType =
        typeFilter === "all" || transaction.type === typeFilter;

      const matchesStatus =
        statusFilter === "all" || transaction.status === statusFilter;

      const transactionDate = transaction.date?.toDate
        ? transaction.date.toDate()
        : new Date(transaction.date);

      const matchesDateRange =
        (!dateRange?.from || transactionDate >= dateRange.from) &&
        (!dateRange?.to || transactionDate <= dateRange.to);

      return matchesSearch && matchesType && matchesStatus && matchesDateRange;
    });

    // ✅ Sort by date + time (most recent first)
    return filtered.sort((a, b) => {
      const dateA = a.date?.toDate ? a.date.toDate() : new Date(a.date);
      const dateB = b.date?.toDate ? b.date.toDate() : new Date(b.date);
      return dateB.getTime() - dateA.getTime(); // Descending
    });
  }, [transactionsData, searchTerm, typeFilter, statusFilter, dateRange]);

  // Pagination
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

  const copyTransactionId = (id: string) => {
    navigator.clipboard.writeText(id);

    toast({
      description: `copied!`,
    });
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

  // Show loading spinner while authentication is being checked
  if (loading || fetching) {
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
      <Summary summary={summaryData} />

      {/* Filters & Search */}
      <Filters
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        dateRange={dateRange}
        setDateRange={setDateRange}
      />

      {/* Transactions Table */}
      <TransactionsTable
        transactions={filteredTransactions}
        currentPage={currentPage}
        totalPages={totalPages}
        itemsPerPage={itemsPerPage}
        onCopy={copyTransactionId}
        onExport={exportTransactions}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
};

export default Transactions;
