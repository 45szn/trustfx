// "use client";
// import React from "react";
// import useAuth from "@/hooks/useAuth";
// import DashHead from "@/app/(dasboard)/components/DashHead";

// const Notifications = () => {
//   const { user } = useAuth();

//   if (!user) {
//     return null;
//   }

//   return (
//     <>
//       <DashHead title="Notfications" />
//     </>
//   );
// };

// export default Notifications;

"use client";

import { useState, useMemo } from "react";
import useAuth from "@/hooks/useAuth";
import DashHead from "../components/DashHead";
import { NotificationSettingsModal } from "../components/NotificationSettings";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Bell,
  Settings,
  CheckCircle,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Gift,
  Eye,
  Loader2,
  Inbox,
} from "lucide-react";
import { formatDistanceToNow, parseISO } from "date-fns";

// Mock data - replace with real data from your API
const notificationsData = [
  {
    id: "1",
    type: "investment",
    title: "Investment Completed",
    message:
      "Your Growth Plan has matured successfully. You earned $125 in returns.",
    timestamp: "2025-07-12T14:30:00Z",
    isRead: false,
    icon: "💰",
    cta: "View Investment",
    ctaLink: "/portfolio",
  },
  {
    id: "2",
    type: "transaction",
    title: "Deposit Confirmed",
    message:
      "Your deposit of $2,500 has been successfully processed and added to your wallet.",
    timestamp: "2025-07-12T10:15:00Z",
    isRead: false,
    icon: "💳",
    cta: "View Transaction",
    ctaLink: "/transactions",
  },
  {
    id: "3",
    type: "system",
    title: "Security Alert",
    message:
      "New login detected from Chrome on Windows. If this wasn't you, please secure your account.",
    timestamp: "2025-07-11T18:45:00Z",
    isRead: true,
    icon: "🔒",
    cta: "Review Security",
    ctaLink: "/settings",
  },
  {
    id: "4",
    type: "investment",
    title: "Investment Maturity Alert",
    message:
      "Your Premium Plan will mature in 3 days. Expected return: $6,000.",
    timestamp: "2025-07-11T09:20:00Z",
    isRead: false,
    icon: "⏰",
    cta: "View Details",
    ctaLink: "/portfolio",
  },
  {
    id: "5",
    type: "promotion",
    title: "New Elite Plan Available",
    message:
      "Introducing our Elite Plan with up to 35% returns. Limited time offer for premium members.",
    timestamp: "2025-07-10T16:30:00Z",
    isRead: true,
    icon: "🎉",
    cta: "Explore Plan",
    ctaLink: "/investments",
  },
  {
    id: "6",
    type: "transaction",
    title: "Withdrawal Processed",
    message:
      "Your withdrawal request of $800 has been processed and sent to your bank account.",
    timestamp: "2025-07-10T11:10:00Z",
    isRead: true,
    icon: "💸",
    cta: "View Transaction",
    ctaLink: "/transactions",
  },
  {
    id: "7",
    type: "investment",
    title: "Monthly Returns Credited",
    message:
      "Your Starter Plan has generated $42 in returns this month. Keep growing!",
    timestamp: "2025-07-09T08:00:00Z",
    isRead: true,
    icon: "📈",
    cta: "View Portfolio",
    ctaLink: "/portfolio",
  },
  {
    id: "8",
    type: "system",
    title: "Scheduled Maintenance",
    message:
      "System maintenance scheduled for tonight 2:00 AM - 4:00 AM EST. Services may be temporarily unavailable.",
    timestamp: "2025-07-08T15:45:00Z",
    isRead: true,
    icon: "🔧",
    cta: null,
    ctaLink: null,
  },
];

