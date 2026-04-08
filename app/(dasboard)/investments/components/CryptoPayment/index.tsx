// components/InvestmentModal/CryptoPayment.tsx
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { QRCodeCanvas } from "qrcode.react";

interface CryptoPaymentProps {
  selectedCoin: string | null;
  onCoinChange: (value: string) => void;
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

export function CryptoPayment({ selectedCoin, onCoinChange }: CryptoPaymentProps) {
  const coin = cryptoOptions.find((c) => c.id === selectedCoin) ?? null;

  return (
    <div className="mt-3 space-y-2">
      <Label>Select Coin</Label>
      <Select onValueChange={onCoinChange}>
        <SelectTrigger>
          <SelectValue placeholder="Choose coin" />
        </SelectTrigger>
        <SelectContent>
          {cryptoOptions.map((option: any) => (
            <SelectItem key={option.id} value={option.id}>
              {option.name} ({option.network})
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {coin && (
        <div className="p-3 border rounded bg-gray-50 space-y-3">
          <p className="text-sm">
            Send funds to the address below. Once payment is received, your
            investment will be activated. This may take a few minutes.
          </p>
          <p><strong>Network:</strong> {coin.network}</p>
          <p className="break-words">
            <strong>Wallet Address:</strong> {coin.address}
          </p>
          <div className="flex justify-center">
            <QRCodeCanvas
              value={coin.address}
              size={128}
              bgColor="#ffffff"
              fgColor="#000000"
              level="L"
              includeMargin
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigator.clipboard.writeText(coin.address)}
          >
            Copy Address
          </Button>
        </div>
      )}
    </div>
  );
}