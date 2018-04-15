import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Modal, Button, Image, ImageBackground} from 'react-native';
import {observer} from 'mobx-react';
import {computed} from 'mobx';
import * as Mobx from "mobx";
import {gs} from "../../globals";

import moment from 'moment';

import MusclesModelStore from "../../store/MusclesModelStore";
import {withNavigation} from "react-navigation";
import ElevatedView from "../ElevatedView";

import Ionicons from "react-native-vector-icons/Ionicons";
import workoutsLogsStore from "../../store/workoutsLogsStore";
import Entypo from "react-native-vector-icons/Entypo";

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

  @computed get performedString(){
    let days = Math.abs(moment(this.props.workoutTemplateStore.lastPerformedDate).diff(moment(), 'days'));
    if (days === 0) {
      return 'TODAY';
    }
    if (days === 1) {
      return 'YESTERDAY'
    }
    return `${days} DAYS AGO`;
  }

  @observer
  render() {
    return (
      <View style={{paddingBottom: 15}}>

        {!this.state.loading && <View style={{flexDirection: 'row'}}>

          <ElevatedView elevation={3} style={{
            flex: 1,
            borderRadius: 5,
            borderColor: '#222',
            borderWidth: StyleSheet.hairlineWidth,
            backgroundColor: '#101010',
            height: 100
          }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                flex: 1,
                borderRadius: 5,
                borderTopLeftRadius: 5,
                borderTopRightRadius: 5,
                borderColor: '#222',
                justifyContent: 'center',
                backgroundColor: '#151515',
              }}
              onPress={() => {
                this.props.navigation.navigate('Tweaker', {
                  workoutTemplateStore: this.props.workoutTemplateStore,
                  canDelete: true
                })
              }}>

              <View style={{
                top: -5,
                padding: 6,
                paddingLeft: 10,
                flex: 1,
                width: '100%',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
                <Text style={[gs.text, {
                  fontSize: 19,
                  color: '#999'
                }]}>{this.props.workoutTemplateStore.name}</Text>
                <Text style={[gs.text, {
                  marginTop: 1,
                  fontSize: 11,
                  color: '#999'
                }]}>{this.workoutTemplateStore.workoutDurationText}</Text>
              </View>

              {this.props.workoutTemplateStore.lastPerformedDate && <Text style={[gs.text, {
                position: 'absolute',
                bottom: 3,
                width: '100%',
                fontSize: 10,
                textAlign: 'center',
                color: '#555'
              }]}><Entypo name={'back-in-time'} size={9}/>
                 &nbsp;{this.performedString}
              </Text>}
            </TouchableOpacity>
          </ElevatedView>

          <View style={{
            width: 100,
            justifyContent: 'center'
          }}>

            {!this.props.selectedDateStr ? <View style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              top: -3
            }}>
              <Text style={[gs.text, {fontSize: 12, color: '#EF6C00', textAlign: 'center'}]}>SELECT{'\n'}DATE</Text>
            </View> : <View style={{
              flex: 1,
              // backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center'
            }}>
              <TouchableOpacity
                onPress={async () => {
                  let date = this.props.selectedDateStr;
                  await workoutsLogsStore.startNewWorkoutLog(date, this.props.workoutTemplateStore);
                  this.props.navigation.navigate('WorkoutLog', {workoutLogDateStr: date})
                }}
                style={{
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                <Image
                  resizeMode={'stretch'}
                  source={require('../../assets/play.png')} style={{
                  width: 21,
                  height: 26,
                  alignItems: 'center',
                  justifyContent: 'center', marginBottom: 3
                }}/>
                <Text style={[gs.text, gs.shadow, {color: '#F57C00', fontSize: 12}]}>
                  {moment(this.props.selectedDateStr).format('D MMM')}
                </Text>
              </TouchableOpacity>
            </View>}
          </View>


        </View>}
      </View>
    )
  }
}