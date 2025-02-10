import { baseApi } from '../../../app/baseApi';
import { Character } from '../../characters/api/charactersApi.types.ts';

export const charactersApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getCharacter: build.query<Character, string>({
        query: (id) => `character/${id}`,
        providesTags: ['Character'],
      }),
    };
  },
});

export const { useGetCharacterQuery } = charactersApi;
