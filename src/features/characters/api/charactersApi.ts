import { baseApi } from '../../../app/baseApi';
import { BaseResponse } from '../../../common/types/types.ts';
import { Character, DomainCharacter } from './charactersApi.types.ts';

export const charactersApi = baseApi.injectEndpoints({
  endpoints: (build) => {
    return {
      getCharacters: build.query<DomainCharacter[], string>({
        query: (name) => `character/?name=${name}`,
        transformResponse(
          response: BaseResponse<Character[]>
        ): DomainCharacter[] {
          return response.results.map((character) => ({
            id: character.id,
            name: character.name,
            url: character.url,
            status: character.status,
            created: character.created,
          }));
        },
        providesTags: ['Characters'],
      }),
    };
  },
});

export const { useGetCharactersQuery } = charactersApi;
