import React from 'react';

import {
  View,
} from 'react-native';

import {
  Container,
  Header,
  Content,
  Footer,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  FooterTab,
  Text,
  Grid,
  Row,
  H1,
} from 'native-base';

import {
  Actions,
} from 'react-native-router-flux';

import {
  ScreenStyle,
  ColumnStyle,
  RowStyle,
  ContainerStyle,
} from '../../styles/Structure';

import {
  Scaffold,
} from '../../styles/Dev';

import HomeData from '../../data/HomeData';

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
      <Container>
        <Header>
          <Left>
            <Button transparent>
              <Icon name='menu' />
            </Button>
          </Left>
          <Body>
            <Title>Chore Bingo</Title>
          </Body>
          <Right />
        </Header>
        <View style={ScreenStyle()}>
          <View style={Scaffold(RowStyle())}>
            <H1>Welcome To Chore Bingo!</H1>
          </View>
        </View>
        <Footer>
          <FooterTab>
            <Button full>
              <Text>Play</Text>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    );
  }
  /* render() {
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
        <View style={GlobalStyles.listItem}>
          <Text style={GlobalStyles.body}>
            Number of players
          </Text>
        </View>
        <View style={GlobalStyles.listItem}>
        </View>
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
  } */
}

export default Home;
