import React from 'react';
import {View, Text, Button, ScrollView} from 'react-native';
import {observer} from 'mobx-react';
import {gs} from "../../globals";
import workoutsLogsStore from "../../store/workoutsLogsStore";
import exercisesLogsStore from "../../store/exercisesLogsStore";
import SetLog from './SetLog';
import ExerciseLogsGraphic from "./ExerciseLogsGraphic";


@observer
export default class ExerciseLog extends React.Component {

  state = {
    loading: true
  };

  async componentWillMount() {
    this.workoutTemplateExerciseStore = this.props.workoutTemplateExerciseStore;
    this.currentWorkoutLogStore = workoutsLogsStore.currentWorkoutLog;
    this.id = this.workoutTemplateExerciseStore.id;
    this.loadExerciseLog();
  }

  async loadExerciseLog() {
    this.exerciseLogsStore = exercisesLogsStore.getExerciseLogs(this.id);
    await this.exerciseLogsStore.loadLogs();
    this.currentWorkoutExerciseLogStore = this.exerciseLogsStore.getLog(this.currentWorkoutLogStore.dateStr);
    this.setState({loading: false});
  }


  @observer
  render() {
    return (
      <View style={{
        backgroundColor: '#222', marginBottom: 10
      }}>
        {!this.state.loading && <View style={{alignItems: 'center'}}>


          <Text style={[gs.text, {color: '#bbb', fontSize: 18, marginBottom: 12}]}>{this.workoutTemplateExerciseStore.details.info.name}</Text>
          <View style={{flexDirection: 'row'}}>
            {this.currentWorkoutExerciseLogStore.sets.map((set) => {
              if (!set.removed) {
                return <SetLog key={set.index} exerciseLogSetStore={set}/>
              }
            })}
          </View>

          <ExerciseLogsGraphic id={this.id}/>


        </View>}
      </View>
    )
  }
}