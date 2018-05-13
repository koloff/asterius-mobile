import React from 'react';
import { View, Platform } from 'react-native';

export default class ElevatedView extends React.Component {
  static defaultProps = {
    elevation: 0
  };

  render() {
    const { elevation, style, ...otherProps } = this.props;

    if (Platform.OS === 'android') {
      return (
        <View elevation={elevation} style={[{ elevation }, style ]} {...otherProps}>
          {this.props.children}
        </View>
      );
    }

    if (elevation === 0) {
      return (
        <View style={[style]} {...otherProps}>
          {this.props.children}
        </View>
      )
    }

    //calculate iosShadows here
    const iosShadowElevation = {
      shadowOpacity: 0.2 * elevation + 0.2,
      shadowRadius: 1 * elevation,
      shadowOffset: {
        width: 0,
        height: 0
      }
    };

    return (
      <View style={[iosShadowElevation, style]} {...otherProps}>
        {this.props.children}
      </View>
    );
  }
}