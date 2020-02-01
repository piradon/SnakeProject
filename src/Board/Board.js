import React from "react";
import "./Board.css";
import Score from "../Board/Score/Score.js";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      interval: 100,
      intervalBody: 100,
      firstAppleEaten: false,
      headOfSnake: 500,
      historyOfSnakeBodyCoord: [],
      lastPressedKey: "ArrowRight",
      tendency: 1,
      lenghtOfSnake: 0,
      appleCoord: [],
      numberOfColumns: parseInt(
        window
          .getComputedStyle(document.documentElement)
          .getPropertyValue("--number-of-columns")
      ),
      numberOfRows: parseInt(
        window
          .getComputedStyle(document.documentElement)
          .getPropertyValue("--number-of-rows")
      )
    };

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.moveSnake = this.moveSnake.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.moveRestOfSnake = this.moveRestOfSnake.bind(this);
  }

  componentWillMount() {
    let appleCoord = this.state.appleCoord;

    for (let index = 0; index < 50; index++) {
      appleCoord.push(
        Math.floor(
          Math.random() * this.state.numberOfColumns * this.state.numberOfRows
        )
      );
      if (index === 29) {
        this.setState({ appleCoord: appleCoord });
      }
    }
  }

  componentDidMount() {
    let intervalID = window.setInterval(this.moveSnake, 100);

    let intervalSnakeTail = window.setInterval(this.moveRestOfSnake, 100);
    this.setState({ interval: intervalID });
    this.setState({ intervalBody: intervalSnakeTail });
  }

  handleKeyPress() {
    return;
  }

  moveRestOfSnake() {
    let headOfSnake = this.state.headOfSnake;
    let historyOfSnakeBodyCoord = this.state.historyOfSnakeBodyCoord;
    if (this.state.firstAppleEaten === true) {
      historyOfSnakeBodyCoord.push(headOfSnake);
      this.setState({ historyOfSnakeBodyCoord: historyOfSnakeBodyCoord });
    }
  }

  moveSnake() {
    const numberOfColumns = this.state.numberOfColumns;

    if (
      this.state.lastPressedKey === "ArrowUp" &&
      this.state.tendency !== this.state.numberOfColumns
    ) {
      this.setState({ tendency: -numberOfColumns });
      this.setState(prevState => {
        return { headOfSnake: prevState.headOfSnake - numberOfColumns };
      });
    } else if (
      this.state.lastPressedKey === "ArrowUp" &&
      this.state.tendency === this.state.numberOfColumns
    ) {
      this.setState(prevState => {
        return { headOfSnake: prevState.headOfSnake + numberOfColumns };
      });
    } else if (
      this.state.lastPressedKey === "ArrowRight" &&
      this.state.tendency !== -1
    ) {
      this.setState({ tendency: 1 });
      this.setState(prevState => {
        return { headOfSnake: prevState.headOfSnake + 1 };
      });
    } else if (
      this.state.lastPressedKey === "ArrowRight" &&
      this.state.tendency === -1
    ) {
      this.setState(prevState => {
        return { headOfSnake: prevState.headOfSnake - 1 };
      });
    } else if (
      this.state.lastPressedKey === "ArrowLeft" &&
      this.state.tendency !== 1
    ) {
      this.setState({ tendency: -1 });
      this.setState(prevState => {
        return { headOfSnake: prevState.headOfSnake - 1 };
      });
    } else if (
      this.state.lastPressedKey === "ArrowLeft" &&
      this.state.tendency === 1
    ) {
      this.setState(prevState => {
        return { headOfSnake: prevState.headOfSnake + 1 };
      });
    } else if (
      this.state.lastPressedKey === "ArrowDown" &&
      this.state.tendency !== -numberOfColumns
    ) {
      this.setState({ tendency: numberOfColumns });
      this.setState(prevState => {
        return { headOfSnake: prevState.headOfSnake + numberOfColumns };
      });
    } else if (
      this.state.lastPressedKey === "ArrowDown" &&
      this.state.tendency === -numberOfColumns
    ) {
      this.setState(prevState => {
        return { headOfSnake: prevState.headOfSnake - numberOfColumns };
      });
    }
  }

  handleKeyDown(e) {
    let lastPressedKey = e.key;
    if (lastPressedKey === this.state.lastPressedKey) {
      return;
    } else {
      this.setState({ lastPressedKey: e.key });
    }
  }

  updateBoard() {
    const items = [];
    const numberOfColumns = parseInt(this.state.numberOfColumns);
    const numberOfRows = parseInt(this.state.numberOfRows);
    const appleCoord = this.state.appleCoord;
    const historyOfSnakeBodyCoord = this.state.historyOfSnakeBodyCoord;
    const headOfSnake = this.state.headOfSnake;
    let lenghtOfSnake = this.state.lenghtOfSnake;
    let tendency = this.state.tendency;

    const currentPositionBodyOfSnake = historyOfSnakeBodyCoord.slice(
      historyOfSnakeBodyCoord.length - 1 - lenghtOfSnake,
      historyOfSnakeBodyCoord.length - 1
    );

    for (let index = 0; index < numberOfColumns * numberOfRows; index++) {
      if (index === this.state.headOfSnake) {
        items.push(<div className={`square head-of-snake`}></div>);
      } else if (index === appleCoord[0]) {
        items.push(<div className={`square apple`}></div>);
      } else if (appleCoord[0] === headOfSnake) {
        items.push(<div className={`square head-of-snake`}></div>);
        appleCoord.shift();

        items[0] = <div className={`square a${index}`}></div>;

        this.setState({ firstAppleEaten: true });
        lenghtOfSnake++;
        this.setState({ lenghtOfSnake: lenghtOfSnake });
      } else if (
        historyOfSnakeBodyCoord.length >= 2 &&
        currentPositionBodyOfSnake
          .includes(index)
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
      clearInterval(this.state.intervalBody);
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
