import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toggle: false,
};

export const editSlice = createSlice({
    name: "edit",
    initialState,
    reducers: {
        editToggle(state) {
            state.toggle = !state.toggle;
        },
    },
});

export const editActions = editSlice.actions;
