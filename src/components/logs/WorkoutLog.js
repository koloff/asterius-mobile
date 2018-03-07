import React from 'react';
import {
  View, Text, TouchableOpacity, Animated, ScrollView, StyleSheet, ActivityIndicator, Modal, Button,
} from 'react-native';
import {observer} from 'mobx-react';
import {gs} from "../../globals";
import {withNavigation} from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import workoutsLogsStore from '../../store/workoutsLogsStore';
import exercisesLogsStore from "../../store/exercisesLogsStore";

import ExerciseLog from './ExerciseLog';
import moment from "moment/moment";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";


@withNavigation
@observer
export default class WorkoutLog extends React.Component {

  state = {
    loading: true,
    renderingLogs: 0,
    renderedLogs: 0,
    renderedAllLogs: false,
    contentOpacity: new Animated.Value(0),
    modalVisible: false
  };

  async componentWillMount() {
    this.dateStr = this.props.navigation.state.params.workoutLogDateStr;
    await workoutsLogsStore.addNewWorkoutLogStore(this.dateStr);
    this.workoutLogStore = workoutsLogsStore.getWorkoutLogStore(this.dateStr);
    this.exercises = this.workoutLogStore.workoutTemplateStore.exercises;

    let promises = this.exercises.map((exerciseTemplateStore) => {
      let exerciseLogStore = exercisesLogsStore.getExerciseLogs(exerciseTemplateStore.id);
      return exerciseLogStore.loadExerciseLogs();
    });
    await Promise.all(promises)
      .then(() => {
        this.exerciseLogsStore =
          this.setState({loading: false})
        //todo move
        if (!this.exercises.length) {
          this.animateContent();
        }
      });

  }

  renderingExerciseLog() {
    this.setState({renderingLogs: this.state.renderingLogs + 1});
  }

  renderedExerciseLog() {
    this.setState({renderedLogs: ++this.state.renderedLogs});
    if (this.exercises.length === 1 && this.state.renderedLogs === 1) {
      this.animateContent();
    } else if (this.state.renderedLogs >= 2) {
      this.animateContent();
    }
    if (this.state.renderedLogs >= this.state.renderingLogs) {
      this.setState({renderedAllLogs: true});
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
      backgroundColor: '#101010',
    }}>


      <View style={[{
        borderBottomWidth: 1,
        borderBottomColor: '#222',
        flexDirection: 'row',
        width: '100%',
        height: 50,
        alignItems: 'center',
        justifyContent: 'center'
      }]}>
        <View style={{position: 'absolute', left: 0}}>
          <TouchableOpacity
            style={{
              padding: 10, paddingBottom: 7, paddingRight: 21
            }}
            onPress={() => {
              requestAnimationFrame(() => {
                workoutsLogsStore.subtractOpenedWorkout();
                this.props.navigation.goBack()
              })
            }}
          >
            <Ionicons name='ios-arrow-back' size={37} color='#ddd'/>
          </TouchableOpacity>
        </View>

        <View style={{alignItems: 'center'}}>
          <Text style={[gs.text, {
            fontSize: 19,
            padding: 10,
            textAlign: 'center'
          }]}>{moment(this.dateStr).format('D MMM YYYY')}</Text>
        </View>
        <View style={{position: 'absolute', flexDirection: 'row', right: 0}}>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              marginRight: 7
            }}
            onPress={() => {
              requestAnimationFrame(() => {
                this.setState({modalVisible: true});
              })
            }}>
            <MaterialIcons name={'delete'} color={'#fff'} size={21}/>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() => {
              this.props.navigation.navigate('Tweaker', {
                canDelete: false,
                workoutTemplateStore: this.workoutLogStore.workoutTemplateStore
              })
            }}>
            <Ionicons name={'md-settings'} color={'#fff'} size={21}/>
          </TouchableOpacity>
        </View>
      </View>


      <View style={{flex: 1}}>
        <Animated.View style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          opacity: this.inverseContentOpacity,
          justifyContent: 'center'
        }}>
          <ActivityIndicator size="large" color="#777"/>
        </Animated.View>

        {!this.state.loading && <Animated.View style={{
          opacity: this.state.contentOpacity,
          flex: 1,
          justifyContent: 'center'
        }}>
          {!this.exercises.length ?
            <View><Text style={[gs.text, {color: '#aaa', textAlign: 'center'}]}>No exercises in this
              workout</Text></View>

            : <ScrollView
              ref={(ref) => {
                this._scroll = ref
              }}
              style={{flex: 1}}
              // contentContainerStyle={{flex: 1}}
              keyboardShouldPersistTaps={'handled'}>

              {this.exercises.map((workoutTemplateExerciseStore, index) => {
                return (
                  <ExerciseLog
                    key={workoutTemplateExerciseStore.id}
                    scrollToExercise={this.scrollToExercise.bind(this)}
                    renderedExerciseLog={this.renderedExerciseLog.bind(this)}
                    renderingExerciseLog={this.renderingExerciseLog.bind(this)}
                    exerciseIndex={index}
                    dateStr={this.dateStr}
                    workoutTemplateExerciseStore={workoutTemplateExerciseStore}
                  />
                )
              })}
            </ScrollView>}
        </Animated.View>}

      </View>


      <Modal
        visible={this.state.modalVisible}
        transparent={true}
        animationType={'fade'}
        onRequestClose={() =>
          this.setState({modalVisible: false})}
      >
        <View style={styles.modalContainer}>
          <View style={styles.innerContainer}>
            <Text style={[gs.text, gs.shadow]}>Delete this workout log?</Text>
            <View style={{flexDirection: 'row', paddingTop: 10}}>
              <View style={{marginRight: 10}}><Button
                color={'red'}
                onPress={() => {
                  requestAnimationFrame(() => {
                    this.workoutLogStore.remove();
                    this.props.navigation.goBack();
                    this.setState({modalVisible: false})
                  })
                }}
                title="Delete"
              /></View>
              <View><Button
                onPress={() => this.setState({modalVisible: false})}
                title="Close"
              /></View>
            </View>
          </View>
        </View>
      </Modal>

    </View>
  }
}


const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.9)',
  },
  innerContainer: {
    alignItems: 'center',
  },
});