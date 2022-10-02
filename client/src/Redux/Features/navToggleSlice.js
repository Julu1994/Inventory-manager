import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toggle: true,
};

export const navSlice = createSlice({
    name: "nav",
    initialState,
    reducers: {
        navToggle(state) {
            state.toggle = !state.toggle;
        },
        navToggleHide(state) {
            state.toggle = false;
        },
    },
});

export const navActions = navSlice.actions;
