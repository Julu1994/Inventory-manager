import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    catagory: "",
    type: "",
    page: 1,
};

export const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        filterCatagory(state, action) {
            state.catagory = action.payload;
            state.type = "";
            state.page = 1;
        },
        filterType(state, action) {
            state.type = action.payload;
            state.catagory = "";
            state.page = 1;
        },
        setPage(state, action) {
            state.page = action.payload;
        },
    },
});
export const filterAction = filterSlice.actions;
