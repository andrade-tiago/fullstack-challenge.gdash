import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useAuth } from "@/features/auth/context/auth-context";
import {
  ChartNoAxesCombinedIcon,
  ChevronUpIcon,
  UserIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react";
import { Link } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { Button } from "./ui/button";

type SidebarListItem = {
  title: string
  url: string
  icon: LucideIcon
}
type SidebarList = {
  label: string
  items: SidebarListItem[]
}

const sidebarGroups: SidebarList[] = [
  {
    label: "Clima",
    items: [
      {
        title: "Dashboard",
        icon: ChartNoAxesCombinedIcon,
        url: "dashboard",
      },
    ],
  },
  {
    label: "Administrador",
    items: [
      {
        title: "Usuários",
        icon: UsersIcon,
        url: "users",
      },
    ],
  },
]

export function AppSidebar() {
  const auth = useAuth()

  function handleLogout() {
    auth.logout()
  }

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <h2 className="font-semibold">App</h2>
      </SidebarHeader>

      <SidebarContent>
        {sidebarGroups.map(group =>
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map(item =>
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      <Link to={item.url}>
                        <item.icon />
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        )}
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <UserIcon />
                  {auth.user?.name}
                  <ChevronUpIcon className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              
              <DropdownMenuContent side="top">
                <DropdownMenuItem asChild>
                  <span onClick={handleLogout}>
                    Sair
                  </span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
