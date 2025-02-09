import { DomainCharacter } from '../api/charactersApi.types.ts';
import { memo } from 'react';

type Props = {
  characters?: DomainCharacter[];
};

export const CharactersList = memo(({ characters }: Props) => {
  console.log('CharactersList');

  return (
    <div>
      {characters?.map((character) => (
        <div key={character.id}>
          <h1>{character.name}</h1>
        </div>
      ))}
    </div>
  );
});
