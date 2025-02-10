import { ChangeEvent, useState } from 'react';
import { useDebounce } from '../common/hooks/useDebounce.ts';
import { useGetCharactersQuery } from '../features/characters/api/charactersApi.ts';
import { CharactersList } from '../features/characters/ui/CharactersList.tsx';
import { Pagination } from '../common/components/pagination/Pagination.tsx';

export const Main = () => {
  const [inputValue, setInputValue] = useState('');
  const [page, setPage] = useState(1);

  const debouncedValue = useDebounce(inputValue, 1000);

  const {
    data: characters,
    isFetching,
    error,
  } = useGetCharactersQuery(
    {
      args: {
        name: debouncedValue.trim(),
        page,
      },
    },
    {
      skip: debouncedValue.trim().length < 4,
    }
  );

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleChangePage = (pageUrl: number) => {
    setPage(pageUrl);
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
            ? `Found characters: ${charactersForRender.info.count}`
            : ''}
        </span>
        {error && <span style={{ color: '#ea2e34' }}>{errMsg}</span>}
      </div>
      {characters && (
        <Pagination
          info={characters?.info}
          onChangePage={handleChangePage}
          currentPage={page}
        />
      )}
      <div>
        {isFetching && <h1>Loading...</h1>}
        <CharactersList characters={charactersForRender?.results} />
      </div>
    </>
  );
};
