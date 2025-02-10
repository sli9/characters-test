import { useGetCharacterQuery } from '../api/characterInfoApi.ts';
import { useParams } from 'react-router-dom';
import s from './CharacterPage.module.css';

export const CharacterPage = () => {
  const { id } = useParams();
  const { data: character } = useGetCharacterQuery(`${id}`);

  return (
    <div className={s.container}>
      <h1 className={s.name}>{character?.name}</h1>
      <div className={s.image}>
        <img src={character?.image} alt={'character image'} />
      </div>
    </div>
  );
};
