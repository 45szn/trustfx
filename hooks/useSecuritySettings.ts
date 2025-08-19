// hooks/useSecuritySettings.ts
import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import useAuth from "./useAuth";

/** Required shape stored under users/{uid}/settings/security */
export type SecuritySettings = {
  twoFactorAuth: boolean;
  newDeviceAlerts: boolean;
  lastLogin: string; // ISO timestamp
};

const DEFAULT_SECURITY_SETTINGS: SecuritySettings = {
  twoFactorAuth: false,
  newDeviceAlerts: true,
  lastLogin: new Date().toISOString(),
};

/**
 * Coerces Firestore data into a complete SecuritySettings object.
 * Why: Data might be missing fields; keep the app resilient.
 */
function normalizeSecuritySettings(data: unknown): SecuritySettings {
  const d = (data ?? {}) as Partial<Record<keyof SecuritySettings, unknown>>;
  return {
    twoFactorAuth:
      typeof d.twoFactorAuth === "boolean" ? d.twoFactorAuth : DEFAULT_SECURITY_SETTINGS.twoFactorAuth,
    newDeviceAlerts:
      typeof d.newDeviceAlerts === "boolean" ? d.newDeviceAlerts : DEFAULT_SECURITY_SETTINGS.newDeviceAlerts,
    lastLogin:
      typeof d.lastLogin === "string" && d.lastLogin
        ? d.lastLogin
        : new Date().toISOString(),
  };
}

export const useSecuritySettings = () => {
  const { user } = useAuth();
  const [securitySettings, setSecuritySettings] = useState<SecuritySettings | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    let active = true;

    async function fetchSettings() {
      try {
        if (!user) {
          // Why: prevent stale data when user logs out or not ready
          setSecuritySettings(null);
          setLoading(false);
          return;
        }

        const ref = doc(db, "users", user.uid, "settings", "security");
        const snap = await getDoc(ref);
        if (!active) return;

        if (snap.exists()) {
          const normalized = normalizeSecuritySettings(snap.data());
          setSecuritySettings(normalized);
        } else {
          const defaults: SecuritySettings = {
            ...DEFAULT_SECURITY_SETTINGS,
            lastLogin: new Date().toISOString(),
          };
          await setDoc(ref, defaults);
          if (!active) return;
          setSecuritySettings(defaults);
        }
      } catch (e) {
        if (!active) return;
        setError(e);
      } finally {
        if (active) setLoading(false);
      }
    }

    fetchSettings();
    return () => {
      active = false;
    };
  }, [user]);

  /**
   * Updates and persists security settings.
   * Ensures we always set a full SecuritySettings object (avoids TS partial -> state type errors).
   */
  async function updateSettings(newSettings: Partial<SecuritySettings>) {
    if (!user) return;

    const ref = doc(db, "users", user.uid, "settings", "security");

    // Build a complete next object using current state (or defaults) + selective overrides.
    const base: SecuritySettings = securitySettings ?? {
      ...DEFAULT_SECURITY_SETTINGS,
      lastLogin: new Date().toISOString(),
    };

    const next: SecuritySettings = {
      twoFactorAuth: newSettings.twoFactorAuth ?? base.twoFactorAuth,
      newDeviceAlerts: newSettings.newDeviceAlerts ?? base.newDeviceAlerts,
      lastLogin: newSettings.lastLogin ?? base.lastLogin,
    };

    await setDoc(ref, next, { merge: true });
    setSecuritySettings(next);
  }

  return { securitySettings, updateSettings, loading, error } as const;
};






// // hooks/useSecuritySettings.ts
// import { useEffect, useState } from "react";
// import { doc, getDoc, setDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import useAuth from "./useAuth";

// type SecuritySettings = {
//   twoFactorAuth: boolean;
//   newDeviceAlerts: boolean;
//   lastLogin: string;
// };

// export const useSecuritySettings = () => {
//   const { user } = useAuth();
//   const [securitySettings, setSecuritySettings] = useState<SecuritySettings | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchSettings = async () => {
//       if (!user) return;

//       const docRef = doc(db, "users", user.uid, "settings", "security");
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         setSecuritySettings(docSnap.data() as SecuritySettings);
//       } else {
//         const defaultSettings: SecuritySettings = {
//           twoFactorAuth: false,
//           newDeviceAlerts: true,
//           lastLogin: new Date().toISOString(),
//         };
//         await setDoc(docRef, defaultSettings);
//         setSecuritySettings(defaultSettings);
//       }
//       setLoading(false);
//     };

//     fetchSettings();
//   }, [user]);

//   const updateSettings = async (newSettings: Partial<SecuritySettings>) => {
//     if (!user) return;

//     const docRef = doc(db, "users", user.uid, "settings", "security");
//     await setDoc(docRef, { ...securitySettings, ...newSettings }, { merge: true });
//     setSecuritySettings((prev) => ({ ...(prev ?? {}), ...newSettings }));
//   };

//   return { securitySettings, updateSettings, loading };
// };
