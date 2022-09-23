import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    data: {
        name: "",
        details: "",
        price: 0,
        quantity: 0,
        location: "",
        catagory: "",
        type: "",
    },
};

export const editDataSlice = createSlice({
    name: "editData",
    initialState,
    reducers: {
        editProduct(state, action) {
            state.data = action.payload;
        },
    },
});
export const editDataAction = editDataSlice.actions;
