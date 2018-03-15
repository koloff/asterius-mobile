import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Animated, Modal, Button, ActivityIndicator} from 'react-native';
import {observer} from 'mobx-react';
import {gs} from "../../globals";

import MusclesModelStore from "../../store/MusclesModelStore";
import MusclesModel from '../muscles/MusclesModel';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {withNavigation} from "react-navigation";
import ElevatedView from "../ElevatedView";

import * as Mobx from 'mobx';

@observer
class MiniWorkoutExercise extends React.Component {
  render() {
    return (
      <View style={{width: '100%', marginBottom: 3}}>
        <Text numberOfLines={2} ellipsizeMode={'tail'} style={[gs.text, {fontSize: 10, color: '#999'}]}>
          <Text style={{color: '#FF8F00'}}>{this.props.exerciseStore.sets}×</Text> {this.props.exerciseStore.details.info.name.toUpperCase()}
        </Text>
      </View>
    )
  }
}


// props: workoutStore<Workout>
@observer
@withNavigation
export default class MiniWorkoutGenerated extends React.Component {
  constructor(props) {
    super(props);
    this.workoutTemplateStore = this.props.workoutTemplateStore;
    this.musclesModelStore = new MusclesModelStore(this.workoutTemplateStore);
  }


  @observer
  render() {
    return (
      <Animated.View style={{
        padding: 5,
        marginBottom: 3,
        opacity: this.props.animation,
      }}>

        <ElevatedView elevation={3} style={{
          borderColor: '#222',
          borderWidth: StyleSheet.hairlineWidth,
          borderRadius: 5
        }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('Tweaker', {workoutTemplateStore: this.props.workoutTemplateStore});
            }}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              borderRadius: 5,
              padding: 3,
              paddingRight: 7,
              backgroundColor: '#131313',
              borderWidth: 0,
              borderColor: '#171717'
            }}>
            <MusclesModel
              musclesModelStore={this.musclesModelStore}
              touchable={false}
              scalable={false}
              width={200}
            />

            <View style={{flex: 1, paddingLeft: 14}}>
              <Text style={[gs.text, {color: '#ccc'}]}>{this.workoutTemplateStore.name}</Text>
              <Text style={[gs.text, {
                color: '#ccc',
                fontSize: 10,
                marginBottom: 7
              }]}>Estimated {this.workoutTemplateStore.workoutDurationText}</Text>
              {this.workoutTemplateStore.exercises.map((exerciseStore) => {
                return (
                  <MiniWorkoutExercise key={exerciseStore.id} exerciseStore={exerciseStore}/>
                )
              })}
            </View>

          </TouchableOpacity>
        </ElevatedView>
      </Animated.View>
    )
  }
}