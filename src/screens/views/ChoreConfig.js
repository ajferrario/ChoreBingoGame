import React, { Component } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import {
  Actions,
} from 'react-native-router-flux';

import GlobalStyles from '../../styles/GlobalStyles'
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

class ChoreConfig extends Component {
  constructor() {
    super();
    this.state = {
      name: '',
    }
  }

  render() {
    return (
      <View style={GlobalStyles.container}>
        <View style={styles.nameEntryBar}>
          <TextInput
            style={{ flex: 1, height: 40, borderColor: 'gray', borderWidth: 1 }}
            onChangeText={newName => this.setState({name: newName,})}
            placeholder="Input Name..."
            value={this.state.name}
          />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => {
              this.props.updateChoreName(this.props.row, this.props.col, this.state.name);
              Actions.pop();
            }}
          >
          <Text style={GlobalStyles.h2}>
            Save and Return
          </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

ChoreConfig.propTypes = {
  updateChoreName: React.PropTypes.func,
  choreName: React.PropTypes.string,
  row: React.PropTypes.number,
  col: React.PropTypes.number,
};

export default ChoreConfig;
