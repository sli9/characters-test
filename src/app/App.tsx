import '../App.css';
import { CharactersList } from '../features/characters/ui/CharactersList.tsx';

function App() {

  return (
    <>
      <input type="text"  placeholder={'Search characters...'}/>
      <div>
        <CharactersList />
      </div>
    </>
  );
}

export default App;
