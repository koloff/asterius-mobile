import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Animated, Easing, TouchableOpacity, ActivityIndicator
} from 'react-native';
import {observer} from 'mobx-react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {withNavigation} from "react-navigation";

import {gs} from "../../globals";

import {SegmentedControls} from 'react-native-radio-buttons';

import tweakerStore from '../../store/tweakerStore';
import MusclesModelStore from '../../store/MusclesModelStore';
import WorkoutTemplateStore from '../../store/WorkoutTemplateStore';

import MusclesModel from '../muscles/MusclesModel';
import ExerciseWithMuscles from '../exercises/ExerciseWithMuscles';
import ExerciseInWorkoutInTweaker from "../exercises/ExerciseInWorkoutInTweaker";

@withNavigation
@observer
export default class Tweaker extends Component {
  state = {
    renderMain: false
  };

  componentWillMount() {
    this.workoutTemplateStore = this.props.navigation.state.params.workoutTemplateStore;
    console.log(this.workoutTemplateStore instanceof WorkoutTemplateStore);
    tweakerStore.reset(this.workoutTemplateStore);
  }

  componentDidMount() {
    setTimeout(() => {
      this.setState({renderMain: true})
    });
  }

  @observer
  render() {
    return (
      <View>
        <View style={styles.container}>
          <View style={styles.header}>
            <View>
              <TouchableOpacity
                style={{padding: 10, paddingBottom: 7, paddingRight: 21}}
                onPress={() => {
                  this.props.navigation.goBack()
                }}
              >
                <Ionicons name='ios-arrow-back' size={37} color='#ddd'/>
              </TouchableOpacity>
            </View>
            <View style={{
              // alignSelf: 'center',
              // alignItems: 'center',
              top: 7,
            }}>
              <Text style={[gs.text, {color: '#ddd', fontSize: 15}]}>
                {/*Push pull legs workout 1*/}
                {tweakerStore.workoutTemplateStore.name}
              </Text>
              <View>
                <Text style={[gs.text, {
                  fontSize: 12,
                  color: '#999'
                }]}>Estimated {tweakerStore.workoutTemplateStore.workoutDurationText}</Text>
              </View>
            </View>

            {/*<TouchableOpacity*/}
            {/*style={{padding: 10}}*/}
            {/*onPress={() => {*/}
            {/*this.props.navigation.goBack()*/}
            {/*}}*/}
            {/*>*/}
            {/*<Ionicons name='md-checkmark' size={37} color='#FF8F00'/>*/}
            {/*</TouchableOpacity>*/}
          </View>


          {this.state.renderMain ? <TweakerMainView/>
            : <ActivityIndicator style={{top: '50%', marginTop: -100}} size="large" color="#777"/>}


        </View>
      </View>
    );

  }
}

@observer
class TweakerMainView extends React.Component {
  state = {
    transitions: [
      {key: 'VIEW WORKOUT', value: new Animated.Value(1)},
      {key: 'FIND EXERCISES', value: new Animated.Value(0)},
      {key: 'NO MUSCLE', value: new Animated.Value(0)}
    ],
    mainViewOpacity: new Animated.Value(0),
  };

  constructor(props) {
    super(props);
    this.musclesModelStore = new MusclesModelStore(tweakerStore.workoutTemplateStore);
  }

  componentDidMount() {
    Animated.timing(this.state.mainViewOpacity, {
      toValue: 1,
      easing: Easing.linear,
      duration: 500,
      useNativeDriver: true
    }).start()
  }

  onMusclePress(id) {
    tweakerStore.setSelectedMuscle(id);
    this.musclesModelStore.setOneSelectedMuscle(id);
    this.setExerciseOption('FIND EXERCISES');
  }


  animateViews(activeViewKey) {
    let transitions = this.state.transitions.map((transition) => Animated.timing(transition.value, {
      toValue: transition.key === activeViewKey ? 1 : 0,
      easing: Easing.linear,
      duration: 300,
      useNativeDriver: true
    }).start());

    Animated.parallel(transitions)
  }

