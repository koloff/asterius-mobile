import * as React from "react";
import {Observer, observer} from 'mobx-react';
import {autorun} from 'mobx';
import * as Mobx from 'mobx';
import {Text, TouchableOpacity, View, StyleSheet, FlatList, Image, Animated, ActivityIndicator} from 'react-native';

import {Calendar} from "react-native-calendars";
import LinearGradient from 'react-native-linear-gradient';

import {withNavigation} from 'react-navigation';

import {gs} from "../../globals";

import workoutsLogsStore from '../../store/workoutsLogsStore';
import MiniWorkoutInList from "./MiniWorkoutInList";

import WorkoutsTemplatesStore from '../../store/WorkoutsTemplatesStore';
import ElevatedView from "../ElevatedView";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import exercisesLogsStore from "../../store/exercisesLogsStore";
import AnimatedLoading from "../AnimatedLoading";

@observer
export default class WorkoutsScreen extends React.Component {
  state = {
    opacity: new Animated.Value(0)
  };

  async componentDidMount() {
    await workoutsLogsStore.init();
    // todo remove
    exercisesLogsStore.init();

    Animated.timing(this.state.opacity, {toValue: 1, useNativeDriver: true, duration: 333}).start();
  }

  @observer
  render() {
    return (
      <View style={{
        flex: 1
      }}>
        <AnimatedLoading
          opacity={this.state.opacity.interpolate({
            inputRange: [0, 1],
            outputRange: [1, 0]
          })}
        />
        <Animated.View
          style={{
            flex: 1,
            opacity: this.state.opacity
          }}>
          <View style={{
            padding: 15,
            paddingBottom: 0,
            paddingTop: 15
          }}>
            <ElevatedView elevation={4} style={{
              backgroundColor: '#151515',
              justifyContent: 'center',
              borderRadius: 5,
              height: 300
            }}>
              <Calendar
                style={{
                  borderRadius: 5,
                  borderColor: '#222',
                  borderWidth: StyleSheet.hairlineWidth,
                  justifyContent: 'center'
                }}
                theme={{
                  'stylesheet.calendar.main': {
                    week: {
                      marginTop: 2,
                      marginBottom: 2,
                      flexDirection: 'row',
                      justifyContent: 'space-around'
                    }
                  },
                  'stylesheet.day.basic': {
                    base: {
                      width: 34,
                      height: 34,
                      // backgroundColor: 'red',
                      alignItems: 'center'
                    },
                    dot: {
                      width: 6,
                      height: 6,
                      marginTop: -1,
                      borderRadius: 3,
                      opacity: 0
                    },

                  },
                  // backgroundColor: '#ffffff',
                  calendarBackground: '#151515',
                  textSectionTitleColor: '#ccc',
                  selectedDayBackgroundColor: '#EF6C00',
                  selectedDayTextColor: '#fff',
                  todayTextColor: '#ccc',
                  dayTextColor: '#ccc',
                  textDisabledColor: '#555',
                  dotColor: '#EF6C00',
                  selectedDotColor: '#ffffff',
                  arrowColor: '#ccc',
                  monthTextColor: '#ccc',
                  textDayFontFamily: 'Montserrat-Regular',
                  textMonthFontFamily: 'Montserrat-Regular',
                  textDayHeaderFontFamily: 'Montserrat-Regular',
                  textDayFontSize: 16,
                  textMonthFontSize: 16,
                  textDayHeaderFontSize: 13
                }}
                maxDate={workoutsLogsStore.todayDateStr}
                firstDay={1}
                disableMonthChange={true}
                markedDates={workoutsLogsStore.calendarData}
                onDayPress={(day) => {
                  if (!workoutsLogsStore.workoutsLogs.has(day.dateString)) {
                    workoutsLogsStore.pressedDateStr = day.dateString;
                  } else {
                    this.props.navigation.navigate('WorkoutLog', {workoutLogDateStr: day.dateString});
                  }
                }}
              />
            </ElevatedView>

          </View>


          <MiniWorkoutsList navigation={this.props.navigation}/>
        </Animated.View>


      </View>
    )
  }
}

@observer
class MiniWorkoutsList extends React.Component {

  state = {
    mounted: false
  };

  constructor(props) {
    super(props);

    this.workoutsTemplatesStore = new WorkoutsTemplatesStore();
    this.workoutsTemplatesStore.listenChildAdded();
    this.workoutsTemplatesStore.listenChildRemoved();
    this.workoutsTemplatesStore.listenChildChanged();

    autorun(() => {
      if (this.workoutsTemplatesStore.addedCustomWorkoutToArray) {
        this.props.navigation.navigate('Tweaker', {
          workoutTemplateStore: this.workoutsTemplatesStore.workouts[0].workoutStore,
          canDelete: true
        });
        this.workoutsTemplatesStore.addedCustomWorkout = false;
        this.workoutsTemplatesStore.addedCustomWorkoutToArray = false;
      }
    })
  }

  _renderItem = ({item, index}) => {
    return <Observer>{() =>
      <MiniWorkoutInList
        navigation={this.props.navigation}
        selectedDateStr={workoutsLogsStore.selectedDateStr}
        workoutTemplateStore={this.workoutsTemplatesStore.workouts[index].workoutStore}/>}
    </Observer>
  };

  @observer
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', padding: 15, height: 90}}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Generate');
            }}
            style={{
              flex: 1,
              marginRight: 7,
            }}>
            <ElevatedView style={{
              flex: 1,
              borderRadius: 5,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 5,
              backgroundColor: '#151515',
              borderColor: '#222',
              borderWidth: StyleSheet.hairlineWidth,
            }}>
              <View style={{marginRight: 10}}>
                <MaterialIcons size={26} color={'#ccc'} name={'playlist-add'}/>
              </View>
              <View>
                <Text style={[gs.text, {fontSize: 17, color: '#ccc'}]}>
                  GENERATE
                </Text>
              </View>
            </ElevatedView>
          </TouchableOpacity>
          <TouchableOpacity
            style={{flex: 1, marginLeft: 7}}
            onPress={() => {
              this.workoutsTemplatesStore.addWorkout();
            }}>
            <ElevatedView
              style={{
                flex: 1,
                borderRadius: 5,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 5,
                paddingBottom: 0,
                backgroundColor: '#151515',
                borderColor: '#222',
                borderWidth: StyleSheet.hairlineWidth
              }}
            >
              <View style={{marginRight: 10}}>
                <Ionicons size={26} color={'#ccc'} name={'md-add'}/>
              </View>
              <View>
                <Text style={[gs.text, {fontSize: 17, color: '#ccc'}]}>
                  CUSTOM
                </Text>
              </View>
            </ElevatedView>
          </TouchableOpacity>
        </View>

        <View style={{
          flex: 1, justifyContent: 'center', padding: 15, paddingTop: 0, paddingBottom: 0
        }}>
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.4)']}
            style={{
              position: 'absolute',
              zIndex: 999,
              width: '100%',
              bottom: 0,
              left: 30,
              height: 5,
            }}
          />
          <FlatList
            data={Mobx.toJS(this.workoutsTemplatesStore.workouts)}
            keyExtractor={(item) => item.key}
            renderItem={this._renderItem}
          />

        </View>
      </View>
    )
  }
}