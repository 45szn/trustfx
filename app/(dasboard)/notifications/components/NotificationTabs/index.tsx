// Refactored NotificationTabs component with corrected Firestore mapping
"use client";

import React, { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDistanceToNow } from "date-fns";
import {
  CheckCircle,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Gift,
  Eye,
  Inbox,
  Loader2,
  Bell,
  XCircle,
  Info,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";
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
import { Badge } from "@/components/ui/badge";

interface Notification {
  id: string;
  title: string;
  type: string;
  message: string;
  read: boolean;
  time: Timestamp;
  icon?: string;
  cta?: string;
  ctaLink?: string;
}

const typeLabels: Record<string, string> = {
  investment: "Investment",
  transaction: "Transaction",
  system: "System",
  promotion: "Promotion",
};

const iconMap: Record<string, JSX.Element> = {
  Bell: <Bell className="w-5 h-5 text-gray-500" />,
  CheckCircle: <CheckCircle className="w-5 h-5 text-green-500" />,
  XCircle: <XCircle className="w-5 h-5 text-red-500" />,
  AlertTriangle: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
  Info: <Info className="w-5 h-5 text-blue-500" />,
};

const typeIcons: Record<string, JSX.Element> = {
  investment: <TrendingUp className="h-5 w-5 text-green-600" />,
  transaction: <DollarSign className="h-5 w-5 text-blue-600" />,
  system: <AlertTriangle className="h-5 w-5 text-orange-600" />,
  promotion: <Gift className="h-5 w-5 text-purple-600" />,
};

const NotificationCard = ({
  notification,
  onClick,
}: {
  notification: Notification;
  onClick: () => void;
}) => (
  <Card
    className={`transition-all hover:shadow-md cursor-pointer ${
      !notification.read ? "border-blue-200 bg-blue-50/30" : "hover:bg-gray-50"
    }`}
    onClick={onClick}
  >
    <CardContent className="p-4">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 relative">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-xl">
              {iconMap[notification.icon ?? "Bell"]}
            </span>
          </div>
          {!notification.read && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-500 rounded-full" />
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4
                  className={`font-semibold ${
                    !notification.read ? "text-gray-900" : "text-gray-700"
                  }`}
                >
                  {notification.title}
                </h4>
                <Badge variant="outline" className="text-xs">
                  {typeLabels[notification.type] || "Notification"}
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
                        window.location.href = notification.ctaLink;
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

        <div className="flex-shrink-0">
          {typeIcons[notification.type] ?? (
            <Bell className="h-5 w-5 text-gray-600" />
          )}
        </div>
      </div>
    </CardContent>
  </Card>
);

export const NotificationTabs = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
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
      const notifList = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          ...data,
          id: doc.id,
        } as Notification;
      });
      setNotifications(notifList);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const filtered = useMemo(
    () =>
      activeTab === "all"
        ? notifications
        : notifications.filter((n) => n.type === activeTab),
    [notifications, activeTab],
  );

  const unreadCount = notifications.filter((n) => !n.read).length;

  const markAsRead = async (id: string) => {
    if (!user) return;
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, read: true } : n)),
    );
    await updateDoc(doc(db, `users/${user.uid}/notifications`, id), {
      read: true,
    });
  };

  const markAllAsRead = async () => {
    if (!user) return;
    const batch = writeBatch(db);
    notifications
      .filter((n) => !n.read)
      .forEach((n) => {
        batch.update(doc(db, `users/${user.uid}/notifications`, n.id), {
          read: true,
        });
      });
    await batch.commit();
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  if (loading)
    return (
      <div className="flex justify-center items-center p-6">
        <Loader2 className="animate-spin h-6 w-6 mr-2" />
        Loading notifications...
      </div>
    );
  if (!user)
    return (
      <div className="text-center p-6">
        Please log in to view notifications.
      </div>
    );

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
      <div className="flex justify-between flex-col lg:flex-row lg:items-center">
        <TabsList className="flex flex-col h-fit gap-4 lg:gap-0 lg:flex-row">
          <TabsTrigger
            value="all"
            className="flex items-center space-x-2 w-full lg:w-fit"
          >
            <Inbox className="h-4 w-4 mr-1" />
            All
          </TabsTrigger>
          <TabsTrigger
            value="investment"
            className="flex items-center space-x-2 w-full md:w-fit"
          >
            <TrendingUp className="h-4 w-4 mr-1" />
            Investments
          </TabsTrigger>
          <TabsTrigger
            value="transaction"
            className="flex items-center space-x-2 w-full md:w-fit"
          >
            <DollarSign className="h-4 w-4 mr-1" />
            Transactions
          </TabsTrigger>
          <TabsTrigger
            value="system"
            className="flex items-center space-x-2 w-full md:w-fit"
          >
            <AlertTriangle className="h-4 w-4 mr-1" />
            System
          </TabsTrigger>
          <TabsTrigger
            value="promotion"
            className="flex items-center space-x-2 w-full md:w-fit"
          >
            <Gift className="h-4 w-4 mr-1" />
            Promotions
          </TabsTrigger>
        </TabsList>

        {unreadCount > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={markAllAsRead}
            className="mt-3 md:mt-0"
          >
            <CheckCircle className="h-4 w-4 mr-1" /> Mark All as Read
          </Button>
        )}
      </div>

      <TabsContent value={activeTab} className="space-y-4">
        {filtered.length === 0 ? (
          <Card className="border-dashed border-2 border-gray-200">
            <CardContent className="p-12 text-center">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-semibold mb-2">
                No notifications yet
              </h3>
              <p className="text-gray-600 mb-6">
                You&apos;ll see updates here when we have something new for you.
              </p>
              <Button onClick={() => (window.location.href = "/investments")}>
                Browse Investment Plans
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {filtered.map((n) => (
              <NotificationCard
                key={n.id}
                notification={n}
                onClick={() => !n.read && markAsRead(n.id)}
              />
            ))}
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};
