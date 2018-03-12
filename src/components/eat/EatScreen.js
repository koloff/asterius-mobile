import * as React from "react";
import {observer} from 'mobx-react';
import {Text, TouchableOpacity, View, StyleSheet, Animated, Slider} from 'react-native';
import {gs} from "../../globals";
import {PieChart} from "react-native-svg-charts";
import {Circle, G, Line, TSpan} from "react-native-svg";
import * as SVG from 'react-native-svg';
import eatStore from "../../store/eatStore";
import ElevatedView from "../ElevatedView";
import userParametersStore from "../../store/userParametersStore";

const goals = [
  'LOOSE THE MOST FAT\nRISK THE MOST MUSCLE',
  'LOOSE MORE FAT\nRISK SOME MUSCLE',
  'GAIN LEAN MUSCLE STEADY\nRECOMMENDED',
  'GAIN MORE MUSCLE\nGAIN SOME FAT',
  'GAIN THE MOST MUSCLE\nGAIN THE MOST FAT',
];

const activities = [
  'SEDENTARY LIFESTYLE\nINFREQUENT WORKOUTS',
  'LIGHTLY ACTIVE LIFESTYLE\nFEW WORKOUTS PER WEEK',
  'MODERATELY ACTIVE LIFESTYLE\nWORKOUT FREQUENTLY',
  'VERY ACTIVE LIFESTYLE\nWORKOUT FREQUENTLY',
  'ATHLETE\nHIGH INTENSITY',
];

@observer
export default class EatScreen extends React.Component {
  state = {
    animation: new Animated.Value(0)
  };

  constructor(props) {
    super(props);
    this.loadedGoal = userParametersStore.parameters.goal;
    this.loadedActivity = userParametersStore.parameters.activity;
  }

  componentDidMount() {
    setTimeout(() => {
      Animated.timing(this.state.animation, {
        toValue: 1,
        useNativeDriver: true,
        duration: 333
      }).start();
    }, 100)
  }

  render() {
    return (
      <Animated.View style={{opacity: this.state.animation, flex: 1, justifyContent: 'center'}}>

        <View style={{
          flexDirection: 'row'
        }}>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={[gs.text, gs.shadow, {
              color: '#888',
              fontSize: 10,
              textAlign: 'center',
              position: 'absolute',
              top: 18
            }]}>{goals[userParametersStore.parameters.goal - 1]}</Text>
            <Slider
              thumbTintColor={'#F57C00'}
              minimumTrackTintColor={'#F57C00'}
              maximumTrackTintColor={'#888'}
              step={1}
              minimumValue={1}
              maximumValue={5}
              value={this.loadedGoal}
              onValueChange={(val) => {
                userParametersStore.setParameterImmediate('goal', val)
              }}
              onSlidingComplete={(val) => {
                userParametersStore.setParameterFinish('goal', val)
              }}
              style={{
                top: 25,
                width: '100%',
                height: 100
              }}
            />
          </View>
          <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text style={[gs.text, gs.shadow, {
              color: '#888',
              fontSize: 10,
              textAlign: 'center',
              position: 'absolute',
              top: 18
            }]}>{activities[userParametersStore.parameters.activity - 1]}</Text>
            <Slider
              thumbTintColor={'#F57C00'}
              minimumTrackTintColor={'#F57C00'}
              maximumTrackTintColor={'#888'}
              step={1}
              minimumValue={1}
              maximumValue={5}
              value={this.loadedActivity}
              onValueChange={(val) => {
                userParametersStore.setParameterImmediate('activity', val)
              }}
              onSlidingComplete={(val) => {
                userParametersStore.setParameterFinish('activity', val)
              }}
              style={{
                top: 25,
                width: '100%',
                height: 100
              }}
            />
          </View>
        </View>


        <View style={{height: 400, width: 400, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={[gs.text, gs.shadow, {
            position: 'absolute',
            top: 165,
            fontSize: 29,
            textAlign: 'center'
          }]}>{eatStore.calories}{'\n'}<Text style={{fontSize: 21}}>KCal</Text></Text>
          <PieChart
            style={{height: 400, width: 400}}
            data={eatStore.macrosChartData}
            innerRadius={58}
            outerRadius={80}
            labelRadius={150}
            contentInset={{top: 0, left: 0, right: 0, bottom: 0}}
            renderDecorator={({item, pieCentroid, labelCentroid, index}) => (
              <G key={index}>
                <Line
                  x1={labelCentroid[0]}
                  y1={labelCentroid[1]}
                  x2={pieCentroid[0]}
                  y2={pieCentroid[1]}
                  stroke={item.svg.fill}
                />
                <Circle
                  cx={labelCentroid[0]}
                  cy={labelCentroid[1]}
                  r={50}
                  fill={item.svg.fill}
                />
                <SVG.Text
                  fill="white"
                  // fontWeight="bold"
                  // stroke={'rgba(255,255,255,1)'}
                  fontSize="17"
                  fontFamily={'Montserrat'}
                  textAnchor="middle">
                  <TSpan x={labelCentroid[0]} y={labelCentroid[1]}>{item.type}</TSpan>
                  <TSpan x={labelCentroid[0]} y={labelCentroid[1] + 17}>{item.grams + 'g'}</TSpan>
                </SVG.Text>
              </G>
            )}
          />
        </View>


      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  }
});