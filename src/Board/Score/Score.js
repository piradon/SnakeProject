import React from 'react'
import "../Score/Score.css"

const Score = (props) => ( 
    <div className="score">
        <h3 className="score-text">{props.score}</h3>
    </div>
)  



export default Score;