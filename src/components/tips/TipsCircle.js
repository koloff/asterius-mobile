import {gs} from "../../globals";
import * as React from "react";
import {PanResponder, Button, Animated, Dimensions, Text, TouchableWithoutFeedback, View} from "react-native";
import Interactable from 'react-native-interactable';
import {observer} from 'mobx-react';
import ElevatedView from "../ElevatedView";

import tipsStore from '../../store/tipsStore';

const offset = 15;
const topMax = 50;

function getPoints(length, count, windowWidth, windowHeight) {
  let arr = [];
  let mult = 0;
  for (let i = 0; i < count; i++) {
    arr.push({x: -offset, y: windowHeight * mult});
    mult += 1 / count;
  }
  mult = 0;
  for (let i = 0; i < count; i++) {
    arr.push({x: windowWidth - length + offset, y: windowHeight * mult});
    mult += 1 / count;
  }
  return arr;
}

@observer
export default class TipsCircle extends React.Component {

  state = {
    isDragging: false,
    scale: new Animated.Value(1)
  };


  render() {
    let {height, width} = Dimensions.get('window');
    const size = 65;
    const outerCircleSize = size - 8;
    const innerCircleSize = outerCircleSize - 5;

    return <Interactable.View
      style={{
        position: 'absolute',
        width: size, height: size
      }}
      onDrag={() => {
        if (!this.state.isDragging) {
          this.setState({isDragging: true});
          Animated.spring(this.state.scale, {toValue: 1.2, friction: 3}).start();
        } else {
          this.setState({isDragging: false});

          Animated.spring(this.state.scale, {toValue: 1, friction: 3}).start();
        }
      }}
      initialPosition={{x: -offset, y: 0}}
      boundaries={{
        top: topMax,
        bottom: height - size
      }}
      snapPoints={getPoints(size, 20, width, height)}>

      <Animated.View
        style={{
          transform: [{scale: this.state.scale}],
          width: size,
          height: size,
          borderRadius: size / 2,
          alignItems: 'center',
          justifyContent: 'center',
          // backgroundColor: 'red'
        }}
      >
        <ElevatedView
          elevation={8}
          style={{
            width: outerCircleSize,
            height: outerCircleSize,
            backgroundColor: 'rgba(255,255,255, 0.7)',
            borderRadius: outerCircleSize / 2,
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >

          <ElevatedView
            elevation={2}
            style={{
              width: innerCircleSize,
              height: innerCircleSize,
              backgroundColor: '#FFA000',
              borderRadius: innerCircleSize / 2,
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => {
                if (tipsStore.currentTips.count === 3) {
                  tipsStore.setTips(tipsStore.tips.demo2)
                } else {
                  tipsStore.setTips(tipsStore.tips.demo)
                }
                tipsStore.openTipsModal();
              }}
            >

              <View style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: innerCircleSize / 2
              }}><Text style={[gs.text]}>{tipsStore.currentTips.count}</Text></View>

            </TouchableWithoutFeedback>

          </ElevatedView>
        </ElevatedView>
      </Animated.View>

    </Interactable.View>
  }
}