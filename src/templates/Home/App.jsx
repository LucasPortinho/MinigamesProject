import { Container } from '../../components/Container';
import { HomeContext } from '../../contexts/GameContext';
import { HangContext } from '../../contexts/HangmanContext';
import { QContext } from '../../contexts/QuizContext';
import './App.css';

export const App = () => {
  return (
    <>
      <h1>Minigames by Lucas</h1>

      <HomeContext>
        <HangContext>
          <QContext>
            <Container />
          </QContext>
        </HangContext>
      </HomeContext>
    </>
  );
}

