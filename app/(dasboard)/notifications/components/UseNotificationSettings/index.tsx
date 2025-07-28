import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import useAuth from "@/hooks/useAuth";

type NotificationSettings = {
  // Delivery methods
  emailAlerts: boolean;
  pushNotifications: boolean;
  inAppAlerts: boolean;
  marketingEmails?: boolean;

  // Notification types
  promoAlerts: boolean;
  investmentUpdates: boolean;
  transactionAlerts: boolean;
  systemAlerts: boolean;

  // Preferences (fine-grained)
  emailInvestment: boolean;
  inAppInvestment: boolean;
  emailTransaction: boolean;
  inAppTransaction: boolean;
  emailSecurity: boolean;
  inAppSecurity: boolean;
  emailPromotions: boolean;
  inAppPromotions: boolean;
};

// type NotificationSettings = {
//   emailAlerts: boolean;
//   pushNotifications: boolean;
//   inAppAlerts: boolean;
//   promoAlerts: boolean;
//   investmentUpdates: boolean;
//   transactionAlerts: boolean;
//   systemAlerts: boolean;
//   marketingEmails?: boolean;
// };

const defaultSettings: NotificationSettings = {
  emailAlerts: true,
  pushNotifications: true,
  inAppAlerts: true,
  promoAlerts: false,
  investmentUpdates: true,
  transactionAlerts: true,
  systemAlerts: true,
  marketingEmails: false,
  emailInvestment: false,
  inAppInvestment: false,
  emailTransaction: false,
  inAppTransaction: false,
  emailSecurity: false,
  inAppSecurity: false,
  emailPromotions: false,
  inAppPromotions: false,
};

export function useNotificationSettings() {
  const { user } = useAuth();
  const [settings, setSettings] =
    useState<NotificationSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;

    const fetchSettings = async () => {
      const ref = doc(
        db,
        "users",
        user.uid,
        "notificationSettings",
        "settings",
      );
      const snap = await getDoc(ref);
      if (snap.exists()) {
        const data = snap.data();

        // Validate and merge with defaults (fallback if keys are missing)
        const parsed = { ...defaultSettings, ...data } as NotificationSettings;
        setSettings(parsed);
      }

      setLoading(false);
    };

    fetchSettings();
  }, [user?.uid]);

  const saveSettings = async (newSettings: NotificationSettings) => {
    if (!user?.uid) return;
    setLoading(true);
    const ref = doc(db, "users", user.uid, "notificationSettings", "settings");
    await setDoc(ref, newSettings);
    setSettings(newSettings);
    setLoading(false);
  };

  return { settings, setSettings, saveSettings, loading };
}
