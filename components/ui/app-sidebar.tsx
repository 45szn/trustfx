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
  // SidebarTrigger
} from "@/components/ui/sidebar";
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem
} from "@/components/ui/dropdown-menu";

const items = [
  {
    title: "Portfolio",
    url: "/Portfolio",
    icon: User2Icon,
  },
  {
    title: "Dashboard",
    url: "/Dashboard",
    icon: LayoutDashboard,
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
      <SidebarHeader className="p-4 mt-6">
        <div className="w-full flex justify-start gap-4 items-center">
          <Building2 className="h-8 w-8" />
          <span className={`text-2xl font-bold text-gray-800 ${state === "collapsed" ? "hidden" : ""}`}>TrustFX</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent className="mt-5">
            <SidebarMenu className='gap-3'>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild className='text-base text-gray-800 h-10 hover:bg-gray-200'>
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