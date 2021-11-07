import { useCallback, useEffect, useState } from 'react'
import '../LevelOne/levelOne.css'
import Model from '../Model/Model';
import SingleCards from '../SingleCards/SingleCards';
import useSuccess from '../../hooks/useSuccess';


function LevelTwo (props) {
  const {cards , setCards , turns , setTurns , nextLevel } = props  
  const [choseOne , setChoseOne] = useState(null);
  const [choseTwo , setChoseTwo] = useState(null);
  const [choseThree , setChoseThree] = useState(null);
  const [disabled , setDisabled] = useState(false);
  const {openModel , setOpenModel} = useSuccess(cards , 18)

  // reset function 
  const resetTurn = useCallback(() => {
    setChoseOne(null);
    setChoseTwo(null);
    setChoseThree(null);
    setTurns(prevTurns => prevTurns + 1 );
    setDisabled(false)
  },[setTurns]);


  // use effect (to match choices)
  useEffect(() => {
    if (choseOne && choseTwo && choseThree) {
      setDisabled(true) 
      if (choseOne.src === choseTwo.src && choseTwo.src === choseThree.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choseOne.src && choseOne.src === choseThree.src) {
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
  } , [choseOne , choseTwo , choseThree , resetTurn , setCards]);

  // handle a choice 
  const handleChoice = (card) => {  
    if (!choseOne) {
      return setChoseOne(card)
    } else if (!choseTwo) {
      return setChoseTwo(card) 
    } else if (!choseThree) {
      return setChoseThree(card)
    }
  }
  
  return (
    <div className="App">
      <div className="container">
        <h3>level two</h3>
        <div className="card-grid">
          {cards?.map(card => (
          <SingleCards 
            card={card}
            key={card.id}
            handleChoice={handleChoice}
            flipped={card === choseOne || card === choseTwo || card === choseThree || card.match}
            disabled={disabled}
            />
          ))}
        </div>
        {openModel && <Model 
          closeModel={setOpenModel}
          openModel={openModel}
          nextLevel={nextLevel}
          text="you finish the game . "
          isLastLevel={true}
          />} 
        <p>your turn ! {turns} </p>
      </div>
    </div>
  );
}

export default LevelTwo 