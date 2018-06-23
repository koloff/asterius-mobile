import * as React from "react";
import {observer} from 'mobx-react';
import {Text, TouchableOpacity, View, StyleSheet, Animated, TextInput, ScrollView, Keyboard} from 'react-native';
import {gs} from "../../globals";
import {Defs, LinearGradient, Stop} from 'react-native-svg'
import {LineChart} from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import Ionicons from "react-native-vector-icons/Ionicons";
import userParametersStore from '../../store/userParametersStore';
import weightLogsStore from '../../store/weightLogsStore';
import moment from "moment";
import ElevatedView from "../ElevatedView";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AnimatedLoading from "../AnimatedLoading";
import WeightPremium from "./WeightPremium";
import subscriptionsStore from "../../store/subscriptionsStore";
import tipsStore from "../../store/tipsStore";

@observer
export default class WeightScreen extends React.Component {
  state = {
    animation: new Animated.Value(0),
    value: ''
  };

  componentDidMount() {
    weightLogsStore.init();
    setTimeout(() => {
      Animated.timing(this.state.animation, {
        toValue: 1,
        useNativeDriver: true,
        duration: 400
      }).start();
    }, 200)
  }

  submitLog() {
    if (this.state.value) {
      weightLogsStore.addLog(this.state.value);
      this.setState({value: ''})
    }
  }

  render() {
    const Gradient = () => (
      <Defs key={'gradient'}>
        <LinearGradient id={'gradient'} x1={'0'} y={'0%'} x2={'100%'} y2={'0%'}>
          <Stop offset={'0%'} stopColor={'#FF7043'}/>
          <Stop offset={'100%'} stopColor={'#F57C00'}/>
        </LinearGradient>
      </Defs>
    );

    return (<View style={{flex: 1}}>

        <AnimatedLoading opacity={this.state.animation.interpolate({
          inputRange: [0, 1],
          outputRange: [1, 0]
        })}/>

        <Animated.View style={{opacity: this.state.animation, flex: 1}}>

          <LineChart
            style={{
              marginTop: 10,
              height: 150,
              justifyContent: 'center'
            }}
            data={weightLogsStore.graphData}
            contentInset={{top: 10, bottom: 10}}
            showGrid={false}
            svg={{
              strokeWidth: 4,
              stroke: 'url(#gradient)',
            }}
            gridMin={weightLogsStore.logsData.min - 1}
            gridMax={weightLogsStore.logsData.max + 1}
            curve={shape.curveNatural}>
            <Gradient/>
          </LineChart>


          <View style={{
            // flex: 1,
            // backgroundColor: 'red',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 5,
            marginBottom: 20,
            flexDirection: 'row'
          }}>
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                style={{padding: 15, paddingTop: 10}}
                onPress={() => {
                  weightLogsStore.loadLogs(7);
                }}>
                <Text style={[gs.text, gs.shadow, {
                  fontSize: 19,
                  color: weightLogsStore.period === 7 ? '#F57C00' : '#ccc'
                }]}>7 Days</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{padding: 15, paddingTop: 10}}
                onPress={() => {
                  weightLogsStore.loadLogs(30);
                }}>
                <Text style={[gs.text, gs.shadow, {
                  fontSize: 19,
                  color: weightLogsStore.period === 30 ? '#F57C00' : '#ccc'
                }]}>30 Days</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{padding: 15, paddingTop: 10}}
                onPress={() => {
                  weightLogsStore.loadLogs(90);
                }}>
                <Text style={[gs.text, gs.shadow, {
                  fontSize: 19,
                  color: weightLogsStore.period === 90 ? '#F57C00' : '#ccc'
                }]}>90 days</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView
            keyboardShouldPersistTaps={'always'}
            style={{backgroundColor: 'transparent'}}>
            <View style={{paddingLeft: 30, paddingRight: 30, paddingBottom: 20}}>
              <ElevatedView elevation={3} style={{
                borderRadius: 5,
                height: 85,
                padding: 10,
                borderColor: '#222',
                borderWidth: StyleSheet.hairlineWidth,
                backgroundColor: '#151515',
                alignItems: 'center',
                flexDirection: 'row',
              }}>
                <View style={{padding: 10, paddingLeft: 5}}>
                  <Text style={[gs.text, {fontSize: 19, color: '#ccc'}]}>NOW</Text>
                </View>
                <View style={{
                  position: 'absolute',
                  right: 3,
                  marginTop: 1,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <TextInput
                    keyboardType={'numeric'}
                    underlineColorAndroid={'transparent'}
                    placeholder={userParametersStore.parameters.measuringUnit === 1 ? 'KG' : 'LBS'}
                    placeholderTextColor={'#F57C00'}
                    selectionColor={'#F57C00'}
                    value={isNaN(this.state.value) ? '' : this.state.value.toString()}
                    onChangeText={(val) => {
                      this.setState({value: val});
                    }}
                    onSubmitEditing={this.submitLog.bind(this)}
                    style={[gs.shadow, {
                      padding: 5,
                      // paddingBottom: 9,
                      // borderBottomWidth: 1,
                      borderColor: '#F57C00',
                      width: 55,
                      color: '#F57C00',
                      fontSize: 19,
                      fontFamily: 'Montserrat',
                      margin: 3,
                      textAlign: 'center',
                      // borderRadius: 5,
                    }]}/>
                  <TouchableOpacity
                    style={{padding: 10, paddingTop: 2, paddingBottom: 5, marginTop: 3}}
                    onPress={() => {
                      this.submitLog();
                      Keyboard.dismiss();
                    }}>
                    <Ionicons name={'md-checkmark'} color={'#F57C00'} size={27}/>
                  </TouchableOpacity>
                </View>
              </ElevatedView>
            </View>
            {weightLogsStore.logs.map((log, index) => {
                return <View key={index} style={{paddingLeft: 30, paddingRight: 30, paddingBottom: 20}}>
                  <ElevatedView elevation={3} style={{
                    borderRadius: 5,
                    borderColor: '#222',
                    borderWidth: StyleSheet.hairlineWidth,
                    backgroundColor: '#151515',
                    flexDirection: 'row',
                    alignItems: 'center'
                  }}>
                    <TouchableOpacity
                      style={{
                        // backgroundColor: 'red',
                        padding: 5,
                        paddingLeft: 10,
                        paddingRight: 10
                      }}
                      onPress={() => {
                        weightLogsStore.removeLog(log.key);
                      }}
                    >
                      <MaterialIcons color={'#999'} name={'delete'} size={29}/>
                    </TouchableOpacity>

                    <View style={{padding: 10, paddingLeft: 5}}>
                      <Text style={[gs.text, {
                        fontSize: 21,
                        color: '#ccc'
                      }]}>{moment(log.time).format('D MMM YYYY')}</Text>
                      <Text style={[gs.text, {color: '#999'}]}>{moment(log.time).format('H:MM')}</Text>
                    </View>
                    <Text style={[gs.text, {
                      color: '#F57C00',
                      fontSize: 25,
                      position: 'absolute',
                      right: 20
                    }]}>{log.weight}</Text>
                  </ElevatedView>
                </View>
              }
            )}
          </ScrollView>


        </Animated.View>


        {!subscriptionsStore.isSubscribed && <WeightPremium/>}
      </View>
    );

  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  }
});