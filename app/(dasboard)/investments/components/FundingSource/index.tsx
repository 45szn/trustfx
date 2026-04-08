// components/InvestmentModal/FundingSource.tsx
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CryptoPayment } from "../CryptoPayment";

interface FundingSourceProps {
  fundingSource: string;
  onFundingSourceChange: (value: string) => void;
  selectedCoin: string | null;
  onCoinChange: (value: string | null) => void;
  userBalance: number;
}

export function FundingSource({
  fundingSource,
  onFundingSourceChange,
  selectedCoin,
  onCoinChange,
  userBalance,
}: FundingSourceProps) {
  const handleFundingSourceChange = (value: string) => {
    if (value !== "crypto") onCoinChange(null); // reset coin if switching away
    onFundingSourceChange(value);
  };

  return (
    <div className="space-y-2">
      <Label htmlFor="funding">Source of Funds</Label>
      <Select value={fundingSource} onValueChange={handleFundingSourceChange}>
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

      {fundingSource === "crypto" && (
        <CryptoPayment
          selectedCoin={selectedCoin}
          onCoinChange={onCoinChange}
        />
      )}
    </div>
  );
}