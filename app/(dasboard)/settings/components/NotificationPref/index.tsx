import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useNotificationSettings } from "../../../notifications/components/UseNotificationSettings";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export const NotificationPref = () => {
  const { settings, setSettings, saveSettings, loading } =
    useNotificationSettings();

  const handleNotificationToggle = (key: string, checked: boolean) => {
    setSettings((prev) => ({ ...prev, [key]: checked }));
  };

  const handleSaveChanges = async () => {
    try {
      await saveSettings(settings);
      toast.success("Notification preferences saved!");
    } catch (err) {
      console.error("Failed to save notification preferences", err);
    }
  };

  if (loading)
    return (
      <div className="flex items-center p-6">
        <Loader2 className="animate-spin h-6 w-6 mr-2" />
        Loading notifications settings...
      </div>
    );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Preferences</CardTitle>
        <p className="text-sm text-gray-600">
          Control how you receive alerts and updates.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Investment Alerts */}
          <div className="space-y-2">
            <Label>Investment Alerts</Label>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-investment" className="text-sm font-normal">
                Email
              </Label>
              <Switch
                id="email-investment"
                checked={settings.emailInvestment}
                onCheckedChange={(checked) =>
                  handleNotificationToggle("emailInvestment", checked)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="inapp-investment" className="text-sm font-normal">
                In-App
              </Label>
              <Switch
                id="inapp-investment"
                checked={settings.inAppInvestment}
                onCheckedChange={(checked) =>
                  handleNotificationToggle("inAppInvestment", checked)
                }
              />
            </div>
          </div>

          {/* Transaction Alerts */}
          <div className="space-y-2">
            <Label>Transaction Alerts</Label>
            <div className="flex items-center justify-between">
              <Label
                htmlFor="email-transaction"
                className="text-sm font-normal"
              >
                Email
              </Label>
              <Switch
                id="email-transaction"
                checked={settings.emailTransaction}
                onCheckedChange={(checked) =>
                  handleNotificationToggle("emailTransaction", checked)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label
                htmlFor="inapp-transaction"
                className="text-sm font-normal"
              >
                In-App
              </Label>
              <Switch
                id="inapp-transaction"
                checked={settings.inAppTransaction}
                onCheckedChange={(checked) =>
                  handleNotificationToggle("inAppTransaction", checked)
                }
              />
            </div>
          </div>

          {/* Security Alerts */}
          <div className="space-y-2">
            <Label>Security Alerts</Label>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-security" className="text-sm font-normal">
                Email
              </Label>
              <Switch
                id="email-security"
                checked={settings.emailSecurity}
                onCheckedChange={(checked) =>
                  handleNotificationToggle("emailSecurity", checked)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="inapp-security" className="text-sm font-normal">
                In-App
              </Label>
              <Switch
                id="inapp-security"
                checked={settings.inAppSecurity}
                onCheckedChange={(checked) =>
                  handleNotificationToggle("inAppSecurity", checked)
                }
              />
            </div>
          </div>

          {/* Promotional Alerts */}
          <div className="space-y-2">
            <Label>Promotional Alerts</Label>
            <div className="flex items-center justify-between">
              <Label htmlFor="email-promotions" className="text-sm font-normal">
                Email
              </Label>
              <Switch
                id="email-promotions"
                checked={settings.emailPromotions}
                onCheckedChange={(checked) =>
                  handleNotificationToggle("emailPromotions", checked)
                }
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="inapp-promotions" className="text-sm font-normal">
                In-App
              </Label>
              <Switch
                id="inapp-promotions"
                checked={settings.inAppPromotions}
                onCheckedChange={(checked) =>
                  handleNotificationToggle("inAppPromotions", checked)
                }
              />
            </div>
          </div>
        </div>
        <Button onClick={handleSaveChanges} disabled={loading}>
          {loading ? (
            <div className="animate-spin h-6 w-6 mr-2"></div>
          ) : (
            "Save Changes"
          )}
        </Button>
      </CardContent>
    </Card>
  );
};
