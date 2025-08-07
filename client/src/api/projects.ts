import type { Project } from '@/types/project';
import axios from './server-axios';

export const getEnvironments = () => {
  return axios.get('/project/environments');
}

export const createNewProject = (projectData: {projectName: string, environmentName: string}) => {
  return axios.post('/project/create', projectData);
};

export const getProjects = () => {
  return axios.get('/project/get-all-projects');
}

export const updateProject = (projectData: Project) => {
  return axios.patch('/project/update', projectData);
}

export const deleteProject = (projectId: string) => {
  return axios.delete(`/project/delete/${projectId}`);
}