export default function moveSnake(state) {
  switch (state.lastPressedKey) {
    case "ArrowUp":
      return handleArrowUp(state);

    case "ArrowDown":
      return handleArrowDown(state);

    case "ArrowRight":
      return handleArrowRight(state);

    case "ArrowLeft":
      return handleArrowLeft(state);

    default:
      console.log("");
  }
}

function handleArrowUp(state) {
  if (state.tendency === state.columnsNumber) {
    return {
      headOfSnake: state.headOfSnake + state.columnsNumber
    };
  }
  return {
    headOfSnake: state.headOfSnake - state.columnsNumber,
    tendency: -state.columnsNumber
  };
}

function handleArrowDown(state) {
  if (state.tendency === -state.columnsNumber) {
    return {
      headOfSnake: state.headOfSnake - state.columnsNumber
    };
  }
  return {
    headOfSnake: state.headOfSnake + state.columnsNumber,
    tendency: state.columnsNumber
  };
}

function handleArrowRight(state) {
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

function handleArrowLeft(state) {
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
