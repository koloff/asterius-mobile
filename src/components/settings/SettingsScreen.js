import * as React from "react";
import {observer} from 'mobx-react';
import {Text, TouchableOpacity, View, StyleSheet, Keyboard} from 'react-native';
import {gs} from "../../globals";
import Toast from "react-native-root-toast";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import authStore from '../../store/authStore';


export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'SETTINGS',
  };

  render() {
    return (
      <View style={styles.wrapper}>
        <TouchableOpacity
          style={{
            height: 40,
            width: '100%',
            marginTop: 10,
            backgroundColor: '#FF8F00',
            padding: 4
          }}
          onPress={async () => {
            await authStore.logout();
          }}>
          <Text style={[gs.text, {color: '#333', fontSize: 21, textAlign: 'center'}]}>
            <SimpleLineIcons name='logout' size={21} color='#333'/> LOGOUT
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  }
});