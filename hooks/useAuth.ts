// useAuth.tsx
import { useState, useEffect } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/firebase";

const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Ensure this retrieves the entire user object
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  return { user, loading };
};

export default useAuth;



// import { useState, useEffect } from "react";
// import { onAuthStateChanged, User } from "firebase/auth";
// import { auth } from "@/firebase";

// const useAuth = () => {
//   const [user, setUser] = useState<User | null>(null); // Explicitly type as User | null
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
//       setUser(currentUser); // currentUser is of type User | null
//       setLoading(false);
//     });

//     return unsubscribe; // Cleanup the listener
//   }, []);

//   return { user, loading };
// };

// export default useAuth;
