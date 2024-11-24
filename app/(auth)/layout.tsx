import { ReactNode } from "react";
import { PageTransition } from "@/components/PageTransition";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full space-y-8 p-8 bg-white shadow-lg rounded-lg">
        <PageTransition>{children}</PageTransition>
      </div>
    </div>
  );
}
