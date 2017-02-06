import React, {
  Component,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  AsyncStorage,
  TouchableHighlight,
} from 'react-native';

import ChoreConfigPopup from '../components/ChoreConfigPopup';
import Storage from '../backend/storage/Storage';

const styles = StyleSheet.create({
  grid: {
    flex: 1,
    flexDirection: 'column',
  },
  row: {
    flex: 1,
    flexDirection: 'row',
  },
  cell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#48afdb',
    borderRadius: 4,
  },
  btnText: {
    fontSize: 18,
    color: '#FFFFFF',
    marginTop: 6,
  },
});

class BingoBoard extends Component {
  static genKey(row, col) {
    return `r${row}c${col}`;
  }

  constructor(props) {
    super(props);
    this.state = this.getBoardData();
    console.log(this.state);
    //AsyncStorage.setItem(this.props.playerID, this.state).then().done();
  }

  getBoardData() {
    /*Storage.getplayer(this.props.playerID).done(
      (data) => {
        if (data === null) {
          this.setState(this.buildNewBoard());
        } else {
          const dataHolder = data;
          dataHolder.name = this.props.playerName;
          dataHolder.winner = this.isWinner();
          this.setState(dataHolder);
        }
      },
    )*/
    return {
      values: {
        r0c0: { name: 'dishes', done: false },
        r1c0: { name: 'sweep dining room', done: true },
        r2c0: { name: 'play games', done: true },
        r3c0: { name: 'play games', done: true },
        r0c1: { name: 'dishes', done: false },
        r1c1: { name: 'sweep dining room', done: true },
        r2c1: { name: 'play games', done: true },
        r3c1: { name: 'play games', done: true },
        r0c2: { name: 'dishes', done: false },
        r1c2: { name: 'sweep dining room', done: true },
        r2c2: { name: 'play games', done: true },
        r3c2: { name: 'play games', done: true },
        r0c3: { name: 'dishes', done: false },
        r1c3: { name: 'sweep dining room', done: true },
        r2c3: { name: 'play games', done: true },
        r3c3: { name: 'play games', done: true },
      },
      name: '',
      winner: false,
      focusKey: null,
    }
  }

  setChoreDone(row, col) {
    const board = this.state.values;
    board[BingoBoard.genKey(row, col)].done = true;
    this.setState({ values: board });
    AsyncStorage.setItem(this.props.playerID, this.state).then().done();
  }

  setChoreName(key, newValue) {
    const board = this.state.values;
    board[key].name = newValue;
    this.setState({ values: board });
    AsyncStorage.setItem(this.props.playerID, this.state).then().done();
  }

  getChore(row, col) {
    console.log(BingoBoard.genKey(row,col));
    return this.state.values[BingoBoard.genKey(row, col)];
  }

  buildNewBoard() {
    const board = { values: {}, winner: false, name: this.props.playerName };
    for (let row = 0; row < this.props.bdSize; row++) {
      for (let col = 0; col < this.props.bdSize; col++) {
        board.values[BingoBoard.genKey(row, col)] = {
          name: 'Empty',
          done: false,
          focusKey: null,
        };
      }
    }
    console.log(board)
    return board;
  }

  isWinner() {
    switch (this.props.winCondition) {
      case 'Corners':
        return this.cornersCheck();
      case 'Vertical':
        return this.directionCheck('r');
      case 'Horizontal':
        return this.directionCheck('c');
      case 'Diagonal':
        return this.diagonalCheck();
      case 'Blackout':
        return this.blackoutCheck();
      default:
        return false;
    }
  }

  cornersCheck() {
    return (
      this.getChore(0, 0).done &&
      this.getChore(0, this.props.bdSize - 1).done &&
      this.getChore(this.props.bdSize - 1, 0).done &&
      this.getChore(this.props.bdSize - 1, this.props.bdSize - 1).done
    );
  }

  directionCheck(dir) {
    for (let i = 0; i <= this.props.bdSize - 1; i + 1) {
      const boardKeys = Object.keys(this.state.values);
      const keysInDir = boardKeys.filter(key => key.includes(dir + i));
      const doneInDir = keysInDir.map(key => this.state.values[key].done);
      if (!doneInDir.includes(false)) {
        return true;
      }
    }
    return false;
  }

  diagonalCheck() {
    const same = [];
    const opposite = [];
    for (let i = 0; i < this.props.bdSize - 1; i + 1) {
      same.push(this.getChore(i, i).done);
      opposite.push(this.getChore(i, this.props.bdSize - 1 - i));
    }
    if (!same.includes(false) || !opposite.includes(false)) {
      return true;
    }
    return false;
  }

  blackoutCheck() {
    if (Object.keys(this.state.values).map(key => this.state.values[key].done).contains(false)) {
      return false;
    }
    return true;
  }

  createGrid() {
    const grid = [];
    for (let row = 0; row < this.props.bdSize; row++) {
      grid.push(<View style={styles.row} key={row}>{this.createSet(row)}</View>);
    }
    return grid;
  }
  createSet(row) {
    const set = [];
    for (let col = 0; col < this.props.bdSize; col++) {
      set.push(
        <View
          style={styles.cell}
          key={col}
        >
          <TouchableHighlight
            style={styles.button}
            onPress={() => this.chorePopup(row, col)}
            underlayColor={'#dddddd'}
          >
            {this.createCell(row, col)}
          </TouchableHighlight>
        </View>
      )
    }
    return (set);
  }
  createCell(row, col) {
    const chore = this.getChore(row, col);
    return (
          <Text style={styles.btnText}>
            {chore.name}
          </Text>
    );
  }

  chorePopup() {
    alert('This is where the chore');
  }

  render() {
    return (
      <View style={styles.grid}>
        {this.createGrid()}
      </View>
    );
  }
}

BingoBoard.propTypes = {
  bdSize: React.PropTypes.number,
  playerID: React.PropTypes.number,
  winCondition: React.PropTypes.string,
  playerName: React.PropTypes.string,
};

export default BingoBoard;
