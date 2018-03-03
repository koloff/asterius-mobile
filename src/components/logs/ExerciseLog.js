import React from 'react';
import {
  View, Text, Button, ScrollView, TouchableOpacity, StyleSheet, KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';
import {observer} from 'mobx-react';
import {computed} from 'mobx';
import {gs} from "../../globals";
import SetLog from './SetLog';
import ExerciseLogsGraphic from "./ExerciseLogsGraphic";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import exercisesLogsStore from "../../store/exercisesLogsStore";

import * as Mobx from 'mobx';

const containerHeight = 340;

@observer
export default class ExerciseLog extends React.Component {


  componentWillMount() {
    this.exerciseLogsStore = exercisesLogsStore.getExerciseLogs(this.props.workoutTemplateExerciseStore.id);
    this.exerciseLogStore = this.exerciseLogsStore.getLog(this.props.dateStr);
    this.props.renderedExerciseLog();
  }

  increaseSets() {
    if (this.exerciseLogStore.workoutTemplateExerciseStore.sets >= 6) {
      return;
    }
    this.exerciseLogStore.workoutTemplateExerciseStore.workoutTemplateStore.setExercisesSets(
      this.exerciseLogStore.workoutTemplateExerciseStore.id, this.exerciseLogStore.workoutTemplateExerciseStore.sets + 1);
  }

  decreaseSets() {
    this.exerciseLogStore.workoutTemplateExerciseStore.workoutTemplateStore.setExercisesSets(
      this.exerciseLogStore.workoutTemplateExerciseStore.id, this.exerciseLogStore.workoutTemplateExerciseStore.sets - 1);
  }

  @observer
  render() {
    return (
      <View style={{
        backgroundColor: '#101010', height: containerHeight, paddingTop: 30, flex: 1
      }}>
        <View style={{alignItems: 'center', flex: 1}}>


          <Text style={[gs.text, {
            color: '#bbb',
            fontSize: 18,
            marginBottom: 12
          }]}>{this.exerciseLogStore.workoutTemplateExerciseStore.index + 1}. {this.exerciseLogStore.workoutTemplateExerciseStore.details.info.name}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <View style={{
              width: 0,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: '#101010',
              height: 52
            }}/>
            {this.exerciseLogStore.sets.map((set) => {
              if (!set.removed) {
                return <SetLog
                  key={set.index}
                  scrollToExercise={this.props.scrollToExercise}
                  exerciseIndex={this.props.exerciseIndex}
                  containerHeight={containerHeight}
                  exerciseLogSetStore={set}/>
              }
            })}
            <View style={{flexDirection: 'row', marginLeft: 4}}>
              <TouchableOpacity
                onPress={this.decreaseSets.bind(this)}
                style={{padding: 5, marginRight: 3, alignItems: 'center'}}>
                <MaterialCommunityIcons name={'minus'} color={'#555'} size={21}/>
                <Text style={[gs.text, {fontSize: 9, color: '#555', top: -3}]}>SET</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.increaseSets.bind(this)}
                style={{padding: 5, alignItems: 'center'}}>
                <MaterialCommunityIcons name={'plus'} color={'#555'} size={21}/>
                <Text style={[gs.text, {fontSize: 9, color: '#555', top: -3}]}>SET</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{height: 205, width: '100%', alignItems: 'center', flex: 1}}>
            <ExerciseLogsGraphic
              exerciseLogsStore={this.exerciseLogsStore}
              id={this.exerciseLogStore.workoutTemplateExerciseStore.id}
            />
          </View>

        </View>
      </View>
    )
  }
}