"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css"; // required for styling

const Providers = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  useEffect(() => {
    NProgress.start();

    const timeout = setTimeout(() => {
      NProgress.done();
    }, 0); // simulate page load delay, or remove this if you fetch real data

    return () => clearTimeout(timeout);
  }, [pathname]);

  return <>{children}</>;
};

export default Providers;
