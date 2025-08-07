import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react";
import { EnvironmentSelectbox } from "./EnvironmentSelectbox";

import React, {useState} from "react";
import { createNewProject } from "@/api/projects"
import type { AxiosResponse } from "axios"
import { useDispatch } from "react-redux"
import { addProject } from "@/features/project/projectSlice"
import type { AppDispatch } from "@/app/store"
import { initializeNewProject } from "@/api/sandbox"


const CreateProject: React.FC = () =>  {

    const[dialogOpen, setDialogOpen] = useState<boolean>(false);
    const[projectName, setProjectName] = useState<string>("");
    const[envValue, setEnvValue] = useState<string>("");

    const dispatch = useDispatch<AppDispatch>()

    const handleSubmit = async () => {

        if (!projectName || !envValue) {
            toast.warning("Please fill in all fields.");
            return;
        }

        //API call to create the project
        try{

            const projectData = {
                projectName: projectName,
                environmentName: envValue
            };
            const createResponse: AxiosResponse<any, any> = await createNewProject(projectData)
            console.log(createResponse)
            dispatch(addProject(createResponse.data.payload));
            
            if( createResponse.status !== 201) {
                toast.error(createResponse.data.message || "Failed to create project.");
                return;
            }
            toast.success(createResponse.data.message || "Project created successfully!");
            
            // Initialize the new project
            const projectId = createResponse.data.payload.id;

            const initResponse: AxiosResponse<any, any> = await initializeNewProject({projectId: projectId, environment: envValue})

            console.log(initResponse)
            if (initResponse.status !== 200) {
                toast.error(initResponse.data.message || "Failed to initialize project.");
                return;
            }
            toast.success(initResponse.data.message || "Project initialized successfully!");
            
            setProjectName("");
            setEnvValue("");
            setDialogOpen(false);
        }
        catch(error: any){
            toast.error(error.response.data.message)
        }
    };

    return (
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <form>
                <DialogTrigger asChild>
                    <Button className="gap-2" size="sm">
                        <Plus className="size-4" />
                        Create New Project
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Create New Project</DialogTitle>
                        <DialogDescription>
                            Configure your new project here. Click Run when you&apos;re
                            done.
                        </DialogDescription>
                    </DialogHeader>

                    <div className="grid gap-4">
                        <div className="grid gap-3">
                            <Label htmlFor="name-1">Project Name</Label>
                            <Input 
                            name="name"
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                             />
                        </div>

                        <div className="grid gap-3">
                            <Label>Environment</Label>
                            <EnvironmentSelectbox envValue={envValue} setEnvValue={setEnvValue}/>
                        </div>
                    </div>
                    <DialogFooter>
                        <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                        </DialogClose>
                        <Button type="submit" onClick={handleSubmit}>Run</Button>
                    </DialogFooter>
                </DialogContent>
            </form>
        </Dialog>
    )
}

export {CreateProject};