import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    name: "",
};

export const searchSlice = createSlice({
    name: "search",
    initialState,
    reducers: {
        searchName(state, action) {
            state.name = action.payload;
        },
    },
});
export const searchAction = searchSlice.actions;
