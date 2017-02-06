import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';

import {
  Actions,
} from 'react-native-router-flux';

import GlobalStyles from '../../styles/GlobalStyles';

class ActiveChore extends React.Component {
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
          <Text style={GlobalStyles.h1}>
            7:00
          </Text>
        </View>
        <View style={[styles.centralRegion, this.colorStyle('orange')]} />
        <View style={[styles.bottomBar, this.colorStyle('red')]}>
          <TouchableOpacity
            onPress={() => (
                     Actions.player()
                 )}
          >
            <Text>
            Next
          </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  topBar: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'stretch',
  },
  bottomBar: {
    flex: 2,
    flexDirection: 'row',
  },
  centralRegion: {
    flex: 6,
  },
  nameEntryBar: {
    flex: 1,
    flexDirection: 'row',
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

export default ActiveChore;
