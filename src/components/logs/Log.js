import React from 'react';
import {View, Text, TouchableOpacity, Button} from 'react-native';
import {observer} from 'mobx-react';
import {gs} from "../../globals";
import {withNavigation} from "react-navigation";
import tweakerStore from "../../store/tweakerStore";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Ionicons from "react-native-vector-icons/Ionicons";
import workoutsLogsStore from '../../store/workoutsLogsStore';
import exercisesLogsStore from "../../store/exercisesLogsStore";

@withNavigation
@observer
export default class Log extends React.Component {

  async componentWillMount() {
    console.log('MOUNT');
    this.workoutLogDateStr = '2018-02-10'; //this.props.navigation.state.params.workoutLogDateStr;
    // todo remove
    exercisesLogsStore.init();
    await workoutsLogsStore.init();
    await workoutsLogsStore.addCurrentWorkoutLog(this.workoutLogDateStr);
    console.log(workoutsLogsStore._openedWorkoutsLogs.length);
  }

  @observer
  render() {
    return <View style={{
      flex: 1,
      height: '100%',
      backgroundColor: '#ddd'
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

      <View>

        <Text>{workoutsLogsStore.currentWorkoutLog && workoutsLogsStore.currentWorkoutLog.workoutTemplateStore.name}</Text>
        {workoutsLogsStore.currentWorkoutLog && workoutsLogsStore.currentWorkoutLog.exercisesLogs.map((ex, index) => {
          return <View key={index}><Text>{index}</Text></View>
        })}
      </View>


    </View>
  }
}