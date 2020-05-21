import React from "react";
import "./GameControl.css";

export default (props) => {
    let title;
    props.isPaused ? title = 'START' : title = 'POUSE'
    return (
        <div className="game-control-container">
            <button onClick={props.onPause}>{title}</button>
        </div>
    )
}
