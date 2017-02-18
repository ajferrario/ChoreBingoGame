import React from 'react';

import formatTime from 'minutes-seconds-milliseconds';

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
  constructor(props) {
    super(props);
    this.state = {
      timeUsed: 0,
      timerRunning: false,
      choreComplete: false,
      playerData: this.props.playerData,
      previousTime: null,
      chosenChores: this.getActiveChores(),
    }
  }

  resetState() {
    this.setState({
      timeUsed: 0,
      timerRunning: false,
      choreComplete: false,
      playerData: this.props.playerData,
      previousTime: null,
    })
  }

  colorStyle(color) {
    return {
      borderWidth: 2,
      borderColor: color,
    };
  }

  randomChore(choreObj) {
    const chores = Object.keys(choreObj);
    return choreObj[chores[ chores.length * Math.random() << 0]]
  }

  getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  getActiveChores () {
    // Select Chores
    console.log(this.props.playerData);
    const playerCount = Object.keys(this.props.playerData).length;
    const chosenChores = [];
    for (let p = 1; p <= playerCount; p++) {
      const choresToChoose = [];
      const allKeys = Object.keys(this.props.playerData[p].values);
      allKeys.forEach((key) => {
        if (this.props.playerData[p].values[key].done === false) {
          const choreName = this.props.playerData[p].values[key].name;
          choresToChoose.push({
            key: key,
            name: choreName === '' ? 'Your Choice!' : choreName,
          });
        }
      });
      const randomIndex = this.getRandomIntInclusive(0, choresToChoose.length - 1);
      chosenChores.push(choresToChoose[randomIndex]);
    }
    return chosenChores;
  }

  markChoresComplete() {
    const dataStateHolder = JSON.parse(JSON.stringify(this.state.playerData));
    for (let p = 1; p <= this.state.chosenChores.length; p++) {
      dataStateHolder[p].values[this.state.chosenChores[p-1].key].done = true;
    }
    return dataStateHolder;
  }

  startStopNextText() {
    if (!this.state.timerRunning) {
      return 'Start';
    } else if (!this.state.choreComplete) {
      return 'Stop';
    } else {
      return 'Next';
    }
  }

  startStopNextPress() {
    if (this.state.choreComplete) {
      Actions.player({
        playerCount: Object.keys(this.state.playerData).length,
        boardSize: Math.sqrt(Object.keys(this.state.playerData[1].values).length),
        minutesPerChore: this.props.minutesPerChore,
        winCondition: this.props.winCondition,
        playerData: this.markChoresComplete(),
      })
    } else {
      if (this.state.timerRunning === false) {
        this.setState({
          timerRunning: !this.state.timerRunning,
          previousTime: new Date(),
        })
        this.interval = setInterval(() => {
          const timeNow = new Date();
          if (this.state.timeUsed >= (this.props.minutesPerChore * 60 * 1000))
          {
            this.setState({
              timeUsed: (this.props.minutesPerChore * 60 * 1000),
              previousTime: timeNow,
              choreComplete: true,
            })
            clearInterval(this.interval);
            alert('Chore time is up!')
          } else {
            this.setState({
              timeUsed: this.state.timeUsed + (timeNow - this.state.previousTime),
              previousTime: timeNow,
            })
          }
        }, 30);
      } else {
        clearInterval(this.interval);
        this.setState({timerRunning: !this.state.timerRunning});
      }

    }
  }

  timeDisplay() {
    return formatTime((this.props.minutesPerChore * 60 * 1000) - this.state.timeUsed);
  }

  render() {
    return (
      <View style={GlobalStyles.container}>
        <View style={[styles.topBar, this.colorStyle('blue')]}>
        <View style={styles.timerText}>
          <Text>
            {this.timeDisplay()}
          </Text>
        </View>
        </View>
        <View style={[styles.centralRegion, this.colorStyle('orange')]}>
          {this.state.chosenChores.map((chore, index) =>
            <View style={styles.choreBar} key={index}>
              <View style={styles.chorePlayer}>
                <Text style={GlobalStyles.h2}>
                  {this.state.playerData[index+1].name != '' ?
                   this.state.playerData[index+1].name :
                   'Player '.concat((index + 1).toString())}
                </Text>
              </View>
              <View style={styles.choreName}>
                <Text style={GlobalStyles.body}>
                  {chore.name}
                </Text>
              </View>
            </View>
          )}
        </View>
        <View style={[styles.bottomBar, this.colorStyle('red')]}>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => {this.startStopNextPress()} }
            >
            <Text>
              {this.startStopNextText()}
            </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.button}>
            <TouchableOpacity
              onPress={() => {this.resetState()} }
            >
            <Text>
              Reset
            </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

ActiveChore.propTypes = {
  playerData: React.PropTypes.object,
  minutesPerChore: React.PropTypes.number,
  winCondition: React.PropTypes.string,
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
  timerText: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  focus: {
    backgroundColor: 'grey',
  },
  choreBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  chorePlayer: {
    flex: 1,
  },
  choreName: {
    flex: 3,
  }
});

export default ActiveChore;
