import { baseApi } from '../../../app/baseApi';
import { BaseResponse } from '../../../common/types.ts';
import { Character } from './charactersApi.types.ts';

export const todolistsApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getCharacters: build.query<Pick<Character, 'name' & 'url'>[], void>({
        query: () => 'character',
        transformResponse(response: BaseResponse<Character[]>) {
          return response.results.map((character) => ({ name: character.name, url: character.url }));
        },
        providesTags: ['Characters'],
      }),
    };
  },
});

export const { useGetCharactersQuery } = todolistsApi;
