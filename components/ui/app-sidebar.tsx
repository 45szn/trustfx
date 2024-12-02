import { 
  LayoutDashboard, 
  Settings, 
  User2, 
  ChevronUp, 
  Building2, 
  User2Icon, 
  ChartNoAxesCombined, 
  ArrowLeftRight, 
  Bell } from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarFooter,
  SidebarHeader,
  useSidebar,
} from "@/components/ui/sidebar";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem } from "@/components/ui/dropdown-menu"
// import { Button } from "@/components/ui/button"

const items = [
  {
    title: "Dashboard",
    url: "/Dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Portfolio",
    url: "/Portfolio",
    icon: User2Icon,
  },
  {
    title: "Transactions",
    url: "/Transactions",
    icon: ArrowLeftRight,
  },
  {
    title: "Investments",
    url: "/Investments",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Notification",
    url: "/Notification",
    icon: Bell,
  },
  {
    title: "Settings",
    url: "/Settings",
    icon: Settings,
  },
]

export function AppSidebar() {
  const { state } = useSidebar()

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader className="p-2">
        <div className="w-full flex justify-start gap-2 items-center px-2">
          <Building2 className="h-6 w-6" />
          <span className={`ml-2 text-xl font-bold text-gray-600 ${state === "collapsed" ? "hidden" : ""}`}>TrustFX</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="mt-5">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="w-full transition-all duration-200 ease-in-out hover:bg-sidebar-accent focus:outline-none">
                  <User2 />
                  <span className="flex-1 text-left">Username</span>
                  <ChevronUp className={`ml-auto transition-transform duration-200 ${state === "expanded" ? "rotate-180" : ""}`} />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-dropdown-menu-trigger-width] animate-in slide-in-from-bottom-2"
              >
                <DropdownMenuItem>
                  <span>Account</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Billing</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <span>Sign out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}