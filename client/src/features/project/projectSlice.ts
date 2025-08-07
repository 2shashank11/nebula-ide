import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Project } from '@/types/project';

interface ProjectState {
  projects: Project[] | null;
}

const initialState: ProjectState = {
  projects: null,
};

export const projectSlice = createSlice({
  name: 'project',
  initialState,
  reducers: {

    setProjects: (state, action: PayloadAction<Project[]>) => {
      state.projects = action.payload;
    },

    addProject: (state, action: PayloadAction<Project>) => {
      if (state.projects) {
        state.projects.push(action.payload);
      } else {
        state.projects = [action.payload];
      }
    },

    updateProjectData: (state, action: PayloadAction<Project>) => {
      if (state.projects) {
        const index = state.projects.findIndex(
          (project) => project.id === action.payload.id
        );
        if (index !== -1) {
          state.projects[index] = action.payload;
        }
      }
    },

    deleteProjectData: (state, action: PayloadAction<string>) => {
      if (state.projects) {
        state.projects = state.projects.filter(
          (project) => project.id !== action.payload
        );
      }
    },

  },
});

export const { setProjects, addProject, updateProjectData, deleteProjectData } = projectSlice.actions;
export default projectSlice.reducer;
