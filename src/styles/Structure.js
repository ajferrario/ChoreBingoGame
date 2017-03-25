/* Module */
import _ from 'lodash';

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
    justifyContent: 'space-around',
    alignItems: 'stretch',
  };
  if ( flexDirection === 'column' ) {
    directionSettings.justifyContent = 'flex-start';
  } else if (flexDirection === 'row') {
    directionSettings.alignItems = 'flex-start';
  }
  return directionSettings;
}

function _align(orientation, vAlign, hAlign) {
  /*
  Provide an orientation independent logical alignment setting
  Acceptable values
  SECONDARY AXIS alignItems = ['flex-start', 'flex-end', 'center', 'stretch']
  PRIMARY AXIS justifyContent = ['flex-start', 'flex-end', 'center', 'space-around']
  */
  const alignment = {};
  const vProp = (orientation === 'row'? 'justifyContent' : 'alignItems');
  const hProp = (orientation === 'row'? 'alignItems' : 'justifyContent');

  switch ( vAlign ) {
    case 'left':
      alignment[vProp] = 'flex-start';
      break;
    case 'right':
      alignment[vProp] = 'flex-end';
      break;
    case 'center':
      alignment[vProp] = 'center';
      break;
    default:
      if ( vProp === 'alignItems') {
        alignment[vProp] = 'stretch';
      } else {
        alignment[vProp] = 'space-around';
      }
  }

  switch ( hAlign ) {
    case 'left':
      alignment[hProp] = 'flex-start';
      break;
    case 'right':
      alignment[hProp] = 'flex-end';
      break;
    case 'center':
      alignment[hProp] = 'center';
      break;
    default:
    if ( hProp === 'alignItems') {
      alignment[hProp] = 'stretch';
    } else {
      alignment[hProp] = 'space-around';
    }
  }
  return alignment;
}

/* Public */
function ScreenStyle(backgroundColor='transparent',flexDirection='column') {
  /*
  Flexible View style intended for the highest level view of any scene.

  The best practice for this style is to make sure that it occupies all the
  screen and provides the background color for the application while it's scene
  is active.

  This style should NEVER contain anything but other view objects since it will
  not react properly to shaping.
   */
  return _structure(1, backgroundColor, flexDirection);
}

function ColumnStyle(flex=1, backgroundColor='transparent', hAlign='center', vAlign='flex-start') {
  /*
  Flexible View style intended as a vertical subdivision of a scene.
  */
  const style = _structure(flex, backgroundColor, 'column');
  return _.merge(style, _align('column', hAlign, vAlign), );
}

function RowStyle(flex=1, backgroundColor='transparent', hAlign='flex-start', vAlign='center') {
  /*
  Flexible View style intended as a horizontal subdivision of a scene
  */
  const style = _structure(flex, backgroundColor, 'row');
  return _.merge(style, _align('row', hAlign, vAlign));
}

function ContainerStyle(flex=1, backgroundColor='transparent', hAlign='center', vAlign='center') {
  /*
  Flexible View style intended as a container for a single component
  */
  const style = _structure(flex, backgroundColor, 'column');
  return _.merge(style, _align('column', hAlign, vAlign));
}

export {
  ScreenStyle,
  ColumnStyle,
  RowStyle,
  ContainerStyle,
};
