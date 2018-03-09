import * as React from "react";
import {observer} from 'mobx-react';
import {Text, TouchableOpacity, View, Animated, Keyboard} from 'react-native';
import {gs} from "../../globals";
import Toast from "react-native-root-toast";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import authStore from '../../store/authStore';


export default class SettingsScreen extends React.Component {
  state = {
    opacity: new Animated.Value(0)
  };

  componentDidMount() {
    Animated.timing(this.state.opacity, {toValue: 1, useNativeDriver: true, duration: 333}).start();
  }

  render() {
    return (
      <Animated.View style={{opacity: this.state.opacity, flex: 1, justifyContent: 'center'}}>
        <TouchableOpacity
          style={{
            width: '100%',
            marginTop: 10,
            padding: 4
          }}
          onPress={async () => {
            await authStore.logout();
          }}>
          <Text style={[gs.text, gs.shadow, {color: '#fff', fontSize: 31, textAlign: 'center'}]}>
            <SimpleLineIcons name='logout' size={31} color='#fff'/> Logout
          </Text>
        </TouchableOpacity>
      </Animated.View>
    )
  }
}
