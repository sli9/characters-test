import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'charactersApi',
  baseQuery: async (args, api, extraOptions) => {
    return fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL,
    })(args, api, extraOptions);
  },
  endpoints: () => ({}),
  tagTypes: ['Characters'],
});
