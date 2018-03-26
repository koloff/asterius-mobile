import * as React from "react";
import {Text, TouchableOpacity, View, Animated, Keyboard} from 'react-native';
import {gs} from "../../globals";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import authStore from '../../store/authStore';
import {withNavigation} from 'react-navigation';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

@withNavigation
export default class SettingsScreen extends React.Component {
  state = {
    opacity: new Animated.Value(0)
  };

  componentDidMount() {
    Animated.timing(this.state.opacity, {toValue: 1, useNativeDriver: true, duration: 333}).start();
  }

  render() {
    return (
      <Animated.View style={{
        opacity: this.state.opacity,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <View>
          <TouchableOpacity
            style={{
              width: '100%',
              marginTop: 10,
              padding: 4
            }}
            onPress={async () => {
              await authStore.logout();
            }}>
            <Text style={[gs.text, gs.shadow, {color: '#fff', fontSize: 31}]}>
              <SimpleLineIcons name='logout' size={31} color='#fff'/> Logout
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: '100%',
              marginTop: 10,
              padding: 4
            }}
            onPress={async () => {
              this.props.navigation.navigate('Principles');
            }}>
            <Text style={[gs.text, gs.shadow, {color: '#fff', fontSize: 31}]}>
              <MaterialCommunityIcons size={31} name={'dumbbell'}/> Principles
            </Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    )
  }
}
