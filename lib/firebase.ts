// firebase.ts

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: "trustfx-a81e4.firebasestorage.app",
  messagingSenderId: "1031396299384",
  appId: "1:1031396299384:web:9632ffc8331467c195138d",
  measurementId: "G-BGZYV5YFZV"
};

const app = initializeApp(firebaseConfig);
const analytics = app.name && typeof window !== 'undefined' ? getAnalytics(app) : null;

export const auth = getAuth(app);
export const db = getFirestore(app); // 🔥 Export Firestore instance

export { analytics };




// don't get rid of this, it's for uploading of picture 
// /lib/firebase.ts
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
// import { getFirestore } from "firebase/firestore";
// import { getStorage } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   // ⚠️ Use the correct bucket domain. Typically: <project-id>.appspot.com
//   storageBucket:
//     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "trustfx-a81e4.firebasestorage.app",
//   messagingSenderId: "1031396299384",
//   appId: "1:1031396299384:web:9632ffc8331467c195138d",
//   measurementId: "G-BGZYV5YFZV",
// };

// const app = initializeApp(firebaseConfig);
// // Only attempts analytics in browser contexts
// const analytics = app.name && typeof window !== "undefined" ? getAnalytics(app) : null;

// export const auth = getAuth(app);
// export const db = getFirestore(app);
// export const storage = getStorage(app); // ✅ Export Storage instance

// export { analytics, app };
