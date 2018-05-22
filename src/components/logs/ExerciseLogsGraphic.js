import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Animated,
  Dimensions
} from 'react-native';
import {observer} from 'mobx-react';
import exercisesLogsStore from "../../store/exercisesLogsStore";
import {gs} from "../../globals";
import LinearGradient from 'react-native-linear-gradient';
import workoutsLogsStore from "../../store/workoutsLogsStore";
import moment from "moment/moment";
import {withNavigation} from "react-navigation";

@observer
export default class ExerciseLogsGraphic extends React.Component {
  state = {
    renderMain: false
  };

  @observer
  render() {
    return (
      <View style={{flex: 1, width: '100%', alignItems: 'center'}}>
        <View style={{
          flexDirection: 'row',
          flex: 1,
          width: '100%',
          alignItems: 'center',
          // backgroundColor: 'red',
          justifyContent: 'center'
        }}>

          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(70,70,70, 0.10)']}
            style={{position: 'absolute', left: 0, right: 0, height: '100%', width: Dimensions.get('window').width}}
          />
          <LogsScroll
            // renderingGraphicDone={this.props.renderingGraphicDone}
            dateStr={this.props.dateStr}
            exerciseLogsStore={this.props.exerciseLogsStore}/>


        </View>
      </View>
    )
  }
}

@observer
class LogsScroll extends React.Component {
  state = {
    opacity: new Animated.Value(0)
  };

  componentDidMount() {
    Animated.timing(this.state.opacity, {toValue: 1, duration: 500, useNativeDriver: true}).start();
  }

  render() {
    return <Animated.View style={{opacity: 1}}>
      <ScrollView
        ref={(ref) => {
          this._logsScroll = ref;
        }}
        onContentSizeChange={() => {
          this._logsScroll.scrollToEnd({animated: true});
        }}
        horizontal={true}
        snapToAlignment={'end'}
        contentContainerStyle={{
          // paddingBottom: 5,
          flexGrow: 1,
          // backgroundColor: 'red',
          justifyContent: 'center'
        }}>


        {this.props.exerciseLogsStore.exerciseLogs.map((exerciseLogStore) => {
          if (!exerciseLogStore.sets[0].removed
            && !((exerciseLogStore.dateStr !== this.props.dateStr) && !exerciseLogStore.sets[0].performed)
          ) {
            return <Log key={exerciseLogStore.dateStr} exerciseLogStore={exerciseLogStore}/>
          }
        })}

      </ScrollView>
    </Animated.View>
  }
}

@withNavigation
@observer
class Log extends React.Component {
  navigate() {
    this.props.navigation.navigate('WorkoutLog', {workoutLogDateStr: this.props.exerciseLogStore.dateStr})
  }

  @observer
  render() {

    // inner graph is where the sets boxes stay; if the weight differnce is smaller make its height smaller to avoid big gaps
    let weightRatio = this.props.exerciseLogStore.exerciseLogsStore.setsData.weightRatio;
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
      <View style={{backgroundColor: '#101010'}}>
        <TouchableOpacity
          onPress={this.navigate.bind(this)}
          style={{
            opacity: this.props.exerciseLogStore.dateStr === workoutsLogsStore.currentWorkoutDateStr ? 1 : 0.5,
            height: '100%',
            flex: 0,
            minWidth: 120,
            // marginLeft: 2,
            // marginRight: 2,
            alignItems: 'center',
            justifyContent: 'center'
          }}>

          <LinearGradient
            colors={['rgba(0,0,0,0)', 'rgba(70,70,70, 0.3)']}
            style={{position: 'absolute', height: '100%', width: '100%'}}
          />
          <View style={{
            // backgroundColor: 'red',
            height: this.innerGraphHeight + 50, // adds some height because top offset can cut the view
            flexDirection: 'row',
            alignItems: 'flex-start',
            paddingLeft: 5,
            paddingRight: 5,
            top: 0
          }}>
            {this.props.exerciseLogStore.sets.map((set, index) => {
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
            }]}>{moment(this.props.exerciseLogStore.dateStr).format('D MMM YYYY')}</Text>
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
      top: this.props.logSetStore.maxWeightDifferencePercentage * this.props.innerGraphHeight,
      backgroundColor: '#F57C00', //'transparent',
      padding: 2,
      paddingLeft: 3,
      paddingRight: 3,
      marginLeft: 3,
      marginRight: 3,
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
  }
}