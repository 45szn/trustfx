import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export const NotificationPref = () => {
  // Mock state for notification settings (can be linked to the modal from notifications page)
  const [notifications, setNotifications] = useState({
    emailInvestment: true,
    inAppInvestment: true,
    emailTransaction: true,
    inAppTransaction: true,
    emailSecurity: true,
    inAppSecurity: true,
    emailPromotions: false,
    inAppPromotions: true,
  });

  const handleNotificationToggle = (key: string, checked: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: checked }));
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
                checked={notifications.emailInvestment}
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
                checked={notifications.inAppInvestment}
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
                checked={notifications.emailTransaction}
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
                checked={notifications.inAppTransaction}
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
                checked={notifications.emailSecurity}
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
                checked={notifications.inAppSecurity}
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
                checked={notifications.emailPromotions}
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
                checked={notifications.inAppPromotions}
                onCheckedChange={(checked) =>
                  handleNotificationToggle("inAppPromotions", checked)
                }
              />
            </div>
          </div>
        </div>
        <Button onClick={() => handleSaveChanges("Notification")}>
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
};
