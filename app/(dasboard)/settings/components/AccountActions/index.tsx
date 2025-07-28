"use client";

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { LogOut, Trash2 } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { getAuth, signOut, deleteUser } from "firebase/auth";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const AccountActions = () => {
  const handleLogoutAllDevices = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    try {
      if (user) {
        await user.getIdToken(true); // Force refresh
        await signOut(auth); // Sign out current session
        alert("Logged out from all devices.");
      }
    } catch (err) {
      console.error("Logout error:", err);
      alert("Failed to log out from all devices.");
    }
  };

  const handleDeleteAccount = async () => {
    if (
      !window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone.",
      )
    )
      return;

    const auth = getAuth();
    const user = auth.currentUser;

    try {
      if (!user) throw new Error("User not logged in.");

      await deleteDoc(doc(db, "users", user.uid));
      await deleteUser(user);
      alert("Your account has been deleted.");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error("Delete account error:", err);
      if (err.code === "auth/requires-recent-login") {
        alert("Please log in again to delete your account.");
      } else {
        alert("Failed to delete account.");
      }
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
