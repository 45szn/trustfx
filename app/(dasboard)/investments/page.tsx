"use client";

import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import DashHead from "../components/DashHead";
import { InvestmentModal } from "../components/Investmenthead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  DollarSign,
  Clock,
  TrendingUp,
  Shield,
  Star,
  Eye,
  AlertCircle,
  CheckCircle,
  Loader2,
  ArrowRight,
} from "lucide-react";
import { format, differenceInDays, parseISO } from "date-fns";

// Mock data - replace with real data from your API
const investmentPlans = [
  {
    id: "starter",
    name: "Starter Plan",
    icon: "🌱",
    minAmount: 100,
    duration: "30 days",
    expectedReturn: 5,
    riskLevel: "low" as const,
    features: [
      "Low risk investment",
      "Monthly returns",
      "Easy withdrawal",
      "24/7 support",
    ],
    description:
      "Perfect for beginners looking to start their investment journey with minimal risk.",
    popular: false,
  },
  {
    id: "growth",
    name: "Growth Plan",
    icon: "📈",
    minAmount: 500,
    duration: "90 days",
    expectedReturn: 12,
    riskLevel: "medium" as const,
    features: [
      "Balanced risk-reward",
      "Quarterly returns",
      "Portfolio diversification",
      "Expert management",
    ],
    description:
      "Ideal for investors seeking steady growth with moderate risk exposure.",
    popular: true,
  },
  {
    id: "premium",
    name: "Premium Plan",
    icon: "💎",
    minAmount: 2000,
    duration: "180 days",
    expectedReturn: 20,
    riskLevel: "medium" as const,
    features: [
      "Higher returns",
      "Premium support",
      "Advanced strategies",
      "Priority withdrawals",
    ],
    description:
      "For experienced investors looking for higher returns with professional management.",
    popular: false,
  },
  {
    id: "elite",
    name: "Elite Plan",
    icon: "🏆",
    minAmount: 10000,
    duration: "365 days",
    expectedReturn: 35,
    riskLevel: "high" as const,
    features: [
      "Maximum returns",
      "VIP treatment",
      "Exclusive opportunities",
      "Personal advisor",
    ],
    description:
      "Our highest tier plan for serious investors seeking maximum growth potential.",
    popular: false,
  },
];

const activeInvestments = [
  {
    id: "INV001",
    planName: "Growth Plan",
    planIcon: "📈",
    investedAmount: 2500,
    dateStarted: "2025-05-15",
    duration: "90 days",
    maturityDate: "2025-08-13",
    status: "active",
    expectedReturn: 2800,
    progress: 65,
  },
  {
    id: "INV002",
    planName: "Premium Plan",
    planIcon: "💎",
    investedAmount: 5000,
    dateStarted: "2025-06-01",
    duration: "180 days",
    maturityDate: "2025-11-28",
    status: "active",
    expectedReturn: 6000,
    progress: 25,
  },
  {
    id: "INV003",
    planName: "Starter Plan",
    planIcon: "🌱",
    investedAmount: 1000,
    dateStarted: "2025-04-10",
    duration: "30 days",
    maturityDate: "2025-05-10",
    status: "completed",
    expectedReturn: 1050,
    progress: 100,
  },
];

const investmentHistory = [
  {
    id: "INV004",
    planName: "Growth Plan",
    planIcon: "📈",
    investedAmount: 1500,
    dateStarted: "2025-02-15",
    dateCompleted: "2025-05-16",
    duration: "90 days",
    status: "completed",
    actualReturn: 1680,
    profit: 180,
  },
  {
    id: "INV005",
    planName: "Starter Plan",
    planIcon: "🌱",
    investedAmount: 500,
    dateStarted: "2025-01-20",
    dateCompleted: "2025-02-19",
    duration: "30 days",
    status: "completed",
    actualReturn: 525,
    profit: 25,
  },
];

