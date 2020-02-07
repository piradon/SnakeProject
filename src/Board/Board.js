import React from "react";
import Score from "../Board/Score/Score.js";
import moveSnake from "../api/moveSnake.js";
import "./Board.css";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: 100,
      firstAppleEaten: false,
      headOfSnake: 500,
      historyOfSnakeBodyCoord: [],
      lastPressedKey: "ArrowRight",
      tendency: 1,
      lenghtOfSnake: 0,
      appleCoord: []
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleMoveSnake = this.handleMoveSnake.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  componentWillMount() {
    this.setState({appleCoord: [...Array(30)].map(()=>Math.floor(
      Math.random() * this.props.columnsNumber * this.props.rowsNumber
    ))})
  }

  componentDidMount() {
    let intervalID = setInterval(() => {
      this.handleMoveSnake();
    }, 100);

    this.setState({ interval: intervalID });
  }

  handleKeyPress() {
    return;
  }

  handleMoveSnake() {
    this.setState(moveSnake);
    if (this.state.firstAppleEaten) {
      this.setState({
        historyOfSnakeBodyCoord: [
          ...this.state.historyOfSnakeBodyCoord,
          this.state.headOfSnake
        ]
      });
    }
  }

  handleKeyDown(e) {
    if (e.key !== this.state.lastPressedKey) {
      this.setState({ lastPressedKey: e.key });
    }
  }

  updateBoard() {
    const items = [];
    const columnsNumber = this.props.columnsNumber;
    const rowsNumber = this.props.rowsNumber;
    const appleCoord = this.state.appleCoord;
    const historyOfSnakeBodyCoord = this.state.historyOfSnakeBodyCoord;
    const headOfSnake = this.state.headOfSnake;
    let lenghtOfSnake = this.state.lenghtOfSnake;
    let tendency = this.state.tendency;

    const currentPositionBodyOfSnake = historyOfSnakeBodyCoord.slice(
      historyOfSnakeBodyCoord.length - 1 - lenghtOfSnake,
      historyOfSnakeBodyCoord.length - 1
    );

    for (let index = 0; index < columnsNumber * rowsNumber; index++) {
      if (index === this.state.headOfSnake) {
        items.push(<div className={`square head-of-snake`}></div>);
      } else if (index === appleCoord[0]) {
        items.push(<div className={`square apple`}></div>);
      } else if (appleCoord[0] === headOfSnake) {
        items.push(<div className={`square head-of-snake`}></div>);
        appleCoord.shift();
        items[0] = <div className={`square a${index}`}></div>;
        lenghtOfSnake++;
        this.setState({ firstAppleEaten: true, lenghtOfSnake: lenghtOfSnake });
      } else if (
        historyOfSnakeBodyCoord.length >= 2 &&
        currentPositionBodyOfSnake.includes(index)
      ) {
        items.push(<div className={`square snake-body`}></div>);
      } else {
        items.push(<div className={`square a${index}`}></div>);
      }
    }

    if (
      currentPositionBodyOfSnake.includes(headOfSnake) &&
      currentPositionBodyOfSnake.includes(headOfSnake - tendency)
    ) {
      document.documentElement.style.setProperty(
        "--head-of-snake-color",
        "red"
      );

      clearInterval(this.state.interval);
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
        onKeyPress={this.handleKeyPress}
      >
        {this.updateBoard()}
        <Score score={this.state.lenghtOfSnake} />
      </div>
    );
  }
}

export default Board;
