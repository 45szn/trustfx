// components/NextSteps.tsx
"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NextSteps() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Next Steps</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-green-50 rounded-lg border border-green-200">
          <h4 className="font-medium text-green-900">
            Reinvest Completed Funds
          </h4>
          <p className="text-sm text-green-700 mt-1">
            Your Fixed Plan completed with $400 profit. Reinvest now?
          </p>
          <Button size="sm" className="mt-3 bg-green-600 hover:bg-green-700">
            Reinvest Now
          </Button>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
          <h4 className="font-medium text-blue-900">Upgrade to Premium</h4>
          <p className="text-sm text-blue-700 mt-1">
            Premium Plan offers higher returns. Upgrade your portfolio.
          </p>
          <Button
            size="sm"
            variant="outline"
            className="mt-3 border-blue-300 text-blue-700 hover:bg-blue-100 bg-transparent"
          >
            Learn More
          </Button>
        </div>

        <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
          <h4 className="font-medium text-purple-900">
            Portfolio Consultation
          </h4>
          <p className="text-sm text-purple-700 mt-1">
            Schedule a call to optimize your investment strategy.
          </p>
          <Button
            size="sm"
            variant="outline"
            className="mt-3 border-purple-300 text-purple-700 hover:bg-purple-100 bg-transparent"
          >
            Schedule Call
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
