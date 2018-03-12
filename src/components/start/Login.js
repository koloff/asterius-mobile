import React from 'react';
import {
  StyleSheet, View, Text, Animated, TextInput, TouchableOpacity, Keyboard, ActivityIndicator
} from 'react-native';
import {observer} from 'mobx-react';
import Toast from 'react-native-root-toast';

import {gs} from "../../globals";


import ElevatedView from "../ElevatedView";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";

import authStore from '../../store/authStore';
import Ionicons from "react-native-vector-icons/Ionicons";

@observer
export default class Login extends React.Component {
  state = {
    email: '',
    password: '',
    keyboardOpen: false,
    loading: false
  };

  componentDidMount() {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      this.setState({keyboardOpen: true})
    });
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      this.setState({keyboardOpen: false})
    });
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  render() {

    return (
      <Animated.View style={[styles.wrapper, {
        zIndex: this.props.isActive ? 200 : 1,
        opacity: this.props.opacity || 1,
      }]}>
        <View style={{
          position: 'absolute',
          padding: 25,
          zIndex: 300
        }}>
          <TouchableOpacity
            onPress={() => {
              this.props.goBack()
            }}>
            <Ionicons name={'md-close'} size={37} color={'#888'}/>
          </TouchableOpacity>
        </View>

        <View style={{
          flex: 1,
          padding: 40,
          justifyContent: 'center',
          alignItems: 'center',
          // marginBottom: this.state.keyboardOpen ? 100 : 0
        }}>

          <TextInput
            style={[gs.text, gs.shadow, {
              width: '100%',
              height: 45,
              paddingLeft: 10,
              backgroundColor: 'rgba(51,51,51, 0.4)',
              color: '#fff',
              borderRadius: 5
            }]}
            placeholderTextColor={'#777'}
            onChangeText={(text) => this.setState({email: text})}
            placeholder={'EMAIL'}
            selectionColor={'#fff'}
            value={this.state.text}
            keyboardType={'email-address'}
            underlineColorAndroid={'transparent'}
          />
          <TextInput
            style={[gs.text, gs.shadow, {
              width: '100%',
              height: 45,
              paddingLeft: 10,
              marginBottom: 14,
              marginTop: 7,
              backgroundColor: 'rgba(51,51,51, 0.4)',
              color: '#fff',
              borderRadius: 5
            }]}
            placeholderTextColor={'#777'}
            onChangeText={(text) => this.setState({password: text})}
            placeholder={'PASSWORD'}
            selectionColor={'#fff'}
            value={this.state.text}
            underlineColorAndroid={'transparent'}
            secureTextEntry={true}
          />

          {!this.state.loading ? <ElevatedView elevation={2} style={{borderRadius: 5, width: '100%',}}>
              <TouchableOpacity
                style={{
                  borderRadius: 5,
                  backgroundColor: 'rgba(245,127,23 , 1)',
                  padding: 7,
                  paddingLeft: 20,
                  paddingRight: 20
                }}
                onPress={async () => {
                  Keyboard.dismiss();
                  this.setState({loading: true});
                  try {
                    await authStore.login(this.state.email, this.state.password);
                  } catch (error) {
                    console.log(error);
                    let toast = Toast.show(error.message, {
                      shadow: true,
                      backgroundColor: 'red',
                      position: -10,
                    });
                    this.setState({loading: false});
                  }
                }}>
                <Text style={[gs.text, {
                  fontSize: 21,
                  textAlign: 'center',
                  textShadowColor: 'rgba(0,0,0,0.5)',
                  textShadowRadius: 7,
                  textShadowOffset: {width: 1, height: 1}
                }]}>
                  <SimpleLineIcons name='login' size={21} color='#fff'/> LOGIN
                </Text>
              </TouchableOpacity>
            </ElevatedView>
            :
            <ActivityIndicator style={{marginTop: 10, padding: 4, height: 40}} size="large" color="#444"/>
          }


          <View style={{
            position: 'absolute',
            bottom: 0,
            marginBottom: 10
          }}>
            <TouchableOpacity
              style={{
                borderRadius: 5,
                padding: 7,
              }}
              onPress={() => {
                authStore.loginAnonymously();
                this.props.onTransition && this.props.onTransition('Register');
              }}>
              <Text style={[gs.text, {
                color: '#fff',
                fontSize: 25,
                textAlign: 'center',
                textShadowColor: 'rgba(0,0,0,0.5)',
                textShadowRadius: 7,
                textShadowOffset: {width: 1, height: 1}
              }]}>
                Register
              </Text>
            </TouchableOpacity>
          </View>

        </View>
      </Animated.View>
    )
  }
}


const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  }
});