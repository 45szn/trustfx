"use client";

import type React from "react";

import { useState } from "react";
import useAuth from "@/hooks/useAuth";
import DashHead from "../components/DashHead";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { User, Lock, Bell, TrendingUp, Trash2, Loader2 } from "lucide-react";
import { ProfileSettings } from "./components/ProfileSettings";
import { SecuritySettings } from "./components/SecuritySettings";
import { NotificationPref } from "./components/NotificationPref";
import { InvestmentPref } from "./components/InvestmentPref";
import { AccountActions } from "./components/AccountActions";

const Settings = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("profile");

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
      {/* <DashHead title="Settings" /> */}

      {/* Page Header */}
      <div className="my-8">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">
          Manage your account preferences and security.
        </p>
      </div>

      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        orientation="vertical"
        className="flex flex-col"
      >
        <TabsList className="flex flex-col md:flex-row justify-start bg-transparent  p-2 md:p-1 space-x-2 rounded-lg h-full  md:space-x-0 md:space-y-2">
          <TabsTrigger
            value="profile"
            className="flex items-center justify-start w-full p-2"
          >
            <User className="h-4 w-4 mr-2" />
            Profile
          </TabsTrigger>
          <TabsTrigger
            value="security"
            className="flex items-center justify-start w-full p-2"
          >
            <Lock className="h-4 w-4 mr-2" />
            Security
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex items-center justify-start w-full p-2"
          >
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger
            value="preferences"
            className="flex items-center justify-start w-full p-np2 md:text-xs"
          >
            <TrendingUp className="h-4 w-4 mr-2" />
            Investment Preferences
          </TabsTrigger>
          <TabsTrigger
            value="account"
            className="flex items-center justify-start w-full p-2 text-red-600"
          >
            <Trash2 className="h-4 w-4 mr-2" />
            Account Actions
          </TabsTrigger>
        </TabsList>

        <div className="flex-1 mt-6">
          {/* Profile Settings */}
          <TabsContent value="profile">
            <ProfileSettings />
          </TabsContent>

          {/* Security Settings */}
          <TabsContent value="security">
            <SecuritySettings />
          </TabsContent>

          {/* Notification Preferences */}
          <TabsContent value="notifications">
            <NotificationPref />
          </TabsContent>

          {/* Investment Preferences */}
          <TabsContent value="preferences">
            <InvestmentPref />
          </TabsContent>

          {/* Account Actions */}
          <TabsContent value="account">
            <AccountActions />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
};

export default Settings;
