import React, {Component} from 'react';
import {
  StyleSheet,
  StatusBar,
  View, YellowBox, SafeAreaView
} from 'react-native';
import SplashScreen from 'react-native-splash-screen';
import Router from './Router';

import authStore from './store/authStore';
import connectionStore from './store/connectionStore';
import userParametersStore from "./store/userParametersStore";
import firebase from 'react-native-firebase';

export default class App extends Component {
  state = {
    isReady: false
  };

  async componentWillMount() {
    await connectionStore.init();
    await authStore.init();
    await userParametersStore.init();
    this.setState({isReady: true});
    SplashScreen.hide();
  }

  render() {
    if (!this.state.isReady) {
      return <View style={[styles.container, {backgroundColor: '#fff'}]}/>
    }
    return (
      <View style={styles.container}>
        <SafeAreaView style={{flex: 1}}>
          <StatusBar
            backgroundColor="#000"
            barStyle="light-content"
          />
          <Router/>
        </SafeAreaView>
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