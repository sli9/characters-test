import { baseApi } from '../../../app/baseApi';
import { BaseResponse } from '../../../common/types/types.ts';
import { Character } from './charactersApi.types.ts';

export const charactersApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getCharacters: build.query<
        BaseResponse<Character[]>,
        { args: { name: string; page: number } }
      >({
        query: ({ args }) => ({
          url: 'character',
          params: { ...args },
        }),

        providesTags: ['Characters'],
      }),
    };
  },
});

export const { useGetCharactersQuery } = charactersApi;
