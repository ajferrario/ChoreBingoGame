/* Module */
import {
  StyleSheet,
} from 'react-native';

/* Local */
import {
  TextFormat,
  TextColor,
} from './StyleGuide';

/* Private */
function _text(color, fontSize, weight, style, decorationLine) {
  return {
    color: color,
    fontSize: fontSize,
    fontFamily: TextFormat.fontFamily,
    textAlign: 'center',
    fontWeight: weight,
    fontStyle: style,
    textDecorationLine: decorationLine,
  };
}

/* Public */
function H1(color=TextColor.normal, weight='normal', style='normal', decorationLine='none') {
  return StyleSheet.create(_text(TextFormat.h1, weight, style, decorationLine));
}

function H2(color=TextColor.normal, weight='normal', style='normal', decorationLine='none') {
  return StyleSheet.create(_text(TextFormat.h2, weight, style, decorationLine));
}

function H3(color=TextColor.normal, weight='normal', style='normal', decorationLine='none') {
  return StyleSheet.create(_text(TextFormat.h3, weight, style, decorationLine));
}

function H4(color=TextColor.normal, weight='normal', style='normal', decorationLine='none') {
  return StyleSheet.create(_text(TextFormat.h4, weight, style, decorationLine));
}

function Body(color=TextColor.normal, weight='normal', style='normal', decorationLine='none') {
  return StyleSheet.create(_text(TextFormat.body, weight, style, decorationLine));
}

export {
  H1,
  H2,
  H3,
  H4,
  Body,
}
