"use client";
import { ReactNode } from "react";
import { PageTransition } from "@/components/PageTransition";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return null; // Or handle this case differently, e.g., redirect
  }

  return (
    <div className="flex items-center justify-center bg-gray-100">
      {/* <h1 className="text-8xl font-bold">Welcome {user.displayName}!</h1> */}
      <PageTransition>{children}</PageTransition>
    </div>
  );
}

// // protected routes
// import useAuth from "@/hooks/useAuth";
// import { useRouter } from "next/navigation";
// import { useEffect } from "react";

// const ProtectedPage = () => {
// const { user, loading } = useAuth();
// const router = useRouter();

// useEffect(() => {
//   if (!loading && !user) {
//     router.push("/login"); // Redirect to login if not authenticated
//   }
// }, [user, loading, router]);

// if (loading) {
//   return <p>Loading...</p>;
// }

//   return <p>Welcome, {user.email}!</p>;
// };

// export default ProtectedPage;
