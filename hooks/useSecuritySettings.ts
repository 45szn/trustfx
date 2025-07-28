// hooks/useSecuritySettings.ts
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import useAuth from "./useAuth";

export const useSecuritySettings = () => {
  const { user } = useAuth();
  const [securitySettings, setSecuritySettings] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSettings = async () => {
      if (!user) return;

      const docRef = doc(db, "users", user.uid, "settings", "security");
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setSecuritySettings(docSnap.data());
      } else {
        // Create default settings if not exist
        const defaultSettings = {
          twoFactorAuth: false,
          newDeviceAlerts: true,
          lastLogin: new Date().toISOString(),
        };
        await setDoc(docRef, defaultSettings);
        setSecuritySettings(defaultSettings);
      }
      setLoading(false);
    };

    fetchSettings();
  }, [user]);

  const updateSettings = async (newSettings: object) => {
    if (!user) return;

    const docRef = doc(db, "users", user.uid, "settings", "security");
    await setDoc(docRef, { ...securitySettings, ...newSettings }, { merge: true });
    setSecuritySettings((prev) => ({ ...prev, ...newSettings }));
  };

  return { securitySettings, updateSettings, loading };
};