const Notifications = () => {
  const { user, loading } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [notifications, setNotifications] = useState(notificationsData);

  // Filter notifications based on active tab
  const filteredNotifications = useMemo(() => {
    if (activeTab === "all") return notifications;
    return notifications.filter(
      (notification) => notification.type === activeTab,
    );
  }, [notifications, activeTab]);

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n)),
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const getNotificationIcon = (type: string) => {
    const iconMap = {
      investment: <TrendingUp className="h-5 w-5 text-green-600" />,
      transaction: <DollarSign className="h-5 w-5 text-blue-600" />,
      system: <AlertTriangle className="h-5 w-5 text-orange-600" />,
      promotion: <Gift className="h-5 w-5 text-purple-600" />,
    };
    return (
      iconMap[type as keyof typeof iconMap] || (
        <Bell className="h-5 w-5 text-gray-600" />
      )
    );
  };

  const getTypeLabel = (type: string) => {
    const labelMap = {
      investment: "Investment",
      transaction: "Transaction",
      system: "System",
      promotion: "Promotion",
    };
    return labelMap[type as keyof typeof labelMap] || "Notification";
  };

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
      <div className="flex items-center justify-between">
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
          className="flex items-center space-x-2 bg-transparent"
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </Button>
      </div>

      {/* Filters/Tabs */}
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <div className="flex items-center justify-between">
          <TabsList className="grid grid-cols-5 w-fit">
            <TabsTrigger value="all" className="flex items-center space-x-2">
              <Inbox className="h-4 w-4" />
              <span>All</span>
            </TabsTrigger>
            <TabsTrigger
              value="investment"
              className="flex items-center space-x-2"
            >
              <TrendingUp className="h-4 w-4" />
              <span>Investments</span>
            </TabsTrigger>
            <TabsTrigger
              value="transaction"
              className="flex items-center space-x-2"
            >
              <DollarSign className="h-4 w-4" />
              <span>Transactions</span>
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center space-x-2">
              <AlertTriangle className="h-4 w-4" />
              <span>System</span>
            </TabsTrigger>
            <TabsTrigger
              value="promotion"
              className="flex items-center space-x-2"
            >
              <Gift className="h-4 w-4" />
              <span>Promotions</span>
            </TabsTrigger>
          </TabsList>

          {unreadCount > 0 && (
            <Button
              variant="outline"
              size="sm"
              onClick={markAllAsRead}
              className="flex items-center space-x-2 bg-transparent"
            >
              <CheckCircle className="h-4 w-4" />
              <span>Mark All as Read</span>
            </Button>
          )}
        </div>

        <TabsContent value={activeTab} className="space-y-4">
          {/* Notification Feed */}
          {filteredNotifications.length === 0 ? (
            // Empty State
            <Card className="border-dashed border-2 border-gray-200">
              <CardContent className="p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="text-6xl mb-4">📭</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No notifications yet
                  </h3>
                  <p className="text-gray-600 mb-6">
                    You&apos;ll see updates here when we have something new for
                    you — like investments, transactions, or account activity.
                  </p>
                  <Button
                    onClick={() => (window.location.href = "/investments")}
                  >
                    Browse Investment Plans
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            // Notification List
            <div className="space-y-3">
              {filteredNotifications.map((notification) => (
                <Card
                  key={notification.id}
                  className={`transition-all hover:shadow-md cursor-pointer ${
                    !notification.isRead
                      ? "border-blue-200 bg-blue-50/30"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() =>
                    !notification.isRead && markAsRead(notification.id)
                  }
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      {/* Icon and Emoji */}
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-xl">{notification.icon}</span>
                          </div>
                          {!notification.isRead && (
                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4
                                className={`font-semibold ${!notification.isRead ? "text-gray-900" : "text-gray-700"}`}
                              >
                                {notification.title}
                              </h4>
                              <Badge variant="outline" className="text-xs">
                                {getTypeLabel(notification.type)}
                              </Badge>
                            </div>
                            <p className="text-gray-600 text-sm mb-2">
                              {notification.message}
                            </p>
                            <div className="flex items-center justify-between">
                              <span className="text-xs text-gray-500">
                                {formatDistanceToNow(
                                  parseISO(notification.timestamp),
                                  { addSuffix: true },
                                )}
                              </span>
                              {notification.cta && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="text-blue-600 hover:text-blue-700 p-0 h-auto"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    if (notification.ctaLink) {
                                      window.location.href =
                                        notification.ctaLink;
                                    }
                                  }}
                                >
                                  <Eye className="h-3 w-3 mr-1" />
                                  {notification.cta}
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Type Icon */}
                      <div className="flex-shrink-0">
                        {getNotificationIcon(notification.type)}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Notification Settings Modal */}
      <NotificationSettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
      />
    </div>
  );
};

export default Notifications;
