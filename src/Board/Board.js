import React from "react";
import "./Board.css";

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstAppleEaten: false,
      counter:0,
      headOfSnake: 500,
      snakeBodyCoord: [],
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
    let appleCoord = [];

    for (let index = 0; index < 30; index++) {
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
  }

  generateApple() {
    let apple = [];
  }

  handleKeyPress() {
    return;
  }
  moveRestOfSnake() {
    let headOfSnake = this.state.headOfSnake;
    let snakeBodyCoord = this.state.snakeBodyCoord;
    if (this.state.firstAppleEaten === true) {
      snakeBodyCoord.push(headOfSnake);
      this.setState({ snakeBodyCoord: snakeBodyCoord });
      
      //console.log(snakeBodyCoord);
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
    const snakeBodyCoord = this.state.snakeBodyCoord;
    const headOfSnake = this.state.headOfSnake;
    let lenghtOfSnake = this.state.lenghtOfSnake;
    

    
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
        this.setState({lenghtOfSnake:lenghtOfSnake});
        console.log(lenghtOfSnake)
      } else if (snakeBodyCoord.length >= 2 && snakeBodyCoord.slice(snakeBodyCoord.length-1-lenghtOfSnake,snakeBodyCoord.length-1).includes(index)) { 
        ///zamiast  snakeBodyCoord.length-2 dac snakeBodyCoord.length-lenghtOfSnake-1
        
        items.push(<div className={`square snake-body`}></div>);
      } else {
        items.push(<div className={`square a${index}`}></div>);
      }
    }

    // if (
    //   this.state.headOfSnake < 0 ||
    //   this.state.headOfSnake >
    //     this.state.numberOfColumns * this.state.numberOfRows
    // ) {
    //   window.alert("outofbox");
    // }

    // console.log(appleCoord);

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
      </div>
    );
  }
}

export default Board;
