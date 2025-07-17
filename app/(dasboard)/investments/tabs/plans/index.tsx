import { TabsContent } from "@/components/ui/tabs";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle,
  Clock,
  DollarSign,
  Shield,
  Star,
  TrendingUp,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { investmentPlans } from "../../investment";
import { useUserInvestments } from "@/hooks/useUserInvestments";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { InvestmentModal } from "@/app/(dasboard)/components/InvestmentModal";
import { Badge } from "@/components/ui/badge";

export const Plans = () => {
  const { balance, activeInvestments, loading } = useUserInvestments();
  const [selectedPlan, setSelectedPlan] = useState<
    (typeof investmentPlans)[0] | null
  >(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userBalance, setUserBalance] = useState<number>(0);

  useEffect(() => {
    if (balance !== undefined && balance !== null) {
      setUserBalance(balance);
    }
  }, [balance]);

  console.log("userBalance", userBalance);

  const handleStartInvestment = (plan: (typeof investmentPlans)[0]) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  const hasActiveInvestments =
    activeInvestments.filter((inv) => inv.status === "active").length > 0;

  if (loading) return <p>Loading...</p>;

  return (
    <>
      <TabsContent value="plans" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {investmentPlans.map((plan) => (
            <Card
              key={plan.id}
              className={`relative hover:shadow-lg transition-shadow ${
                plan.popular ? "ring-2 ring-blue-500" : ""
              }`}
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
                      <p className="text-sm text-gray-600 mt-1 lg:w-[80%]">
                        {plan.description}
                      </p>
                    </div>
                  </div>
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
                  disabled={(userBalance ?? 0) < plan.minAmount}
                >
                  {(userBalance ?? 0) < plan.minAmount ? (
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
                  Explore plans tailored to your risk level and financial goals.
                  Start your investment journey today.
                </p>
                <div className="flex space-x-3 justify-center">
                  <Button>Browse Plans</Button>
                  <Button variant="outline">Schedule Consultation</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </TabsContent>

      {/* Investment Modal */}
      <InvestmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        plan={selectedPlan}
        userBalance={userBalance ?? 0}
        setUserBalance={setUserBalance}
      />
    </>
  );
};
