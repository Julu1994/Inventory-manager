import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api/productsApiSlice';
import { editDataSlice } from './Features/editDataSlice';
import { filterSlice } from './Features/filterSlice';
import { navSlice } from './Features/navToggleSlice';
import { productsSlice } from './Features/productsSlice';
import { searchSlice } from './Features/searchSlice';
import { editSlice } from './Features/toggleSlice';
import { userSlice } from './Features/userSlice';

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        toggleEdit: editSlice.reducer,
        editProductInfo: editDataSlice.reducer,
        products: productsSlice.reducer,
        user: userSlice.reducer,
        filter: filterSlice.reducer,
        search: searchSlice.reducer,
        nav: navSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});
