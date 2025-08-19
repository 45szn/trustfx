"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bell, Mail, Smartphone, Gift, Settings } from "lucide-react";
import useAuth from "@/hooks/useAuth";
import { useNotificationSettings } from "../UseNotificationSettings";

interface NotificationSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationSettingsModal({
  isOpen,
  onClose,
}: NotificationSettingsModalProps) {
  const { user } = useAuth(); // assuming user.uid is available
  const { settings, setSettings, saveSettings, loading } =
    useNotificationSettings();

  const handleSettingChange = (key: string, value: boolean) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    setSettings((prev: any) => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!user) return;

    try {
      await saveSettings(settings);
      onClose();
    } catch (err) {
      console.error("Failed to save settings:", err);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Settings className="h-5 w-5" />
            <span>Notification Settings</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Delivery Methods */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Delivery Methods</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Mail className="h-5 w-5 text-blue-600" />
                  <div>
                    <Label htmlFor="email-alerts" className="font-medium">
                      Email Alerts
                    </Label>
                    <p className="text-sm text-gray-600">
                      Receive notifications via email
                    </p>
                  </div>
                </div>
                <Switch
                  id="email-alerts"
                  checked={settings.emailAlerts}
                  onCheckedChange={(checked: boolean) =>
                    handleSettingChange("emailAlerts", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Smartphone className="h-5 w-5 text-green-600" />
                  <div>
                    <Label htmlFor="push-notifications" className="font-medium">
                      Push Notifications
                    </Label>
                    <p className="text-sm text-gray-600">
                      Browser and mobile push notifications
                    </p>
                  </div>
                </div>
                <Switch
                  id="push-notifications"
                  checked={settings.pushNotifications}
                  onCheckedChange={(checked: boolean) =>
                    handleSettingChange("pushNotifications", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Bell className="h-5 w-5 text-purple-600" />
                  <div>
                    <Label htmlFor="in-app-alerts" className="font-medium">
                      In-App Alerts
                    </Label>
                    <p className="text-sm text-gray-600">
                      Show notifications within the app
                    </p>
                  </div>
                </div>
                <Switch
                  id="in-app-alerts"
                  checked={settings.inAppAlerts}
                  onCheckedChange={(checked: boolean) =>
                    handleSettingChange("inAppAlerts", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Notification Types */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Notification Types</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="investment-updates" className="font-medium">
                    Investment Updates
                  </Label>
                  <p className="text-sm text-gray-600">
                    Maturity alerts, returns, and plan updates
                  </p>
                </div>
                <Switch
                  id="investment-updates"
                  checked={settings.investmentUpdates}
                  onCheckedChange={(checked: boolean) =>
                    handleSettingChange("investmentUpdates", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="transaction-alerts" className="font-medium">
                    Transaction Alerts
                  </Label>
                  <p className="text-sm text-gray-600">
                    Deposits, withdrawals, and transfers
                  </p>
                </div>
                <Switch
                  id="transaction-alerts"
                  checked={settings.transactionAlerts}
                  onCheckedChange={(checked: boolean) =>
                    handleSettingChange("transactionAlerts", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label htmlFor="system-alerts" className="font-medium">
                    System Alerts
                  </Label>
                  <p className="text-sm text-gray-600">
                    Security alerts and system maintenance
                  </p>
                </div>
                <Switch
                  id="system-alerts"
                  checked={settings.systemAlerts}
                  onCheckedChange={(checked: boolean) =>
                    handleSettingChange("systemAlerts", checked)
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Gift className="h-5 w-5 text-orange-600" />
                  <div>
                    <Label htmlFor="promo-alerts" className="font-medium">
                      Promotional Alerts
                    </Label>
                    <p className="text-sm text-gray-600">
                      New plans, bonuses, and special offers
                    </p>
                  </div>
                </div>
                <Switch
                  id="promo-alerts"
                  checked={settings.promoAlerts}
                  onCheckedChange={(checked: boolean) =>
                    handleSettingChange("promoAlerts", checked)
                  }
                />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-3 pt-4">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1 bg-transparent"
            >
              Cancel
            </Button>

            <Button onClick={handleSave} className="flex-1" disabled={loading}>
              {loading ? "Saving..." : "Save Settings"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
