import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: false,
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        isUser(state) {
            state.user = true;
        },
        notUser(state) {
            state.user = false;
        },
    },
});

export const userActions = userSlice.actions;
