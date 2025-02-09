import './App.css';
import { CharactersList } from '../features/characters/ui/CharactersList.tsx';
import { ChangeEvent, useState } from 'react';
import { useGetCharactersQuery } from '../features/characters/api/charactersApi.ts';
import { useDebounce } from '../common/hooks/useDebounce.ts';

function App() {
  const [inputValue, setInputValue] = useState('');

  const debouncedValue = useDebounce(inputValue, 1000);

  const { data: characters } = useGetCharactersQuery(debouncedValue.trim(), {
    skip: debouncedValue.trim().length < 4,
  });

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  let charactersForRender = characters;
  if (debouncedValue.trim().length < 4) {
    charactersForRender = undefined;
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
      </div>
      <div>
        <CharactersList characters={charactersForRender} />
      </div>
    </>
  );
}

export default App;
