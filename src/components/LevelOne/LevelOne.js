import { useCallback, useEffect, useState } from 'react'
import './levelOne.css'
import SingleCards from '../SingleCards/SingleCards';
import Model from '../Model/Model';
import useSuccess from '../../hooks/useSuccess';

function LevelOne (props) {
  const {cards , setCards , turns , setTurns , nextLevel} = props  
  const [choseOne , setChoseOne] = useState(null);
  const [choseTwo , setChoseTwo] = useState(null);
  const [disabled , setDisabled] = useState(false);
  const {openModel , setOpenModel} = useSuccess(cards , 12 );

  // reset function 
  const resetTurn = useCallback(() => {
    setChoseOne(null);
    setChoseTwo(null);
    setTurns(prevTurns => prevTurns + 1 );
    setDisabled(false)
  },[setTurns])

  // use effect (to match choices)
  useEffect(() => {
    if (choseOne && choseTwo) {
      setDisabled(true) 
      if (choseOne.src === choseTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choseOne.src) {
              return {...card , match:true}
            }else {
              return card 
            }
          })
        })
        resetTurn();
      } else {
        setTimeout(() => resetTurn() , 2000)
      }
    } 
  } , [choseOne , choseTwo , resetTurn , setCards]);

  // handle a choice 
  const handleChoice = (card) => {
    choseOne ? setChoseTwo(card) : setChoseOne(card);
  }
  
  return (      
      <div className="container">
        <h3>level one</h3>
        <div className="card-grid">
          {cards?.map(card => (
            <SingleCards 
              card={card}
              key={card.id}
              handleChoice={handleChoice}
              flipped={card === choseOne || card === choseTwo || card.match}
              disabled={disabled}
            />
          ))}
        </div>
        {openModel && <Model 
          closeModel={setOpenModel}
          openModel={openModel}
          nextLevel={nextLevel}
          text="to pass this level you should choice three shape the same . "
          />} 
        <p>your turn ! {turns} </p>
      </div>
  );
}

export default LevelOne 