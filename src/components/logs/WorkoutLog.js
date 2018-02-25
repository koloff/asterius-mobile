import React from 'react';
import {
  View, Text, TouchableOpacity, Button, ScrollView, StyleSheet, ActivityIndicator,
  KeyboardAvoidingView
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

@observer
@withNavigation
export default class Log extends React.Component {

  state = {
    loading: true,
    // rendering: true
  };

  componentWillMount() {
    this.workoutLogDateStr = this.props.navigation.state.params.workoutLogDateStr;
    this.loadStores();
  }

  async loadStores() {
    // todo move
    exercisesLogsStore.init();
    await workoutsLogsStore.init();
    await workoutsLogsStore.addCurrentWorkoutLog(this.workoutLogDateStr);
    this.setState({loading: false})
  }


  // scroll to the position of the exercise
  scrollToExercise(position) {
    this._scroll.scrollTo({y: position});
  }

  @observer
  render() {
    return <View style={{
      flex: 1,
      height: '100%',
      backgroundColor: '#222'
    }}>


      <View style={[{
        // backgroundColor: '#222',
        borderBottomWidth: 1,
        borderBottomColor: '#333',
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


      {!this.state.loading && <ScrollView
        ref={(ref) => {
          this._scroll = ref
        }}
        style={{flex: 1}}
        // contentContainerStyle={{flex:0}}
        keyboardShouldPersistTaps={'handled'}>
        {workoutsLogsStore.currentWorkoutLog.workoutTemplateStore.exercises.map((workoutTemplateExerciseStore, index) => {
          return (
            <ExerciseLog key={workoutTemplateExerciseStore.id} scrollToExercise={this.scrollToExercise.bind(this)} exerciseIndex={index} workoutTemplateExerciseStore={workoutTemplateExerciseStore}/>)
        })}
        <View style={{height: 340}}></View>
      </ScrollView>}
    </View>
  }
}