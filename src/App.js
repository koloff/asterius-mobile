import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  StatusBar,
  View, Text
} from 'react-native';
import Router from './Router';

import authStore from './store/authStore';

export default class App extends Component {
  state = {
    isReady: false
  };

  async componentWillMount() {
    await authStore.init();
    this.setState({isReady: true});
  }

  render() {

    if (!this.state.isReady) {
      return <View></View>
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

