import { Character } from '../api/charactersApi.types.ts';
import { memo } from 'react';
import { CharacterCard } from './character-card/CharacterCard.tsx';
import s from './CharactersList.module.css';

type Props = {
  characters?: Character[];
};

export const CharactersList = memo(({ characters }: Props) => {
  return (
    <div className={s.charactersContainer}>
      <div className={s.cardsHead}>
        {characters
          ?.slice(0, 2)
          .map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
      </div>
      <div className={s.charactersGrid}>
        {characters
          ?.slice(2)
          .map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
      </div>
    </div>
  );
});
