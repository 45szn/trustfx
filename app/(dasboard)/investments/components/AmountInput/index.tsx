import { DollarSign, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface AmountInputProps {
  amount: string;
  onChange: (value: string) => void;
  minAmount: number;
  userBalance: number;
  expectedPayout: number;
  fundingSource: string;
}

export function AmountInput({
  amount,
  onChange,
  minAmount,
  userBalance,
  expectedPayout,
  fundingSource,
}: AmountInputProps) {
  const investmentAmount = parseFloat(amount) || 0;
  const isBelowMin = !!amount && investmentAmount < minAmount;
  const isOverBalance =
    !!amount && fundingSource === "wallet" && investmentAmount > userBalance;

  return (
    <div className="space-y-2">
      <Label htmlFor="amount">Investment Amount</Label>
      <div className="relative">
        <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          id="amount"
          type="number"
          placeholder={`Min $${minAmount.toLocaleString()}`}
          value={amount}
          onChange={(e) => onChange(e.target.value)}
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

      {isBelowMin && (
        <div className="flex items-center space-x-2 text-red-600 text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>Minimum investment is ${minAmount.toLocaleString()}</span>
        </div>
      )}

      {isOverBalance && (
        <div className="flex items-center space-x-2 text-red-600 text-sm">
          <AlertCircle className="h-4 w-4" />
          <span>Insufficient balance</span>
        </div>
      )}
    </div>
  );
}