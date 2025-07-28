import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LogOut, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";

export const AccountActions = () => {
  const handleLogoutAllDevices = () => {
    alert("Logging out from all devices...");
    // Implement actual logout logic
  };

  const handleDeleteAccount = () => {
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone.",
      )
    ) {
      alert("Account deletion initiated.");
      // Implement actual account deletion logic
    }
  };

  return (
    <Card className="border-red-200 bg-red-50">
      <CardHeader>
        <CardTitle className="text-red-800">Account Actions</CardTitle>
        <p className="text-sm text-red-600">
          These actions are irreversible and will affect your account status.
          Please proceed with caution.
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <Label>Log out of all devices</Label>
            <p className="text-sm text-gray-600">
              Sign out from all active sessions on other devices.
            </p>
          </div>
          <Button variant="outline" onClick={handleLogoutAllDevices}>
            <LogOut className="h-4 w-4 mr-2" />
            Log Out Everywhere
          </Button>
        </div>
        <Separator className="bg-red-200" />
        <div className="flex items-center justify-between">
          <div>
            <Label className="text-red-800">Delete My Account</Label>
            <p className="text-sm text-red-600">
              Permanently delete your account and all associated data. This
              action cannot be undone.
            </p>
          </div>
          <Button variant="destructive" onClick={handleDeleteAccount}>
            <Trash2 className="h-4 w-4 mr-2" />
            Delete Account
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
