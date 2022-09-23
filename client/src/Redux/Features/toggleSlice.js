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
        ToggleFalse(state) {
            state.toggle = false;
        },
    },
});

export const editActions = editSlice.actions;
