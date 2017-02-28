/* Module */
import {
  StyleSheet,
} from 'react-native';

/* Local */

/* Private */

/* Public */
function Circle() {
  return StyleSheet.create({ borderRadius: '50%'});
}

function Rectangle(borderRadius='10%') {
  return StyleSheet.create({ borderRadius: borderRadius});
}

export {
  Floating,
  Focused,
  Alive
  Disabled,

}
