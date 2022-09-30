import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    catagory: "",
};

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        filterCatagory(state, action) {
            state.catagory = action.payload;
        },
    },
});
export const filterAction = filterSlice.actions;
