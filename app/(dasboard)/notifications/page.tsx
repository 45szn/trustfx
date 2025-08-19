"use client";

import { useState, useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import DashHead from "../components/DashHead";
import { NotificationSettingsModal } from "./components/NotificationSettings";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Settings, Loader2 } from "lucide-react";
import { collection, query, orderBy, onSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Timestamp } from "firebase/firestore";
import { NotificationTabs } from "./components/NotificationTabs";

type Notification = {
  id: string;
  title: string;
  type: string;
  message: string;
  read: boolean;
  time: Timestamp;
  icon?: string;
  cta?: string;
  ctaLink?: string;
};

const Notifications = () => {
  const { user } = useAuth();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!user) return;

    setLoading(true);

    const q = query(
      collection(db, `users/${user.uid}/notifications`),
      orderBy("time", "desc"),
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const notifList: Notification[] = snapshot.docs.map((doc) => {
        const data = doc.data() as Notification;

        return {
          id: doc.id,
          title: data.title,
          message: data.message,
          read: data.read,
          time: data.time,
          type: data.type,
          icon: data.icon,
          cta: data.cta,
          ctaLink: data.ctaLink,
        };
      });

      setNotifications(notifList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.read).length;

  // Show loading spinner while authentication is being checked
  if (loading) {
    return (
      <div className="container mx-auto p-6 flex items-center justify-center min-h-[400px]">
        <div className="flex items-center space-x-2">
          <Loader2 className="h-6 w-6 animate-spin" />
          <span className="text-gray-600">Loading notifications...</span>
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
            Please log in to view your notifications.
          </p>
        </div>
      </div>
    );
  }

  // const displayName = user.displayName || user.email?.split("@")[0] || "User"

  return (
    <div className="container mx-auto space-y-6">
      <DashHead title="Notifications" />

      {/* Page Header */}
      <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 flex items-center space-x-2">
            <span>Notifications</span>
            {unreadCount > 0 && (
              <Badge className="bg-red-500 text-white">{unreadCount}</Badge>
            )}
          </h1>
          <p className="text-gray-600 mt-1">
            Stay updated on your account activity and investment events.
          </p>
        </div>

        <Button
          variant="outline"
          onClick={() => setIsSettingsOpen(true)}
          className="flex items-center space-x-2 bg-transparent mt-3 md:mt-0"
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </Button>
      </div>

      {/* Filters/Tabs */}
      <NotificationTabs />

      {/* Notification Settings Modal */}
      <NotificationSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
};

export default Notifications;