const Investments = () => {
  const { user, loading } = useAuth();
  const [selectedPlan, setSelectedPlan] = useState<
    (typeof investmentPlans)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("plans");

  const userBalance = 15000; // This should come from your API

  const handleStartInvestment = (plan: (typeof investmentPlans)[0]) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const getRiskBadge = (risk: string) => {
    const riskConfig = {
      low: { label: "Low Risk", className: "bg-green-100 text-green-800" },
      medium: {
        label: "Medium Risk",
        className: "bg-yellow-100 text-yellow-800",
      },
      high: { label: "High Risk", className: "bg-red-100 text-red-800" },
    };
    const config = riskConfig[risk as keyof typeof riskConfig];
    return <Badge className={config.className}>{config.label}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: {
        label: "Active",
        className: "bg-blue-100 text-blue-800",
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

  const calculateDaysRemaining = (maturityDate: string) => {
    const today = new Date();
    const maturity = parseISO(maturityDate);
    return Math.max(0, differenceInDays(maturity, today));
  };

  // Show loading spinner while authentication is being checked
  if (loading) {
    return (
      <div className="container mx-auto p-6 flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-gray-600">Loading investments...</span>
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
            Please log in to view investment opportunities.
          </p>
        </div>
      </div>
    );
  }

  // const displayName = user.displayName || user.email?.split("@")[0] || "User"
  const hasActiveInvestments =
    activeInvestments.filter((inv) => inv.status === "active").length > 0;

  return (
    <div className="container mx-auto space-y-6">
      <DashHead title="Investments" />

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Investments</h1>
        <p className="text-gray-600 mt-1">
          Explore investment plans, start new ones, and manage your portfolio.
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <TabsList className="flex justify-between w-full md:flex-col">
          <TabsTrigger value="plans" className="text-xs md:text-sm">Investment Plans</TabsTrigger>
          <TabsTrigger value="active" className="text-xs md:text-sm">
            My Investments (
            {activeInvestments.filter((inv) => inv.status === "active").length})
          </TabsTrigger>
          <TabsTrigger value="history" className="text-xs md:text-sm">History</TabsTrigger>
        </TabsList>

        {/* Investment Plans Tab */}
        <TabsContent value="plans" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {investmentPlans.map((plan) => (
              <Card
                key={plan.id}
                className={`relative hover:shadow-lg transition-shadow ${plan.popular ? "ring-2 ring-blue-500" : ""}`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-blue-600 text-white flex items-center space-x-1">
                      <Star className="h-3 w-3" />
                      <span>Most Popular</span>
                    </Badge>
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className="text-3xl">{plan.icon}</span>
                      <div>
                        <CardTitle className="text-xl">{plan.name}</CardTitle>
                        <p className="text-sm text-gray-600 mt-1">
                          {plan.description}
                        </p>
                      </div>
                    </div>
                    {getRiskBadge(plan.riskLevel)}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Plan Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-green-600" />
                      <div>
                        <p className="text-xs text-gray-600">Min Investment</p>
                        <p className="font-semibold">
                          ${plan.minAmount.toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-blue-600" />
                      <div>
                        <p className="text-xs text-gray-600">Duration</p>
                        <p className="font-semibold">{plan.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-purple-600" />
                      <div>
                        <p className="text-xs text-gray-600">Expected Return</p>
                        <p className="font-semibold text-green-600">
                          {plan.expectedReturn}%
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-orange-600" />
                      <div>
                        <p className="text-xs text-gray-600">Risk Level</p>
                        <p className="font-semibold capitalize">
                          {plan.riskLevel}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <p className="text-sm font-medium text-gray-900 mb-2">
                      Key Features:
                    </p>
                    <ul className="space-y-1">
                      {plan.features.map((feature, index) => (
                        <li
                          key={index}
                          className="flex items-center space-x-2 text-sm text-gray-600"
                        >
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Action Button */}
                  <Button
                    onClick={() => handleStartInvestment(plan)}
                    className="w-full"
                    disabled={userBalance < plan.minAmount}
                  >
                    {userBalance < plan.minAmount ? (
                      <>
                        <AlertCircle className="h-4 w-4 mr-2" />
                        Insufficient Balance
                      </>
                    ) : (
                      <>
                        Start Investment
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* CTA Section for users with no investments */}
          {!hasActiveInvestments && (
            <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
              <CardContent className="p-8 text-center">
                <div className="max-w-md mx-auto">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    Ready to grow your wealth?
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Explore plans tailored to your risk level and financial
                    goals. Start your investment journey today.
                  </p>
                  <div className="flex space-x-3 justify-center">
                    <Button onClick={() => setActiveTab("plans")}>
                      Browse Plans
                    </Button>
                    <Button variant="outline">Schedule Consultation</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        {/* Active Investments Tab */}
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

        {/* Investment History Tab */}
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
      </Tabs>

      {/* Investment Modal */}
      <InvestmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plan={selectedPlan}
        userBalance={userBalance}
      />
    </div>
  );
};

export default Investments;

// "use client";

// import React from "react";
// import useAuth from "@/hooks/useAuth";
// import DashHead from "@/app/(dasboard)/components/DashHead";
// // import { useSearchParams } from "next/navigation";

// const Investments = () => {
//   const { user } = useAuth();
//   // const searchParams = useSearchParams();
//   // const plan = searchParams.get("plan");

//   // optionally scroll, open modal, or pre-fill form with plan name

//   if (!user) {
//     return null;
//   }

//   return (
//     <>
//       <DashHead title="Investments" />
//     </>
//   );
// };

// export default Investments;
