"use client"

import * as React from "react";
import { useEffect } from "react";
import { Bell, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Timestamp } from "firebase/firestore";
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
import useAuth from "@/hooks/useAuth";
import { formatDistanceToNow } from "date-fns";

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

export function NotificationsPopover() {
  const { user } = useAuth();
  const [notifications, setNotifications] = React.useState<Notification[]>([])
  const unreadCount = notifications.filter(n => !n.read).length;
  // const [loading, setLoading] = useState(false);

    useEffect(() => {
      if (!user) return;
  
      // setLoading(true);
  
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
        // setLoading(false);
      });
  
      return () => unsubscribe();
    }, [user]);
    
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

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <Bell className="h-4 w-4" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500" />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-0 lg:w-96" align="end" alignOffset={-40}>
        <Card className="border-none shadow-none">
          <CardHeader>
            <CardTitle>Notifications</CardTitle>
            <CardDescription>You have {unreadCount} unread messages</CardDescription>
          </CardHeader>
          <CardContent className="max-h-[300px] overflow-auto">
            {notifications.map((notification) => (
              <div key={notification.id} className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0">
                <span 
                  className={`flex h-2 w-2 translate-y-1 rounded-full ${
                    notification.read ? 'bg-gray-300' : 'bg-sky-500'
                  }`} 
                />
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">{notification.title}</p>
                  <p className="text-sm text-muted-foreground">{notification.message}</p>
                  <p className={`flex items-center ${!notification.read ? "justify-between" : "justify-end"}`}>{!notification.read && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-1 h-auto p-0 text-xs text-blue-500 hover:bg-transparent hover:text-blue-400"
                      onClick={() => markAsRead(notification.id)}
                    >
                      Mark as read
                    </Button>
                  )} 
                    <span className="text-xs text-muted-foreground italic">
                      {formatDistanceToNow(
                        notification.time instanceof Timestamp
                          ? notification.time.toDate()
                          : typeof notification.time === "string"
                            ? new Date(notification.time)
                            : new Date(),
                        { addSuffix: true },
                      )}
                    </span> 
                  </p>
                  
                </div>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button 
              variant="outline" 
              size="sm" 
              className="w-full"
              onClick={markAllAsRead}
              disabled={unreadCount === 0}
            >
              <Check className="mr-2 h-4 w-4" /> Mark all as read
            </Button>
          </CardFooter>
        </Card>
      </PopoverContent>
    </Popover>
  )
}