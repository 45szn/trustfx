import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

export const Recommendations = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommendations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h4 className="font-medium text-blue-900">Reinvest Idle Funds</h4>
          <p className="text-sm text-blue-700 mt-1">
            You have $1,300 idle — reinvest now?
          </p>
          <Button size="sm" className="mt-2">
            Explore Plans
          </Button>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg">
          <h4 className="font-medium text-purple-900">
            Premium Plan Available
          </h4>
          <p className="text-sm text-purple-700 mt-1">
            Premium Plan just opened for new investors.
          </p>
          <Button size="sm" variant="outline" className="mt-2 bg-transparent">
            View Details
          </Button>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <h4 className="font-medium text-green-900">AI Trader Plan</h4>
          <p className="text-sm text-green-700 mt-1">
            Try the AI Trader Plan — now trending
          </p>
          <Button size="sm" variant="outline" className="mt-2 bg-transparent">
            Learn More
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
