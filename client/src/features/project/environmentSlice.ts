import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

const initialState: {
  environments: {
    id: string;
    envLabel: string;
    environment: string;
    icon: string;
  }[] | null;
} = {
  environments: null,
};

export const environmentSlice = createSlice({
  name: 'environment',
  initialState,
  reducers: {
    setEnvironments: (
      state,
      action: PayloadAction<{
        id: string;
        envLabel: string;
        environment: string;
        icon: string;
      }[]>
    ) => {
      state.environments = action.payload;
    },
  },
});

export const { setEnvironments } = environmentSlice.actions;
export default environmentSlice.reducer;
export type RootState = ReturnType<typeof environmentSlice.getInitialState>;
