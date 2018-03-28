import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {observer} from 'mobx-react';
import _ from 'lodash';
import {gs} from "../../globals";
import userParametersStore from '../../store/userParametersStore';

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
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <View style={{alignItems: 'center'}}>
          <TextInput
            style={[gs.text, styles.input]}
            underlineColorAndroid={'transparent'}
            placeholder={'reps'}
            placeholderTextColor={'#555'}
            selectionColor={'#F57C00'}
            keyboardType={'numeric'}
            value={this.state.reps}
            onFocus={() => {
              this.props.scrollToExercise(this.props.containerHeight * this.props.exerciseIndex);
            }}
            onChangeText={(val) => {
              if (!isNaN(parseFloat(val))) {
                this.setState({reps: val});
                this.debounceUpdateReps(parseFloat(val));
              } else {
                this.setState({reps: ''});
                this.debounceUpdateReps(0);
              }
            }}
            onSubmitEditing={() => {
              if (!this.state.weight) {
                this._weightInput.focus();
              }
            }}
          />

          <TextInput
            style={[gs.text, styles.input]}
            underlineColorAndroid={'transparent'}
            keyboardType={'numeric'}
            placeholderTextColor={'#444'}
            selectionColor={'#F57C00'}
            placeholder={userParametersStore.parameters.measuringUnit === 1 ? 'kg' : 'lbs'}
            ref={(ref) => {
              this._weightInput = ref
            }}
            onFocus={() => {
              this.props.scrollToExercise(this.props.containerHeight * this.props.exerciseIndex);
            }}
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
        {/*<View style={{*/}
          {/*width: 0,*/}
          {/*borderWidth: StyleSheet.hairlineWidth,*/}
          {/*borderColor: '#333',*/}
          {/*height: 52*/}
        {/*}}>*/}
        {/*</View>*/}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input: {
    // textAlign: 'center',
    // borderRightWidth: StyleSheet.hairlineWidth,
    // borderColor: '#555',
    color: '#ccc',
    marginBottom: 0,
    padding: 0,
    paddingRight: 1,
    paddingLeft: 5,
    // height: 35,
    minWidth: 52
  }
});