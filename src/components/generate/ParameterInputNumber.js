import {View, TextInput, Text, StyleSheet} from 'react-native';
import {gs} from "../../globals";
import React from "react";
import {observer} from "mobx-react";
import ElevatedView from "../ElevatedView";

// props: title, onChange(val)
@observer
export default class ParameterInputNumber extends React.Component {

  state = {
    empty: true
  };

  render() {
    return (
      <View style={{top: -15, flex: 1, padding: 4, paddingTop: 0}}>
        <View><Text style={[gs.text, gs.shadow, {
          position: 'relative',
          zIndex: 99,
          top: 21,
          color: '#888',
          fontSize: 11,
          textAlign: 'center'
        }]}>{this.props.title}</Text></View>
        <TextInput
          keyboardType={'numeric'}
          underlineColorAndroid={'transparent'}
          placeholder={'0'}
          placeholderTextColor={'#555'}
          selectionColor={'#ccc'}
          value={isNaN(this.props.value) ? '' : this.props.value.toString()}
          onChangeText={(val) => {
            this.setState({empty: !val});
            this.props.onChangeText(!val ? '' : val | 0)
          }}
          style={[gs.shadow, {
            height: 75,
            color: '#ccc',
            borderWidth: StyleSheet.hairlineWidth,
            borderColor: '#222',
            backgroundColor: this.state.empty ? 'rgba(51, 51, 51, 0.4)' : 'rgba(51, 51, 51, 0.8)',
            fontSize: 19,
            fontFamily: 'Montserrat',
            margin: 3,
            textAlign: 'center',
            borderRadius: 3,
          }]}/>
        <View>
          <Text style={[gs.text, gs.shadow, {
            position: 'relative',
            top: -21,
            color: '#888',
            fontSize: 10,
            textAlign: 'center'
          }]}>{this.props.unit}</Text></View>
      </View>
    )
  }
}