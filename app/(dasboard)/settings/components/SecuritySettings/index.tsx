"use client";

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/lib/firebase"; // adjust based on your setup
import useAuth from "@/hooks/useAuth";
import { Loader2 } from "lucide-react";
// import { Timestamp } from "firebase/firestore";

export const SecuritySettings = () => {
  const { user } = useAuth();
  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    newDeviceAlerts: false,
    lastLogin: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchSettings = async () => {
      const ref = doc(db, "users", user.uid, "settings", "security");
      const snapshot = await getDoc(ref);

      if (snapshot.exists()) {
        const data = snapshot.data();
        setSecurity({
          twoFactorAuth: data.twoFactorAuth ?? false,
          newDeviceAlerts: data.newDeviceAlerts ?? false,
          lastLogin: data.lastLogin?.toDate().toLocaleString() ?? "N/A",
        });
      }
      setLoading(false);
    };

    fetchSettings();
  }, [user]);

  const handleSecurityToggle = (key: string, checked: boolean) => {
    setSecurity((prev) => ({ ...prev, [key]: checked }));
  };

  const handleChangePassword = () => {
    alert("Trigger Firebase password reset or open modal");
  };

  const handleSaveChanges = async () => {
    if (!user) return;

    const ref = doc(db, "users", user.uid, "settings", "security");

    await setDoc(ref, {
      twoFactorAuth: security.twoFactorAuth,
      newDeviceAlerts: security.newDeviceAlerts,
      lastLogin: serverTimestamp(), // store fresh login timestamp
    });

    alert("Security settings saved!");
  };

  if (loading)
    return (
      <div className="flex items-center p-6">
        <Loader2 className="animate-spin h-6 w-6 mr-2" />
        Loading security settings...
      </div>
    );

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
              <Label>Change Password</Label>
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
              <Label>Two-Factor Authentication (2FA)</Label>
              <p className="text-sm text-gray-600">
                Add an extra layer of security to your account.
              </p>
            </div>
            <Switch
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
              <Label>New Device Alerts</Label>
              <p className="text-sm text-gray-600">
                Get notified when your account is accessed from a new device.
              </p>
            </div>
            <Switch
              checked={security.newDeviceAlerts}
              onCheckedChange={(checked) =>
                handleSecurityToggle("newDeviceAlerts", checked)
              }
            />
          </div>
        </div>

        <Button onClick={handleSaveChanges}>Save Changes</Button>
      </CardContent>
    </Card>
  );
};
