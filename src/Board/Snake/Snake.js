import React from "react";
import "./Snake.css";

class Snake extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      positionOfSnake: [10],
      lastPressedKey: "ArrowUp",
      lenghtOfSnake: 1
    };
  }

  moveSnake() {}

  addScore() {}

  render() {
    return <div></div>;
  }
}

export default Snake;
