import { configureStore } from "@reduxjs/toolkit";
import { editDataSlice } from "./Features/editDataSlice";
import { productsSlice } from "./Features/productsSlice";
import { editSlice } from "./Features/toggleSlice";
import { userSlice } from "./Features/userSlice";

export const store = configureStore({
    reducer: {
        toggleEdit: editSlice.reducer,
        editProductInfo: editDataSlice.reducer,
        products: productsSlice.reducer,
        user: userSlice.reducer,
    },
});
