import * as React from "react";
import {observer} from 'mobx-react';
import {Text, TouchableOpacity, View, StyleSheet, Animated} from 'react-native';
import {gs} from "../../globals";
import {PieChart} from "react-native-svg-charts";
import {Circle, G, Line, TSpan} from "react-native-svg";
import * as SVG from 'react-native-svg';

export default class EatScreen extends React.Component {
  state = {
    animation: new Animated.Value(0)
  };

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
    const pieData = [{
      type: 'PROTEINS',
      key: 'PROTEINS',
      value: 30,
      calories: 300,
      grams: 100,
      svg: {fill: '#EF6C00'}
    }, {
      type: 'FATS',
      key: 'FATS',
      value: 30,
      calories: 300,
      grams: 70,
      svg: {fill: '#2196F3'}
    }, {
      type: 'CARBS',
      key: 'CARBS',
      value: 40,
      calories: 400,
      grams: 130,
      svg: {fill: '#909779'}
    }];

    return (
      <Animated.View style={{opacity: this.state.animation, flex: 1, justifyContent: 'center'}}>
        <Text style={[gs.text, gs.shadow, {fontSize: 37, textAlign: 'center'}]}>2110 KCal</Text>
        <PieChart
          style={{height: 390, left: -10}}
          data={pieData}
          innerRadius={40}
          outerRadius={70}
          labelRadius={150}
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
                fontWeight="bold"
                stroke={'rgba(0,0,0,0.5)'}
                fontSize="17"
                textAnchor="middle">
                <TSpan x={labelCentroid[0]} y={labelCentroid[1]}>{item.type}</TSpan>
                <TSpan x={labelCentroid[0]} y={labelCentroid[1] + 17}>{item.grams + ' G'}</TSpan>
              </SVG.Text>
            </G>
          )}

        />
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  }
});