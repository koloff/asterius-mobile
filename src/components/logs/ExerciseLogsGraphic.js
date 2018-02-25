import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, ActivityIndicator, Dimensions} from 'react-native';
import {observer} from 'mobx-react';
import exercisesLogsStore from "../../store/exercisesLogsStore";
import {gs} from "../../globals";
import LinearGradient from 'react-native-linear-gradient';
import workoutsLogsStore from "../../store/workoutsLogsStore";
import moment from "moment/moment";

@observer
export default class ExerciseLogsGraphic extends React.Component {
  state = {
    renderMain: false,
    loading: true
  };

  async componentWillMount() {
    this.id = this.props.id;
    this.exerciseLogsStore = exercisesLogsStore.getExerciseLogs(this.id);
    await this.exerciseLogsStore.loadLogs();
    this.setState({loading: false})
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({renderMain: true});
    })
  }

  @observer
  render() {
    return (
      <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
        {!this.state.loading && <View style={{
          flexDirection: 'row',
          flex: 1,
          alignItems: 'center'
        }}>
          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(100,100,100, 0.10)']}
            style={{position: 'absolute', height: '100%', width: '100%'}}
          />
          {!this.state.loading ? <ScrollView
              horizontal={true}
              contentContainerStyle={{
                // paddingBottom: 5,
                flexGrow: 1,
                // backgroundColor: 'red',
                justifyContent: 'center'
              }}>


              {this.exerciseLogsStore.exerciseLogs.values().map((logStore) => {
                return <Log key={logStore.dateStr} logStore={logStore}/>
              })}

            </ScrollView>
            : <ActivityIndicator style={{top: '50%', marginTop: -100}} size="large" color="#777"/>}

        </View>}
      </View>
    )
  }
}

@observer
class Log extends React.Component {
  render() {

    // inner graph is where the sets boxes stay; if the weight differnce is smaller make its height smaller to avoid big gaps
    let weightRatio = this.props.logStore.exerciseLogsStore.setsData.weightRatio;
    if (!weightRatio) {
      this.innerGraphHeight = 80;
    } else if (weightRatio <= 1.5) {
      this.innerGraphHeight = 80;
    } else if (weightRatio > 1.5 && weightRatio <= 3) {
      this.innerGraphHeight = weightRatio * 44;
    } else {
      this.innerGraphHeight = 130;
    }

    return (
      <View style={{backgroundColor: '#222'}}>
        <TouchableOpacity style={{
          opacity: this.props.logStore.dateStr === workoutsLogsStore.currentWorkoutLog.dateStr ? 1 : 0.5,
          height: '100%',
          flex: 0,
          minWidth: 120,
          // marginLeft: 2,
          // marginRight: 2,
          alignItems: 'center',
          justifyContent: 'center'
        }}>

          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(100,100,100, 0.3)']}
            style={{position: 'absolute', height: '100%', width: '100%'}}
          />
          <View style={{
            // backgroundColor: 'red',
            height: this.innerGraphHeight + 50, // adds some height because top offset can cut the view
            flexDirection: 'row',
            paddingLeft: 5,
            paddingRight: 5,
            top: 0
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
              color: '#757575',
              fontSize: 13,
            }]}>{moment(this.props.logStore.dateStr).format('D MMM YYYY')}</Text>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

@observer
class Set extends React.Component {
  render() {
    if (this.props.logSetStore.reps <= 6) {
      this.repsFontSize = 12;
    } else if (this.props.logSetStore.reps > 6 && this.props.logSetStore.reps <= 13) {
      this.repsFontSize = this.props.logSetStore.reps + 6;
    } else {
      this.repsFontSize = 19;
    }

    return <View style={{
      position: 'relative',
      alignItems: 'center',
      top: this.props.logSetStore.maxWeightDifferencePercentage * this.props.innerGraphHeight,
      paddingLeft: 3,
      paddingRight: 3
    }}>
      <View style={{
        backgroundColor: '#F57C00',
        padding: 2,
        paddingLeft: 3,
        paddingRight: 3,
        borderRadius: 5,
        minWidth: 50,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <Text style={[gs.text, {
          fontSize: 12,
          color: '#fff'
        }]}>
          <Text style={{fontSize: this.repsFontSize}}>{this.props.logSetStore.reps}</Text>×{this.props.logSetStore.weight}
        </Text>
      </View>
    </View>
  }
}