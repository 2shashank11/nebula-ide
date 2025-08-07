import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SiteHeader } from "@/components/sidebar/site-header";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

import ProjectCards from "@/components/ProjectCards";
import { CreateProject } from "@/components/CreateProject";

export default function Projects() {
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
        <SiteHeader header="Projects" />

        <div className="flex flex-1 flex-col">
          <div className="@container/main flex flex-1 flex-col gap-2">
            <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-6 px-4 lg:px-6">

              {/* Create Project Button */}
              <div className="flex justify-end">
                <CreateProject />
              </div>


              {/* Project Cards */}
              <ProjectCards />

            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
