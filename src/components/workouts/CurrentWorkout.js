import {React} from 'react';
import {observer} from 'mobx-react';
import {
  StyleSheet, View, Text, Animated, TextInput, TouchableOpacity, Keyboard
} from 'react-native';
import tweakerStore from "../../store/tweakerStore";

export default class CurrentWorkout extends React.Component {
  state = {
    render: false
  };

  constructor(props) {
    super(props);
    this.workoutTemplateStore = this.props.navigation.state.params.workoutTemplateStore;
    tweakerStore.reset();
    tweakerStore.setWorkoutStore(this.workoutTemplateStore);
  }

  render() {
    return (
      <View>


      </View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#0c0c0c'
  },

});
