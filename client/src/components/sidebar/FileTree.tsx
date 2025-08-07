import { ChevronRight, File, Folder } from "lucide-react"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"

import {
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
} from "@/components/ui/sidebar"

interface FileTree {
  item: string | any[]
  onSelect: (path: string) => void
  path: string
}

export const FileTree: React.FC<FileTree> = ({ item, onSelect, path }) => {
  if (!item) return null;

  // Handle simple string (file)
  if (typeof item === "string") {
    return (
      <div onClick={(e) => {
        e.stopPropagation();
        onSelect(`${path}/${item}`);
      }}>
        <SidebarMenuButton className="px-0 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
          <File className="size-2" />
          <span className="overflow-ellipsis overflow-hidden whitespace-nowrap">
            {item}
          </span>
        </SidebarMenuButton>
      </div>
    );
  }

  // item is an array, assume [name, children[]]
  const [name, childrenRaw] = item;
  const children = Array.isArray(childrenRaw) ? childrenRaw : [];

  return (
    <SidebarMenuItem>
      <Collapsible
        className="group/collapsible [&[data-state=open]>button>svg:first-child]:rotate-90"
        defaultOpen={false}
      >
        <CollapsibleTrigger asChild>
          <SidebarMenuButton>
            <ChevronRight className="size-2 transition-transform" />
            <Folder className="size-2" />
            {name}
          </SidebarMenuButton>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <SidebarMenuSub>
            {children.map((child, index) => (
              <FileTree
                key={index}
                item={child}
                onSelect={onSelect}
                path={`${path}/${name}`}
              />
            ))}
          </SidebarMenuSub>
        </CollapsibleContent>
      </Collapsible>
    </SidebarMenuItem>
  );
};
