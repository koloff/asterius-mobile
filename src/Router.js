import * as React from "react";
import {observer} from 'mobx-react';

import authStore from './store/authStore';
import {StackNavigator, TabBarBottom, TabNavigator} from 'react-navigation';

import Start from './components/start/Start';
import Tweaker from './components/tweaker/Tweaker';
import Log from './components/logs/Log';
import WorkoutsScreen from './components/workouts/WorkoutsScreen';
import ProgressScreen from "./components/progress/ProgressScreen";
import EatScreen from "./components/eat/EatScreen";
import SettingsScreen from "./components/settings/SettingsScreen";
import GenerateStack from './components/generate/GenerateStack';

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


const MainTabNavigator = TabNavigator({
  Workouts: {screen: WorkoutsScreen},
  Progress: {screen: ProgressScreen},
  Eat: {screen: EatScreen},
  // Support: {screen: SupportScreen},
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
        case 'Progress':
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

const MainNavigator = StackNavigator({
  Log: {
    screen: Log,
    path: 'log/:workoutLogDateStr'
  },
  Main: {screen: MainTabNavigator},
  Tweaker: {
    screen: Tweaker,
    path: 'tweaker/:workoutTemplateStore'
  },
  Generate: {
    screen: GenerateStack
  }
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
      return <MainNavigator/>;
    }
  }
}
