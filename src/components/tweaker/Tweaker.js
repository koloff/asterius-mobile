import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  Text,
  Animated, Easing, TouchableOpacity, ActivityIndicator, Button, TextInput, TouchableWithoutFeedback
} from 'react-native';
import {observer} from 'mobx-react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {withNavigation} from "react-navigation";

import {gs} from "../../globals";

import {SegmentedControls} from 'react-native-radio-buttons';

import tweakerStore from '../../store/tweakerStore';
import MusclesModelStore from '../../store/MusclesModelStore';

import MusclesModel from '../muscles/MusclesModel';
import ExerciseWithMuscles from '../exercises/ExerciseWithMuscles';
import ExerciseInWorkoutInTweaker from "../exercises/ExerciseInWorkoutInTweaker";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import DarkModal from "../DarkModal";
import Entypo from "react-native-vector-icons/Entypo";
import subscriptionsStore from "../../store/subscriptionsStore";
import authStore from "../../store/authStore";
import tipsStore from "../../store/tipsStore";

@withNavigation
@observer
export default class Tweaker extends Component {
  state = {
    renderMain: false,
    editingName: false,
    name: this.props.navigation.state.params.workoutTemplateStore.name,
    modalVisible: false
  };

  constructor(props) {
    super(props);
    this.workoutTemplateStore = this.props.navigation.state.params.workoutTemplateStore;
    this.canDelete = this.props.navigation.state.params.canDelete;
    tweakerStore.reset(this.workoutTemplateStore);
  }

  componentDidMount() {
    tipsStore.setTips(tipsStore.tips.tweaker);
    setTimeout(() => {
      this.setState({renderMain: true})
    });
  }

  @observer
  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.header, {}]}>
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
            justifyContent: 'center'
          }}>
            {!this.state.editingName && <View style={{flexDirection: 'row'}}>
              <Text style={[gs.text, {color: '#fff', fontSize: 15}]}>
                {tweakerStore.workoutTemplateStore.name}
              </Text>
              <TouchableOpacity
                onPress={() => {
                  this.setState({editingName: true})
                }}
                style={{
                  padding: 5,
                  marginLeft: 5,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <FontAwesome name={'edit'} color={'#fff'} size={16}/>
              </TouchableOpacity>
            </View>}
            {this.state.editingName && <View style={{
              maxWidth: 200,
              flexDirection: 'row'
            }}>
              <TextInput
                style={[gs.text, {
                  fontSize: 12,
                  height: 30,
                  borderColor: '#ddd',
                  borderWidth: 1,
                  padding: 0,
                  paddingLeft: 3,
                  paddingRight: 3,
                  marginRight: 10,
                }]}
                onChangeText={(text) => this.setState({name: text})}
                value={this.state.name}
              />
              <TouchableWithoutFeedback
                onPress={() => {
                  this.workoutTemplateStore.rename(this.state.name);
                  this.setState({editingName: false})
                }}
                style={{
                  padding: 5,
                  paddingLeft: 7,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                <MaterialIcons
                  name={'done'}
                  color={'#ddd'}
                  size={27}
                  onPress={() => {
                    console.log('press');
                  }}/>
              </TouchableWithoutFeedback>
            </View>}
            <Text style={[gs.text, {
              fontSize: 12,
              color: '#999'
            }]}>{tweakerStore.workoutTemplateStore.workoutDurationText}</Text>
          </View>

          {this.canDelete && <TouchableOpacity
            style={[{
              position: 'absolute',
              right: 0,
              width: 40,
              height: '100%',
              alignItems: 'flex-end',
              justifyContent: 'center',
              paddingRight: 15
            }]}
            onPress={() => {
              this.setState({modalVisible: true});
            }}>
            <Ionicons name={'md-trash'} size={25} color={'#ccc'}/>
          </TouchableOpacity>}
        </View>


        {this.state.renderMain ? <TweakerMainView/>
          : <ActivityIndicator style={{top: '50%', marginTop: -50}} size="large" color="#777"/>}


        <DarkModal
          modalVisible={this.state.modalVisible}
          onModalClose={() => {
            this.setState({modalVisible: false})
          }}>
          <View style={{justifyContent: 'center', alignItems: 'center'}}>
            <Text style={[gs.text, gs.shadow]}>Delete {this.workoutTemplateStore.name}?</Text>
            <View style={{flexDirection: 'row', paddingTop: 10}}>
              <View style={{marginRight: 10}}><Button
                color={'red'}
                onPress={() => {
                  tweakerStore.workoutTemplateStore.removeWorkout();
                  this.props.navigation.goBack();
                  this.setState({modalVisible: false})
                }}
                title="Delete"
              /></View>
              <View><Button
                onPress={() => this.setState({modalVisible: false})}
                title="Close"
              /></View>
            </View>
          </View>
        </DarkModal>


      </View>
    );

  }
}

@withNavigation
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
            // backgroundColor: 'green',
            zIndex: tweakerStore.exerciseOption === 'VIEW WORKOUT' ? 100 : 1
          }}>
            {!tweakerStore.workoutTemplateStore.exercises.length ?
              <View style={{
                flex: 1,
                height: '100%', alignItems: 'center', justifyContent: 'center'
              }}>
                <Text style={[gs.text, {color: '#aaa'}]}>No exercises in this workout</Text>
              </View> : <ScrollView
                ref={(workoutScrollView) => {
                  this.workoutScrollView = workoutScrollView
                }}>
                {tweakerStore.workoutTemplateStore.exercises.map((exerciseStore) =>
                  <ExerciseInWorkoutInTweaker key={exerciseStore.id} workoutTemplateExerciseStore={exerciseStore}/>)}
              </ScrollView>}

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

              {authStore.isAnonymous && <View
                style={{
                  flex: 1,
                  backgroundColor: '#151515',
                  marginBottom: 7,
                  paddingBottom: 3,
                  marginLeft: 1,
                  marginRight: 1,
                  alignItems: 'center',
                  height: 50,
                  justifyContent: 'center'
                }}>
                <Text style={[gs.text, gs.shadow, {color: '#FF8F00', textAlign: 'center'}]}>
                  &nbsp; Save workout and register{'\n'}to see all exercises!</Text>
              </View>}

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
    backgroundColor: 'transparent',
    // borderBottomWidth: 1,
    // borderBottomColor: '#222',
    flexDirection: 'row',
    width: '100%',
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