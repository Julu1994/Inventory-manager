import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        isAuthenticated: false,
    }
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        isUser: (state) => {
            state.user.isAuthenticated = true;
        },
        clearUser: (state) => {
            state.user.isAuthenticated = false;
        },
    },
});

export const userActions = userSlice.actions;
