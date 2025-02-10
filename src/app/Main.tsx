import { ChangeEvent, useState } from 'react';
import { useDebounce } from '../common/hooks/useDebounce.ts';
import { useGetCharactersQuery } from '../features/characters/api/charactersApi.ts';
import { CharactersList } from '../features/characters/ui/CharactersList.tsx';

export const Main = () => {
  const [inputValue, setInputValue] = useState('');

  const debouncedValue = useDebounce(inputValue, 1000);

  const {
    data: characters,
    isFetching,
    error,
  } = useGetCharactersQuery(debouncedValue.trim(), {
    skip: debouncedValue.trim().length < 4,
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  let charactersForRender = characters;
  if (debouncedValue.trim().length < 4 || !!error) {
    charactersForRender = undefined;
  }

  let errMsg = 'Something happened';
  if (error) {
    if ('data' in error) {
      const errorData = error.data as { error: string };
      errMsg = errorData.error;
    }
  }

  return (
    <>
      <div className={'inputWrapper'}>
        <input
          type="text"
          placeholder={'Search characters...'}
          onChange={onChangeHandler}
          value={inputValue}
          autoFocus
        />
        <span>
          {charactersForRender
            ? `Found characters: ${charactersForRender.length}`
            : ''}
        </span>
        {error && <span style={{ color: '#ea2e34' }}>{errMsg}</span>}
      </div>
      <div>
        {isFetching && <h1>Loading...</h1>}
        <CharactersList characters={charactersForRender} />
      </div>
    </>
  );
};
