import React from 'react';
import {
  StyleSheet, View, Text, Animated, TextInput, TouchableOpacity, Keyboard, ActivityIndicator, KeyboardAvoidingView
} from 'react-native';
import {observer} from 'mobx-react';
import Toast from 'react-native-root-toast';
import {gs} from "../../globals";
import FontAwesome from "react-native-vector-icons/FontAwesome";

import authStore from '../../store/authStore';
import Ionicons from "react-native-vector-icons/Ionicons";
import KeyboardPadding from "../KeyboardPadding";
import Entypo from "react-native-vector-icons/Entypo";

@observer
export default class Register extends React.Component {
  state = {
    email: '',
    password: '',
    loading: false
  };

  async registerWithEmail() {
    Keyboard.dismiss();
    this.setState({loading: true});
    try {
      let user = await authStore.register(this.state.email, this.state.password);
      console.log(user);
    } catch (error) {
      this.setState({loading: false});
      console.log(error);
      let toast = Toast.show(error.message, {
        shadow: true,
        position: -10,
        backgroundColor: 'red'
      });
    }
  }

  async registerWithFacebook() {
    try {
      this.setState({loading: true});
      await authStore.registerWithFacebook();
    } catch (err) {
      console.log(err);
      this.setState({loading: false});
      if (err.show) {
        let toast = Toast.show(err.message, {
          shadow: true,
          backgroundColor: 'red',
          position: -10,
        });
      }
    }
  }

  render() {
    return (
      <Animated.View style={[styles.wrapper, {
        zIndex: this.props.isActive ? 200 : 1,
        opacity: this.props.opacity || 1,
      }]}>

        <KeyboardPadding style={{flex: 1}}>
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
            alignItems: 'center'
          }}>

            <TextInput
              style={[gs.text, gs.shadow, {
                width: '100%',
                height: 45,
                paddingLeft: 10,
                backgroundColor: 'rgba(77,77,77, 0.6)',
                color: '#fff',
                borderRadius: 5
              }]}
              ref={(ref) => {
                this.generateEmailRef = ref
              }}
              placeholderTextColor={'#777'}
              onChangeText={(text) => this.setState({email: text})}
              placeholder={'Email'}
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
                backgroundColor: 'rgba(77,77,77, 0.6)',
                color: '#fff',
                borderRadius: 5
              }]}
              placeholderTextColor={'#777'}
              onChangeText={(text) => this.setState({password: text})}
              placeholder={'Password'}
              selectionColor={'#fff'}
              value={this.state.text}
              underlineColorAndroid={'transparent'}
              secureTextEntry={true}
            />

            {!this.state.loading ? <TouchableOpacity
                style={{
                  borderRadius: 5,
                  backgroundColor: 'rgba(245,127,23 , 1)',
                  padding: 7,
                  paddingLeft: 20,
                  paddingRight: 20,
                  width: '100%',
                  marginBottom: 21
                }}
                onPress={() => {this.registerWithEmail();}}>
                <Text style={[gs.text, {
                  fontSize: 21,
                  textAlign: 'center',
                  textShadowColor: 'rgba(0,0,0,0.5)',
                  textShadowRadius: 7,
                  textShadowOffset: {width: 1, height: 1}
                }]}>
                  <FontAwesome name='user' size={21} color='#fff'/> Register
                </Text>
              </TouchableOpacity>
              :
              <ActivityIndicator style={{marginTop: 10, padding: 4, height: 40}} size="large" color="#444"/>
            }

            <Text style={[gs.text]}>- Or -</Text>
            <TouchableOpacity
              onPress={() => {
                this.registerWithFacebook();
              }}
              style={{
                marginTop: 21,
                height: 45,
                justifyContent: 'center',
                borderRadius: 5,
                padding: 7,
                paddingLeft: 20,
                paddingRight: 20,
                width: '100%',
                backgroundColor: '#0288D1'
              }}>
              <Text style={[gs.text, {
                fontSize: 19,
                textAlign: 'center',
                textShadowColor: 'rgba(0,0,0,0.5)',
                textShadowRadius: 7,
                textShadowOffset: {width: 1, height: 1}
              }]}>
                <Entypo name='facebook' size={19} color='#fff'/> Facebook register
              </Text>
            </TouchableOpacity>


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
                  this.props.onTransition && this.props.onTransition('Login');
                }}>
                <Text style={[gs.text, {
                  color: '#fff',
                  fontSize: 25,
                  textAlign: 'center',
                  textShadowColor: 'rgba(0,0,0,0.5)',
                  textShadowRadius: 7,
                  textShadowOffset: {width: 1, height: 1}
                }]}>
                  Log in
                </Text>
              </TouchableOpacity>
            </View>

          </View>
        </KeyboardPadding>
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