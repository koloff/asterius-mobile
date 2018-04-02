import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  StatusBar,
  View, Text, YellowBox
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Router from './Router';

import authStore from './store/authStore';
import database from './database';
import userParametersStore from "./store/userParametersStore";


export default class App extends Component {
  state = {
    isReady: false
  };

  async componentWillMount() {
    await authStore.init();
    await userParametersStore.init();
    this.setState({isReady: true});
    SplashScreen.hide();
  }

  render() {
    if (!this.state.isReady) {
      return <View style={styles.container}/>
    }
    return (
      <View style={styles.container}>
        <StatusBar
          backgroundColor="#000"
          barStyle="light-content"
        />
        <Router/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000'
  }
});