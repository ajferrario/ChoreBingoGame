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
  constructor (props) {
    super(props)
  }
  titleText() {
    if (this.props.winners.length > 1) {
      return 'We have multiple winners!'
    } else {
      return 'We have a winner!'
    }
  }
  winnerText() {
    let winners = [];
    this.props.winners.forEach((winner, index) => {
      let ref = winner.name;
      if ( ref === '' ) {
        ref = 'Player '.concat(winner.playerID);
      }
      winners.push(
        <View style={[GlobalStyles.listItem,this.colorStyle('grey')]} key={index}>
          <Text style={GlobalStyles.h3}>
            {ref.concat(' is the winner')}
          </Text>
        </View>
      )
    })
    return winners;
  }

  colorStyle(color) {
    return {
      borderWidth: 2,
      borderColor: color,
    };
  }

  render() {
    return (
      <View style={[GlobalStyles.container,this.colorStyle('blue')]}>
        <View style={[GlobalStyles.boxContainer,this.colorStyle('red')]}>
          <Text style={GlobalStyles.h1}>
            {this.titleText()}
          </Text>
        </View>
        <View style={[GlobalStyles.boxContainer,this.colorStyle('green')]}>
          {this.winnerText()}
        </View>
        <View style={[GlobalStyles.bottomBar,this.colorStyle('purple')]}>
          <View style={[GlobalStyles.listItem,this.colorStyle('yellow')]}>
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
      </View>
    );
  }
}

Winner.propTypes = {
  winners: React.PropTypes.array,
}
export default Winner;
