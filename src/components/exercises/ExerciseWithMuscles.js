import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Linking} from 'react-native';
import {observer} from 'mobx-react';

import * as mc from '../../algorithm/muscles/muscles-collection';
import * as ec from '../../algorithm/exercises/exercises-collection';

import {withNavigation} from 'react-navigation';
import tweakerStore from '../../store/tweakerStore';
import {gs} from "../../globals";
import SetCount from "./SetCount";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import subscriptionsStore from "../../store/subscriptionsStore";


// props - id
@withNavigation
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
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`https://www.youtube.com/results?search_query=${this.state.exercise.info.name}`)
              }}>

              <View
                style={{flexDirection: 'row'}}>
                <Text
                  numberOfLines={1}
                  style={[gs.text, styles.exerciseName, {
                    fontSize: 16,
                    color: '#B0BEC5'
                  }]}>{this.state.exercise.info.name}&nbsp;</Text>
                <MaterialCommunityIcons style={{top: 4}} color={'#B0BEC5'} name={'youtube-play'} size={16}/>
              </View>
            </TouchableOpacity>
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

        {this.state.exercise.premium && !subscriptionsStore.isSubscribed ?
          <TouchableOpacity
            style={{marginTop: 10, marginBottom: 5}}
            onPress={() => {
              this.props.navigation.navigate('PremiumScreen')
            }}>
            <Text style={[gs.text, {fontSize: 12, color: '#777'}]}>PREMIUM</Text>
          </TouchableOpacity>
          :
          <SetCount id={this.props.id}/>}

      </View>
    )
  }
}

const styles = StyleSheet.create({
    box: {
      flex: 1,
      backgroundColor: '#151515',
      justifyContent: 'center',
      alignItems: 'center',
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