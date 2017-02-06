import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import {
  Actions,
} from 'react-native-router-flux';

import GlobalStyles from '../../styles/GlobalStyles';

class Winner extends React.Component {

  winnerString() {
    return 'Player 1 is the winner';
  }

  render() {
    return (
      <View style={GlobalStyles.container}>
        <View style={GlobalStyles.boxContainer}>
          <Text style={GlobalStyles.h1}>
            We have a winner!
          </Text>
        </View>
        <View style={[GlobalStyles.boxContainer]}>
          <Text style={GlobalStyles.h3}>
            {this.winnerString()}
          </Text>
        </View>
        <View style={GlobalStyles.bottomBar}>
          <TouchableOpacity
            onPress={() => {
              Actions.home();
            }}
          >
            <Text style={GlobalStyles.h2}>
              Play Again
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Winner;
