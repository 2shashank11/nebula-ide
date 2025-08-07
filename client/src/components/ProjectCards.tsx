import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { FolderOpen, Loader } from "lucide-react";
import { Link } from "react-router-dom";
import ProjectCardsDropdown from "./ProjectCardsDropdown";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/app/store";
import { getProjects } from "@/api/projects";
import { setProjects } from "@/features/project/projectSlice";


const ProjectCards: React.FC = () => {

  const [isLoading, setIsLoading] = useState(false)

  const projects = useSelector(
    (state: RootState) => state.project.projects
  )
 const dispatch = useDispatch<AppDispatch>()
    useEffect(() => {
      const fetchEnvironments = async () => {
        if (projects && projects.length > 0) return;
  
        setIsLoading(true)
        const response = await getProjects()
        if (response.status === 200) {
          dispatch(setProjects(response.data))
        } else {
          console.error("Failed to fetch environments")
        }
        setIsLoading(false)
      }
  
      fetchEnvironments()
    }, [dispatch, projects])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-10">
        <Loader className="h-4 w-4 animate-spin" />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 px-4 py-2">
      {projects?.map((project) => (
        <div
          key={project.id}
          className="flex items-center justify-between rounded-2xl border border-border bg-white/90 dark:bg-muted px-6 py-5 shadow-md hover:shadow-lg transition-all"
        >
          <div className="flex items-center gap-4">
            <img
              src={project.icon}
              alt={project.environment}
              className="h-10 w-10 object-contain"
            />
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                {project.name}
              </h3>
              <p className="text-sm text-muted-foreground">{project.env_label}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
          <Link to={`/sandbox/${project.id}`} target="_blank">
          <Button size="sm" variant="outline">
            <FolderOpen className="mr-2 h-4 w-4" />
            Open
          </Button>
          </Link>
          <ProjectCardsDropdown projectData={project} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProjectCards;
