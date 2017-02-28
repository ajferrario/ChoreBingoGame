/* Module */
import _ from 'lodash';
import {
  StyleSheet,
} from 'react-native';

/* Local */
import {
  Utility,
} from './StyleGuide';

/* Private */
function _structure(flex, backgroundColor, flexDirection) {
  /*
  Prototype structural style used to build other structural styles
  */
  const style = {
    flex: flex,
    backgroundColor: backgroundColor,
  }
  return _.merge(style, _direction(flexDirection));
}

function _direction(flexDirection) {
  /*
  Provide orientation independent logical default settings
  */
  const directionSettings = {
    flexDirection: flexDirection,
    justifyContent: 'stretch',
    alignItems: 'stretch',
  };
  if ( flexDirection === 'column' ) {
    directionSettings.justifyContent = 'flex-start';
  } else if (flexDirection === 'row') {
    directionSettings.alignItems = 'flex-start';
  }
  return directionSettings;
}

function _align(orientation, align) {
  /*
  Provide an orientation independent logical alignment setting
  */
  const propName = (orientation === 'row'? 'justifyContent' : 'alignItems');
  const alignment = {};
  switch ( align ) {
    case 'left':
      alignment[propName] = 'flex-start';
      break;
    case 'right':
      alignment[propName] = 'flex-end';
      break;
    case 'center':
      alignment[propName] = 'center';
      break;
    default:
      alignment[propName] = 'stretch';
  }
  return alignment;
}

/* Public */
function Screen(backgroundColor=Utility.light,flexDirection='column') {
  /*
  Flexible View style intended for the highest level view of any scene.

  The best practice for this style is to make sure that it occupies all the
  screen and provides the background color for the application while it's scene
  is active.

  This style should NEVER contain anything but other view objects since it will
  not react properly to shaping.
   */
  return StyleSheet.create(_structure(1, backgroundColor, flexDirection));
}

function Column(flex=1, backgroundColor='transparent', align='center') {
  /*
  Flexible View style intended as a vertical subdivision of a scene.
  */
  const style = _structure(flex, backgroundColor, 'column');
  return StyleSheet.create(_.merge(style, _align('column', align)));
}

function Row(flex=1, backgroundColor='transparent', align='center') {
  /*
  Flexible View style intended as a horizontal subdivision of a scene
  */
  const style = _structure(flex, backgroundColor, 'row');
  return StyleSheet.create(_.merge(style, _align('row', align)));
}

function Container(flex=1, backgroundColor='transparent', align='center') {
  /*
  Flexible View style intended as a container for a single component
  */
  const style = _structure(flex, backgroundColor, 'center');
  return StyleSheet.create(_.merge(style, _align('center', align)));
}

export {
  Screen,
  Column,
  Row,
  Container,
};
