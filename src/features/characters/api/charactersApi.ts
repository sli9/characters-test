import { BaseResponse } from '../../../common/types/types.ts';
import { Character } from './charactersApi.types.ts';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const charactersApi = createApi({
  reducerPath: 'charactersApi',
  baseQuery: fetchBaseQuery({ baseUrl: '' }),
  tagTypes: ['Characters'],
  endpoints: (build) => ({
    getCharacters: build.infiniteQuery<BaseResponse<Character[]>, void, string>(
      {
        infiniteQueryOptions: {
          initialPageParam: import.meta.env.VITE_BASE_URL,
          maxPages: 3,
          getNextPageParam: (lastPage) => {
            const hasMore = lastPage.info.next;
            return hasMore ? hasMore : undefined;
          },
          getPreviousPageParam: (firstPage) => {
            const hasMore = firstPage.info.next;
            if (hasMore) {
              const nextParam = new URL(hasMore).searchParams.get('page');
              return nextParam;
            }
            return undefined;
          },
        },
        query({ pageParam }) {
          return `${pageParam}`;
        },
      }
    ),
    // with transformed data
    getTransCharacters: build.infiniteQuery<
      {
        characters: string[];
        nextPage: string | null;
        prevPage: string | null;
      },
      void,
      string
    >({
      query: ({ pageParam }) => pageParam,
      transformResponse: (
        response: BaseResponse<Character[]>
      ): {
        characters: string[];
        nextPage: string | null;
        prevPage: string | null;
      } => {
        return {
          characters: response.results.map((character) => character.name),
          nextPage: response.info.next,
          prevPage: response.info.prev,
        };
      },
      infiniteQueryOptions: {
        initialPageParam: import.meta.env.VITE_BASE_URL,
        maxPages: 3,
        getNextPageParam: (lastPage) => {
          return lastPage.nextPage ? lastPage.nextPage : undefined;
        },
        getPreviousPageParam: (firstPage) => {
          return firstPage.prevPage ? firstPage.prevPage : undefined;
        },
      },
    }),
  }),
});

export const {
  useGetCharactersInfiniteQuery,
  useGetTransCharactersInfiniteQuery,
} = charactersApi;
