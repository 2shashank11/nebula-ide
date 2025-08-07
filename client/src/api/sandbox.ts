import axios from './sandbox-axios';

export const initializeNewProject = (projectData: {projectId: string, environment: string}) => {
  return axios.post('/project/init', projectData);
}

export const openExistingProject = (projectId: string) => {
  return axios.post(`/project/open/${projectId}`);
}

export const getProjectFileTree = (projectId: string) => {
  return axios.get(`/project/files/${projectId}`);
}

export const getFileContent = (projectId: string, filePath: string) => {
  return axios.post(`/project/files/${projectId}/path`, { filePath });
}