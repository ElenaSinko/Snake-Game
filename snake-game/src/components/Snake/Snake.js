import React from 'react';
import './Snake.css';

export default (props) => {
    return (
        <div>
            {props.snake.map((dot, i) => {
                const style = {
                    left: `${props.snake[i][0]}px`,
                    top: `${props.snake[i][1]}px`
                }
                return (
                    <div className="snake-element" key={i} style={style}>
                        <div className='dot'></div>
                    </div>
                )
            })}
        </div>
    )
}
