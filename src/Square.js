import React from "react";

function Square(props) {
  return (
    <button 
      className="square"
      onClick={props.click}
    >{props.lastMove}</button>
  );
}

export default Square;