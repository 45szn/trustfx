import { ReactNode } from "react";
import { PageTransition } from "@/components/PageTransition";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#161616]">
      <div className="max-w-md w-full space-y-8 px-8 lg:max-w-lg ">
        <PageTransition>{children}</PageTransition>
      </div>
    </div>
  );
}
