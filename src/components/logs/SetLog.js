import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {observer} from 'mobx-react';
import _ from 'lodash';
import {gs} from "../../globals";

@observer
export default class SetLog extends React.Component {

  state = {
    reps: '',
    weight: ''
  };

  componentWillMount() {
    this.exerciseLogSetStore = this.props.exerciseLogSetStore;

    this.setState({
      reps: this.exerciseLogSetStore.reps ? this.exerciseLogSetStore.reps.toString() : '',
      weight: this.exerciseLogSetStore.weight ? this.exerciseLogSetStore.weight.toString() : ''
    });

    this.debounceUpdateReps = _.debounce(this.exerciseLogSetStore.updateReps.bind(this.exerciseLogSetStore), 1000);
    this.debounceUpdateWeight = _.debounce(this.exerciseLogSetStore.updateWeight.bind(this.exerciseLogSetStore), 1000);
  }


  @observer
  render() {
    return (
      <View style={{alignItems: 'center'}}>
        <TextInput
          style={[gs.text, styles.input]}
          underlineColorAndroid={'transparent'}
          placeholder={'REPS'}
          placeholderTextColor={'#555'}
          selectionColor={'#ccc'}
          keyboardType={'numeric'}
          value={this.state.reps}
          onChangeText={(val) => {
            if (!isNaN(parseFloat(val))) {
              this.setState({reps: val});
              this.debounceUpdateReps(parseFloat(val));
            } else {
              this.setState({reps: ''});
              this.debounceUpdateReps(0);
            }
          }}
        />
        <TextInput
          style={[gs.text, styles.input]}
          underlineColorAndroid={'transparent'}
          keyboardType={'numeric'}
          placeholderTextColor={'#444'}
          selectionColor={'#ccc'}
          placeholder={'KG'}
          value={this.state.weight}
          onChangeText={(val) => {
            if (!isNaN(parseFloat(val))) {
              this.setState({weight: val});
              this.debounceUpdateWeight(parseFloat(val));
            } else {
              this.setState({weight: ''});
              this.debounceUpdateWeight(0);
            }
          }}
        />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    textAlign: 'center',
    backgroundColor: 'transparent',
    color: '#ccc',
    marginBottom: 0,
    marginLeft: 3,
    marginRight: 3,
    padding: 0,
    paddingRight: 5,
    paddingLeft: 5,
    height: 35,
    minWidth: 55
  }
});