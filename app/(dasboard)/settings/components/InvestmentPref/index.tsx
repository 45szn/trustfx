"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { useInvestmentSettings } from "@/hooks/useInvestmentSettings";

export const InvestmentPref = () => {
  const { settings, setSettings, saveSettings, loading } =
    useInvestmentSettings();

  const handleChange = (key: string, value: string | boolean) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setSettings((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    try {
      await saveSettings(settings);
      alert("Investment preferences saved!");
    } catch (err) {
      console.error("Failed to save preferences:", err);
    }
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
            value={settings.defaultPlanSuggestion}
            onChange={(e) =>
              handleChange("defaultPlanSuggestion", e.target.value)
            }
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="riskLevelPreference">Risk Level Preference</Label>
          <Input
            id="riskLevelPreference"
            value={settings.riskLevelPreference}
            onChange={(e) =>
              handleChange("riskLevelPreference", e.target.value)
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
            checked={settings.autoReinvest}
            onCheckedChange={(checked) => handleChange("autoReinvest", checked)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="currency">Currency Preference</Label>
          <Input
            id="currency"
            value={settings.currency}
            onChange={(e) => handleChange("currency", e.target.value)}
          />
        </div>
        <Button onClick={handleSave} disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </CardContent>
    </Card>
  );
};
