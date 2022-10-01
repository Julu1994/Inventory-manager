import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    catagory: "",
    type: "",
};

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        filterCatagory(state, action) {
            state.catagory = action.payload;
            state.type = "";
        },
        filterType(state, action) {
            state.type = action.payload;
            state.catagory = "";
        },
    },
});
export const filterAction = filterSlice.actions;
