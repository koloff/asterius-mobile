import React, {Component} from 'react';
import {
  View,
  PanResponder,
  Animated, TouchableWithoutFeedback,
} from 'react-native';

import isClick from '../utils/isClick';


function getDistance(e) {
  let dx = Math.abs(e.nativeEvent.touches[0].pageX - e.nativeEvent.touches[1].pageX);
  let dy = Math.abs(e.nativeEvent.touches[0].pageY - e.nativeEvent.touches[1].pageY);
  return Math.sqrt(dx * dx + dy * dy);
}

export default class ZoomView extends Component {
  state = {
    lastTouchesCount: 0,

    minScale: this.props.minScale || 0.5,
    maxScale: this.props.maxScale || 1.5,

    //scale
    scale: this.props.scale || 1,
    lastScale: this.props.scale || 1,
    distance: 1,
    pinchStarted: false,

    // translate
    lastPivotX: 0,
    lastPivotY: 0,
    offsetX: 0,
    offsetY: 0,

    // to create move borders
    containerWidth: 0,
    containerHeight: 0,
    childrenWidth: 0,
    childrenHeight: 0,
  };

  _panResponder = PanResponder.create({
    onMoveShouldSetPanResponderCapture: (e, gestureState) => {
      return !isClick(e, gestureState);
    },
    onPanResponderMove: (e, gestureState) => {
      let touchesCount = gestureState.numberActiveTouches;
      let pivotChanged = false;
      let pivotX, pivotY;

      // pinch
      if (touchesCount === 2) {
        if (this.state.lastTouchesCount !== 2) {
          pivotChanged = true;
        }
        this.setState({lastTouchesCount: touchesCount});

        pivotX = (e.nativeEvent.touches[0].pageX + e.nativeEvent.touches[1].pageX) / 2;
        pivotY = (e.nativeEvent.touches[0].pageY + e.nativeEvent.touches[1].pageY) / 2;

        // SCALE
        if (!this.state.pinchStarted) {
          this.state.pinchStarted = true;
          let distance = getDistance(e);
          this.setState({distance});
        }
        if (!pivotChanged) {
          let distance = getDistance(e);
          let scale = (distance / this.state.distance) * this.state.lastScale;
          let minScale = this.state.minScale;
          let maxScale = this.state.maxScale;
          if (!(scale < minScale || scale > maxScale)) {
            this.setState({
              scale: scale
            });
            //   if (this.props.onScale) {
            //     let percentage = (scale - minScale) / (maxScale - minScale);
            //     this.props.onScale((percentage));
            //   }
          }
        }
      }
      // 0, 1, 3 or more fingers move
      else {
        if (this.state.lastTouchesCount === 2 || this.state.lastTouchesCount === 0) {
          pivotChanged = true;
          this.setState({
            pinchStarted: false,
            lastScale: this.state.scale
          })
        }
        this.setState({lastTouchesCount: touchesCount});

        pivotX = e.nativeEvent.touches[0].pageX;
        pivotY = e.nativeEvent.touches[0].pageY;
      }

      // MOVE
      if (pivotChanged) {
        this.setState({
          lastPivotX: pivotX,
          lastPivotY: pivotY,
        })
      } else {
        let differenceWidth = this.state.childrenWidth * this.state.scale - this.state.containerWidth;
        let differenceHeight = this.state.childrenHeight * this.state.scale - this.state.containerHeight;

        // move directions
        let right = (pivotX - this.state.lastPivotX) > 0;
        let down = (pivotY - this.state.lastPivotY) > 0;

        if (right && this.state.offsetX * this.state.scale * 2 < Math.abs(differenceWidth)) {
          this.setState({offsetX: this.state.offsetX + (pivotX - this.state.lastPivotX) / this.state.scale});
        } else if (!right && this.state.offsetX * this.state.scale * -2 < Math.abs(differenceWidth)) {
          this.setState({offsetX: this.state.offsetX + (pivotX - this.state.lastPivotX) / this.state.scale});
        }
        if (down && this.state.offsetY * this.state.scale * 2 < Math.abs(differenceHeight)) {
          this.setState({offsetY: this.state.offsetY + (pivotY - this.state.lastPivotY) / this.state.scale});
        } else if (!down && this.state.offsetY * this.state.scale * -2 < Math.abs(differenceHeight)) {
          this.setState({offsetY: this.state.offsetY + (pivotY - this.state.lastPivotY) / this.state.scale});
        }

        this.setState({
          lastPivotX: pivotX,
          lastPivotY: pivotY,
        });
      }
    },

    onPanResponderRelease: (e, gestureState) => {
      this.setState({
        lastTouchesCount: 0,
        pinchStarted: false,
        lastScale: this.state.scale,
      });
    }
  });

  render() {
    return (
      <View
        {...this._panResponder.panHandlers}
        style={{
          ...this.props.style,
          alignContent: 'center',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onLayout={(event) => {
          let {x, y, width, height} = event.nativeEvent.layout;
          this.setState({
            containerWidth: width,
            containerHeight: height,
          })
        }}
      >
        <Animated.View
          style={{
            transform: [
              {scaleX: this.state.scale},
              {scaleY: this.state.scale},
              {translateX: this.state.offsetX},
              {translateY: this.state.offsetY}
            ]
          }}
          onLayout={(event) => {
            let {x, y, width, height} = event.nativeEvent.layout;
            this.setState({
              childrenWidth: width,
              childrenHeight: height,
            })
          }}
        >
          {this.props.children}
        </Animated.View>
      </View>
    )
  }
}