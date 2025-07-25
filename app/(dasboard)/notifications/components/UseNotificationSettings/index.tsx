import { doc, getDoc, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import useAuth from "@/hooks/useAuth";

type NotificationSettings = {
  emailAlerts: boolean;
  pushNotifications: boolean;
  inAppAlerts: boolean;
  promoAlerts: boolean;
  investmentUpdates: boolean;
  transactionAlerts: boolean;
  systemAlerts: boolean;
  marketingEmails?: boolean;
};

const defaultSettings: NotificationSettings = {
  emailAlerts: true,
  pushNotifications: true,
  inAppAlerts: true,
  promoAlerts: false,
  investmentUpdates: true,
  transactionAlerts: true,
  systemAlerts: true,
  marketingEmails: false,
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
