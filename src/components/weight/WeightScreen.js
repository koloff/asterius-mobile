import * as React from "react";
import {observer} from 'mobx-react';
import {Text, TouchableOpacity, View, StyleSheet, Animated, TextInput, ScrollView} from 'react-native';
import {gs} from "../../globals";
import {Defs, LinearGradient, Stop} from 'react-native-svg'
import {LineChart} from 'react-native-svg-charts'
import * as shape from 'd3-shape'
import Ionicons from "react-native-vector-icons/Ionicons";
import weightLogsStore from '../../store/weightLogsStore';
import moment from "moment";
import ElevatedView from "../ElevatedView";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import AnimatedLoading from "../AnimatedLoading";

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
            gridMin={73}
            gridMax={85}
            curve={shape.curveNatural}
            extras={[Gradient]}
          />


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
                  weightLogsStore.loadLogs('1W');
                }}>
                <Text style={[gs.text, gs.shadow, {
                  fontSize: 19,
                  color: weightLogsStore.period === '1W' ? '#F57C00' : '#ccc'
                }]}>1 Week</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{padding: 15, paddingTop: 10}}
                onPress={() => {
                  weightLogsStore.loadLogs('1M');
                }}>
                <Text style={[gs.text, gs.shadow, {
                  fontSize: 19,
                  color: weightLogsStore.period === '1M' ? '#F57C00' : '#ccc'
                }]}>1 Month</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{padding: 15, paddingTop: 10}}
                onPress={() => {
                  weightLogsStore.loadLogs('3M');
                }}>
                <Text style={[gs.text, gs.shadow, {
                  fontSize: 19,
                  color: weightLogsStore.period === '3M' ? '#F57C00' : '#ccc'
                }]}>3 Months</Text>
              </TouchableOpacity>
            </View>
          </View>

          <ScrollView
            style={{backgroundColor: 'transparent'}}>
            <View style={{paddingLeft: 30, paddingRight: 30, paddingBottom: 20}}>
              <ElevatedView elevation={3} style={{
                borderRadius: 5,
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
                <TextInput
                  keyboardType={'numeric'}
                  underlineColorAndroid={'transparent'}
                  placeholder={'ADD WEIGHT'}
                  placeholderTextColor={'#F57C00'}
                  selectionColor={'#F57C00'}
                  value={isNaN(this.state.value) ? '' : this.state.value.toString()}
                  onChangeText={(val) => {
                    this.setState({value: val});
                  }}
                  onSubmitEditing={() => {
                    if (this.state.value) {
                      weightLogsStore.addLog(this.state.value);
                      this.setState({value: ''})
                    }
                  }}
                  style={[gs.shadow, {
                    position: 'absolute',
                    right: 0,
                    width: 150,
                    height: 50,
                    // borderWidth: 1,
                    // borderColor: '#F57C00',
                    color: '#F57C00',
                    // backgroundColor: 'rgba(51, 51, 51, 0.4)',
                    fontSize: 19,
                    fontFamily: 'Montserrat',
                    margin: 3,
                    textAlign: 'center',
                    borderRadius: 3,
                  }]}/>
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
      </View>
    );

  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  }
});