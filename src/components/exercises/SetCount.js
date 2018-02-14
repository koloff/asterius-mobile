import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Slider} from 'react-native';
import {observer} from 'mobx-react';
import tweakerStore from "../../store/tweakerStore";
import {gs} from "../../globals";

@observer
export default class SetCount extends React.Component {

  state = {
    value: 3,
    initialSets: 0
  };

  componentWillMount() {
    this.state.initialSets = this.getSetsCount();
  }

  getSetsCount() {
    return tweakerStore.workoutTemplateStore.getWorkoutTemplateExerciseStore(this.props.id) ?
      tweakerStore.workoutTemplateStore.getWorkoutTemplateExerciseStore(this.props.id).sets : 0;
  }

  render() {
    return (
      <View style={styles.container}>
        <Slider
          maximumValue={6}
          minimumValue={0}
          step={1}
          thumbTintColor={'#B0BEC5'}
          maximumTrackTintColor={'#B0BEC5'}
          minimumTrackTintColor={'#616161'}
          style={{flex: 1, height: 30}}
          value={this.state.initialSets}
          onSlidingComplete={(val) => {
            tweakerStore.workoutTemplateStore.setExerciseSetsFinish(this.props.id, val);
          }}
          onValueChange={(val) => {
            tweakerStore.workoutTemplateStore.setExerciseSetsImmediate(this.props.id, val);
          }}
        />

        <View style={{marginLeft: 0, marginRight: 13, marginTop: -3}}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{marginRight: 5}}>
              <Text style={[gs.text, {color: '#B0BEC5', fontSize: 23}]}>{this.getSetsCount()}</Text>
            </View>
            <View>
              <Text style={[gs.text, {color: '#B0BEC5', fontSize: 9}]}>SETS</Text>
            </View>
          </View>
        </View>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center'
  }
});