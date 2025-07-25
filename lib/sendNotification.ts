// utils/sendNotification.ts
import { db } from "@/lib/firebase";
import { doc, collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function sendNotification(userId: string, notification: {
  title: string;
  message: string;
  type: "investment" | "transaction" | "system" | "promotion";
  icon?: string;
  cta?: string;
  ctaLink?: string;
}) {
  const notifRef = collection(doc(db, "users", userId), "notifications");
  await addDoc(notifRef, {
    ...notification,
    read: false,
    time: serverTimestamp(),
  });
}
