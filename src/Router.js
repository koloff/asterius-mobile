import * as React from "react";
import {observer} from 'mobx-react';
import {Image, View, Text, TouchableOpacity} from "react-native";

import authStore from './store/authStore';
import {StackNavigator, TabBarBottom, TabNavigator, withNavigation} from 'react-navigation';

import Start from './components/start/Start';
import Tweaker from './components/tweaker/Tweaker';
import WorkoutLog from './components/logs/WorkoutLog';
import WorkoutsScreen from './components/workouts/WorkoutsScreen';
import WeightScreen from "./components/weight/WeightScreen";
import EatScreen from "./components/eat/EatScreen";
import SettingsScreen from "./components/settings/SettingsScreen";
import GenerateStack from './components/generate/GenerateStack';
import Principles from './components/principles/Principles';
import DarkModal from './components/DarkModal';

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {gs} from "./globals";

const MainTabNavigator = TabNavigator({
  Workouts: {screen: WorkoutsScreen},
  Weight: {screen: WeightScreen},
  Eat: {screen: EatScreen},
  Settings: {screen: SettingsScreen},
}, {
  navigationOptions: ({navigation}) => ({
    tabBarIcon: ({focused}) => {
      const {routeName} = navigation.state;
      let iconName;
      switch (routeName) {
        case 'Workouts':
          return <MaterialCommunityIcons
            name={'dumbbell'}
            size={focused ? 26 : 20}
            style={{marginBottom: -1}}
            color={focused ? '#ccc' : '#555'}
          />;
        case 'Weight':
          return <MaterialCommunityIcons
            name={'scale-bathroom'}
            size={focused ? 27 : 20}
            style={{marginBottom: -1}}
            color={focused ? '#ccc' : '#555'}
          />;
        case 'Eat':
          return <MaterialCommunityIcons
            name={'food-fork-drink'}
            size={focused ? 27 : 20}
            style={{marginBottom: -1}}
            color={focused ? '#ccc' : '#555'}
          />;
        case 'Settings':
          return <MaterialCommunityIcons
            name={'account-settings-variant'}
            size={focused ? 27 : 20}
            style={{marginBottom: -1}}
            color={focused ? '#ccc' : '#555'}
          />;
      }

    },
  }),
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  animationEnabled: false,
  tabBarOptions: {
    showLabel: false,
    activeTintColor: 'white',
    inactiveTintColor: '#555',
    activeBackgroundColor: '#000',
    tabStyle: {
      padding: 0,
      borderWidth: 0,
      margin: 0,
    },
    indicatorStyle: {
      height: 0,
      margin: 0,
      padding: 0
    },
    style: {
      padding: 0,
      borderWidth: 0,
      margin: 0,
      backgroundColor: '#000'
    }
  },
});

class MainTabNavigatorWithBackground extends React.Component {
  render() {
    return <View style={{flex: 1}}>
      <Image
        style={{
          flex: 1,
          resizeMode: 'cover',
          position: 'absolute',
          width: '100%',
          height: '100%',
        }}
        source={require('./assets/bg1.jpg')}
      />
      <View style={{
        opacity: 0.5,
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: '#000'
      }}/>
      <MainTabNavigator navigation={this.props.navigation}/>
      {authStore.newUser && <NewUserModal navigation={this.props.navigation}/>}
    </View>;
  }
}

MainTabNavigatorWithBackground.router = MainTabNavigator.router;
const MainNavigator = StackNavigator({
  Main: {screen: MainTabNavigatorWithBackground},
  Principles: {
    screen: Principles
  },
  WorkoutLog: {
    screen: WorkoutLog,
    path: 'log/:workoutLogDateStr'
  },
  Tweaker: {
    screen: Tweaker,
    path: 'tweaker/:workoutTemplateStore'
  },
  Generate: {
    screen: GenerateStack
  },
}, {
  headerMode: 'none',
  cardStyle: {
    backgroundColor: '#0c0c0c',
  }
});


const StartNavigator = StackNavigator({
  Start: {screen: Start},
  Tweaker: {
    screen: Tweaker,
    path: 'tweaker/:workoutTemplateStore'
  }
}, {
  headerMode: 'none',
  cardStyle: {
    backgroundColor: '#101010',
  }
});

@observer
export default class Router extends React.Component {
  render() {
    if (!authStore.logged) {
      return <StartNavigator/>
    } else {
      return <MainNavigator/>;m
    }
  }
}

class NewUserModal extends React.Component {
  state = {
    modalVisible: false
  };

  componentDidMount() {
    setTimeout(() => {
      this.setState({modalVisible: true});
    }, 1000)
  }

  render() {
    return <DarkModal
      modalVisible={this.state.modalVisible}
      onModalClose={() => {
        this.setState({modalVisible: false})
      }}
    >
      <Text style={[gs.text, gs.shadow, {fontSize: 14, textAlign: 'center', color: '#999'}]}>
        Read the training principles?
      </Text>
      <TouchableOpacity
        style={{padding: 10}}
        onPress={() => {
          this.setState({modalVisible: false});
          this.props.navigation.navigate('Principles');
        }}>
        <Text style={[gs.text, gs.shadow, {fontSize: 20, textAlign: 'center', color: '#ccc'}]}>
          <MaterialCommunityIcons size={20} name={'dumbbell'}/>
          &nbsp; SHOW ME
        </Text>
      </TouchableOpacity>
    </DarkModal>
  }
}
