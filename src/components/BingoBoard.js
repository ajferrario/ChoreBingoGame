import React, {
  Component,
} from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
} from 'react-native';

import {
  getChore,
} from '../logic/GameLogic.js'

import {
  Actions,
} from 'react-native-router-flux';

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
  buttonDone: {
    backgroundColor: '#ff69b4',
    borderRadius: 4,
  },
  buttonUndone: {
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

  constructor(props) {
    super(props);
  }

  createGrid() {
    const grid = [];
    for (let row = 0; row < this.props.boardSize; row++) {
      grid.push(<View style={styles.row} key={row}>{this.createSet(row)}</View>);
    }
    return grid;
  }

  createSet(row) {
    const set = [];
    for (let col = 0; col < this.props.boardSize; col++) {
      set.push(
        <View
          style={styles.cell}
          key={col}
        >
        {this.createCell(row, col)}
        </View>
      )
    }
    return (set);
  }

  createCell(row, col) {
    const chore = getChore(row, col, this.props.boardData);
    return (
      <TouchableHighlight
        style={chore.done ? styles.buttonDone : styles.buttonUndone}
        onPress={() => Actions.choreconfig({
          updateChoreName: this.props.onChoreUpdate,
          row: row,
          col: col,
        })}
        underlayColor={'#dddddd'}
      >
      <Text style={styles.btnText}>
        {chore.name === '' ? 'Add Chore': chore.name}
      </Text>
      </TouchableHighlight>
    );
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
  boardData: React.PropTypes.object,
  boardSize: React.PropTypes.number,
  onChoreUpdate: React.PropTypes.func,
  playerName: React.PropTypes.string,
};

export default BingoBoard;
