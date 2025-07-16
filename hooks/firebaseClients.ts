import { db } from "@/lib/firebase"
import {
  collection,
  addDoc,
  getDocs,
  // doc,
  // setDoc,
  query,
  where
} from "firebase/firestore"

export const createInvestment = async (data: unknown) => {
  const docRef = await addDoc(collection(db, "investments"), data)
  return docRef.id
}

export const getUserInvestments = async (uid: unknown) => {
  const q = query(collection(db, "investments"), where("userId", "==", uid))
  const snapshot = await getDocs(q)
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
}
