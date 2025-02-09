import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const baseApi = createApi({
  reducerPath: 'charactersApi',
  baseQuery: async (args, api, extraOptions) => {
    const result = await fetchBaseQuery({
      baseUrl: import.meta.env.VITE_BASE_URL,
    })(args, api, extraOptions);

    // handleError(api, result);

    return result;
  },
  endpoints: () => ({}),
  keepUnusedDataFor: 5 * 60,
  refetchOnFocus: true,
  refetchOnReconnect: true,
  tagTypes: ['Characters'],
});