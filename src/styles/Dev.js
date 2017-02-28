import tinyColor from 'tinycolor2'

function Scaffold(style) {
  /* Used during testing and design to add colored borders to styled components */
  style.borderWidth = 2;
  style.borderColor = tinyColor.random();
  return style
}

export {
  Scaffold,
};
