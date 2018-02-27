import React from 'react';
import {
  View, Text, Button, ScrollView, TouchableOpacity, StyleSheet, KeyboardAvoidingView,
  ActivityIndicator
} from 'react-native';
import {observer} from 'mobx-react';
import {gs} from "../../globals";
import workoutsLogsStore from "../../store/workoutsLogsStore";
import exercisesLogsStore from "../../store/exercisesLogsStore";
import SetLog from './SetLog';
import ExerciseLogsGraphic from "./ExerciseLogsGraphic";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const containerHeight = 340;

@observer
export default class ExerciseLog extends React.Component {

  state = {
    loading: true,
    renderingGraphic: true
  };

  async componentDidMount() {
    this.workoutTemplateExerciseStore = this.props.workoutTemplateExerciseStore;
    this.currentWorkoutLogStore = workoutsLogsStore.currentWorkoutLog;
    this.id = this.workoutTemplateExerciseStore.id;
    this.loadExerciseLogs();
  }

  async loadExerciseLogs() {
    this.exerciseLogsStore = exercisesLogsStore.getExerciseLogs(this.id);
    await this.exerciseLogsStore.loadLogs();
    this.currentWorkoutExerciseLogStore = this.exerciseLogsStore.getLog(this.currentWorkoutLogStore.dateStr);
    this.setState({loading: false});
    this.props.renderedExerciseLog();
  }

  renderingGraphicDone() {
    // console.log('rendering done');
    // setTimeout(() => {

      this.setState({renderingGraphic: false});
    // })
  }



  increaseSets() {
    if (this.workoutTemplateExerciseStore.sets >= 6) {
      return;
    }
    this.workoutTemplateExerciseStore.workoutTemplateStore.setExercisesSets(this.id, this.workoutTemplateExerciseStore.sets + 1);
  }

  decreaseSets() {
    this.workoutTemplateExerciseStore.workoutTemplateStore.setExercisesSets(this.id, this.workoutTemplateExerciseStore.sets - 1);
  }

  @observer
  render() {
    return (
      <View style={{
        backgroundColor: '#101010', height: containerHeight, paddingTop: 30, flex: 1
      }}>
        {!this.state.loading && <View style={{alignItems: 'center', flex: 1}}>


          <Text style={[gs.text, {
            color: '#bbb',
            fontSize: 18,
            marginBottom: 12
          }]}>{this.workoutTemplateExerciseStore.index + 1}. {this.workoutTemplateExerciseStore.details.info.name}</Text>
          <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
            <View style={{
              width: 0,
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: '#101010',
              height: 52
            }}/>
            {this.currentWorkoutExerciseLogStore.sets.map((set) => {
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
            <ExerciseLogsGraphic id={this.id} renderingGraphicDone={this.renderingGraphicDone.bind(this)} />
            {this.state.renderingGraphic && <ActivityIndicator style={{position: 'absolute', top: 100}} size="small" color="#777"/>}
          </View>

        </View>}
      </View>
    )
  }
}