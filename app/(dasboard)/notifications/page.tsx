"use client";

import { useState, useMemo, useEffect } from "react";
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
  Info,
  XCircle,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import {
  collection,
  query,
  orderBy,
  onSnapshot,
  doc,
  updateDoc,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Timestamp } from "firebase/firestore";

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
  const [activeTab, setActiveTab] = useState("all");
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

  // Filter notifications based on active tab
  const filteredNotifications = useMemo(() => {
    if (activeTab === "all") return notifications;
    return notifications.filter(
      (notification) => notification.type === activeTab,
    );
  }, [notifications, activeTab]);

  // Count unread notifications
  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = async (id: string) => {
    if (!user) return;

    try {
      // Optimistically update UI
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
      );

      // Persist change in Firestore
      const notifRef = doc(db, `users/${user.uid}/notifications`, id);
      await updateDoc(notifRef, { read: true });
    } catch (error) {
      console.error("Error updating notification:", error);
    }
  };

  const markAllAsRead = async () => {
    if (!user) return;

    const batch = writeBatch(db);
    const unread = notifications.filter((n) => !n.read);

    unread.forEach((n) => {
      const ref = doc(db, `users/${user.uid}/notifications`, n.id);
      batch.update(ref, { read: true });
    });

    try {
      await batch.commit();
      setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
    } catch (err) {
      console.error("Failed to mark all notifications as read:", err);
    }
  };

  const iconMap: Record<string, JSX.Element> = {
    Bell: <Bell className="w-5 h-5 text-gray-500" />,
    CheckCircle: <CheckCircle className="w-5 h-5 text-green-500" />,
    XCircle: <XCircle className="w-5 h-5 text-red-500" />,
    AlertTriangle: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
    Info: <Info className="w-5 h-5 text-blue-500" />,
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
      <Tabs
        value={activeTab}
        onValueChange={setActiveTab}
        className="space-y-6"
      >
        <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
          <TabsList className="flex flex-col justify-between h-full gap-4 w-fit md:gap-0 md:flex-row">
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
              className="flex items-center space-x-2 bg-transparent mt-3 md:mt-0"
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
                    !notification.read
                      ? "border-blue-200 bg-blue-50/30"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() =>
                    !notification.read && markAsRead(notification.id)
                  }
                >
                  <CardContent className="p-4">
                    <div className="flex items-start space-x-4">
                      {/* Icon and Emoji */}
                      <div className="flex-shrink-0">
                        <div className="relative">
                          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                            <span className="text-xl">
                              {iconMap[notification.icon ?? "Bell"]}
                            </span>
                          </div>
                          {!notification.read && (
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
                                className={`font-semibold ${!notification.read ? "text-gray-900" : "text-gray-700"}`}
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
                                  notification.time instanceof Timestamp
                                    ? notification.time.toDate()
                                    : typeof notification.time === "string"
                                      ? new Date(notification.time)
                                      : new Date(),
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
