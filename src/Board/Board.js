import React from "react";
import "./Board.css";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = { headOfSnake: 25 };
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleKeyDown(e) {
    console.log(e.key);
    console.log("wtf");

    if (e.key === "ArrowUp") {
      this.setState(prevState => {
        return { headOfSnake: prevState.headOfSnake - 8 };
      });
    } else if (e.key === "ArrowRight") {
      this.setState(prevState => {
        return { headOfSnake: prevState.headOfSnake + 1 };
      });
    } else if (e.key === "ArrowLeft") {
      this.setState(prevState => {
        return { headOfSnake: prevState.headOfSnake - 1 };
      });
    } else if (e.key === "ArrowDown") {
      this.setState(prevState => {
        return { headOfSnake: prevState.headOfSnake + 8 };
      });
    }
  }

  updateBoard() {
    const items = [];
    for (let index = 0; index < 32; index++) {
      if (index === this.state.headOfSnake) {
        items.push(<div c
          lassName={`card head-of-snake`}></div>);
      } else {
        items.push(<div className={`card a${index}`}></div>);
      }
    }
    return items;
  }

  render() {
    return (
      <div
        className="container"
        tabIndex="0"
        onKeyDown={this.handleKeyDown}
        ref={board => board && board.focus()}
      >
        {this.updateBoard()}
      </div>
    );
  }
}

export default Board;
