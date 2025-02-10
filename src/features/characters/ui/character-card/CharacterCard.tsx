import { DomainCharacter } from '../../api/charactersApi.types.ts';
import s from './CharacterCard.module.css';
import { Link } from 'react-router-dom';

type Props = {
  character: DomainCharacter;
};

export const CharacterCard = ({ character }: Props) => {
  const statusClassnames =
    (character.status === 'Alive' && s.alive) ||
    (character.status === 'Dead' && s.dead) ||
    '';

  const createdAtString = character.created
    .split('T')[0]
    .split('-')
    .reverse()
    .join('.');

  return (
    <Link to={`/character/${character.id}`}>
      <div className={s.characterCard}>
        <h3 className={s.name}>{character.name}</h3>
        <div className={s.status}>
          <p>
            Status: <span className={statusClassnames}>{character.status}</span>
          </p>
          <p>Created: {createdAtString}</p>
        </div>
      </div>
    </Link>
  );
};
