import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';

import {
  Actions,
} from 'react-native-router-flux';

import {
  genKey,
} from '../../logic/GameLogic';

import GlobalStyles from '../../styles/GlobalStyles';
import BingoBoard from '../../components/BingoBoard';

const styles = StyleSheet.create({
  topBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  bottomBar: {
    flex: 2,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  centralRegion: {
    flex: 8,
  },
  nameEntryBar: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  boardHolder: {
    flex: 4,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focus: {
    backgroundColor: 'grey',
  },
});

class Player extends React.Component {
  constructor(props) {
    super(props);
    console.log(this.props.playerData);
    let gameData = {};
    if (Object.keys(this.props.playerData).length === 0 && this.props.playerData.constructor === Object) {
      for (let p = 1; p <= this.props.playerCount; p++) {
        gameData[p] = this.buildNewBoard();
      }
    } else {
      gameData = this.props.playerData;
    }
    this.state = {
      currentPlayer: 1,
      boardData: gameData,
    };
  }

  buildNewBoard() {
    const board = { name: '', values: {}, winner: false, };
    for (let row = 0; row < this.props.boardSize; row++) {
      for (let col = 0; col < this.props.boardSize; col++) {
        board.values[genKey(row, col)] = {
          name: '',
          done: false,
        };
      }
    }
    return board;
  }

  updateChoreName(row, col, newName) {
    const dataStateHolder = JSON.parse(JSON.stringify(this.state.boardData));
    dataStateHolder[this.state.currentPlayer].values[genKey(row, col)].name = newName;
    this.setState({boardData: dataStateHolder});
  }

  updatePlayerName(newName) {
    const dataStateHolder = JSON.parse(JSON.stringify(this.state.boardData));
    dataStateHolder[this.state.currentPlayer].name = newName;
    this.setState({boardData: dataStateHolder});
  }

  genTopBar() {
    const buttons = [];
    for (let x = 1; x <= this.props.playerCount; x++) {
      buttons.push(
        <View
          style={[styles.button, this.state.currentPlayer === x ? styles.focus : {}]}
          key={x}
        >
          <TouchableOpacity
            onPress={() => (
                 this.setState({ currentPlayer: x })
             )}
          >
            <Text>
              {'Player '.concat(x.toString())}
            </Text>
          </TouchableOpacity>
        </View>,
      );
    }
    return buttons;
  }

  isSetupComplete() {
    for (let i = 1; i <= this.props.playerCount; i++) {
      const vals = this.state.boardData[i].values;
      for (var key in vals) {
        if (vals[key].name === '') {
          return true;
        }
      }
    }
    return false;
  }

  genBottomBar() {
    return (
      <View style={[styles.bottomBar, this.colorStyle('red')]}>
        <TouchableOpacity
          onPress={() => (
                 Actions.activechore({
                   playerData: this.state.boardData,
                   minutesPerChore: this.props.minutesPerChore,
                   winCondition: this.props.winCondition,
                 })
             )}
          disabled={false /*this.isSetupComplete()*/}
        >
          <Text style={GlobalStyles.h2}>
            Next
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  colorStyle(color) {
    return {
      borderWidth: 2,
      borderColor: color,
    };
  }

  render() {
    return (
      <View style={GlobalStyles.container}>
        <View style={[styles.topBar, this.colorStyle('blue')]}>
          {this.genTopBar()}
        </View>
        <View style={[styles.centralRegion, this.colorStyle('orange')]}>
          <View style={[styles.nameEntryBar, this.colorStyle('green')]}>
            <TextInput
              style={{ flex: 1, height: 40, borderColor: 'gray', borderWidth: 1 }}
              onChangeText={newName => this.updatePlayerName(newName)}
              placeholder="Input Name..."
              value={this.state.boardData[this.state.currentPlayer].name}
            />
          </View>
          <View style={[styles.boardHolder, this.colorStyle('pink')]}>
            <BingoBoard
              boardData={this.state.boardData[this.state.currentPlayer].values}
              boardSize={this.props.boardSize}
              onChoreUpdate={(row, col, newName) => {
                this.updateChoreName(row, col, newName);
              }}
            />
          </View>
        </View>
        {this.genBottomBar()}
      </View>
    );
  }
}
Player.defaultProps = {
  playerData: {},
}
Player.propTypes = {
  playerCount: React.PropTypes.number,
  boardSize: React.PropTypes.number,
  minutesPerChore: React.PropTypes.number,
  winCondition: React.PropTypes.string,
  playerData: React.PropTypes.object,
};

export default Player;
