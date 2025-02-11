import { CharacterPage } from '../../features/character-info/ui/CharacterPage.tsx';
import { Route, Routes } from 'react-router-dom';
import { Main } from '../../app/Main.tsx';

export const Path = {
  Main: 'characters-test',
  Character: `characters-test/:id`,
  NotFound: '*',
} as const;

export const Routing = () => {
  return (
    <Routes>
      <Route path={Path.Main} element={<Main />} />
      <Route path={Path.Character} element={<CharacterPage />} />
      <Route path={Path.NotFound} element={<div>Not found</div>} />
    </Routes>
  );
};
