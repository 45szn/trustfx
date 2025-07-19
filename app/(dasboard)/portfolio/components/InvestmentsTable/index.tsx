"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

interface Investment {
  id: string | number;
  planName: string;
  investedAmount: number;
  status: string;
  duration: string;
  maturityDate: string;
  expectedReturn: number;
  progress: number;
}

interface Props {
  investments: Investment[];
  statusFilter: string;
  setStatusFilter: (value: string) => void;
}

const getStatusBadge = (status: string) => {
  const statusConfig = {
    active: {
      label: "Active",
      className: "bg-blue-100 text-blue-800 hover:bg-blue-200",
    },
    completed: {
      label: "Completed",
      className: "bg-green-100 text-green-800 hover:bg-green-200",
    },
    pending: {
      label: "Pending",
      className: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    },
    paused: {
      label: "Paused",
      className: "bg-gray-100 text-gray-800 hover:bg-gray-200",
    },
  };

  const config =
    statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  return <Badge className={config.className}>{config.label}</Badge>;
};

export default function InvestmentPlansTable({
  investments,
  statusFilter,
  setStatusFilter,
}: Props) {
  const filtered = investments.filter(
    (investment) =>
      statusFilter === "all" || investment.status === statusFilter,
  );

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Your Investments</CardTitle>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="paused">Paused</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Plan</TableHead>
                <TableHead>Invested</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Maturity Date</TableHead>
                <TableHead>Expected Return</TableHead>
                <TableHead>Progress</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.map((investment) => (
                <TableRow key={investment.id} className="hover:bg-gray-50">
                  <TableCell className="font-medium">
                    {investment.planName}
                  </TableCell>
                  <TableCell>
                    ${investment.investedAmount.toLocaleString()}
                  </TableCell>
                  <TableCell>{getStatusBadge(investment.status)}</TableCell>
                  <TableCell>{investment.duration}</TableCell>
                  <TableCell>{investment.maturityDate}</TableCell>
                  <TableCell>
                    ${investment.expectedReturn.toLocaleString()}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="w-16 bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${investment.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-gray-600">
                        {investment.progress}%
                      </span>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
