import { BaseResponse } from '../../../common/types/types.ts';
import { Character } from './charactersApi.types.ts';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const charactersApi = createApi({
  reducerPath: 'charactersApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  tagTypes: ['Characters'],
  endpoints: (build) => ({
    getCharacters: build.query<
      BaseResponse<Character[]>,
      { url?: string; args: { name: string } }
    >({
      query: ({ url = import.meta.env.VITE_BASE_URL, args }) => ({
        url: url,
        params: { ...args },
      }),
    }),
  }),
});

export const { useGetCharactersQuery } = charactersApi;
