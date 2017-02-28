import {
  Platform,
} from 'react-native';

/* Palette URL: http://paletton.com/#uid=24V0u0kllll6zv1dXqbsJgvHnbE */
const Primary = {
  lightest: '#A080A1',
  light: '#864D88',
  main: '#6C256F',
  dark: '#530956',
  darkest: '#3A003C',
}

/* Palette URL: http://paletton.com/#uid=24V0u0kllll6zv1dXqbsJgvHnbE */
const Secondary = {
  lightest: '#E7EFBE',
  light: '#BCCA72',
  main: '#93A537',
  dark: '#6D7F0D',
  darkest: '#4B5A00',
}

/* https://www.viget.com/articles/color-contrast */
const Utility = {
  light: '#F5F5F5',
  dark: '#1A1A1A',
}

/*
text sizing: http://typecast.com/blog/a-more-modern-scale-for-web-typography
font for IOS: http://iosfonts.com/
available RN fonts: https://medium.com/react-native-training/list-of-available-react-native-fonts-ed78b48bd45e#.xawsn33qp
*/

const TextColor = {
  normal: '#373D3F',
  grayedOut: '#A7B0B2',
  inverse:'#C8C2C0',
}
const TextFormat = {
  fontFamily: Platform.OS === 'ios' ? 'Arial' : 'sans-serif',
  body: 16,
  h1: 32,
  h2: 26,
  h3: 22,
  h4: 18,
}

export {
  Primary,
  Secondary,
  Utility,
  TextColor,
  TextFormat,
}
