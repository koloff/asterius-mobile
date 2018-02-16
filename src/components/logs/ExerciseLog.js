import React from 'react';
import {View, Text, Button} from 'react-native';
import {observer} from 'mobx-react';
import {gs} from "../../globals";

export default class ExerciseLog extends React.Component {

  componentWillMount() {
    this.id = this.props.id;
  }

  render() {
    return (
      <View><Button onPress={() => {}}></Button><Text style={[gs.text]}>{this.id}</Text></View>
    )
  }
}