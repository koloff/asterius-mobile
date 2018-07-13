import React, {Component} from 'react';
import {
  StyleSheet,
  StatusBar,
  View, SafeAreaView
} from 'react-native';
import {observer} from 'mobx-react';
import Router from './Router';

import SplashScreen from 'react-native-splash-screen';

import authStore from './store/authStore';
import connectionStore from './store/connectionStore';
import userParametersStore from "./store/userParametersStore";
import subscriptionsStore from "./store/subscriptionsStore";
import TipsCircle from "./components/tips/TipsCircle";
import TipsWindow from "./components/tips/TipsWindow";

@observer
export default class App extends Component {
  state = {
    isReady: false
  };

  async componentWillMount() {
    connectionStore.init();
    // subscriptionsStore.init();
    await authStore.init();
    await userParametersStore.init();
    this.setState({isReady: true});
    SplashScreen.hide();
    // subscriptionsStore.callCloudFunction();
  }

  render() {
    if (!this.state.isReady) {
      return <View/>;
    }
    return (
      <View style={styles.container}>
        <SafeAreaView style={{flex: 1}}>
          <StatusBar
            backgroundColor="#000"
            barStyle="light-content"
          />
          {/*<TipsDemo />*/}
          <Router/>
          <TipsCircle/>
          <TipsWindow/>
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