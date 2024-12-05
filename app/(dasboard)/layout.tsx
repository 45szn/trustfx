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
        <SidebarInset>
          <header className="flex h-10 shrink-0 items-center gap-2 border-b px-2">
            <SidebarTrigger className="-ml-1" />
            <Breadcrumb>
              <BreadcrumbList>
                {breadcrumbs.map((crumb, index) => {
                  const href = `/${breadcrumbs.slice(0, index + 1).join("/")}`;
                  return (
                    <BreadcrumbItem key={href}>
                      {index === breadcrumbs.length - 1 ? (
                        <BreadcrumbPage className="lowercase">{crumb}</BreadcrumbPage>
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
          </header>
          <PageTransition>{children}</PageTransition>
        </SidebarInset>
      </SidebarProvider>
    </div>
  );
}
