"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";

interface Investment {
  id: string;
  planIcon: string;
  planName: string;
  investedAmount: number;
  dateStarted: string;
  duration: string;
  maturityDate: string;
  progress: number;
  expectedReturn: number;
  status: string;
  // Add any other properties that might be part of an investment object
  // For example, if there are more details you want to show in the modal
  interestRate: number;
  payoutFrequency: string;
}

export default function ActiveInvestments() {
  const { activeInvestments, loading } = useUserInvestments();
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedInvestment, setSelectedInvestment] =
    useState<Investment | null>(null);

  const calculateDaysRemaining = (maturityDate: string) => {
    const today = new Date();
    const maturity = parseISO(maturityDate);
    return Math.max(0, differenceInDays(maturity, today));
  };

  const handleViewDetails = (investment: Investment) => {
    setSelectedInvestment(investment);
    setShowDetailsModal(true);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <Tabs defaultValue="active">
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
                  <Button>Explore Investment Plans</Button>
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
                            investment.maturityDate,
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
                                  "MMM dd, yyyy",
                                )}
                              </TableCell>
                              <TableCell>{investment.duration}</TableCell>
                              <TableCell>
                                <div>
                                  <p>
                                    {format(
                                      parseISO(investment.maturityDate),
                                      "MMM dd, yyyy",
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
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() =>
                                    handleViewDetails(investment as Investment)
                                  }
                                >
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
              inv.status === "active",
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
      </Tabs>

      {/* Investment Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Investment Details</DialogTitle>
            <DialogDescription>
              Detailed information about your selected investment.
            </DialogDescription>
          </DialogHeader>
          {selectedInvestment && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-3 items-center gap-4">
                <p className="text-sm font-medium">Plan:</p>
                <p className="col-span-2 flex items-center gap-2">
                  <span className="text-lg">{selectedInvestment.planIcon}</span>
                  <span className="font-semibold">
                    {selectedInvestment.planName}
                  </span>
                </p>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <p className="text-sm font-medium">Invested Amount:</p>
                <p className="col-span-2 font-semibold">
                  ${selectedInvestment.investedAmount.toLocaleString()}
                </p>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <p className="text-sm font-medium">Date Started:</p>
                <p className="col-span-2">
                  {format(
                    parseISO(selectedInvestment.dateStarted),
                    "MMM dd, yyyy",
                  )}
                </p>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <p className="text-sm font-medium">Duration:</p>
                <p className="col-span-2">{selectedInvestment.duration}</p>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <p className="text-sm font-medium">Maturity Date:</p>
                <p className="col-span-2">
                  {format(
                    parseISO(selectedInvestment.maturityDate),
                    "MMM dd, yyyy",
                  )}{" "}
                  (
                  {calculateDaysRemaining(selectedInvestment.maturityDate) > 0
                    ? `${calculateDaysRemaining(selectedInvestment.maturityDate)} days remaining`
                    : "Matured"}
                  )
                </p>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <p className="text-sm font-medium">Expected Return:</p>
                <p className="col-span-2 text-green-600 font-semibold">
                  ${selectedInvestment.expectedReturn.toLocaleString()}
                </p>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <p className="text-sm font-medium">Progress:</p>
                <div className="col-span-2 flex items-center gap-2">
                  <Progress
                    value={selectedInvestment.progress}
                    className="w-24"
                  />
                  <span className="text-sm text-gray-600">
                    {selectedInvestment.progress}%
                  </span>
                </div>
              </div>
              <div className="grid grid-cols-3 items-center gap-4">
                <p className="text-sm font-medium">Status:</p>
                <div className="col-span-2">
                  {getStatusBadge(selectedInvestment.status)}
                </div>
              </div>
              {/* Add more details here if available in your investment object */}
              {selectedInvestment.interestRate && (
                <div className="grid grid-cols-3 items-center gap-4">
                  <p className="text-sm font-medium">Interest Rate:</p>
                  <p className="col-span-2">
                    {selectedInvestment.interestRate}%
                  </p>
                </div>
              )}
              {selectedInvestment.payoutFrequency && (
                <div className="grid grid-cols-3 items-center gap-4">
                  <p className="text-sm font-medium">Payout Frequency:</p>
                  <p className="col-span-2">
                    {selectedInvestment.payoutFrequency}
                  </p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
