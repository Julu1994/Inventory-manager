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
    },
});

export const userActions = userSlice.actions;
