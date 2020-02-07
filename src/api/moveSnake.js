export default function moveSnake(state,props) {
  switch (state.lastPressedKey) {
    case "ArrowUp":
      return handleArrowUp(state,props);

    case "ArrowDown":
      return handleArrowDown(state,props);

    case "ArrowRight":
      return handleArrowRight(state,props);

    case "ArrowLeft":
      return handleArrowLeft(state,props);

    default:
      console.log("");
  }
}

function handleArrowUp(state,props) {
  if (state.tendency === props.columnsNumber) {
    return {
      headOfSnake: state.headOfSnake + props.columnsNumber
    };
  }
  return {
    headOfSnake: state.headOfSnake - props.columnsNumber,
    tendency: -props.columnsNumber
  };
}

function handleArrowDown(state,props) {
  if (state.tendency === -props.columnsNumber) {
    return {
      headOfSnake: state.headOfSnake - props.columnsNumber
    };
  }
  return {
    headOfSnake: state.headOfSnake + props.columnsNumber,
    tendency: props.columnsNumber
  };
}

function handleArrowRight(state,props) {
  if (state.tendency === -1) {
    return {
      headOfSnake: state.headOfSnake - 1
    };
  }
  return {
    headOfSnake: state.headOfSnake + 1,
    tendency: 1
  };
}

function handleArrowLeft(state,props) {
  if (state.tendency === 1) {
    return {
      headOfSnake: state.headOfSnake + 1
    };
  }
  return {
    headOfSnake: state.headOfSnake - 1,
    tendency: -1
  };
}

// if (state.lastPressedKey === "ArrowRight") {
//   return handleArrowRight(state);
// } else if (state.lastPressedKey === "ArrowLeft") {
//   return handleArrowLeft(state);
// } else if (state.lastPressedKey === "ArrowUp") {
//   return handleArrowUp(state);
// } else if (state.lastPressedKey === "ArrowDown") {
//   return handleArrowDown(state);
