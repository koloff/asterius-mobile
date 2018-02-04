import {StyleSheet, Dimensions} from 'react-native';

// GT - Global Theme
export let gt = {
  darkBg: '#263238',
  lightBg: '#CFD8DC',
  lightText: '#ECEFF1'
};

// GS - Global Styles
export let gs = StyleSheet.create({
  darkBg: {
    backgroundColor: gt.darkBg
  },

  text: {
    color: '#fff',
    fontFamily: 'Montserrat-Regular'
  },

  shadow: {
    textShadowColor: 'rgba(0,0,0,0.5)',
    textShadowRadius: 7,
    textShadowOffset: {width: 1, height: 1}
  },

  mainButton: {
    width: 100
  }
});