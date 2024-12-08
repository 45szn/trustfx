"use client"

import * as React from "react"
import { Bell, Check } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

interface Notification {
  id: number
  title: string
  description: string
  time: string
  read: boolean
}

const initialNotifications: Notification[] = [
  {
    id: 1,
    title: "New interest received",
    description: "$75.87 has been added as interest to your investment!",
    time: "2 minutes ago",
    read: false
  },
  {
    id: 2,
    title: "New interest received",
    description: "$150 has been added as interest to your investment!",
    time: "30 minutes ago",
    read: false
  },
  {
    id: 3,
    title: "New investment recieved",
    description: "Your $5000 investment has been recieved!",
    time: "2 hours ago",
    read: false
  },
  {
    id: 4,
    title: "New interest received",
    description: "$60.5 has been added as interest to your investment!",
    time: "2 hours ago",
    read: false
  },
  {
    id: 5,
    title: "New interest received",
    description: "$205 has been added as interest to your investment!",
    time: "5 hours ago",
    read: false
  },
  {
    id: 6,
    title: "Withdrawal",
    description: "$1250 has been withdrawn from your investment!",
    time: "10 hours ago",
    read: true
  },
  {
    id: 7,
    title: "New interest received",
    description: "$99.20 has been added as interest to your investment!",
    time: "15 hours ago",
    read: true
  },
  {
    id: 8,
    title: "New interest received",
    description: "$50 has been added as interest to your investment!",
    time: "1 day ago",
    read: true
  },
]

export function NotificationsPopover() {
  const [notifications, setNotifications] = React.useState<Notification[]>(initialNotifications)
  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

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
                  <p className="text-sm text-muted-foreground">{notification.description}</p>
                  <p className={`flex items-center ${!notification.read ? "justify-between" : "justify-end"}`}>{!notification.read && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="mt-1 h-auto p-0 text-xs text-blue-500 hover:bg-transparent hover:text-blue-400"
                      onClick={() => markAsRead(notification.id)}
                    >
                      Mark as read
                    </Button>
                  )} <span className="text-xs text-muted-foreground italic">{notification.time}</span> </p>
                  
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