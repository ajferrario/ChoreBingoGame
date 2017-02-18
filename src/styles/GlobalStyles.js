import {
  StyleSheet,
} from 'react-native';


const GlobalStyles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  boxContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  bottomBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  button: {
    backgroundColor: 'deepskyblue',
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'deepskyblue',
    margin: 2,
  },
  nameInput: {
    height: 40,
    borderWidth: 2,
    borderColor: 'black',
  },
  buttonText: {
    marginLeft: 20,
    fontSize: 20,
  },
  h1: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  h2: {
    fontSize: 25,
    textAlign: 'center',
  },
  h3: {
    fontSize: 20,
    textAlign: 'center',
  },
  body: {
    fontSize: 14,
    textAlign: 'center',
  },
  listItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default GlobalStyles;
