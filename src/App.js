import React, {Component} from 'react';
import {
  Platform,
  StyleSheet,
  StatusBar,
  View, Text
} from 'react-native';
import Router from './Router';

import authStore from './store/authStore';
import database from './database';

export default class App extends Component {
  state = {
    isReady: false
  };

  async componentWillMount() {
    await authStore.init();
    this.setState({isReady: true});

    // SEED DATA
    database.save(`workoutsLogs/${authStore.uid}`, {
      '2018-02-10': {
        workoutTemplate: {
          name: 'Workout A',
          exercises: [
            {id: 'reversePecDeck', sets: 3},
            {id: 'highCableCrossover', sets: 3},
            {id: 'ropePushdown', sets: 77},
            {id: 'dumbbellShoulderPress', sets: 4},
            {id: 'lowCableCrossover', sets: 3},
            {id: 'dumbbellInclineBenchPress', sets: 4},
            {id: 'seatedTricepsPress', sets: 3}
          ]
        }
      },
    })

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

