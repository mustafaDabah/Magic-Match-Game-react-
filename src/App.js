import { useEffect, useState } from 'react'
import './App.css'
import LevelOne from './components/LevelOne/LevelOne';
import LevelTwo from './components/LevelTwo/LevelTwo';
import { cardImages } from './utils/cardImages';

function App() {
  const [cards , setCards] = useState([]);
  const [turns , setTurns] = useState(0);
  const [nextLevel , setNextLevel] = useState(1);
  
  // shuffle cards (btn new game)
  const shuffleCards = () => {
    const numberOfCards = nextLevel === 2 ? [...cardImages , ...cardImages , ...cardImages ] : [...cardImages , ...cardImages ];
    const shuffledCards = numberOfCards
      .sort(() => Math.random() - 0.5 )
      .map(card => ({...card , id:Math.random()}))
    setCards(shuffledCards);
    setTurns(0);  
  }

  
  useEffect(() => {
    shuffleCards();
  } , [nextLevel])


  return (
    <div className="App">
      <div className="container">
        <h1>Magic Match</h1>
        <button onClick={shuffleCards}>New Game</button>
        {/* --check level-- */}
        {nextLevel === 2 ? <LevelTwo 
           cards={cards}
           setCards={setCards}
           turns={turns}
           setTurns={setTurns}
           nextLevel={setNextLevel}
        /> : ( 
        <LevelOne  
          cards={cards}
          setCards={setCards}
          turns={turns}
          setTurns={setTurns}
          nextLevel={setNextLevel}
        />)}
      </div>
    </div>
  );
}

export default App