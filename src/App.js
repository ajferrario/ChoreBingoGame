import React from 'react';
import {
  Router,
  Scene,
} from 'react-native-router-flux';
import {
  Platform,
} from 'react-native';

import Home from './screens/views/Home';
import Player from './screens/views/Player';
import ActiveChore from './screens/views/ActiveChore';
import Winner from './screens/views/Winner';
import ChoreConfig from './screens/views/ChoreConfig';

class App extends React.Component {
  render() {
    return (
      <Router>
        <Scene key="root" style={{ paddingTop: Platform.OS === 'ios' ? 64 : 54 }}>
          <Scene key="home" component={Home} title="Chore Bingo" />
          <Scene key="player" component={Player} title="Player" />
          <Scene key="activechore" component={ActiveChore} title="ActiveChore" />
          <Scene key="winner" component={Winner} title="Winner" />
          <scene key="choreconfig" component={ChoreConfig}/>
        </Scene>
      </Router>
    );
  }
}

export default App;
