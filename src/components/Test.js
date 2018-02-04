import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';

import RadioButtons from './RadioButtons';
import {gs} from "../globals";

export default class Container extends React.Component {

  render() {
    return (


      <View style={styles.container}>

        <Image
          style={{
            flex: 1,
            resizeMode: 'cover',
            position: 'absolute',
            zIndex: 999,
            width: '100%',
            height: '100%',
          }}
          source={require('../assets/bg3.jpg')}
        >

        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101010'
  },
  optionStyle: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
