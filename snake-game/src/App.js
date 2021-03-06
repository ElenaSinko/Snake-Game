import React from "react";
import Diamond from "./components/Diamond/Diamond";
import Snake from "./components/Snake/Snake";
import Results from "./components/Results/Results";
import GameControl from "./components/GameControl/GameControl";
import Message from "./components/Message/Message";
import "./App.css";

const createDiamond = () => {
  let min = 0;
  let max = 600 - 30;
  let x = Math.floor((Math.random() * (max - min + 1) + min) / 30) * 30;
  let y = Math.floor((Math.random() * (max - min + 1) + min) / 30) * 30;
  return [x, y];
};

const InitialState = {
  snake: [[30, 0], [0, 0]],
  diamond: createDiamond(),
  direction: 'RIGHT',
  score: 0,
  speed: 200,
  isPaused: false,
  gameIsOver: false,
};

export default class App extends React.Component {
  state = InitialState;

  timerId = 0;

  onKeyDown = (evt) => {
    switch (evt.keyCode) {
      case 38:
        this.setState({direction: 'UP'});
        break;
      case 40:
        this.setState({direction: 'DOWN'});
        break;
      case 37:
        this.setState({direction: 'LEFT'});
        break;
      case 39:
        this.setState({direction: 'RIGHT'});
        break;
      default: break;
    }
  };

  moveSnake = () => {
    let newSnake = [...this.state.snake];
    let head = newSnake[0];

    switch (this.state.direction) {
      case 'RIGHT':
        head = [head[0] + 30, head[1]];
        break;
      case 'LEFT':
        head = [head[0] - 30, head[1]];
        break;
      case 'UP':
        head = [head[0], head[1] - 30];
        break;
      case 'DOWN':
        head = [head[0], head[1] + 30];
        break;
      default: break;
    }

    newSnake.unshift(head);
    newSnake.pop();
    this.setState({snake: newSnake})
  };

  onGameStart = () => {
    this.setState(InitialState);
    this.timerId = setInterval(this.moveSnake, this.state.speed)
  };

  onGameOver = () => {
    this.setState({snake: [[30, 30], [0, 30]], gameIsOver: true, direction: 'RIGHT'});
    clearInterval(this.timerId);
  };

  onGame = () => {
    this.setState({
      isPaused: true,
      gameIsOver: false,
      score: 0,
      direction: 'RIGHT',
    });
    clearInterval(this.timerId);
  };

  checkSelfCollision() {
    let sneak = [...this.state.snake];
    let head = sneak[0];
    sneak.shift();
    sneak.forEach(dot => {
      if (head[0] === dot[0] && head[1] === dot[1]) {
        this.onGameOver();
      }
    })
  }

  checkDiamondCollisionDuringCreation(snake, diamond) {
    for (let i = 0; i < snake.length; i++) {
      if (snake[i][0] === diamond[0] && snake[i][1] === diamond[1]) {
        return true
      }
    }
    return false
  }

  checkDiamondCollision() {
    let copyState = {...this.state};
    let copySnake = copyState.snake;
    let head = copySnake[0];
    let que = copySnake[copySnake.length - 1];
    let diamond = this.state.diamond;

    if (head[0] === diamond[0] && head[1] === diamond[1]) {
      let newDiamond = createDiamond();
      while (this.checkDiamondCollisionDuringCreation(copySnake, newDiamond)) {
        newDiamond = createDiamond();
      }
      this.setState({diamond: newDiamond});
      copySnake.push(que);
      this.setState({snake: copySnake, score: this.state.score + 10})
    }
  }

  checkBordersCollision() {
    let head = this.state.snake[0];
    if (head[0] >= 600 || head[1] >= 600 || head[0] < 0 || head[1] < 0) {
      this.onGameOver();
    }
  }

  onPauseButtonHandler = () => {
    this.setState({isPaused: !this.state.isPaused});
    if (!this.state.isPaused) {clearInterval(this.timerId)}
    if (this.state.isPaused) { this.timerId = setInterval(this.moveSnake, this.state.speed)}
  };

  componentDidMount() {
    this.timerId = setInterval(this.moveSnake, this.state.speed);
    document.onkeydown = this.onKeyDown;
  }

  componentDidUpdate() {
    this.checkBordersCollision();
    this.checkDiamondCollision();
    this.checkSelfCollision();
  }

  render() {
    return (
        <div className="game-container">
          {this.state.gameIsOver && <Message score={this.state.score} onGameStart={this.onGameStart} onGame={this.onGame}/>}
        <GameControl onPause={this.onPauseButtonHandler} isPaused={this.state.isPaused}/>
        <div className="game-area">
          <Diamond diamond={this.state.diamond}/>
          <Snake snake={this.state.snake}/>
        </div>
        <Results score={this.state.score} />
        </div>
    );
  }

}

