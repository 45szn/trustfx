"use client";

import { ReactNode } from "react";
import { PageTransition } from "@/components/PageTransition";
import useAuth from "@/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  SidebarProvider,
  SidebarTrigger,
  SidebarInset,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/ui/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Search, Moon, Bell, CircleUserRound } from "lucide-react";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (!user) {
    return null;
  }

  const breadcrumbs = pathname.split("/").filter(Boolean);

  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset className="container">
          <header className="flex shrink-0 items-center justify-between p-4 border-b pl-1 sticky lg:justify-normal lg:h-5">
            <SidebarTrigger className="" />

            <Breadcrumb className="hidden lg:block">
              <BreadcrumbList>
                {breadcrumbs.map((crumb, index) => {
                  const href = `/${breadcrumbs.slice(0, index + 1).join("/")}`;
                  return (
                    <BreadcrumbItem key={href}>
                      {index === breadcrumbs.length - 1 ? (
                        <BreadcrumbPage className="lowercase">
                          {crumb}
                        </BreadcrumbPage>
                      ) : (
                        <>
                          <BreadcrumbLink href={href} className="lowercase">
                            {crumb}
                          </BreadcrumbLink>
                          <BreadcrumbSeparator />
                        </>
                      )}
                    </BreadcrumbItem>
                  );
                })}
              </BreadcrumbList>
            </Breadcrumb>

            <div className="flex gap-3 lg:hidden">
              <div className="flex gap-3">
                <Search />
                <Moon />
                <Bell />
              </div>

              <div>
                <CircleUserRound className="cursor-pointer" />
              </div>
            </div>
          </header>
          <PageTransition>
            <div className="p-4">{children}</div>
          </PageTransition>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
