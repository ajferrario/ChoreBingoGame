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
  console.log('checking winner for the following')
  console.log(values)
  const maxIndex = Math.sqrt(Object.keys(values).length) - 1;
  switch (winCondition) {
    case 'Corners':
      return cornersCheck(maxIndex, values);
    case 'Vertical':
      return directionCheck('vertical', maxIndex, values);
    case 'Horizontal':
      return directionCheck('horizontal', maxIndex, values);
    case 'Diagonal':
      return diagonalCheck(maxIndex, values);
    case 'Blackout':
      return blackoutCheck(values);
    default:
      return false;
  }
}

function cornersCheck(maxIndex, values) {
  console.log('cornersCheck')
  return (
    getChore(0, 0, values).done &&
    getChore(0, maxIndex, values).done &&
    getChore(maxIndex, 0, values).done &&
    getChore(maxIndex, maxIndex, values).done
  );
}

function directionCheck(direction, maxIndex, values) {
  let dir = 'r' // Assuming horizontal
  if (direction === 'vertical') {
    console.log('vertical')
    dir = 'c' // Change if it's vertical
  }
  console.log('directionCheck '.concat(dir))
  for (let i = 0; i <= maxIndex; i++) {
    const boardKeys = Object.keys(values);
    console.log(dir.concat(i.toString()))
    const keysInDir = boardKeys.filter(key => key.includes(dir.concat(i.toString())));
    console.log(keysInDir)
    const doneInDir = keysInDir.map(key => values[key].done);
    console.log(doneInDir)
    if (!doneInDir.includes(false)) {
      console.log('winner')
      return true;
    }
  }
  console.log('not a winner')
  return false;
}

function diagonalCheck(maxIndex, values) {
  console.log('diagonalCheck')
  const same = [];
  const opposite = [];
  for (let i = 0; i <= maxIndex; i++) {
    same.push(getChore(i, i, values).done);
    opposite.push(getChore(i, maxIndex - i, values).done);
  }
  if (!same.includes(false) || !opposite.includes(false)) {
    console.log('winner')
    console.log(same)
    console.log(opposite)
    return true;
  }
  console.log('did\'nt win')
  return false;
}

function blackoutCheck(values) {
  console.log('blackoutCheck')
  if (Object.keys(values).map(key => values[key].done).includes(false)) {
    return false;
  }
  return true;
}

export {genKey, setChoreName, setChoreDone, getChore, isWinner}
