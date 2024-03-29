import * as React from "react";
import {observer} from 'mobx-react';
import {Image, View} from "react-native";

import {StackNavigator, TabBarBottom, TabNavigator,} from 'react-navigation';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";


import authStore from './store/authStore';
import connectionStore from "./store/connectionStore";
import subscriptionsStore from "./store/subscriptionsStore";

import Start from './components/start/Start';
import Tweaker from './components/tweaker/Tweaker';
import WorkoutLog from './components/logs/WorkoutLog';
import WorkoutsScreen from './components/workouts/WorkoutsScreen';
import WeightScreen from "./components/weight/WeightScreen";
import EatScreen from "./components/eat/EatScreen";
import SettingsScreen from "./components/settings/SettingsScreen";
import GenerateStack from './components/generate/GenerateStack';
import Principles from './components/principles/Principles';
import PremiumScreen from './components/settings/PremiumScreen';
import OfflineModal from "./components/modals/OfflineModal";
import tipsStore from "./store/tipsStore";

const MainTabNavigator = TabNavigator({
  Workouts: {screen: WorkoutsScreen},
  Weight: {screen: WeightScreen},
  Eat: {screen: EatScreen},
  Settings: {screen: SettingsScreen},
}, {
  navigationOptions: ({navigation}) => ({
    tabBarIcon: ({focused}) => {
      const {routeName} = navigation.state;
      switch (routeName) {
        case 'Workouts':
          return <MaterialCommunityIcons
            name={'dumbbell'}
            size={focused ? 26 : 20}
            color={focused ? '#ccc' : '#555'}
            style={{
              width: 55,
              textAlign: 'center'
            }}
          />;
        case 'Weight':
          return <MaterialCommunityIcons
            name={'scale-bathroom'}
            size={focused ? 27 : 20}
            color={focused ? '#ccc' : '#555'}
            style={{
              width: 55,
              textAlign: 'center'
            }}
          />;
        case 'Eat':
          return <MaterialCommunityIcons
            name={'food-fork-drink'}
            size={focused ? 27 : 20}
            color={focused ? '#ccc' : '#555'}
            style={{
              width: 55,
              textAlign: 'center'
            }}
          />;
        case 'Settings':
          return <MaterialCommunityIcons
            name={'account-settings-variant'}
            size={focused ? 27 : 20}
            color={focused ? '#ccc' : '#555'}
            style={{
              width: 55,
              textAlign: 'center'
            }}
          />;
      }

    },
  }),
  tabBarComponent: TabBarBottom,
  tabBarPosition: 'bottom',
  animationEnabled: true,
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

@observer
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
      <MainTabNavigator
        navigation={this.props.navigation}/>
      {subscriptionsStore.isSubscribed === false && connectionStore.connected === false && <OfflineModal/>}
    </View>;
  }
}

MainTabNavigatorWithBackground.router = MainTabNavigator.router;
const MainNavigator = StackNavigator({

  Main: {screen: MainTabNavigatorWithBackground},
  PremiumScreen: {
    screen: PremiumScreen
  },
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
      return <MainNavigator
        onNavigationStateChange={(prevState, currentState) => {
          let routes = currentState.routes;
          let route = routes[routes.length - 1];
          while (route.index !== undefined) route = route.routes[route.index];
          let routeName = route.routeName;

          // main tab navigation
          switch (routeName) {
            case 'Workouts':
              return tipsStore.setTips(tipsStore.tips.workoutsScreen);
            case 'Weight':
              return tipsStore.setTips(tipsStore.tips.weight);
            case 'Eat':
              return tipsStore.setTips(tipsStore.tips.nutrition);
            case 'Settings':
              return tipsStore.setTips(tipsStore.tips.settings);
            case 'Tweaker':
              return tipsStore.setTips(tipsStore.tips.tweaker);
            case 'WorkoutLog':
              return tipsStore.setTips(tipsStore.tips.workoutLog);
            case 'Generate':
              return tipsStore.setTips(tipsStore.tips.slide0);
          }

        }}/>;
    }
  }
}

