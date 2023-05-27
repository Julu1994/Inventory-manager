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
      query: () => '/products/get-products',
    }),
  }),
});

export const { useGetProductsQuery } = apiSlice;
