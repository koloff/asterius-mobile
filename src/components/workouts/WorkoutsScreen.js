import * as React from "react";
import {observer} from 'mobx-react';
import {Text, TouchableOpacity, View, StyleSheet, ScrollView, ListView} from 'react-native';

import uuidv1 from 'uuid/v1';
import {Calendar} from "react-native-calendars";
import LinearGradient from 'react-native-linear-gradient';

import {withNavigation} from 'react-navigation';

import {gs} from "../../globals";
import MiniWorkout from "./MiniWorkout";

import WorkoutsTemplatesStore from '../../store/WorkoutsTemplatesStore';

@observer
export default class WorkoutsScreen extends React.Component {
  static navigationOptions = {
    tabBarLabel: 'WORKOUT',
  };


  render() {
    return (
      <View style={styles.wrapper}>
        <View style={{
          height: 280,
          backgroundColor: '#0c0c0c',
          borderColor: '#222',
          borderBottomWidth: StyleSheet.hairlineWidth,
          // borderTopWidth: StyleSheet.hairlineWidth
        }}>

          <Calendar
            style={{}}
            theme={{
              'stylesheet.calendar.main': {
                week: {
                  marginTop: 4,
                  marginBottom: 4,
                  flexDirection: 'row',
                  justifyContent: 'space-around'
                }
              },
              'stylesheet.day.basic': {
                dot: {
                  width: 6,
                  height: 6,
                  marginTop: 1,
                  borderRadius: 3,
                  opacity: 0
                },

              },
              // backgroundColor: '#ffffff',
              calendarBackground: '#151515',
              textSectionTitleColor: '#FF9800',
              selectedDayBackgroundColor: '#00adf5',
              selectedDayTextColor: '#ffffff',
              todayTextColor: '#FF9800',
              dayTextColor: '#ccc',
              textDisabledColor: '#555',
              dotColor: '#00adf5',
              selectedDotColor: '#ffffff',
              arrowColor: '#FF9800',
              monthTextColor: '#FF9800',
              textDayFontFamily: 'Montserrat',
              textMonthFontFamily: 'Montserrat-Regular',
              textDayHeaderFontFamily: 'Montserrat-Regular',
              textDayFontSize: 16,
              textMonthFontSize: 16,
              textDayHeaderFontSize: 13
            }}
            disableMonthChange={true}
            markedDates={{

              '2018-02-17': {marked: true, dotColor: 'rgba(255,143,0 ,1)'},
              '2018-01-30': {marked: true, dotColor: 'rgba(255,143,0 ,1)'},
            }}
            onDayPress={(day) => {
              console.log('day pressed', day)
            }}
          />
        </View>

        <View style={[styles.myWorkouts, {
          // borderColor: '#555',
          // borderBottomWidth: StyleSheet.hairlineWidth,
          // borderTopWidth: StyleSheet.hairlineWidth
        }]}>

          <MiniWorkoutsList/>

          <LinearGradient
            colors={['rgba(0,0,0,0.6)', 'transparent']}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              top: 0,
              height: 7,
            }}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.5)']}
            style={{
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: -1,
              height: 5,
            }}
          />
        </View>

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
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({mounted: true})
    });
  }

  // <ScrollView>
  // {this.workoutsTemplatesStore.workouts.map((workoutTemplateStore, index) => {
  //   return <MiniWorkout key={uuidv1()} workoutTemplateStore={workoutTemplateStore}/>
  // })}
  // </ScrollView>
  render() {
    return (

      <ListView
        dataSource={this.workoutsTemplatesStore.dataSource}
        renderRow={row => <MiniWorkout mounted={this.state.mounted} workoutTemplateStore={row}/>}
        enableEmptySections={true}
      />
    )
  }
}


const styles = StyleSheet.create({
  wrapper: {
    backgroundColor: '#0c0c0c',
    flex: 1
  },
  myWorkouts: {
    flex: 1,
    justifyContent: 'center'
  }
});