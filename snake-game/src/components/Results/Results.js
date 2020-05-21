import React from "react";
import './Results.css';

export default (props) => {
    return (
        <div className="results-container">
            <h2>YOUR SCORE: <p>{props.score}</p></h2>
        </div>
    )
}
