import React from 'react';
import {
  StyleSheet, View, Text, Animated, Easing, Dimensions, BackHandler,
  TouchableNativeFeedback, Image, TouchableHighlight, TouchableOpacity
} from 'react-native';
import {observer} from 'mobx-react';
import {gs} from "../../globals";
import _ from 'lodash';

import Welcome from './Welcome';
import Register from './Register';
import Generate from '../generate/Generate';
import Login from './Login';

let {height, width} = Dimensions.get('window');

@observer
export default class Start extends React.Component {
  state = {
    view: 'Welcome',

    transitions: [
      {key: 'logo', value: new Animated.Value(1)},
      {key: 'Welcome', value: new Animated.Value(1)},
      {key: 'Register', value: new Animated.Value(0)},
      {key: 'Login', value: new Animated.Value(0)},
      {key: 'Generate', value: new Animated.Value(0)},
    ],

    workoutsGenerated: false,
    workouts: []
  };

  constructor(props) {
    super(props);

    console.log('startt mounter');
  }

  componentWillMount() {

  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.goBack();
      return true;
    });
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', () => {
      return true;
    });
  }

  goBack() {
    if (this.state.view === 'Generate' || this.state.view === 'Login' || this.state.view === 'Register') {
      this.onTransition('Welcome');
    }
  }

  onTransition(view) {
    this.setState({view});


    let transitions = [];
    for (let i = 1; i < this.state.transitions.length; i++) {
      let transition = this.state.transitions[i];

      transitions.push(Animated.timing(transition.value, {
        toValue: this.state.transitions[i].key === view ? 1 : 0,
        easing: Easing.elastic(),
        duration: 500,
        useNativeDriver: true
      }).start());
    }

    transitions.push(Animated.timing(this.getTransition('logo').value, {
      toValue: view === 'Welcome' ? 1 : 0,
      easing: Easing.elastic(),
      duration: 500,
      useNativeDriver: true
    }).start());

    Animated.parallel(transitions);
  }

  getTransition(key) {
    return _.find(this.state.transitions, {key})
  }

  render() {
    this.logoScale = this.state.transitions[0].value.interpolate({
      inputRange: [0, 1],
      outputRange: [0.33, 0.5]
    });
    this.logoOpacity = this.state.transitions[0].value.interpolate({
      inputRange: [0, 1],
      outputRange: [0.7, 1]
    });

    this.translateY = this.state.transitions[0].value.interpolate({
      inputRange: [0, 1],
      outputRange: [21, (height / 2) + 130]
    });

    this.darkOpacity = this.state.transitions[0].value.interpolate({
      inputRange: [0, 1],
      outputRange: [0.6, 0]
    });

    return (
      <Animated.View style={[styles.wrapper, {backgroundColor: this.background}]}>

        <Image
          style={{
            flex: 1,
            resizeMode: 'cover',
            position: 'absolute',
            width: '100%',
            height: '100%',
          }}
          source={require('../../assets/bg1.jpg')}
        />

        <Animated.View style={{
          opacity: this.darkOpacity,
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: '#000'
        }}></Animated.View>

        <Animated.Image
          source={require('../../assets/logo.png')}
          style={[styles.logo, {
            width: 620,
            height: 72,
            transform: [{scale: this.logoScale}, {translateY: this.translateY}],
            opacity: this.logoOpacity
          }]}/>


        <Welcome
          opacity={this.getTransition('Welcome').value}
          isActive={this.state.view === 'Welcome'}
          onTransition={(view) => {
            this.onTransition(view)
          }}/>

        <Register
          goBack={this.goBack.bind(this)}
          opacity={this.getTransition('Register').value}
          isActive={this.state.view === 'Register'}
          onTransition={(view) => {
            this.onTransition(view)
          }}
        />

        <Login
          goBack={this.goBack.bind(this)}
          opacity={this.getTransition('Login').value}
          isActive={this.state.view === 'Login'}
          onTransition={(view) => {
            this.onTransition(view)
          }}
        />


        <Generate
          goBack={this.goBack.bind(this)}
          opacity={this.getTransition('Generate').value}
          isActive={this.state.view === 'Generate'}
          onTransition={(view) => {
            this.onTransition(view)
          }}
          transitionFromStart={true}
        />
      </Animated.View>
    )
  }
}


const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  logo: {
    position: 'relative',
    alignSelf: 'center',
    zIndex: 500
  }
});