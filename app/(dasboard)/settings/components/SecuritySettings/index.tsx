import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";

export const SecuritySettings = () => {
  // Mock state for security settings
  const [security, setSecurity] = useState({
    twoFactorAuth: true,
    lastLogin: "July 12, 2025, 3:12 PM from Chrome on Windows",
    newDeviceAlerts: true,
  });

  const handleSecurityToggle = (key: string, checked: boolean) => {
    setSecurity((prev) => ({ ...prev, [key]: checked }));
  };

  const handleChangePassword = () => {
    alert("Change password functionality (opens modal/redirects)");
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
        <CardTitle>Security Settings</CardTitle>
        <p className="text-sm text-gray-600">
          Manage your account security and login preferences.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="change-password">Change Password</Label>
              <p className="text-sm text-gray-600">
                Update your account password regularly.
              </p>
            </div>
            <Button variant="outline" onClick={handleChangePassword}>
              Change Password
            </Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="two-factor-auth">
                Two-Factor Authentication (2FA)
              </Label>
              <p className="text-sm text-gray-600">
                Add an extra layer of security to your account.
              </p>
            </div>
            <Switch
              id="two-factor-auth"
              checked={security.twoFactorAuth}
              onCheckedChange={(checked) =>
                handleSecurityToggle("twoFactorAuth", checked)
              }
            />
          </div>
          <Separator />
          <div>
            <Label>Recent Logins</Label>
            <p className="text-sm text-gray-600">
              Last login: {security.lastLogin}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <Label htmlFor="new-device-alerts">New Device Alerts</Label>
              <p className="text-sm text-gray-600">
                Get notified when your account is accessed from a new device.
              </p>
            </div>
            <Switch
              id="new-device-alerts"
              checked={security.newDeviceAlerts}
              onCheckedChange={(checked) =>
                handleSecurityToggle("newDeviceAlerts", checked)
              }
            />
          </div>
        </div>
        <Button onClick={() => handleSaveChanges("Security")}>
          Save Changes
        </Button>
      </CardContent>
    </Card>
  );
};
