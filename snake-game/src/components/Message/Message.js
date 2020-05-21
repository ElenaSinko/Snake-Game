import React from "react";
import "./Message.css";
import BackDrop from "../BlackDrop/BlackDrop";
import Button from "../Button/Button";

export default (props) => {
    return (
        <React.Fragment>
            <div className="ModalWindow">
                <h1> Your score is: <p className="message-score">{props.score}</p></h1>
                <h2> Do you want to play again?</h2>
                <Button onClick={props.onGameStart}>yes</Button>
                <Button onClick={props.onGame}>no</Button>
            </div>
            <BackDrop onClick={props.onGameStart}/>
        </React.Fragment>
    )
}

