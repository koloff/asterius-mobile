import React, {Component} from 'react';
import {
  StyleSheet,
  StatusBar,
  View, YellowBox, SafeAreaView
} from 'react-native';
import Router from './Router';

import authStore from './store/authStore';
import connectionStore from './store/connectionStore';
import userParametersStore from "./store/userParametersStore";
import subscriptionsStore from "./store/subscriptionsStore";
import TipsDemo from "./components/TipsDemo";
import TipsCircle from "./components/tips/TipsCircle";

export default class App extends Component {
  state = {
    isReady: false
  };

  async componentWillMount() {
    connectionStore.init();
    subscriptionsStore.init();
    await authStore.init();
    await userParametersStore.init();
    this.setState({isReady: true});
    // subscriptionsStore.callCloudFunction();
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
          <TipsDemo />
          <TipsCircle />
          {/*<Router/>*/}
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