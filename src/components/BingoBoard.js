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

//import ChoreConfigPopup from '../components/ChoreConfigPopup';

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
    const chore = getChore(row, col, this.props.boardData);
    return (
          <Text style={styles.btnText}>
            {chore.name === '' ? 'Add Chore': chore.name}
          </Text>
    );
  }

  chorePopup(row, col) {
    alert('This is where the chore');
    this.props.onChoreUpdate(row, col, 'Potato');
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
};

export default BingoBoard;
