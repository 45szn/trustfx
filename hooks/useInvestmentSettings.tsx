import { useEffect, useState } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import useAuth from "@/hooks/useAuth"; // assuming you have this

export const useInvestmentSettings = () => {
  const { user } = useAuth(); // get current user
  const [settings, setSettings] = useState({
    defaultPlanSuggestion: "",
    riskLevelPreference: "",
    autoReinvest: false,
    currency: "USD",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const fetchSettings = async () => {
      const docRef = doc(db, "users", user.uid, "settings", "investment");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setSettings(docSnap.data() as typeof settings);
      }
      setLoading(false);
    };

    fetchSettings();
  }, [user]);

  const saveSettings = async (updated: typeof settings) => {
    if (!user) return;
    const docRef = doc(db, "users", user.uid, "settings", "investment");
    await setDoc(docRef, updated, { merge: true });
    setSettings(updated);
  };

  return { settings, setSettings, saveSettings, loading };
};
