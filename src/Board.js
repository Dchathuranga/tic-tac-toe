import React from "react";
import Square from "./Square";

class Board extends React.Component {
  createBoard() {
    let board = [];
    for (let p = 0; p < 7; p+=3) {
      let row = [];
      for (let q = 0; q < 3; q++) {
        row.push(
        <Square
          key={q}
          click={() => this.props.click(p+q)}
          lastMove={this.props.lastMove[p+q]}
        />
        );
        
      }
      board.push(<div key={p} className="board-row">{row}</div>);
    }
    return (board);
  }

  render() {
    return(
      <div>
        {this.createBoard()}
      </div>
    );
  }
}

export default Board;