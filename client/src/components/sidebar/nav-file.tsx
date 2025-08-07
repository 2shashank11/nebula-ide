import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar"

import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from "@/components/ui/collapsible"

import { ChevronRight, type LucideIcon } from "lucide-react"
import { FileTree } from "./FileTree"

interface FileTree {
  title: string
  icon?: LucideIcon
  tree: any[]
  isActive?: boolean
}

export function NavFile({ fileData, onSelect }: { fileData: FileTree, onSelect: (path: string) => void }) {
  return (
    <div className="flex flex-col">
      <SidebarGroup >
        <SidebarGroupContent>
          <SidebarMenu>
            <Collapsible
              defaultOpen={fileData.isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton tooltip="Project File">
                    {fileData.icon && <fileData.icon />}
                    <span>{fileData.title.toUpperCase()}</span>
                    <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <SidebarMenuSub>
                    {fileData.tree?.map((item, idx) => (
                      <FileTree key={idx} item={item} path="" onSelect={onSelect}/>
                    ))}
                  </SidebarMenuSub>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
     </div>
  )
}
