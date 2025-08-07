import * as React from "react"
import {
  IconDashboard,
  IconFolder,
  IconHelp,
  IconSearch,
  IconUsers,
} from "@tabler/icons-react"

import { NavMain } from "@/components/sidebar/nav-main"
import { NavSecondary } from "@/components/sidebar/nav-secondary"
import { NavUser } from "@/components/sidebar/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import type { RootState } from "@/app/store"
import type { User } from "@/types/user"
import { useSelector } from "react-redux"
import { Compass, Package } from "lucide-react"
import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import { NavFile } from "./nav-file"

import { getProjectFileTree } from "@/api/sandbox"
import { useTerminalSocket } from "@/context/TerminalSocketContext"
import { get } from "http"



interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  setSelectedFile: (path: string) => void;
}

export function AppSidebar({ setSelectedFile, ...props }: AppSidebarProps) {

  const { socket } = useTerminalSocket();
  const { projectId } = useParams<{ projectId: string }>();
  const user: User | null = useSelector((state: RootState) => state.auth.user);

  const data = {
    user: {
      name: user?.username || "",
      email: user?.email || "",
      avatar: user?.avatar || `https://ui-avatars.com/api/?name=${user?.username || ""}&background=random&color=fff&size=128`,
    },
    navMain: [
      {
        title: "NAVIGATION",
        url: "#",
        icon: Compass,
        isActive: true,
        items: [
          {
            title: "Dashboard",
            url: "/dashboard",
            icon: IconDashboard,
          },
          {
            title: "Projects",
            url: "/projects",
            icon: IconFolder,
          },
          {
            title: "Friends",
            url: "/friends",
            icon: IconUsers,
          },
        ]
      },

    ],

    navSecondary: [
      {
        title: "Get Help",
        url: "#",
        icon: IconHelp,
      },
      {
        title: "Search",
        url: "#",
        icon: IconSearch,
      },
    ],
  }

  const [fileTree, setFileTree] = useState<string[][]>([])

  

  useEffect(() => {

    const fetchFileTree = async () => {
      if (!projectId) return;
      const response = await getProjectFileTree(projectId);
      // console.log(response.data.fileTree)
      setFileTree(response.data.fileTree || [])
    }

    if (!socket) return;
    socket.on('file:refresh', fetchFileTree)

    return () => {
      socket.off('file:refresh', fetchFileTree)
    }

  }, [socket])

  const fileData = {
    title: "Project files",
    url: "#",
    icon: Package,
    isActive: true,
    tree: fileTree, 
  }
  

  const [seeFileTree, setSeeFileTree] = useState(false)

  useEffect(() => {
    if (projectId) {
      setSeeFileTree(true)
    }
  }, [projectId])


  return (
    <div className="flex flex-col h-full overflow-y-auto overflow-x-auto scrollbar-custom">
    
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5 mb-3 max-w-fit"
            >
              <Link to="/">
                <img
                  src="/nebula-icon.svg"
                  alt="Nebula Logo"
                  className="h-8 w-8"
                />
                <span className="text-base font-semibold">Nebula</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />

        {seeFileTree && (
          <NavFile fileData={fileData} onSelect={(path) => setSelectedFile(path)} />
        )}

        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
    </div>
  )
}
