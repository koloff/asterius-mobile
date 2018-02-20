import React from 'react';
import {View, Text, TouchableOpacity, Button, ScrollView} from 'react-native';
import {observer} from 'mobx-react';
import {gs} from "../../globals";
import {withNavigation} from "react-navigation";
import Ionicons from "react-native-vector-icons/Ionicons";
import workoutsLogsStore from '../../store/workoutsLogsStore';
import exercisesLogsStore from "../../store/exercisesLogsStore";

import ExerciseLog from './ExerciseLog';

@observer
@withNavigation
export default class Log extends React.Component {

  state = {
    loading: true
  };

  componentWillMount() {
    this.workoutLogDateStr = '2018-02-10'; //this.props.navigation.state.params.workoutLogDateStr;
    this.loadStores();
  }

  async loadStores() {
    // todo remove
    exercisesLogsStore.init();
    await workoutsLogsStore.init();
    await workoutsLogsStore.addCurrentWorkoutLog(this.workoutLogDateStr);
    this.setState({loading: false})
  }

  @observer
  render() {
    return <View style={{
      flex: 1,
      height: '100%',
      backgroundColor: 'purple'
    }}>


      <View style={[{
        backgroundColor: '#fff',
        flexDirection: 'row',
        width: '100%',
      }]}>
        <View>
          <TouchableOpacity
            style={{padding: 10, paddingBottom: 7, paddingRight: 21}}
            onPress={() => {
              this.props.navigation.goBack()
            }}
          >
            <Ionicons name='ios-arrow-back' size={37} color='#ddd'/>
          </TouchableOpacity>
        </View>
        <View style={{
          justifyContent: 'center'
        }}>
          <View style={{flexDirection: 'row'}}>
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate('Log')
            }}><Text>{this.workoutLogDateStr}</Text></TouchableOpacity>

          </View>
        </View>
      </View>


      {!this.state.loading && <View>

        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Tweaker', {workoutTemplateStore: workoutsLogsStore.currentWorkoutLog.workoutTemplateStore})
          }}>
          <Text>{workoutsLogsStore.currentWorkoutLog.workoutTemplateStore.name}</Text>
        </TouchableOpacity>

        <ScrollView>
          {workoutsLogsStore.currentWorkoutLog.workoutTemplateStore.exercises.map((exercise) => {
            return (<ExerciseLog key={exercise.id} id={exercise.id}/>)
          })}
        </ScrollView>

      </View>}


    </View>
  }
}