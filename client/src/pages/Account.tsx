import { AppSidebar } from "@/components/sidebar/app-sidebar"
import { SiteHeader } from "@/components/sidebar/site-header"
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"
import UserAccount from "@/components/UserAccount"


export default function Account() {
  return (
    <SidebarProvider
      style={
        {
          "--sidebar-width": "calc(var(--spacing) * 80)",
          "--header-height": "calc(var(--spacing) * 15)",
        } as React.CSSProperties
      }
    >
        
      <AppSidebar variant="floating" />
      <SidebarInset>
        <SiteHeader header="Account" />
        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6">
              <UserAccount />
              <div className="px-4 lg:px-6">
              </div>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
