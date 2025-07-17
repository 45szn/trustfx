import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { TabsContent } from "@/components/ui/tabs";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { format, parseISO, differenceInDays } from "date-fns";
import { Progress } from "@/components/ui/progress";
import { AlertCircle, Eye } from "lucide-react";
import { getStatusBadge } from "../../page";
import { useUserInvestments } from "@/hooks/useUserInvestments";

export default function ActiveInvestments() {
  const { activeInvestments, loading } = useUserInvestments();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [activeTab, setActiveTab] = useState("plans");

  const calculateDaysRemaining = (maturityDate: string) => {
    const today = new Date();
    const maturity = parseISO(maturityDate);
    return Math.max(0, differenceInDays(maturity, today));
  };

  if (loading) return <p>Loading...</p>;
  
  return (
    <>
      <TabsContent value="active" className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>My Active Investments</CardTitle>
          </CardHeader>
          <CardContent>
            {activeInvestments.filter((inv) => inv.status === "active")
              .length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-600 mb-4">
                  You don&apos;t have any active investments yet.
                </p>
                <Button onClick={() => setActiveTab("plans")}>
                  Explore Investment Plans
                </Button>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Plan</TableHead>
                      <TableHead>Invested Amount</TableHead>
                      <TableHead>Date Started</TableHead>
                      <TableHead>Duration</TableHead>
                      <TableHead>Maturity Date</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Expected Return</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {activeInvestments
                      .filter((inv) => inv.status === "active")
                      .map((investment) => {
                        const daysRemaining = calculateDaysRemaining(
                          investment.maturityDate
                        );
                        return (
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
                                "MMM dd, yyyy"
                              )}
                            </TableCell>
                            <TableCell>{investment.duration}</TableCell>
                            <TableCell>
                              <div>
                                <p>
                                  {format(
                                    parseISO(investment.maturityDate),
                                    "MMM dd, yyyy"
                                  )}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {daysRemaining > 0
                                    ? `${daysRemaining} days remaining`
                                    : "Matured"}
                                </p>
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="space-y-1">
                                <Progress
                                  value={investment.progress}
                                  className="w-16"
                                />
                                <span className="text-xs text-gray-600">
                                  {investment.progress}%
                                </span>
                              </div>
                            </TableCell>
                            <TableCell className="text-green-600 font-semibold">
                              ${investment.expectedReturn.toLocaleString()}
                            </TableCell>
                            <TableCell>
                              {getStatusBadge(investment.status)}
                            </TableCell>
                            <TableCell>
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4 mr-1" />
                                View
                              </Button>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Maturity Alerts */}
        {activeInvestments.some(
          (inv) =>
            calculateDaysRemaining(inv.maturityDate) <= 7 &&
            inv.status === "active"
        ) && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-5 w-5 text-orange-600" />
                <div>
                  <h4 className="font-medium text-orange-900">
                    Maturity Alert
                  </h4>
                  <p className="text-sm text-orange-700">
                    Some of your investments are maturing soon. Check your
                    active investments for details.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </TabsContent>
    </>
  );
}
