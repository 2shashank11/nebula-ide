import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/user/authSlice';
import environmentReducer from '@/features/project/environmentSlice';
import projectReducer from '@/features/project/projectSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    environment: environmentReducer,
    project: projectReducer,
  },
});

// Types for use throughout your app
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
