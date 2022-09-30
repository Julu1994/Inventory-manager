import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    items: [
        {
            _id: "1",
            name: "",
            details: "",
            price: 0,
            quantity: 0,
            location: "",
            catagory: "",
            type: "",
            url: "",
        },
    ],
};

export const filteredProductsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        filteredProducts(state, action) {
            state.items = action.payload;
        },
    },
});
export const filteredProductsAction = filteredProductsSlice.actions;
