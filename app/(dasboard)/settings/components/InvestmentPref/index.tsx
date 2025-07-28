"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";

export const InvestmentPref = () => {
  // Mock state for investment preferences
  const [investmentPrefs, setInvestmentPrefs] = useState({
    defaultPlanSuggestion: "Growth Plan",
    riskLevelPreference: "medium",
    autoReinvest: false,
    currency: "USD",
  });

  const handleInvestmentPrefChange = (key: string, value: string | boolean) => {
    setInvestmentPrefs((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveChanges = (section: string) => {
    // Simulate saving changes
    console.log(`Saving ${section} changes...`);
    // In a real app, you'd send this data to your backend
    alert(`${section} settings saved!`);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Investment Preferences</CardTitle>
        <p className="text-sm text-gray-600">
          Personalize your investment experience.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="defaultPlanSuggestion">Default Plan Suggestion</Label>
          <Input
            id="defaultPlanSuggestion"
            value={investmentPrefs.defaultPlanSuggestion}
            onChange={(e) =>
              handleInvestmentPrefChange(
                "defaultPlanSuggestion",
                e.target.value,
              )
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="riskLevelPreference">Risk Level Preference</Label>
          <Input
            id="riskLevelPreference"
            value={investmentPrefs.riskLevelPreference}
            onChange={(e) =>
              handleInvestmentPrefChange("riskLevelPreference", e.target.value)
            }
          />
        </div>
        <div className="flex items-center justify-between">
          <div>
            <Label htmlFor="autoReinvest">Auto-Reinvest Completed Funds</Label>
            <p className="text-sm text-gray-600">
              Automatically reinvest funds from matured plans.
            </p>
          </div>
          <Switch
            id="autoReinvest"
            checked={investmentPrefs.autoReinvest}
            onCheckedChange={(checked) =>
              handleInvestmentPrefChange("autoReinvest", checked)
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="currency">Currency Preference</Label>
          <Input
            id="currency"
            value={investmentPrefs.currency}
            onChange={(e) =>
              handleInvestmentPrefChange("currency", e.target.value)
            }
          />
        </div>
        <Button onClick={() => handleSaveChanges("Investment Preferences")}>
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
};
