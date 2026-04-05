"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
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
  XIcon,
} from "lucide-react";
import { auth, db } from "@/lib/firebase";
import { doc, updateDoc, arrayUnion, getDoc } from "firebase/firestore";
import { useToast } from "@/hooks/use-toast";
import { sendNotification } from "@/lib/sendNotification";
import { QRCodeCanvas } from "qrcode.react";

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

const cryptoOptions = [
  {
    id: "btc",
    name: "Bitcoin",
    network: "BTC",
    address: "bc1q52j78xeyuxc98yhaydwjxs0mwg0efh23lq5fvk",
  },
  {
    id: "eth",
    name: "Ethereum",
    network: "ERC-20",
    address: "0x5b43e67f651C5773BC723663bF8A1d9A4909e656",
  },
  {
    id: "usdt",
    name: "Tether (USDT)",
    network: "TRC-20",
    address: "0x5b43e67f651C5773BC723663bF8A1d9A4909e656",
  },
];

export function InvestmentModal({
  isOpen,
  onClose,
  plan,
  userBalance,
  setUserBalance,
}: InvestmentModalProps) {
  const [amount, setAmount] = useState("");
  const [fundingSource, setFundingSource] = useState("");
  const [selectedCoin, setSelectedCoin] = useState<string | null>(null);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  if (!plan) return null;

  const investmentAmount = Number.parseFloat(amount) || 0;
  const expectedPayout = investmentAmount * (1 + plan.expectedReturn / 100);
  const isValidAmount =
    investmentAmount >= plan.minAmount &&
    (fundingSource !== "wallet" || investmentAmount <= userBalance);
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

      if (fundingSource === "wallet" && investmentAmount > currentBalance) {
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

      const transaction = {
        id: crypto.randomUUID(),
        type: "investment",
        amount: investmentAmount,
        balance:
          fundingSource === "wallet"
            ? currentBalance - investmentAmount
            : currentBalance,
        status: "completed",
        date: new Date().toISOString(),
        details: `Invested in ${plan.name}`,
      };

      // Update user balance and push new investment
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updateData: Record<string, any> = {
        investments: arrayUnion(investment),
        transactions: arrayUnion(transaction),
      };

      if (fundingSource === "wallet") {
        updateData.balance = currentBalance - investmentAmount;
        const newBalance = updateData.balance;
        setUserBalance(newBalance);
      }

      await updateDoc(userRef, updateData);

      if (auth.currentUser) {
        await sendNotification(auth.currentUser.uid, {
          title: "Investment Successful",
          message: `You have successfully invested ${investmentAmount} in the ${plan.name}.`,
          type: "investment",
          icon: "CheckCircle",
          cta: "View Investment",
          ctaLink: "investments",
        });
      }

      toast({
        description: `You've invested ${investmentAmount.toLocaleString()} successfully!`,
      });

      // Reset form
      setAmount("");
      setFundingSource("");
      setAgreedToTerms(false);
      onClose();

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error("Investment error:", error.message);
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
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <AlertDialogHeader>
          <div className="flex items-center justify-between">
            <AlertDialogTitle className="flex items-center space-x-2">
              <span className="text-2xl">{plan.icon}</span>
              <span>Invest in {plan.name}</span>
            </AlertDialogTitle>
            <AlertDialogCancel className="bg-transparent">
              <XIcon />
            </AlertDialogCancel>
          </div>
        </AlertDialogHeader>

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
            {amount && (
              <>
                {investmentAmount < plan.minAmount && (
                  <div className="flex items-center space-x-2 text-red-600 text-sm">
                    <AlertCircle className="h-4 w-4" />
                    <span>
                      Minimum investment is ${plan.minAmount.toLocaleString()}
                    </span>
                  </div>
                )}
                {fundingSource === "wallet" &&
                  investmentAmount > userBalance && (
                    <div className="flex items-center space-x-2 text-red-600 text-sm">
                      <AlertCircle className="h-4 w-4" />
                      <span>Insufficient balance</span>
                    </div>
                  )}
              </>
            )}
          </div>

          {/* Funding Source */}
          <div className="space-y-2">
            <Label htmlFor="funding">Source of Funds</Label>
            <Select
              value={fundingSource}
              onValueChange={(val) => {
                setFundingSource(val);
                if (val !== "crypto") setSelectedCoin(null); // reset if not crypto
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select funding source" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="wallet">
                  Wallet Balance (${userBalance.toLocaleString()})
                </SelectItem>
                <SelectItem value="crypto">Crypto Payment</SelectItem>
              </SelectContent>
            </Select>

            {/* Show crypto options if "crypto" is selected */}
            {fundingSource === "crypto" && (
              <div className="mt-3 space-y-2">
                <Label>Select Coin</Label>
                <Select onValueChange={setSelectedCoin}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose coin" />
                  </SelectTrigger>
                  <SelectContent>
                    {cryptoOptions.map((coin) => (
                      <SelectItem key={coin.id} value={coin.id}>
                        {coin.name} ({coin.network})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {selectedCoin &&
                  (() => {
                    const coin = cryptoOptions.find(
                      (c) => c.id === selectedCoin,
                    );
                    if (!coin) return null;
                    return (
                      <div className="p-3 border rounded bg-gray-50 space-y-3">
                        <p className="text-sm">
                          Send funds to the address below. Once payment is
                          received, your investment will be activated. This may
                          take a few minutes.
                        </p>
                        <p>
                          <strong>Network:</strong> {coin.network}
                        </p>
                        <p className="break-words">
                          <strong>Wallet Address:</strong> {coin.address}
                        </p>

                        {/* QR Code */}
                        <div className="flex justify-center">
                          <QRCodeCanvas
                            value={coin.address}
                            size={128}
                            bgColor={"#ffffff"}
                            fgColor={"#000000"}
                            level={"L"}
                            includeMargin={true}
                          />
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            navigator.clipboard.writeText(coin.address)
                          }
                        >
                          Copy Address
                        </Button>
                      </div>
                    );
                  })()}
              </div>
            )}
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
              disabled={
                !canSubmit || isSubmitting || fundingSource === "crypto"
              }
              className="flex-1"
            >
              {fundingSource === "crypto"
                ? "Send funds to address above"
                : isSubmitting
                  ? "Processing..."
                  : `Invest $${investmentAmount.toLocaleString()}`}
            </Button>
          </div>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
}
