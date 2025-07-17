"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  DollarSign,
  Clock,
  TrendingUp,
  Shield,
  AlertCircle,
} from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";

interface InvestmentPlan {
  id: string;
  name: string;
  icon: string;
  minAmount: number;
  duration: string;
  expectedReturn: number;
  riskLevel: "low" | "medium" | "high";
  features: string[];
  description: string;
  renewable: boolean;
}

interface InvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  plan: InvestmentPlan | null;
  userBalance: number;
  setUserBalance: (value: number) => void;
}

export function InvestmentModal({
  isOpen,
  onClose,
  plan,
  userBalance,
  setUserBalance,
}: InvestmentModalProps) {
  const [amount, setAmount] = useState("");
  const [fundingSource, setFundingSource] = useState("");
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  if (!plan) return null;

  const investmentAmount = Number.parseFloat(amount) || 0;
  const expectedPayout = investmentAmount * (1 + plan.expectedReturn / 100);
  const isValidAmount =
    investmentAmount >= plan.minAmount && investmentAmount <= userBalance;
  const canSubmit = isValidAmount && fundingSource && agreedToTerms;

  const handleSubmit = async () => {
    if (!canSubmit) return;

    setIsSubmitting(true);

    try {
      const user = auth.currentUser;
      if (!user) throw new Error("User not authenticated");

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (!userSnap.exists()) throw new Error("User data not found");

      const userData = userSnap.data();
      const currentBalance = userData?.balance || 0;
      if (investmentAmount > currentBalance) {
        throw new Error("Insufficient balance");
      }

      const investment = {
        id: crypto.randomUUID(),
        amount: investmentAmount,
        duration: plan.duration,
        plan: plan.name,
        renewable: plan.renewable,
        return: expectedPayout,
        startedAt: new Date().toISOString(),
        status: "active",
      };

      // Update user balance and push new investment
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updateData: Record<string, any> = {
        investments: arrayUnion(investment),
      };

      if (fundingSource === "wallet") {
        updateData.balance = currentBalance - investmentAmount;
        const newBalance = updateData.balance;
        setUserBalance(newBalance);
      }

      toast({
        description: `You've invested ${investmentAmount} successfully!`,
      });

      await updateDoc(userRef, updateData);
      // Reset form
      setAmount("");
      setFundingSource("");
      setAgreedToTerms(false);
      onClose();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Investment error:", error.message);
      alert(error.message || "Failed to invest");
    } finally {
      setIsSubmitting(false);
    }
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <span className="text-2xl">{plan.icon}</span>
            <span>Invest in {plan.name}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Plan Summary */}
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-gray-600">Min Amount</p>
                  <p className="font-semibold">
                    ${plan.minAmount.toLocaleString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-gray-600">Duration</p>
                  <p className="font-semibold">{plan.duration}</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-purple-600" />
                <div>
                  <p className="text-gray-600">Expected Return</p>
                  <p className="font-semibold">{plan.expectedReturn}%</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-orange-600" />
                <div>
                  <p className="text-gray-600">Risk Level</p>
                  <div>{getRiskBadge(plan.riskLevel)}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Investment Amount */}
          <div className="space-y-2">
            <Label htmlFor="amount">Investment Amount</Label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                id="amount"
                type="number"
                placeholder={`Min $${plan.minAmount.toLocaleString()}`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Available Balance: ${userBalance.toLocaleString()}</span>
              {investmentAmount > 0 && (
                <span className="text-green-600">
                  Expected Payout: ${expectedPayout.toLocaleString()}
                </span>
              )}
            </div>
            {amount && !isValidAmount && (
              <div className="flex items-center space-x-2 text-red-600 text-sm">
                <AlertCircle className="h-4 w-4" />
                <span>
                  {investmentAmount < plan.minAmount
                    ? `Minimum investment is $${plan.minAmount.toLocaleString()}`
                    : "Insufficient balance"}
                </span>
              </div>
            )}
          </div>

          {/* Funding Source */}
          <div className="space-y-2">
            <Label htmlFor="funding">Source of Funds</Label>
            <Select value={fundingSource} onValueChange={setFundingSource}>
              <SelectTrigger>
                <SelectValue placeholder="Select funding source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wallet">
                  Wallet Balance (${userBalance.toLocaleString()})
                </SelectItem>
                <SelectItem value="card">Credit/Debit Card</SelectItem>
                <SelectItem value="bank">Bank Transfer</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Terms Agreement */}
          <div className="flex items-center space-x-2">
            <Checkbox
              id="terms"
              checked={agreedToTerms}
              onCheckedChange={(checked: boolean) =>
                setAgreedToTerms(checked as boolean)
              }
            />
            <Label htmlFor="terms" className="text-sm leading-relaxed">
              I agree to the{" "}
              <a
                href="/termsofservices"
                target="_blank"
                className="text-blue-600 hover:underline"
              >
                Terms and Conditions
              </a>{" "}
              and understand the risks associated with this investment. I
              confirm that I have read and understood the investment details.
            </Label>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={!canSubmit || isSubmitting}
              className="flex-1"
            >
              {isSubmitting
                ? "Processing..."
                : `Invest $${investmentAmount.toLocaleString()}`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
