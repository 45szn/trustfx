import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import React from "react";
import { format, parseISO } from "date-fns";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useUserInvestments } from "@/hooks/useUserInvestments";
import { Clock, CheckCircle, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const getStatusBadge = (status: string) => {
  const statusConfig = {
    active: {
      label: "Active",
      className: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      icon: <Loader2 className="h-3 w-3" />,
    },
    completed: {
      label: "Completed",
      className: "bg-green-100 text-green-800",
      icon: <CheckCircle className="h-3 w-3" />,
    },
    pending: {
      label: "Pending",
      className: "bg-yellow-100 text-yellow-800",
      icon: <Clock className="h-3 w-3" />,
    },
  };

  const config = statusConfig[status as keyof typeof statusConfig];
  return (
    <Badge className={`${config.className} flex items-center space-x-1`}>
      {config.icon}
      <span>{config.label}</span>
    </Badge>
  );
};

export const History = () => {
  const { investmentHistory, loading } = useUserInvestments();

  if (loading) return <p>Loading...</p>;
  return (
    <>
      <TabsContent value="history" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Investment History</CardTitle>
          </CardHeader>
          <CardContent>
            {investmentHistory.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600">No completed investments yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Plan</TableHead>
                      <TableHead>Invested Amount</TableHead>
                      <TableHead>Date Started</TableHead>
                      <TableHead>Date Completed</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Actual Return</TableHead>
                      <TableHead>Profit</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {investmentHistory.map((investment) => (
                      <TableRow
                        key={investment.id}
                        className="hover:bg-gray-50"
                      >
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <span className="text-lg">
                              {investment.planIcon}
                            </span>
                            <span className="font-medium">
                              {investment.planName}
                            </span>
                          </div>
                        </TableCell>
                        <TableCell className="font-semibold">
                          ${investment.investedAmount.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {format(
                            parseISO(investment.dateStarted),
                            "MMM dd, yyyy",
                          )}
                        </TableCell>
                        <TableCell>
                          {format(
                            parseISO(investment.dateCompleted),
                            "MMM dd, yyyy",
                          )}
                        </TableCell>
                        <TableCell>{investment.duration}</TableCell>
                        <TableCell className="font-semibold">
                          ${investment.actualReturn.toLocaleString()}
                        </TableCell>
                        <TableCell className="text-green-600 font-semibold">
                          +${investment.profit.toLocaleString()}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(investment.status)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </TabsContent>
    </>
  );
};
