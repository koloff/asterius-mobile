import React from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react';
import exercisesLogsStore from "../../store/exercisesLogsStore";
import {gs} from "../../globals";
import LinearGradient from 'react-native-linear-gradient';
import workoutsLogsStore from "../../store/workoutsLogsStore";
import moment from "moment/moment";


const HEIGHT = 170;


@observer
export default class ExerciseLogsGraphic extends React.Component {
  state = {
    loading: true
  };

  async componentWillMount() {
    this.id = this.props.id;
    this.exerciseLogsStore = exercisesLogsStore.getExerciseLogs(this.id);
    await this.exerciseLogsStore.loadLogs();
    this.setState({loading: false})
  }

  @observer
  render() {
    return (
      <View>
        {!this.state.loading && <View style={{
          flexDirection: 'row',
          height: HEIGHT + 40
        }}>

          <ScrollView horizontal={true}>
            {this.exerciseLogsStore.exerciseLogs.values().map((logStore) => {
              return <Log key={logStore.dateStr} logStore={logStore}/>
            })}
          </ScrollView>
        </View>}
      </View>
    )
  }
}

@observer
class Log extends React.Component {

  render() {
    let weightRange = this.props.logStore.exerciseLogsStore.setsData.weightRange;
    if (!weightRange) {
      this.innerGraphHeight = 80;
    } else if (weightRange <= 40) {
      this.innerGraphHeight = 80;
    } else if (weightRange > 40 && weightRange <= 80) {
      this.innerGraphHeight = weightRange * 2;
    } else {
      this.innerGraphHeight = 160;
    }


    return (
      <TouchableOpacity style={{
        opacity: this.props.logStore.dateStr === workoutsLogsStore.currentWorkoutLog.dateStr ? 1 : 0.5,
        height: '100%',
        flex: 0,
        minWidth: 100,
        marginLeft: 3,
        marginRight: 3,
        alignItems: 'center',
        justifyContent: 'center'
      }}>

        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(128,128,128, 0.3)']}
          style={{position: 'absolute', height: '100%', width: '100%'}}
        />
        <View style={{
          height: this.innerGraphHeight + 40,
          flexDirection: 'row',
          paddingLeft: 5,
          paddingRight: 5,
        }}>
          {this.props.logStore.sets.map((set, index) => {
            if (set.performed) {
              return <Set key={index} innerGraphHeight={this.innerGraphHeight} logSetStore={set}/>;
            }
          })}
        </View>

        <View style={{
          position: 'absolute',
          bottom: 3
        }}>
          <Text style={[gs.text, {
            color: '#FF8F00',
          }]}>{moment(this.props.logStore.dateStr).format('D MMM YYYY')} </Text>
        </View>
      </TouchableOpacity>
    )
  }
}

@observer
class Set extends React.Component {


  @observer
  render() {

    if (this.props.logSetStore.reps <= 6) {
      this.repsFontSize = 12;
    } else if (this.props.logSetStore.reps > 6 && this.props.logSetStore.reps <= 13) {
      this.repsFontSize = this.props.logSetStore.reps + 6;
    } else {
      this.repsFontSize = 19;
    }

    console.log(this.props.logSetStore.maxWeightDifferencePercentage);
    return <View style={{
      position: 'relative',
      alignItems: 'center',
      top: this.props.logSetStore.maxWeightDifferencePercentage * this.props.innerGraphHeight,
      padding: 3
    }}>
      <View style={{
        backgroundColor: '#FF8F00',
        padding: 3,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text style={[gs.text, {
          fontSize: 12,
          color: this.props.logSetStore.exerciseLogStore.dateStr === workoutsLogsStore.currentWorkoutLog.dateStr ? '#333' : '#000',
        }]}>
          <Text style={{fontSize: this.repsFontSize}}>{this.props.logSetStore.reps}</Text>×{this.props.logSetStore.weight}
        </Text>
      </View>
    </View>
  }
}