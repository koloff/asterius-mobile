import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Modal, Button} from 'react-native';
import {observer} from 'mobx-react';
import * as Mobx from "mobx";
import {gs} from "../../globals";

import moment from 'moment';

import MusclesModelStore from "../../store/MusclesModelStore";
import {withNavigation} from "react-navigation";
import ElevatedView from "../ElevatedView";

import Ionicons from "react-native-vector-icons/Ionicons";
import workoutsLogsStore from "../../store/workoutsLogsStore";

// @withNavigation
@observer
export default class MiniWorkoutInList extends React.Component {


  state = {
    loading: true
  };

  componentDidMount() {
    this.workoutTemplateStore = this.props.workoutTemplateStore;
    this.musclesModelStore = new MusclesModelStore(this.workoutTemplateStore);
    this.setState({loading: false});
  }


  @observer
  render() {
    return (
      <View style={{paddingLeft: 5, paddingRight: 5, paddingBottom: 15}}>
        {!this.state.loading && <ElevatedView elevation={3} style={{
          borderRadius: 5,
          borderColor: '#222',
          borderWidth: StyleSheet.hairlineWidth,
          backgroundColor: '#101010',
        }}>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              flex: 1,
              borderTopLeftRadius: 5,
              borderTopRightRadius: 5,
              borderColor: '#222',
              // borderBottomWidth: StyleSheet.hairlineWidth,
              // backgroundColor: 'red',
              backgroundColor: '#151515',
            }}
            onPress={() => {
              this.props.navigation.navigate('Tweaker', {
                workoutTemplateStore: this.props.workoutTemplateStore,
                canDelete: true
              })
            }}>

            <View style={{padding: 4, paddingLeft: 10, flex: 1, width: '100%', alignItems: 'center'}}>
              <Text style={[gs.text, {
                fontSize: 13,
                color: '#bbb'
              }]}>{this.props.workoutTemplateStore.name}</Text>
              <Text style={[gs.text, {
                fontSize: 10,
                color: '#999',
                top: -2
              }]}>Estimated {this.workoutTemplateStore.workoutDurationText}</Text>
            </View>
          </TouchableOpacity>


          <View style={{
            flexDirection: 'row',
            padding: 5,
            backgroundColor: '#151515',
            borderBottomLeftRadius: 5,
            borderBottomRightRadius: 5
          }}>

            <View style={{flex: 1, padding: 5, paddingLeft: 12}}>
              <Text style={[gs.text, {color: '#aaa', fontSize: 8, textAlign: 'left'}]}>
                LAST PERFORMED{'\n'}<Text style={{fontSize: 14}}>
                {this.props.workoutTemplateStore.lastPerformedDate ? moment(this.props.workoutTemplateStore.lastPerformedDate).format('D MMM YYYY') : 'Not yet'}</Text>
              </Text>
            </View>

            <TouchableOpacity
              onPress={async () => {
                if (!this.props.selectedDateStr) {
                  return;
                }
                let date = this.props.selectedDateStr;
                console.log(this.props.workoutTemplateStore);
                await workoutsLogsStore.startNewWorkoutLog(date, this.props.workoutTemplateStore);
                this.props.navigation.navigate('WorkoutLog', {workoutLogDateStr: date})
              }}
              style={{
                // borderWidth: StyleSheet.hairlineWidth,
                backgroundColor: '#151515',
                borderColor: '#FF9800',
                padding: 5,
                paddingLeft: 7,
                paddingRight: 7,
                borderRadius: 5,
                justifyContent: 'center'
              }}>
              <Text style={[gs.text, gs.shadow, {color: '#FF9800', fontSize: 8, textAlign: 'center'}]}>
                {this.props.selectedDateStr ?
                  <Text><Ionicons name={'ios-play'} size={8}/>&nbsp;
                    PERFORM
                    ON{'\n'}
                    <Text style={{fontSize: 14}}>{moment(this.props.selectedDateStr).format('D MMM YYYY')}</Text></Text>
                  : <Text style={{fontSize: 8}}>USE THE CALENDAR{'\n'}TO SELECT A DATE</Text>}
              </Text>
            </TouchableOpacity>
          </View>

        </ElevatedView>}

      </View>
    )
  }
}