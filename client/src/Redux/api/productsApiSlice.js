import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { config } from '../../config';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: config.SERVER_LINK,
    credentials: 'include',
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ page = 1, limit = 10, type = '', catagory = '' }) => `/products/get-products?offset=${(page - 1) * limit}&limit=${limit}&type=${type}&catagory=${catagory}`,
    }),

  }),
});

export const { useGetProductsQuery } = apiSlice;
