import React from 'react';
import {
  View, Text, TouchableOpacity, Animated, ScrollView, StyleSheet, ActivityIndicator,
} from 'react-native';
import {observer} from 'mobx-react';
import {gs} from "../../globals";
import {withNavigation} from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import workoutsLogsStore from '../../store/workoutsLogsStore';
import exercisesLogsStore from "../../store/exercisesLogsStore";
import test from '../../store/generateStore'

import ExerciseLog from './ExerciseLog';
import moment from "moment/moment";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import tweakerStore from "../../store/tweakerStore";

@observer
@withNavigation
export default class WorkoutLog extends React.Component {

  state = {
    loading: true,
    rendering: true,
    renderedLogs: 0,
    contentOpacity: new Animated.Value(0)
  };


  async componentWillMount() {
    this.workoutLogDateStr = this.props.navigation.state.params.workoutLogDateStr;

    // todo remove
    exercisesLogsStore.init();
    await workoutsLogsStore.init();
    await workoutsLogsStore.addCurrentWorkoutLog(this.workoutLogDateStr);
    this.exercises = workoutsLogsStore.currentWorkoutLog.workoutTemplateStore.exercises;
    this.setState({loading: false});

    //todo move
    if (!this.exercises.length) {
      this.animateContent();
    }
  }

  renderedExerciseLog() {
    this.setState({renderedLogs: this.state.renderedLogs + 1});
    if (this.exercises.length === 1 && this.state.renderedLogs === 1) {
      this.animateContent();
    } else if (this.state.renderedLogs >= 2) {
      this.animateContent();
    }
  }

  animateContent() {
    Animated.timing(this.state.contentOpacity, {toValue: 1, duration: 500, useNativeDriver: true}).start();
  }

  // scroll to the position of the exercise
  scrollToExercise(position) {
    this._scroll.scrollTo({y: position});
  }

  @observer
  render() {

    this.inverseContentOpacity = this.state.contentOpacity.interpolate({
      inputRange: [0, 1],
      outputRange: [1, 0]
    });

    return <View style={{
      flex: 1,
      height: '100%',
      backgroundColor: '#101010',
    }}>


      <View style={[{
        borderBottomWidth: 1,
        borderBottomColor: '#222',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center'
      }]}>
        <View style={{position: 'absolute', left: 0}}>
          <TouchableOpacity
            style={{
              padding: 10, paddingBottom: 7, paddingRight: 21
            }}
            onPress={() => {
              this.props.navigation.goBack()
            }}
          >
            <Ionicons name='ios-arrow-back' size={37} color='#ddd'/>
          </TouchableOpacity>
        </View>

        <View style={{margin: 5}}>
          <View style={{alignItems: 'center'}}>
            <Text style={[gs.text, {
              fontSize: 15,
              textAlign: 'center'
            }]}>{moment(this.workoutLogDateStr).format('D MMM YYYY')}</Text>
          </View>
          <TouchableOpacity
            style={{backgroundColor: 'transparent', justifyContent: 'center', marginTop: 2}}
            onPress={() => {
              console.log('delete press');
            }}>

            <Text style={[gs.text, {fontSize: 11, textAlign: 'center', color: '#999'}]}>REMOVE</Text>
          </TouchableOpacity>
        </View>

        <View style={{position: 'absolute', right: 0}}>
          <TouchableOpacity
            style={{
              padding: 10,
              // backgroundColor: '#4FC3F7',
              // position: 'absolute',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() => {
              this.props.navigation.navigate('Tweaker', {
                canDelete: false,
                workoutTemplateStore: workoutsLogsStore.currentWorkoutLog.workoutTemplateStore
              })
            }}>
            <Text style={[gs.text, {textAlign: 'center', fontSize: 17, color: '#fff'}]}>EDIT</Text>
          </TouchableOpacity>
        </View>
      </View>


      <View style={{flex: 1, justifyContent: 'center'}}>
        {!this.state.loading && <Animated.View style={{
          position: 'absolute',
          opacity: this.state.contentOpacity,
          width: '100%',
          height: '100%',
          flex: 1,
          justifyContent: 'center'
        }}>
          {!this.exercises.length ?
            <View><Text style={[gs.text, {color: '#aaa', textAlign: 'center'}]}>No exercises in this
              workout</Text></View> :
            <ScrollView
              ref={(ref) => {
                this._scroll = ref
              }}
              style={{flex: 1}}
              // contentContainerStyle={{flex:0}}
              keyboardShouldPersistTaps={'handled'}>
              {this.exercises.map((workoutTemplateExerciseStore, index) => {
                return (
                  <ExerciseLog
                    key={workoutTemplateExerciseStore.id}
                    scrollToExercise={this.scrollToExercise.bind(this)}
                    renderedExerciseLog={this.renderedExerciseLog.bind(this)}
                    exerciseIndex={index} workoutTemplateExerciseStore={workoutTemplateExerciseStore}
                  />)
              })}
              <View style={{height: 340}}></View>
            </ScrollView>}
        </Animated.View>}
        <Animated.View style={{
          flex: 1,
          opacity: this.inverseContentOpacity,
          justifyContent: 'center'
        }}>
          <ActivityIndicator size="large" color="#777"/>
        </Animated.View>
      </View>

    </View>
  }
}