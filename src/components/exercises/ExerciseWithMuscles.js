import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {observer} from 'mobx-react';

import * as mc from '../../algorithm/muscles/muscles-collection';
import * as ec from '../../algorithm/exercises/exercises-collection';

import tweakerStore from '../../store/tweakerStore';
import {gs} from "../../globals";
import SetCount from "./SetCount";


// props - id
@observer
export default class ExerciseWithMuscles extends React.Component {
  state = {
    exercise: {},
    workoutExercise: {}
  };

  constructor(props) {
    super(props);
    this.state.exercise = ec.get(this.props.id);
  }

  render() {
    return (
      <View style={styles.box}>


        <View style={styles.exerciseDetailsBox}>
          <View style={styles.exerciseNameBox}>
            <Text style={[gs.text, styles.exerciseName, {
              color: '#B0BEC5',
              fontSize: 16
            }]}>{this.state.exercise.info.name}</Text>
          </View>
          <View style={styles.musclesUsedBox}>

            {Object.keys(this.state.exercise.musclesUsed).map((muscleId) => {
              let percentage = this.state.exercise.musclesUsed[muscleId];
              let muscle = mc.get(muscleId);
              let isSelected = tweakerStore.selectedMuscleId === muscleId;


              return (
                <View key={muscleId} style={[{
                  // backgroundColor: isSelected ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.3)'
                }, styles.muscleUsedBox]}>
                  <View>
                    <Text style={[gs.text, {
                      color: isSelected ? 'rgba(255,160,0 ,1)' : '#607D8B'
                    }, styles.muscleUsedName]}>{muscle.info.broName.toUpperCase()}</Text>
                  </View>
                  <View style={styles.percentageBarBox}>
                    <View style={[styles.percentageBar, {
                      width: percentage < 80 ? `${percentage}%` : `80%`,
                      backgroundColor: isSelected ? 'rgba(255,160,0 ,1)' : '#607D8B'
                    }]}/>
                  </View>
                </View>
              )
            })}
          </View>
        </View>

        <SetCount id={this.props.id}/>

      </View>
    )
  }
}

const styles = StyleSheet.create({
    box: {
      flex: 1,
      backgroundColor: '#151515',
      marginBottom: 7,
      paddingBottom: 3,
      marginLeft: 1,
      marginRight: 1
    },
    exerciseDetailsBox: {
      flex: 1,
      justifyContent: 'center'
    },
    exerciseNameBox: {
      alignItems: 'center',
      marginTop: 4,
      marginBottom: 6
    },
    exerciseName: {
      fontSize: 14,
    },
    musclesUsedBox: {
      marginBottom: 0
    },
    muscleUsedBox: {
      justifyContent: 'flex-end',
      flexDirection: 'row'
    },
    percentageBarBox: {
      width: '50%',
      margin: 1
    },
    muscleUsedName: {
      fontSize: 11,
      marginRight: 2
    },
    percentageBar: {
      marginTop: 3,
      marginLeft: 2,
      height: 8,
      borderRadius: 2
    },
    moveBox: {
      position: 'absolute',
      right: 0,
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 7
    }
  })
;