import React  from 'react';
import './styles.css'

function Model({closeModel , openModel , nextLevel , text , isLastLevel = false }) {
    // function (next level )
    const setNextLevel = (level) => {
        nextLevel(level);
        closeModel(false)
    }

    // close (model)
    const setCloseModel = () => {
        closeModel(false)
    }

    // className={`${openModel ? 'open' : 'close'} model-container`}
    return ( 
        <div className={`model-background`}>
            <div className={`${openModel ? 'open' : 'close'} model-container`}>
                <button onClick={setCloseModel} >X</button>
                <div className="title">
                    <h1>congratulation</h1>
                    <span>☆</span><span>☆</span><span>☆</span><span>☆</span><span>☆</span>
                    <p>{text}</p>
                </div>
                {isLastLevel ? (
                    <div className="footer">
                         <button onClick={setCloseModel}>cancel</button>
                         <button onClick={() => setNextLevel(1)}>play again  </button>
                     </div>
                ) : (
                    <div className="footer">
                        <button onClick={setCloseModel}>cancel</button>
                        <button onClick={() => setNextLevel(2)}>next level </button>
                    </div>
                )}
                
            </div>
        </div>
    )
}

export default Model
