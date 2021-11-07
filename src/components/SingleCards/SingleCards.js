import React from 'react';
import './SingleCards.css'

function SingleCards({card , handleChoice , disabled , flipped}) {
    // const flipped = true;

    // choice card 
    const handleClick = () => {
      if (!disabled) {
        handleChoice(card)
      }
    }

    return (
    <div className="card" key={card.id}>
        <div className={flipped ? 'flipped' : ''}>
          <img className="front" src={card.src} alt="card front"/>
          <img 
            className="back"
            src='./img/cover.png'
            alt="card back" 
            onClick={handleClick}
            />
        </div>
    </div>
    )
}

export default SingleCards
