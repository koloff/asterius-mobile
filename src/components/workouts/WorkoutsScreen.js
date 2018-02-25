import * as React from "react";
import {Observer, observer} from 'mobx-react';
import * as Mobx from 'mobx';
import {Text, TouchableOpacity, View, StyleSheet, FlatList, Image} from 'react-native';

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

@observer
export default class WorkoutsScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'WORKOUT',
  };

  async componentWillMount() {
    await workoutsLogsStore.init();
  }

  @observer
  render() {
    return (
      <View style={{
        backgroundColor: '#0c0c0c',
        flex: 1
      }}>

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

        <View style={{
          opacity: 0.5,
          position: 'absolute',
          width: '100%',
          height: '100%',
          backgroundColor: '#000'
        }}></View>

        <View style={{
          padding: 30,
          paddingBottom: 0,
          paddingTop: 15
          // borderColor: '#222',
          // borderBottomWidth: StyleSheet.hairlineWidth,
          // borderTopWidth: StyleSheet.hairlineWidth
        }}>

          <ElevatedView elevation={4} style={{
            // borderColor: '#222',
            height: 300,
            justifyContent: 'center',
            // backgroundColor: 'red',
            // borderWidth: StyleSheet.hairlineWidth,
          }}>
            <Calendar
              style={{
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
                selectedDayBackgroundColor: '#FF9800',
                selectedDayTextColor: '#fff',
                todayTextColor: '#ccc',
                dayTextColor: '#ccc',
                textDisabledColor: '#555',
                dotColor: '#00adf5',
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
                if (!workoutsLogsStore.previousWorkoutLogs.has(day.dateString)) {
                  workoutsLogsStore.selectedDateStr = day.dateString;
                } else {
                  this.props.navigation.navigate('WorkoutLog', {workoutLogDateStr: day.dateString});
                }

              }}
            />
          </ElevatedView>

        </View>


        <MiniWorkoutsList navigation={this.props.navigation}/>
      </View>
    )
  }
}

@observer
class MiniWorkoutsList extends React.Component {

  state = {
    mounted: false
  };

  componentWillMount() {
    this.workoutsTemplatesStore = new WorkoutsTemplatesStore();
    this.workoutsTemplatesStore.listenChildAdded();
    this.workoutsTemplatesStore.listenChildRemoved();
  }

  _renderItem = ({item, index}) => {
    return <Observer>{() =>
      <MiniWorkoutInList
        navigation={this.props.navigation}
        selectedDateStr={workoutsLogsStore.selectedDateStr}
        workoutTemplate={Mobx.toJS(this.workoutsTemplatesStore.workouts[index].workoutJSON)}
        workoutTemplateStore={this.workoutsTemplatesStore.workouts[index].workoutStore}/>}
    </Observer>
  };

  @observer
  render() {
    return (
      <View style={{flex: 1}}>
        <View style={{flexDirection: 'row', padding: 15, height: 90}}>
          <ElevatedView style={{flex: 1, marginRight: 7}}>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Generate');
              }}
              style={{
                flex: 1,
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
                <Text style={[gs.text, gs.shadow, {fontSize: 13}]}>
                  Generate{'\n'}new workouts
                </Text>
              </View>
            </TouchableOpacity>
          </ElevatedView>
          <ElevatedView style={{flex: 1, marginLeft: 7}}>
            <TouchableOpacity
              style={{
                flex: 1,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 5,
                paddingBottom: 0,
                backgroundColor: '#151515',
                borderColor: '#222',
                borderWidth: StyleSheet.hairlineWidth
              }}
              onPress={() => {
                this.workoutsTemplatesStore.addWorkout();
              }}
            >
              <View style={{marginRight: 10}}>
                <Ionicons size={26} color={'#ccc'} name={'md-add'}/>
              </View>
              <View>
                <Text style={[gs.text, gs.shadow, {fontSize: 13}]}>
                  Add custom{'\n'}workout
                </Text>
              </View>
            </TouchableOpacity>
          </ElevatedView>
        </View>

        <View style={{
          flex: 1, justifyContent: 'center', padding: 30, paddingTop: 0, paddingBottom: 0
        }}>
          {/*<LinearGradient*/}
          {/*colors={['rgba(0,0,0,0.3)', 'transparent']}*/}
          {/*style={{*/}

          {/*zIndex: 999,*/}
          {/*position: 'relative',*/}
          {/*width: '100%',*/}
          {/*top: 5,*/}
          {/*height: 5,*/}
          {/*}}*/}
          {/*/>*/}


          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.4)']}
            style={{
              position: 'relative',
              zIndex: 999,
              width: '100%',
              bottom: 6,
              height: 6,
            }}
          />
          <FlatList
            style={{
              // borderColor: '#555',
              // // borderBottomWidth: StyleSheet.hairlineWidth,
              // borderTopWidth: StyleSheet.hairlineWidth
            }}
            data={Mobx.toJS(this.workoutsTemplatesStore.workouts)}
            keyExtractor={(item) => item.key}
            renderItem={this._renderItem}
          />

        </View>
      </View>
    )
  }
}