/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useUserInvestments.ts
import { useEffect, useState } from "react";
import { auth, db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";

export function useUserInvestments() {
  const [balance, setBalance] = useState<number | null>(null);
  const [activeInvestments, setActiveInvestments] = useState<any[]>([]);
  const [investmentHistory, setInvestmentHistory] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

    useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        setBalance(data.balance || 0);

        const investments = data.investments || [];
        const txs = data.transactions || [];

        setTransactions(
          txs
            .map((t: any) => ({
              ...t,
              date: new Date(t.date).toISOString(), // normalize
            }))
            .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime())
        );

        // same existing code ...
        const active = investments
          .filter((inv: any) => inv.status === "active")
          .map((inv: any) => {
            const started = new Date(inv.startedAt);
            const durationDays = parseInt(inv.duration.split(" ")[0]);
            const maturity = new Date(started);
            maturity.setDate(started.getDate() + durationDays);

            const progress = Math.min(
              100,
              Math.floor(
                ((Date.now() - started.getTime()) /
                  (maturity.getTime() - started.getTime())) *
                  100
              )
            );

            return {
              id: inv.id,
              planName: inv.plan,
              planIcon: getPlanIcon(inv.plan),
              investedAmount: inv.amount,
              dateStarted: started.toISOString().split("T")[0],
              duration: inv.duration,
              maturityDate: maturity.toISOString().split("T")[0],
              status: "active",
              expectedReturn: inv.return,
              progress,
            };
          });

        const completed = investments
          .filter((inv: any) => inv.status === "completed")
          .map((inv: any) => {
            const start = new Date(inv.startedAt).toISOString().split("T")[0];
            const durationDays = parseInt(inv.duration.split(" ")[0]);
            const end = new Date(inv.startedAt);
            end.setDate(end.getDate() + durationDays);

            return {
              id: inv.id,
              planName: inv.plan,
              planIcon: getPlanIcon(inv.plan),
              investedAmount: inv.amount,
              dateStarted: start,
              dateCompleted: end.toISOString().split("T")[0],
              duration: inv.duration,
              status: "completed",
              actualReturn: inv.return,
              profit: inv.return - inv.amount,
            };
          });

        setActiveInvestments(active);
        setInvestmentHistory(completed);
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const user = auth.currentUser;
      if (!user) return;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const data = userSnap.data();
        setBalance(data.balance || 0);

        const investments = data.investments || [];

        const active = investments.filter((inv: any) => inv.status === "active").map((inv: any) => {
          const started = new Date(inv.startedAt);
          const durationDays = parseInt(inv.duration.split(" ")[0]);
          const maturity = new Date(started);
          maturity.setDate(started.getDate() + durationDays);

          const progress = Math.min(
            100,
            Math.floor(
              ((Date.now() - started.getTime()) /
                (maturity.getTime() - started.getTime())) *
                100
            )
          );

          return {
            id: inv.id,
            planName: inv.plan,
            planIcon: getPlanIcon(inv.plan),
            investedAmount: inv.amount,
            dateStarted: started.toISOString().split("T")[0],
            duration: inv.duration,
            maturityDate: maturity.toISOString().split("T")[0],
            status: "active",
            expectedReturn: inv.return,
            progress,
          };
        });

        const completed = investments
          .filter((inv: any) => inv.status === "completed")
          .map((inv: any) => {
            const start = new Date(inv.startedAt).toISOString().split("T")[0];
            const durationDays = parseInt(inv.duration.split(" ")[0]);
            const end = new Date(inv.startedAt);
            end.setDate(end.getDate() + durationDays);

            return {
              id: inv.id,
              planName: inv.plan,
              planIcon: getPlanIcon(inv.plan),
              investedAmount: inv.amount,
              dateStarted: start,
              dateCompleted: end.toISOString().split("T")[0],
              duration: inv.duration,
              status: "completed",
              actualReturn: inv.return,
              profit: inv.return - inv.amount,
            };
          });

        setActiveInvestments(active);
        setInvestmentHistory(completed);
      }
      setLoading(false);
    };

    fetchUserData();
  }, []);

  return { balance, activeInvestments, investmentHistory, transactions, loading };
}

function getPlanIcon(plan: string) {
  switch (plan) {
    case "Starter Plan":
      return "🌱";
    case "Growth Plan":
      return "📈";
    case "Premium Plan":
      return "💎";
    case "Elite Plan":
      return "🏆";
    default:
      return "💼";
  }
}
