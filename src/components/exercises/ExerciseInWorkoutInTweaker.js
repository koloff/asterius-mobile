import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Linking} from 'react-native';
import {observer} from 'mobx-react';

import Ionicons from "react-native-vector-icons/Ionicons";

import tweakerStore from '../../store/tweakerStore';
import {gs} from "../../globals";
import SetCount from "./SetCount";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// props: workoutTemplateExerciseStore
@observer
export default class ExerciseInWorkoutInTweaker extends React.Component {
  render() {
    return (
      <View style={[styles.box]}>

        <View style={styles.moveBox}>
          <TouchableOpacity onPress={() => {
            if (this.props.workoutTemplateExerciseStore.index > 0) {
              this.props.workoutTemplateExerciseStore.moveUp();
            }
          }}>
            <View style={styles.moveArrowUp}>
              <Ionicons style={{position: 'relative'}} name="ios-arrow-up" size={23} color={'#B0BEC5'}/>
            </View>
          </TouchableOpacity>

          <View style={styles.orderText}>
            <Text style={{
              position: 'relative',
              color: '#B0BEC5',
              fontSize: 12
            }}>{this.props.workoutTemplateExerciseStore.index + 1}</Text>
          </View>
          <TouchableOpacity onPress={() => {
            if (this.props.workoutTemplateExerciseStore.index < tweakerStore.workoutTemplateStore.exercises.length - 1) {
              this.props.workoutTemplateExerciseStore.moveDown();
            }
          }}>
            <View style={styles.moveArrowDown}>
              <Ionicons style={{position: 'relative'}} name="ios-arrow-down" size={23} color={'#B0BEC5'}/>
            </View>
          </TouchableOpacity>
        </View>


        <View style={styles.exerciseDetailsBox}>
          <View style={styles.exerciseNameBox}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(`https://www.youtube.com/results?search_query=${this.props.workoutTemplateExerciseStore.details.info.name}`)
              }}>
              <View
                style={{marginRight: 33, flexDirection: 'row'}}>
                <Text
                  numberOfLines={1}
                  style={[gs.text, styles.exerciseName, {
                    fontSize: 15,
                    color: '#B0BEC5'
                  }]}>{this.props.workoutTemplateExerciseStore.details.info.name}&nbsp;</Text>
                <MaterialCommunityIcons style={{top: 4}} color={'#B0BEC5'} name={'youtube-play'} size={15}/>
              </View>
            </TouchableOpacity>
          </View>
          <SetCount id={this.props.workoutTemplateExerciseStore.id}/>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    height: 70,
    flexDirection: 'row',
    backgroundColor: '#171717',
    marginBottom: 7,
    marginLeft: 1,
    marginRight: 1
  },
  exerciseDetailsBox: {
    flex: 1
  },
  exerciseNameBox: {
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 6
  },
  moveBox: {
    backgroundColor: '#1e1e1e',
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  orderText: {
    alignItems: 'center',
    position: 'relative',
    top: -2
  },
  moveArrowUp: {
    marginTop: 6,
    paddingBottom: 7,
    alignItems: 'center',
    height: 27,
    width: 31
  },
  moveArrowDown: {
    marginBottom: 3,
    alignItems: 'center',
    height: 27,
    width: 31,
  }
});