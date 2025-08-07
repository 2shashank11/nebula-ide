import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { User } from '@/types/user';

interface AuthState {
    isLoggedIn: boolean;
    user: User | null;
}

const getInitialUser = (): User | null => {
    const storedUser = localStorage.getItem("nebula_user");
    return storedUser ? JSON.parse(storedUser) : null;
};

const initialState: AuthState = {
    isLoggedIn: !!getInitialUser(),
    user: getInitialUser(),
};


export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {

        setLoggedIn: (state, action: PayloadAction<User>) => {
            state.isLoggedIn = true;
            state.user = action.payload;
            localStorage.setItem("nebula_user", JSON.stringify(action.payload));
        },

        setLoggedOut: (state) => {
            state.isLoggedIn = false;
            state.user = null;
            localStorage.removeItem("nebula_user");
        },

        updateUser: (state, action: PayloadAction<Partial<User>>) => {
            if (state.user) {
                state.user = { ...state.user, ...action.payload };
                localStorage.setItem("nebula_user", JSON.stringify(state.user));
            }
        },
    },
})

export const { setLoggedIn, setLoggedOut, updateUser } = authSlice.actions;

export default authSlice.reducer;

export type RootState = ReturnType<typeof authSlice.getInitialState>;