import React from 'react';
import {Animated, ActivityIndicator} from 'react-native';

export default function AnimatedLoading(props) {
  return <Animated.View
    style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      opacity: props.opacity
    }}>
    <ActivityIndicator size={'large'} color={'#333'}/>
  </Animated.View>
}