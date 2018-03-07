import * as React from "react";
import {observer} from 'mobx-react';
import {Text, TouchableOpacity, View, StyleSheet, Image} from 'react-native';
import {gs} from "../../globals";

export default class EatScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'EAT',
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <Image
          style={{
            flex: 1,
            resizeMode: 'cover',
            top: 0,
            left: 0,
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
          source={require('../../assets/bg1.jpg')}
        />

        <Text style={[gs.text]}>PROGRESS</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  }
});