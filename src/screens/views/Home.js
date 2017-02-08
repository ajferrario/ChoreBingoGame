import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import ModalDropdown from 'react-native-modal-dropdown';
// import BottomBar from '../../components/BottomBar';

import {
  Actions,
} from 'react-native-router-flux';

import GlobalStyles from '../../styles/GlobalStyles';
import HomeData from '../../data/HomeData';

const styles = StyleSheet.create({
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      players: 1,
      boardSize: 3,
      minutesPerChore: 7,
      winCondition: 'Diagonal',
    };
  }

  render() {
    return (
      <View style={GlobalStyles.container}>
        <View style={GlobalStyles.boxContainer}>
          <Text style={GlobalStyles.h1}>
            Welcome To Chore Bingo!
          </Text>
        </View>
        <View style={[GlobalStyles.boxContainer]}>
          <Text style={GlobalStyles.h3}>
            Please select the following
          </Text>
        </View>
        <View style={GlobalStyles.boxContainer}>
          <Text style={GlobalStyles.body}>
            Number of players
          </Text>
          <ModalDropdown
            style={GlobalStyles.button}
            options={HomeData.numberOfPlayers}
            onSelect={(index, value) => this.setState({ players: Number(value) })}
          >
            <Text>
              {this.state.players.toString()}
            </Text>
          </ModalDropdown>
        </View>
        <View style={GlobalStyles.boxContainer}>
          <Text style={GlobalStyles.body}>
            Board size
          </Text>
          <ModalDropdown
            style={GlobalStyles.button}
            options={HomeData.boardSizes}
            onSelect={(index, value) => this.setState({ boardSize: Number(value.slice(0, 1)) })}
          >
            <Text>
              {this.state.boardSize.toString().concat('x').concat(this.state.boardSize.toString())}
            </Text>
          </ModalDropdown>
        </View>
        <View style={GlobalStyles.boxContainer}>
          <Text style={GlobalStyles.body}>
            Minutes per chore
          </Text>
          <ModalDropdown
            style={GlobalStyles.button}
            options={HomeData.minutesPerChore}
            onSelect={(index, value) => this.setState({ minutesPerChore: Number(value) })}
          >
            <Text>
              {this.state.minutesPerChore.toString()}
            </Text>
          </ModalDropdown>
        </View>
        <View style={GlobalStyles.boxContainer}>
          <Text style={GlobalStyles.body}>
            Win Condition
          </Text>
          <ModalDropdown
            style={GlobalStyles.button}
            options={HomeData.winConditions}
            onSelect={(index, value) => this.setState({ winCondition: value })}
          >
            <Text>
              {this.state.winCondition}
            </Text>
          </ModalDropdown>
        </View>
        <View style={styles.button}>
          <TouchableOpacity
            onPress={() => {
              Actions.player({
                playerCount: this.state.players,
                boardSize: this.state.boardSize,
                minutesPerChore: this.state.minutesPerChore,
                winCondition: this.state.winCondition,
                choreBoardData: {},
              });
            }}
          >
            <Text style={GlobalStyles.h2}>
              Next
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Home;
