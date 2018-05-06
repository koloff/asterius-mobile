import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Animated} from 'react-native';
import {observer} from 'mobx-react';
import {gs} from "../../globals";
import authStore from '../../store/authStore';

import ElevatedView from '../ElevatedView';

@observer
export default class Welcome extends React.Component {
  render() {
    return (
      <Animated.View style={[styles.wrapper,
        {
          opacity: this.props.opacity || 1,
          zIndex: this.props.isActive ? 200 : 1
        }]}>
        <TouchableOpacity
          style={{
            borderRadius: 5,
            paddingLeft: 20,
            paddingRight: 20
          }}
          onPress={() => {
            this.props.onTransition && this.props.onTransition('Generate');
            authStore.loginAnonymously();
          }}>
          <ElevatedView elevation={3} style={{
            padding: 6,
            borderRadius: 5,
            width: 315,
            backgroundColor: 'rgba(245,127,23 , 1)'
          }}>
            <Text style={[gs.text, {
              fontSize: 23,
              textAlign: 'center',
              textShadowColor: 'rgba(0,0,0,0.5)',
              textShadowRadius: 7,
              textShadowOffset: {width: 1, height: 1}
            }]}>
              START
            </Text>
          </ElevatedView>
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

      </Animated.View>
    )
  }
}
const styles = StyleSheet.create({
  wrapper: {
    padding: 20,
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  }
});