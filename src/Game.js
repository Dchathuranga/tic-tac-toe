import React from "react";
import Board from "./Board";

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        Array(9).fill(null)
      ],
      xIsNext: true,
      stepNumber: 0,
      winner: null
    }
  }

  calculateWinner(lastMove) {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for(let i of lines) {
      const [a, b, c] = i;
      if (lastMove[a] && lastMove[b] && lastMove[c]) {
        if(lastMove[a] === lastMove[b] && lastMove[b] === lastMove[c]) {
          return lastMove[a];
        }        
      }
    }
    return null;
  }

  whenClick(i) {
    const history = this.state.history;
    const lastMove = history[this.state.stepNumber].slice(0,9);
    if (lastMove[i] || this.state.winner) return;
    lastMove[i] = this.state.xIsNext ? 'X' : 'O';
    history.push(lastMove);
    this.setState({
      history: history,
      stepNumber: history.length-1,
      xIsNext: !this.state.xIsNext,
      winner: this.calculateWinner(lastMove)
    });
  }

  //history button
  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0
    });    
  }

  render() {
    const history = this.state.history;
    const lastMove = history[this.state.stepNumber];
    
     
    //display next player/winner
    let status;
    if (this.state.winner) {
      status = 'Winner: ' + this.state.winner;
    } else {
      status = 'Next Player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    //display history
    const moves = history.map((move, step) => {
      if (step === 0) return('');
      const decision = 'Go to step #' + step;  
      return (
        <li key={step}>
          <button onClick={() => this.jumpTo(step)}>{decision}</button>
        </li>
      );
    });
    
    return (
      <div>
        <h1>Tic-Tac-Toe</h1>
        <div className="game">
          <div className="gameBoard">
            <Board 
              click={(i) => this.whenClick(i)}
              lastMove={lastMove}
            ></Board>
          </div>
          <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
          </div>
        </div>
      </div>
    );
  }
}

export default Game;