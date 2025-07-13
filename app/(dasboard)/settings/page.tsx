"use client";

import type React from "react";

import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import DashHead from "../components/DashHead";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Lock,
  Bell,
  TrendingUp,
  Trash2,
  LogOut,
  Camera,
  CheckCircle,
  Loader2,
} from "lucide-react";

const Settings = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

  // Mock state for profile settings
  const [profile, setProfile] = useState({
    fullName: user?.displayName || "John Doe",
    email: user?.email || "john.doe@example.com",
    phone: "123-456-7890",
    country: "USA",
    profilePhoto: user?.photoURL || "/placeholder.svg?height=100&width=100",
  });

  // Mock state for security settings
  const [security, setSecurity] = useState({
    twoFactorAuth: true,
    lastLogin: "July 12, 2025, 3:12 PM from Chrome on Windows",
    newDeviceAlerts: true,
  });

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

  // Mock state for investment preferences
  const [investmentPrefs, setInvestmentPrefs] = useState({
    defaultPlanSuggestion: "Growth Plan",
    riskLevelPreference: "medium",
    autoReinvest: false,
    currency: "USD",
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setProfile((prev) => ({ ...prev, [id]: value }));
  };

  const handleSecurityToggle = (key: string, checked: boolean) => {
    setSecurity((prev) => ({ ...prev, [key]: checked }));
  };

  const handleNotificationToggle = (key: string, checked: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: checked }));
  };

  const handleInvestmentPrefChange = (key: string, value: string | boolean) => {
    setInvestmentPrefs((prev) => ({ ...prev, [key]: value }));
  };

  const handleSaveChanges = (section: string) => {
    // Simulate saving changes
    console.log(`Saving ${section} changes...`);
    // In a real app, you'd send this data to your backend
    alert(`${section} settings saved!`);
  };

  const handleChangePassword = () => {
    alert("Change password functionality (opens modal/redirects)");
  };

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

  // Show loading spinner while authentication is being checked
  if (loading) {
    return (
      <div className="container mx-auto p-6 flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-gray-600">Loading settings...</span>
        </div>
      </div>
    );
  }

  // Redirect or show login prompt if user is not authenticated
  if (!user) {
    return (
      <div className="container mx-auto p-6 flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            Authentication Required
          </h2>
          <p className="text-gray-600">
            Please log in to manage your settings.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto space-y-6">
      <DashHead title="Settings" />

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your account preferences and security.
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        orientation="vertical"
        className="flex flex-col md:flex-row"
      >
        <TabsList className="flex flex-col justify-start p-2 space-x-2 bg-gray-100 rounded-lg h-full md:w-48 md:h-auto md:space-x-0 md:space-y-2">
          <TabsTrigger
            value="profile"
            className="flex items-center justify-start w-full px-4 py-2"
          >
            <User className="h-5 w-5 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="flex items-center justify-start w-full px-4 py-2"
          >
            <Lock className="h-5 w-5 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center justify-start w-full px-4 py-2"
          >
            <Bell className="h-5 w-5 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="preferences"
            className="flex items-center justify-start w-full p-2 md:text-xs"
          >
            <TrendingUp className="h-5 w-5 mr-2" />
            Investment Preferences
          </TabsTrigger>
          <TabsTrigger
            value="account"
            className="flex items-center justify-start w-full px-4 py-2 text-red-600"
          >
            <Trash2 className="h-5 w-5 mr-2" />
            Account Actions
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 md:ml-6 mt-6 md:mt-0">
          {/* Profile Settings */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <p className="text-sm text-gray-600">
                  Update your personal details and profile picture.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center space-x-4">
                  <Avatar className="h-24 w-24">
                    <AvatarImage
                      src={profile.profilePhoto || "/placeholder.svg"}
                      alt="Profile Picture"
                    />
                    <AvatarFallback>
                      {profile.fullName.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <Button
                    variant="outline"
                    className="flex items-center space-x-2 bg-transparent"
                  >
                    <Camera className="h-4 w-4" />
                    <span>Change Photo</span>
                  </Button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={profile.fullName}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      value={profile.email}
                      disabled
                      className="bg-gray-100 cursor-not-allowed"
                    />
                    <p className="text-xs text-gray-500 flex items-center">
                      <CheckCircle className="h-3 w-3 mr-1 text-green-500" />{" "}
                      Verified
                    </p>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={handleProfileChange}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="country">Country</Label>
                    <Input
                      id="country"
                      value={profile.country}
                      onChange={handleProfileChange}
                    />
                  </div>
                </div>
                <Button onClick={() => handleSaveChanges("Profile")}>
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
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
                      <Label htmlFor="new-device-alerts">
                        New Device Alerts
                      </Label>
                      <p className="text-sm text-gray-600">
                        Get notified when your account is accessed from a new
                        device.
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
          </TabsContent>

          {/* Notification Preferences */}
          <TabsContent value="notifications">
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
                      <Label
                        htmlFor="email-investment"
                        className="text-sm font-normal"
                      >
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
                      <Label
                        htmlFor="inapp-investment"
                        className="text-sm font-normal"
                      >
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
                      <Label
                        htmlFor="email-security"
                        className="text-sm font-normal"
                      >
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
                      <Label
                        htmlFor="inapp-security"
                        className="text-sm font-normal"
                      >
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
                      <Label
                        htmlFor="email-promotions"
                        className="text-sm font-normal"
                      >
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
                      <Label
                        htmlFor="inapp-promotions"
                        className="text-sm font-normal"
                      >
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
          </TabsContent>

          {/* Investment Preferences */}
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Investment Preferences</CardTitle>
                <p className="text-sm text-gray-600">
                  Personalize your investment experience.
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="defaultPlanSuggestion">
                    Default Plan Suggestion
                  </Label>
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
                  <Label htmlFor="riskLevelPreference">
                    Risk Level Preference
                  </Label>
                  <Input
                    id="riskLevelPreference"
                    value={investmentPrefs.riskLevelPreference}
                    onChange={(e) =>
                      handleInvestmentPrefChange(
                        "riskLevelPreference",
                        e.target.value,
                      )
                    }
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label htmlFor="autoReinvest">
                      Auto-Reinvest Completed Funds
                    </Label>
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
                <Button
                  onClick={() => handleSaveChanges("Investment Preferences")}
                >
                  Save Changes
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Account Actions */}
          <TabsContent value="account">
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-red-800">Account Actions</CardTitle>
                <p className="text-sm text-red-600">
                  These actions are irreversible and will affect your account
                  status. Please proceed with caution.
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
                      Permanently delete your account and all associated data.
                      This action cannot be undone.
                    </p>
                  </div>
                  <Button variant="destructive" onClick={handleDeleteAccount}>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Settings;

// "use client";
// import React from "react";
// import useAuth from "@/hooks/useAuth";
// import DashHead from "@/app/(dasboard)/components/DashHead";

// const Settings = () => {
//   const { user } = useAuth();

//   if (!user) {
//     return null; // Or handle this case differently, e.g., redirect
//   }

//   return (
//     <>
//       <DashHead title="Settings" />
//     </>
//   );
// };

// export default Settings;
