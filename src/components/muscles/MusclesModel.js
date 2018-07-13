import React from 'react';
import {
  View, PanResponder, Dimensions, Text, StyleSheet, Animated
} from 'react-native';
import {Svg} from 'react-native-svg';

import {observer} from 'mobx-react';

import {malePoints, femalePoints} from '../muscles/musclesPoints';
import check from '../utils/checkMusclePolygon';
import isClick from "../../utils/isClick";
import ZoomView from "../ZoomView";
import MusclesModelMuscle from './MusclesModelMuscle';
import {gs} from "../../globals";
import authStore from "../../store/authStore";
import userParametersStore from "../../store/userParametersStore";

// props: MusclesModelStore
@observer
export default class MusclesModel extends React.Component {
  state = {
    isClick: true,
    scalable: this.props.scalable === undefined ? true : this.props.scalable,
    touchable: this.props.touchable === undefined ? true : this.props.touchable,
  };

  constructor(props) {
    super(props);
    // DIMENSIONS OF THE SVG
    this.svgWidth = 300 * 2;
    this.svgHeight = 600;

    if (this.props.width) {
      this.scale = this.props.width / this.svgWidth;
    } else if (this.props.height) {
      this.scale = this.props.height / this.svgHeight;
    } else {
      this.scale = 0.6;
    }
    // INITIAL SCALES
    this.minScale = this.scale;
    this.maxScale = 1.5;
  }


  // have to check with math due to bug in react-native-svg
  checkMuscleClicked(locationX, locationY, sidePoints) {
    sidePoints.forEach((muscle) => {
      if (!muscle.decor) {
        muscle.points.forEach((pointsArr) => {
          if (check(locationX, locationY, pointsArr) === -1) {
            return this.props.onMusclePress && this.props.onMusclePress(muscle.id);
          }
        })
      }
    })
  }

  // have to use pan responder because TouchableWithoutFeedback does not transform scale well
  _getModelPanResponder(sidePoints) {
    return {
      onStartShouldSetPanResponderCapture: (e, gestureState) => {
        return isClick(e, gestureState);
      },

      onPanResponderMove: (e, gestureState) => {
        let click = isClick(e, gestureState);
        if (!click) {
          this.setState({isClick: false});
        }
      },

      onPanResponderRelease: (e, gestureState) => {
        if (this.state.isClick) {
          this.checkMuscleClicked(e.nativeEvent.locationX, e.nativeEvent.locationY, sidePoints);
        }
        this.setState({isClick: true});
      }
    }
  }


  renderModelSide(sidePoints) {
    return (
      <Svg width={300} height={600} style={{}}>
        {sidePoints.map((muscle) => {
          return muscle.points.map((pointsStr, index) => (
            <MusclesModelMuscle
              key={muscle.id + index}
              decor={muscle.decor}
              id={muscle.id}
              musclesModelMuscleStore={!muscle.decor ? this.props.musclesModelStore.getMusclesModelMuscleStore(muscle.id) : null}
              pointsStr={pointsStr}
            />
          ));
        })}
      </Svg>
    )
  }


  renderModels() {
    let frontPoints, backPoints;
    if (userParametersStore.parameters.gender === 2) {
      frontPoints = femalePoints.front;
      backPoints = femalePoints.back;
    } else {
      frontPoints = malePoints.front;
      backPoints = malePoints.back;
    }

    let panResponderFront = PanResponder.create(this._getModelPanResponder(frontPoints));
    let panResponderBack = PanResponder.create(this._getModelPanResponder(backPoints));

    const propsFront = this.state.touchable ? {...panResponderFront.panHandlers} : {};
    const propsBack = this.state.touchable ? {...panResponderBack.panHandlers} : {};
    return (
      <Animated.View style={{flexDirection: 'row'}}>
        <View {...propsFront}>
          {this.renderModelSide(frontPoints)}
        </View>
        <View {...propsBack}>
          {this.renderModelSide(backPoints)}
        </View>
      </Animated.View>
    )
  }

  render() {

    if (this.state.scalable) {
      return (
        <ZoomView
          scale={this.scale}
          minScale={this.minScale}
          maxScale={this.maxScale}
          onPress={(locationX, locationY, targetId) => {
            this.checkMuscleClicked(locationX, locationY, targetId)
          }}
          style={{
            ...this.props.style,
            height: this.props.height ? this.props.height + 10 : this.svgHeight * this.scale,
            width: this.props.width ? this.props.width : Dimensions.get('window').width - 12,
            marginLeft: 4
          }}>
          {this.renderModels()}
          <View style={styles.zoomTextBox}>
            <Text style={[gs.text, {color: '#777', fontSize: 18}]}>PINCH TO</Text>
            <Text style={[gs.text, {color: '#777', fontSize: 28}]}>ZOOM</Text>
          </View>
        </ZoomView>
      )
    }

    // not scalable
    else {
      return <View style={{
        width: this.props.width ? this.props.width : this.svgWidth * this.scale,
        height: this.props.height ? this.props.height : this.svgHeight * this.scale,
        alignContent: 'center',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <View style={{
          // width: this.svgWidth,
          // height: this.svgHeight,
          transform: [
            {translateX: 0},
            {scale: this.scale},
          ]
        }}>
          {this.renderModels()}
        </View>
      </View>;
    }

  }
}

const styles = StyleSheet.create({
  zoomTextBox: {
    position: 'absolute',
    alignItems: 'center',
    alignSelf: 'center',
    bottom: 30
  }
});
