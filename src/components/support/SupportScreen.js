import * as React from "react";
import {observer} from 'mobx-react';
import {Text, TouchableOpacity, View, StyleSheet} from 'react-native';
import {gs} from "../../globals";

export default class SupportScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'HELP',
  };

  render() {
    return (
      <View style={styles.wrapper}>

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