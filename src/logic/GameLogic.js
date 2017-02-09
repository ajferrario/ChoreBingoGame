function genKey(row, col) {
  return `r${row}c${col}`;
}

function setChoreDone(row, col, values) {
  const board = JSON.parse(JSON.stringify(values));
  board[genKey(row, col)].done = true;
  return board;
}

function setChoreName(row, col, newValue, values) {
  const board = JSON.parse(JSON.stringify(values));
  board[genKey(row, col)].name = newValue;
  return board;
}

function getChore(row, col, values) {
  return values[genKey(row, col)];
}

function isWinner(winCondition, values) {
  const maxIndex = Math.sqrt(Object.keys(values).length) - 1;
  switch (winCondition) {
    case 'Corners':
      return cornersCheck(maxIndex, values);
    case 'Vertical':
      return directionCheck('r', maxIndex, values);
    case 'Horizontal':
      return directionCheck('c', maxIndex, values);
    case 'Diagonal':
      return diagonalCheck(maxIndex, values);
    case 'Blackout':
      return blackoutCheck(values);
    default:
      return false;
  }
}

function cornersCheck(maxIndex, values) {
  return (
    getChore(0, 0, values).done &&
    getChore(0, maxIndex, values).done &&
    getChore(maxIndex, 0, values).done &&
    getChore(maxIndex, maxIndex, values).done
  );
}

function directionCheck(dir, maxIndex, values) {
  for (let i = 0; i <= maxIndex; i++) {
    const boardKeys = Object.keys(values);
    const keysInDir = boardKeys.filter(key => key.includes(dir + i));
    const doneInDir = keysInDir.map(key => values[key].done);
    if (!doneInDir.includes(false)) {
      return true;
    }
  }
  return false;
}

function diagonalCheck(maxIndex, values) {
  const same = [];
  const opposite = [];
  for (let i = 0; i < maxIndex; i++) {
    same.push(getChore(i, i, values).done);
    opposite.push(getChore(i, maxIndex - i, values));
  }
  if (!same.includes(false) || !opposite.includes(false)) {
    return true;
  }
  return false;
}

function blackoutCheck(values) {
  if (Object.keys(values).map(key => values[key].done).contains(false)) {
    return false;
  }
  return true;
}

export {genKey, setChoreName, setChoreDone, getChore, isWinner}
