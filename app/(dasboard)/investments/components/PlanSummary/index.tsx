import { DollarSign, Clock, TrendingUp, Shield } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { InvestmentPlan } from "../../InvestmentModal";

interface PlanSummaryProps {
  plan: InvestmentPlan;
}

const riskConfig = {
  low:    { label: "Low Risk",    className: "bg-green-100 text-green-800" },
  medium: { label: "Medium Risk", className: "bg-yellow-100 text-yellow-800" },
  high:   { label: "High Risk",   className: "bg-red-100 text-red-800" },
};

export function PlanSummary({ plan }: PlanSummaryProps) {
  const risk = riskConfig[plan.riskLevel];

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <DollarSign className="h-4 w-4 text-green-600" />
          <div>
            <p className="text-gray-600">Min Amount</p>
            <p className="font-semibold">${plan.minAmount.toLocaleString()}</p>
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
            <Badge className={risk.className}>{risk.label}</Badge>
          </div>
        </div>
      </div>
    </div>
  );
}