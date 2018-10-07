import {gs} from "../../globals";
import * as React from "react";
import {Platform, Easing, Animated, Dimensions, Text, TouchableWithoutFeedback, View, Image} from "react-native";
import Interactable from 'react-native-interactable';
import {observer} from 'mobx-react';
import {autorun} from 'mobx';
import ElevatedView from "../ElevatedView";
import tipsStore from '../../store/tipsStore';

const offset = 17;
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
    scale: new Animated.Value(1),
    bounce: new Animated.Value(0),
    ringing: false
  };

  componentDidMount() {
    autorun(() => {
      if (tipsStore.isRinging || tipsStore.firstLoad) {
        this.setState({ringing: true});
        // tipsStore.firstLoad = false;
        this.bounce();
      } else {
        this.setState({ringing: false});
      }
    })
  }

  bounce() {
    if (this.state.ringing) {
      return;
    }

    let up = true;
    let loop = () => {
      Animated.timing(this.state.bounce, {
        toValue: up ? 1.07 : 1,
        duration: 300,
        easing: Easing.quad,
        useNativeDriver: true
      }).start(() => {
        up = !up;
        if (this.state.ringing) {
          loop();
        }
        if (!this.state.ringing && !up) {
          loop();
        }

        tipsStore.firstLoad = false;
      });
    };
    loop();
  }

  circlePressed() {
    if (tipsStore.isRinging) {
      tipsStore.stopRinging(tipsStore.currentTips.id);
    }
    tipsStore.openTipsModal();
  }

  render() {
    let {height, width} = Dimensions.get('window');
    const size = 65;
    const outerCircleSize = size - 8;
    const innerCircleSize = outerCircleSize - 4;

    return <TouchableWithoutFeedback
      onPress={() => {
        if (Platform.OS === 'ios') {
          this.circlePressed();
        }
      }}>
      <Interactable.View
        style={{
          position: 'absolute',
          width: size + 7, height: size + 7,
          alignItems: 'center',
          justifyContent: 'center'
        }}
        animatedNativeDriver={false}
        onDrag={() => {
          if (Platform.OS === 'android') {
            this.circlePressed();
          }
        }}
        initialPosition={{x: (width - size) + offset, y: 100}}
        boundaries={{
          top: topMax,
          bottom: height - size
        }}
        snapPoints={getPoints(size, 20, width, height)}>

        <Animated.View
          style={{
            transform: [{scale: this.state.scale}, {scale: this.state.bounce}],
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
              backgroundColor: 'rgba(255,255,255, 1)',
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
                backgroundColor: '#FB8C00',
                borderRadius: innerCircleSize / 2,
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <View style={{
                width: '100%',
                height: '100%',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: innerCircleSize / 2
              }}>

                <Image
                  style={{
                    width: 45,
                    height: 45,
                    top: 5
                  }}
                  source={require('../../assets/icon-man.png')}
                />

                <Text style={[gs.longTextBold, gs.shadow, {
                  top: -6,
                  color: '#fff',
                  textAlign: 'center'
                }]}>{tipsStore.currentTips.count}</Text>
              </View>

            </ElevatedView>
          </ElevatedView>
        </Animated.View>

      </Interactable.View>
    </TouchableWithoutFeedback>
  }
}