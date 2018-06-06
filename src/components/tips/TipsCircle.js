import {gs} from "../../globals";
import * as React from "react";
import {TouchableOpacity, Text, View, Animated, PanResponder} from "react-native";

export default class TipsCircle extends React.Component {


  state = {
    pan: new Animated.ValueXY(),
    scale: new Animated.Value(1)
  };


  _panResponder = PanResponder.create({
    onMoveShouldSetResponderCapture: () => true,
    onMoveShouldSetPanResponderCapture: () => true,

    onPanResponderGrant: (e, gestureState) => {
      // Set the initial value to the current state
      this.state.pan.setOffset({x: this.state.pan.x._value, y: this.state.pan.y._value});
      this.state.pan.setValue({x: 0, y: 0});

      Animated.spring(
        this.state.scale,
        {toValue: 1.1, friction: 3}
      ).start();
    },

    onPanResponderMove: Animated.event([
      null, {dx: this.state.pan.x, dy: this.state.pan.y},
    ]),


    onPanResponderRelease: (e, {dx, dy, vx, vy}) => {
      // Flatten the offset to avoid erratic behavior
      console.log(dx, dy, vx, vy);
      Animated.timing(this.state.pan,
        {
          toValue:
            {
              x: this.state.pan * vx,
              y: this.state.pan * vy,
            }
        }
      ).start();
      this.state.pan.flattenOffset();

      Animated.spring(this.state.scale, {toValue: 1, friction: 3}).start();
    }
  });

  render() {
    let pan = this.state.pan;
    let scale = this.state.scale;
    // Calculate the x and y transform from the pan value
    let [translateX, translateY] = [pan.x, pan.y];
    let rotate = '0deg';

    return <Animated.View
      {...this._panResponder.panHandlers}
      style={{
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#fff',
        position: 'absolute',
        transform: [{translateX}, {translateY}, {rotate}, {scale}]
      }}>


    </Animated.View>
  }
}