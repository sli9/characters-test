import { Character } from '../../characters/api/charactersApi.types.ts';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const characterApi = createApi({
  reducerPath: 'characterApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  tagTypes: ['Character'],
  endpoints: (build) => {
    return {
      getCharacter: build.query<Character, string>({
        query: (id) => id,
      }),
    };
  },
});

export const { useGetCharacterQuery } = characterApi;
