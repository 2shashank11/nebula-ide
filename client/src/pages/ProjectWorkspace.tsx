import CodeEditor from "@/components/CodeEditor";
import { AppSidebar } from "@/components/sidebar/app-sidebar";
import { SiteHeader } from "@/components/sidebar/site-header";
import { ResizablePanelGroup, ResizablePanel, ResizableHandle } from "@/components/ui/resizable";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";

import Terminal, { type TerminalHandle } from "@/components/Terminal"
import { useRef, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { openExistingProject, getFileContent } from "@/api/sandbox";
import { toast } from "sonner";
import { TerminalSocketProvider } from "@/context/TerminalSocketContext";
import { getFileLanguage } from "@/lib/languages";
import { ChevronRight, SlashIcon } from "lucide-react";


export default function ProjectWorkspace() {

  const terminalRef = useRef<TerminalHandle>(null)
  const { projectId } = useParams();
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [code, setCode] = useState<string>("Open a file and write your code here...");
  const [language, setLanguage] = useState<string>("plaintext");

  useEffect(() => {
    if (!selectedFile) {
      return;
    }
    const extension = selectedFile.split('.').pop();
    if (extension) {
      setLanguage(getFileLanguage(extension));
    }

    //load file content
    const fetchFileContent = async () => {
      if (!selectedFile) {
        return;
      }
      const response = await getFileContent(projectId ?? "", selectedFile);
      if (response.status === 200) {
        setCode(response.data.content);
      } else {
        toast.error("Failed to load file content");
      }
    }

    fetchFileContent();

  }, [selectedFile])

  useEffect(() => {
    const fetchProject = async () => {
      const response = await openExistingProject(projectId ?? "");
      console.log(response.data);
      toast.success(response.data.message);
    };
    fetchProject();
  }, [projectId]);


  return (
    <TerminalSocketProvider projectId={projectId ?? ""}>

      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 90)",
            "--header-height": "calc(var(--spacing) * 15)",

          } as React.CSSProperties
        }
      >
        <AppSidebar variant="floating" setSelectedFile={setSelectedFile} />
        <SidebarInset>
          <SiteHeader header="Project Workspace" />

          <div className="flex flex-1 flex-col">
            <div className="@container/main flex flex-1 flex-col gap-2">
              <div className="flex flex-col gap-4 py-2 md:gap-1.5 md:py-4 px-4 lg:px-4 w-full h-full overflow-hidden">

                {/* Resizable Vertical Editor + Terminal */}
                <ResizablePanelGroup
                  direction="vertical"
                  className="min-h-full rounded-sm"
                  onLayout={() => {
                    terminalRef.current?.fit()
                  }}
                >
                  {/* Code Editor Panel */}
                  <ResizablePanel defaultSize={60} minSize={20}>
                    <div className="-flex flex-col h-full">
                      {selectedFile && (
                        <div className="flex items-center gap-1 text-sm text-muted-foreground font-medium px-2 py-1 overflow-x-auto whitespace-nowrap">
                          {selectedFile.slice(1).split("/").map((segment, index, arr) => (
                            <div key={index} className="flex items-center">
                              <span className={index === arr.length - 1 ? "font-semibold text-foreground" : "text-muted-foreground"}>
                                {segment}
                              </span>
                              {index < arr.length - 1 && (
                                <span className="mx-1 text-muted-foreground"><ChevronRight size={15}/></span>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      <CodeEditor
                        selectedFile={selectedFile}
                        code={code}
                        setCode={setCode}
                        language={language}
                      />
                    </div>
                  </ResizablePanel>

                  {/* Handle */}
                  <ResizableHandle withHandle className="bg-gray-200 dark:bg-gray-700" />

                  {/* Terminal Panel */}
                  <ResizablePanel defaultSize={40} minSize={10}>
                    <div className="h-full bg-black p-4">
                      <Terminal ref={terminalRef} projectId={projectId ?? ""} />
                    </div>
                  </ResizablePanel>
                </ResizablePanelGroup>

              </div>
            </div>
          </div>

        </SidebarInset>
      </SidebarProvider>
    </TerminalSocketProvider>
  );
}
