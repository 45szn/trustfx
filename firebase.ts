import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: "trustfx-a81e4.firebasestorage.app",
  messagingSenderId: "1031396299384",
  appId: "1:1031396299384:web:9632ffc8331467c195138d",
  measurementId: "G-BGZYV5YFZV",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth and Analytics
export const auth = (() => {
  if (typeof window === "undefined") {
    throw new Error("auth is only available on the client");
  }
  return getAuth(app);
})();

export const analytics = (() => {
  if (typeof window === "undefined") {
    return null; // Analytics is optional; return null for SSR.
  }
  return getAnalytics(app);
})();






// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: "trustfx-a81e4.firebasestorage.app",
//   messagingSenderId: "1031396299384",
//   appId: "1:1031396299384:web:9632ffc8331467c195138d",
//   measurementId: "G-BGZYV5YFZV",
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);

// // Initialize Firebase services conditionally
// export const auth = typeof window !== "undefined" ? getAuth(app) : null;
// export const analytics =
//   typeof window !== "undefined" ? getAnalytics(app) : null;





//   // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: "trustfx-a81e4.firebasestorage.app",
//   messagingSenderId: "1031396299384",
//   appId: "1:1031396299384:web:9632ffc8331467c195138d",
//   measurementId: "G-BGZYV5YFZV"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// // Initialize Firebase Authentication
// export const auth = getAuth(app);