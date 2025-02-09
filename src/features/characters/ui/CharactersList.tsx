import { useGetCharactersQuery } from '../api/charactersApi.ts';

export const CharactersList = () => {
  const {data} = useGetCharactersQuery()
  console.log(data);
  return (
    <div>data</div>
  )
}