  setExerciseOption(option) {
    tweakerStore.setExerciseOption(option);
    if (option === 'VIEW WORKOUT') {
      this.animateViews('VIEW WORKOUT');
      tweakerStore.setSelectedMuscle('');
      this.musclesModelStore.setOneSelectedMuscle(null);
      if (tweakerStore.workoutTemplateStore.addedNewExercise) {
        setTimeout(() => {
          this.workoutScrollView.scrollToEnd();
          tweakerStore.workoutTemplateStore.setAddedNewExercise(false);
        })
      }
    }
    if (option === 'FIND EXERCISES') {
      if (tweakerStore.selectedMuscleId) {
        this.animateViews('FIND EXERCISES');
        setTimeout(() => {
          this.exercisesScrollView.scrollTo({y: 0});
        })
      } else {
        this.animateViews('NO MUSCLE');
      }
      tweakerStore.workoutTemplateStore.setAddedNewExercise(false);
    }
  }

  render() {
    return (
      <Animated.View style={{flex: 1, opacity: this.state.mainViewOpacity}}>
        <View style={styles.musclesModelsBox}>
          <MusclesModel
            height={330}
            scalable={true}
            musclesModelStore={this.musclesModelStore}
            onMusclePress={this.onMusclePress.bind(this)}
          />
        </View>

        <SegmentedControls
          onSelection={(option) => {
            this.setExerciseOption(option);
          }}
          options={tweakerStore.options}
          selectedOption={tweakerStore.exerciseOption}
          containerStyle={{
            margin: 6,
            marginBottom: 8,
            borderWidth: 1,
            borderRadius: 0,
          }}
          containerBorderRadius={0}
          tint={'#FF8F00'}
          optionContainerStyle={{borderRadius: 0}}
          selectedTint={'#222'}
          optionStyle={gs.text}
          backTint={'#0c0c0c'}
        />
        <View style={styles.exercises}>

          <Animated.View style={{
            opacity: this.state.transitions[0].value,
            width: '100%',
            height: '100%',
            position: 'absolute',
            zIndex: tweakerStore.exerciseOption === 'VIEW WORKOUT' ? 100 : 1
          }}>
            <ScrollView
              ref={(workoutScrollView) => {
                this.workoutScrollView = workoutScrollView
              }}
            >
              {tweakerStore.workoutTemplateStore.exercises.map((exerciseStore) =>
                <ExerciseInWorkoutInTweaker key={exerciseStore.id} workoutTemplateExerciseStore={exerciseStore}/>)}
            </ScrollView>
          </Animated.View>
          <Animated.View style={{
            opacity: this.state.transitions[1].value,
            width: '100%',
            height: '100%',
            position: 'absolute',
            zIndex: tweakerStore.exerciseOption === 'FIND EXERCISES' ? 100 : 1
          }}>
            <ScrollView
              ref={(exercisesScrollView) => {
                this.exercisesScrollView = exercisesScrollView
              }}>
              {tweakerStore.exercisesToShow.map((exercise) =>
                <ExerciseWithMuscles key={exercise.id} id={exercise.id}/>)}
            </ScrollView>
          </Animated.View>

          <Animated.View style={[styles.noMusclesView, {
            opacity: this.state.transitions[2].value,
            width: '100%',
            height: '100%',
            position: 'absolute',
            justifyContent: 'center',
            zIndex: (!tweakerStore.selectedMuscleId && tweakerStore.exerciseOption === 'FIND EXERCISES') ? 100 : 1
          }]}>
            <Text style={[gs.text, {
              color: '#aaa',
              fontSize: 20
            }]}>SELECT MUSCLE</Text>
            <Text style={[gs.text, {
              color: '#aaa',
              fontSize: 14
            }]}>Use the graphic above</Text>
          </Animated.View>

        </View>
      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#0c0c0c'
  },
  header: {
    backgroundColor: 'rgba(51,51,51, 0.15)',
    flexDirection: 'row',
    // justifyContent: 'space-between',
    // alignItems: 'center'
  },
  whiteText: {
    color: 'white'
  },
  exercises: {
    flex: 1,
    height: '100%',
    marginLeft: 6,
    marginRight: 6,
    borderRadius: 2,
  },
  noMusclesView: {
    display: 'flex',
    width: '100%',
    alignItems: 'center',
    alignSelf: 'center'
  }
});
