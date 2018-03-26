import React from 'react';
import {StyleSheet, Text, View, Animated, TouchableWithoutFeedback} from 'react-native';
import ElevatedView from "./ElevatedView";
import {observer} from 'mobx-react';

@observer
class Option extends React.Component {
  state = {
    isActive: this.props.isActive,
    animation: new Animated.Value(this.props.isActive ? 1 : 0)
  };


  componentWillReceiveProps(nextProps) {
    Animated.timing(
      this.state.animation,
      {
        toValue: nextProps.isActive ? 1 : 0,
        duration: 150,
        useNativeDriver: true,
      }
    ).start(() => {
      // nextProps.isActive && this.props.onValueChangeCb(this.props.value);
    });

  }

  render() {
    this.opacity = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.4, 0.8]
    });
    this.scale = this.state.animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0.95, 1]
    });

    return (
      <Animated.View
        style={[
          {
            flex: 1,
            padding: 4,
            opacity: this.opacity,
            transform: [{scaleX: this.scale}, {scaleY: this.scale}]
          }
        ]}>
        <ElevatedView elevation={4} style={{
          padding: 0, flex: 1, backgroundColor: '#333',
          borderRadius: 5,
        }}>
          <TouchableWithoutFeedback
            style={{flex: 1}}
            onPress={() => {
              this.props.onSelectedChange(this.props.value)
            }}>
            <View style={[this.props.optionStyle, {
              borderWidth: StyleSheet.hairlineWidth,
              borderColor: '#222',
              borderRadius: 5,
              flex: 1
            }]}>
              {this.props.child}
            </View>
          </TouchableWithoutFeedback>
        </ElevatedView>

      </Animated.View>);
  }
}

@observer
export default class RadioButtons extends React.Component {
  onSelectedChange(value) {
    this.props.onSelectedChange && this.props.onSelectedChange(value);
  }

  render() {
    return (
      <View style={[{flex: 1}, this.props.style,]}>
        {
          React.Children.map(
            this.props.children,
            (child, i) => {
              let isActive = this.props.selected === child.props.value;

              return <Option
                key={i}
                isActive={isActive}
                value={child.props.value}
                onSelectedChange={this.onSelectedChange.bind(this)}
                optionStyle={this.props.optionStyle}
                child={child}
              />
            }
          )
        }
      </View>
    );
  }
}