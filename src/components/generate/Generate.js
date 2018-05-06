import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  Slider,
  Keyboard,
  TouchableOpacity,
  Animated,
  Platform,
  ActivityIndicator, ScrollView, KeyboardAvoidingView
} from 'react-native';
import {observer} from 'mobx-react';
import Swiper from 'react-native-swiper';
import {gs} from "../../globals";
import generateStore from "../../store/generateStore";
import userParametersStore from '../../store/userParametersStore';
import Ionicons from "react-native-vector-icons/Ionicons";
import LinearGradient from 'react-native-linear-gradient';
import FontAwesome from "react-native-vector-icons/FontAwesome";


import MusclesModel from '../muscles/MusclesModel';
import ParameterInputNumber from './ParameterInputNumber';
import RadioButtons from "../RadioButtons";
import ElevatedView from "../ElevatedView";
import MiniWorkoutGenerated from "../workouts/MiniWorkoutGenerated";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Toast from "react-native-root-toast";
import {withNavigation} from "react-navigation";

// todo change opacity to fromstart prop

@observer
@withNavigation
export default class Generate extends React.Component {
  state = {
    loading: true,
    slide: 0,
    durationSliderValue: userParametersStore.parameters.duration,
    keyboardOpen: false,
    generating: false
  };

  constructor(props) {
    super(props);
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      this.setState({keyboardOpen: true})
    });
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      this.setState({keyboardOpen: false})
    });

  }

  componentWillMount() {
    generateStore.init();
  }

  componentWillUnmount() {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
  }

  canChangeSlide() {
    if (this.state.slide === 0 && !userParametersStore.parameters.gender) {
      return false;
    }
    else if (this.state.slide === 1 &&
      (!userParametersStore.parameters.age || !userParametersStore.parameters.weight || !userParametersStore.parameters.height)) {
      return false;
    } else {
      return true;
    }
  }

  getExperienceColor() {
    switch (userParametersStore.parameters.experience) {
      case 1:
        return '#78909C';
      case 2:
        return '#9CCC65';
      case 3:
        return '#FFCA28';
      case 4:
        return '#FF7043';
    }
  }

  getExperienceTexts() {
    switch (userParametersStore.parameters.experience) {
      case 1:
        return ['UNTRAINED', 'Have not trained much with weights yet'];
      case 2:
        return ['BEGINNER', 'Have some experience with weight training'];
      case 3:
        return ['ADVANCED', 'Have good weight training experience'];
      case 4:
        return ['PROFESSIONAL', 'Have trained seriously for years'];
    }
  }

  onMusclePress(id) {
    generateStore.musclesModelStore.switchMuscleSelected(id);
    userParametersStore.switchMuscle(id);


    if (this.musclesToast) {
      Toast.hide(this.musclesToast);
      this.musclesToast = null;
    }

    if (!generateStore.enoughTimeForIsolation) {
      this.musclesToast = Toast.show(`Your overall training time might not be enough to include isolation exercises. 
      Select only the most important muscles or increase the duration or frequency of training.`, {
        duration: 6000,
        shadow: true,
        backgroundColor: 'rgba(255,160,0 ,1)',
        position: -10,
      });
    }
  }

  async generateWorkouts() {
    generateStore.generating = true;
    this._swiper.scrollBy(1);
    try {
      await generateStore.generateWorkouts();
      setTimeout(() => {
        generateStore.generating = false;
        generateStore.generated = true;
      });
    } catch (err) {
      generateStore.generating = false;
      this._swiper.scrollBy(-1);
      let toast = Toast.show('Invalid parameters!', {
        shadow: true,
        position: -10,
        backgroundColor: 'red'
      });
      console.log(err);
    }
  }

  onWorkoutsReset() {
    this._swiper.scrollBy(-1);
    generateStore.deleteGeneratedWorkouts();
    generateStore.generated = false;
  }

  renderPreviousButton() {
    if (this.state.slide === 5) {
      return <View></View>;
    }
    return <View style={{padding: 12, paddingLeft: 15}}>
      <Text style={[gs.text, gs.shadow, {
        fontSize: 17,
        color: 'rgba(255,143,0 ,1)'
      }]}>Back</Text>
    </View>
  }

  renderNextButton() {
    if (this.state.slide === 4 && !generateStore.generated) {
      return <View></View>;
    }
    return <View style={{padding: 12, paddingRight: 15}}>
      <Text style={[gs.text, gs.shadow, {
        textAlign: 'center',
        fontSize: 17,
        color: this.canChangeSlide() ? 'rgba(255,143,0 ,1)' : 'rgba(255,255,255 ,0.1)'
      }]}>{generateStore.generated && this.state.slide === 4 ? 'Result' : 'Next'}</Text>
    </View>
  }

  @observer
  render() {
    this.scale = this.props.opacity ? this.props.opacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0.3, 1]
    }) : 1;
    return (
      <Animated.View style={[styles.wrapper, {
        opacity: this.props.opacity || 1,
        transform: [{scale: this.scale}],
        zIndex: this.props.opacity ? (this.props.isActive ? 200 : 1) : 200
      }]}>
        <View style={{
          position: 'absolute',
          padding: 25,
          zIndex: 300
        }}>
          <TouchableOpacity
            onPress={() => {
              this.props.opacity ? this.props.goBack() : this.props.navigation.goBack()
            }}>
            <Ionicons name={'md-close'} size={37} color={'#888'}/>
          </TouchableOpacity>
        </View>

        <Swiper
          scrollEnabled={this.state.slide !== 4}
          index={0}
          ref={(ref) => {
            this._swiper = ref
          }}
          loop={false}
          containerStyle={styles.wrapper}
          showsButtons={true}
          autoplayDirection={false}
          onIndexChanged={(index) => {
            Keyboard.dismiss();
            this.setState({slide: index})
          }}
          onMomentumScrollEnd={(e, state) => {
            let index = this.state.slide;
            if (state.index > index && !this.canChangeSlide()) {
              this._swiper.scrollBy(index - state.index);
              this.setState({slide: index})
            }
            if (state.index === 5 && (!generateStore.generating && !generateStore.generated)) {
              this._swiper.scrollBy(-1);
              this.setState({slide: 4})
            }
          }}
          buttonWrapperStyle={{
            alignItems: 'flex-end',
            paddingBottom: Platform.OS === 'ios' && this.state.keyboardOpen ? 240 : 10
          }}
          paginationStyle={{
            marginBottom: Platform.OS === 'ios' && this.state.keyboardOpen ? 230 : 0
          }}
          dot={<View style={{
            backgroundColor: '#555',
            width: 10,
            height: 10,
            borderRadius: 4,
            marginLeft: 5,
            marginRight: 5,
            marginTop: 3,
            marginBottom: 3,
          }}/>}
          activeDot={<View style={{
            backgroundColor: '#FF8F00',
            width: 10,
            height: 10,
            borderRadius: 4,
            marginLeft: 5,
            marginRight: 5,
            marginTop: 3,
            marginBottom: 3,
          }}/>}
          nextButton={this.renderNextButton()}
          prevButton={this.renderPreviousButton()}>

          <Slide1/>
          <Slide2 keyboardOpen={this.state.keyboardOpen}/>
          <Slide3 getExperienceColor={this.getExperienceColor} getExperienceTexts={this.getExperienceTexts}/>
          <Slide4
            durationSliderValue={this.state.durationSliderValue}
          />
          <Slide5
            generateWorkouts={this.generateWorkouts.bind(this)}
            onMusclePress={this.onMusclePress.bind(this)}
            musclesModelStore={generateStore.musclesModelStore}
          />

          <View style={{flex: 1, width: '100%', height: '100%', padding: 6, paddingTop: 100}}>
            {generateStore.generating &&
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', top: -50}}>
              <Text style={[gs.text, {color: '#999', textAlign: 'center', marginBottom: 10}]}>This might take
                time</Text>
              <ActivityIndicator size={'large'} color={'#999'}/>
            </View>}
            {generateStore.generated && <GeneratedWorkoutsSlide
              navigation={this.props.navigation}
              onWorkoutsReset={this.onWorkoutsReset.bind(this)}
              onTransition={this.props.onTransition}
              transitionFromStart={this.props.transitionFromStart}
            />}
          </View>

        </Swiper>
      </Animated.View>
    )
  }
}


const Question = (props) => {
  return <View style={[{marginBottom: 11}, props.style]}><Text style={[gs.text, gs.shadow, {
    color: '#999',
    fontSize: 17,
    textAlign: 'center'
  }]}>{props.text}</Text></View>
};

const Slide1 = observer((props) => {
  return <View style={[styles.slide1]}>
    <Question text={'What is your sex?'}/>

    <RadioButtons
      selected={userParametersStore.parameters.gender}
      onSelectedChange={(value) => {
        userParametersStore.parameters.gender = value
      }}
      optionStyle={styles.optionStyle}
      style={{maxHeight: 90, flexDirection: 'row'}}
    >
      <View value={1}>
        <Text style={[gs.text, gs.shadow, {fontSize: 18}]}>
          <Ionicons name={'ios-male'} size={18}/> &nbsp;Male
        </Text>
      </View>

      <View value={2}>
        <Text style={[gs.text, gs.shadow, {fontSize: 18}]}>
          <Ionicons name={'ios-female'} size={18}/> &nbsp;Female
        </Text>
      </View>
    </RadioButtons>
  </View>
});

const Slide2 = observer((props) => {
  return <KeyboardAvoidingView style={{flex: 1}} behavior={'padding'}>
    <View style={[styles.slide2, {
      marginTop: 23
    }]}>

      <Question text={'What are your units?'}/>
      <RadioButtons
        selected={userParametersStore.parameters.measuringUnit}
        onSelectedChange={(value) => {
          userParametersStore.parameters.measuringUnit = value
        }}
        optionStyle={styles.optionStyle}
        style={{maxHeight: 80, flexDirection: 'row', marginBottom: 10}}
      >
        <View value={1}>
          <Text style={[gs.text, gs.shadow, {fontSize: 15, textAlign: 'center'}]}>
            Metric
          </Text>
          <Text style={[gs.text, gs.shadow, {fontSize: 11}]}>
            CM and KG
          </Text>
        </View>

        <View value={2}>
          <Text style={[gs.text, gs.shadow, {fontSize: 15, textAlign: 'center'}]}>
            Imperial
          </Text>
          <Text style={[gs.text, gs.shadow, {fontSize: 11}]}>
            IN and LBS
          </Text>
        </View>
      </RadioButtons>

      <Question text={'What are your measurements?'}/>
      <View style={{flexDirection: 'row'}}>
        <ParameterInputNumber title={'Age'} unit={'YEARS'} value={userParametersStore.parameters.age} onChangeText={(val) => {
          userParametersStore.parameters.age = val;
        }}/>
        <ParameterInputNumber title={'Height'} unit={userParametersStore.parameters.measuringUnit === 1 ? 'CM' : 'IN'} value={userParametersStore.parameters.height} onChangeText={(val) => {
          userParametersStore.parameters.height = val;
        }}/>
        <ParameterInputNumber title={'Weight'} unit={userParametersStore.parameters.measuringUnit === 1 ? 'KG' : 'LBS'} value={userParametersStore.parameters.weight} onChangeText={(val) => {
          userParametersStore.parameters.weight = val;
        }}/>
      </View>
    </View>
  </KeyboardAvoidingView>
});

const Slide3 = observer((props) => {
  return <View style={[styles.slide3, {marginTop: 0, padding: 10}]}>
    <Question text={'What is your experience?'} style={{marginBottom: 15, marginTop: 0}}/>

    <RadioButtons
      selected={userParametersStore.parameters.experience}
      onSelectedChange={(value) => {
        userParametersStore.parameters.experience = value
      }}
      optionStyle={styles.optionStyle}
      style={{maxHeight: 80, flexDirection: 'row', marginBottom: 10}}
    >
      <View value={1}>
        <Text style={[gs.text, gs.shadow, {fontSize: 12, textAlign: 'center'}]}>
          Untrained
        </Text>
      </View>

      <View value={2}>
        <Text style={[gs.text, gs.shadow, {fontSize: 12, textAlign: 'center'}]}>
          Beginner
        </Text>
      </View>

      <View value={3}>
        <Text style={[gs.text, gs.shadow, {fontSize: 12, textAlign: 'center'}]}>
          Advanced
        </Text>
      </View>

      <View value={4}>
        <Text style={[gs.text, gs.shadow, {fontSize: 12, textAlign: 'center'}]}>
          Pro
        </Text>
      </View>
    </RadioButtons>

    <View style={{paddingLeft: 9, paddingRight: 9, width: '100%'}}>
      <View style={{
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        paddingTop: 15,
        paddingBottom: 15,
        borderColor: props.getExperienceColor(),
        width: '100%'
      }}>
        <Text style={[gs.text, {fontSize: 17, textAlign: 'center', color: props.getExperienceColor()}]}>
          {props.getExperienceTexts()[0]}
        </Text>
        <Text style={[gs.text, {fontSize: 12, textAlign: 'center', color: props.getExperienceColor()}]}>
          {props.getExperienceTexts()[1]}
        </Text>
      </View>
    </View>

  </View>
});

const Slide4 = observer((props) => {
  return <View style={[styles.slide4, {marginTop: 60}]}>
    <Question text={'How often are you going to train?'}/>

    <RadioButtons
      selected={userParametersStore.parameters.days}
      onSelectedChange={(value) => {
        switch (value) {
          case 1:
            this.durationSlider.setNativeProps({value: 80});
            userParametersStore.parameters.duration = 80;
            break;
          case 2:
            this.durationSlider.setNativeProps({value: 70});
            userParametersStore.parameters.duration = 70;
            break;
          case 3:
            this.durationSlider.setNativeProps({value: 60});
            userParametersStore.parameters.duration = 60;
            break;
        }
        userParametersStore.parameters.days = value;
      }}
      optionStyle={styles.optionStyle}
      style={{maxHeight: 70, flexDirection: 'row'}}
    >
      <View value={1}>
        <Text style={[gs.text, gs.shadow, {fontSize: 12, textAlign: 'center'}]}>
          1 or 2 workouts{'\n'} per week
        </Text>
      </View>

      <View value={2}>
        <Text style={[gs.text, gs.shadow, {fontSize: 12, textAlign: 'center'}]}>
          3 or 4 workouts{'\n'} per week
        </Text>
      </View>

      <View value={3}>
        <Text style={[gs.text, gs.shadow, {fontSize: 12, textAlign: 'center'}]}>
          5 or 6 workouts{'\n'} per week
        </Text>
      </View>
    </RadioButtons>

    <Question text={'For how long?'} style={{marginTop: 35, marginBottom: 20}}/>
    <View style={{paddingLeft: 14, paddingRight: 14, width: '100%'}}>
      <View
        style={{
          borderWidth: 1,
          borderColor: 'rgba(255,143,0 ,1)',
          height: 70,
          justifyContent: 'center',
          width: '100%',
          borderRadius: 5,
        }}>
        <Text style={[gs.text, {textAlign: 'center', color: 'rgba(255,143,0 ,1)', fontSize: 21}]}>
          {userParametersStore.parameters.duration} MINUTES
        </Text>
        <Text style={[gs.text, {textAlign: 'center', color: '#999', fontSize: 12}]}>
          10 minutes of them are for warmup
        </Text>
      </View>
    </View>

    <Slider
      ref={(ref) => {
        this.durationSlider = ref
      }}
      maximumValue={80}
      minimumValue={60}
      step={1}
      thumbTintColor={'#B0BEC5'}
      maximumTrackTintColor={'#999'}
      minimumTrackTintColor={'#999'}
      style={{height: 60, width: '100%'}}
      value={props.durationSliderValue}
      onValueChange={(val) => {
        userParametersStore.parameters.duration = val;
      }}
    />
  </View>
});

const Slide5 = observer((props) => {
  return <View style={[styles.slide5, {marginTop: 37}]}>
    <Question text={'Which muscles you focus the most?'} style={{marginBottom: 10}}/>
    {/*<View style={{paddingLeft: 5, paddingRight: 5, marginBottom: 0}}><Text style={[gs.text, {*/}
    {/*color: '#777',*/}
    {/*fontSize: 12,*/}
    {/*textAlign: 'center',*/}
    {/*marginBottom: 5*/}
    {/*}]}>Press on the muscles you want to train the most. Don't select a lot muscles if you train less*/}
    {/*frequently.</Text></View>*/}

    <MusclesModel
      musclesModelStore={props.musclesModelStore}
      onMusclePress={props.onMusclePress}
    />

    {!generateStore.generating && !generateStore.generated ? <TouchableOpacity
      style={{
        position: 'absolute',
        bottom: 12,
        right: 7,
        // backgroundColor: 'red',
        width: 100,
        height: 50,
        // backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onPress={props.generateWorkouts}>
      <Text style={[gs.text, {color: 'rgba(255,143,0 ,1)', fontSize: 17, textAlign: 'center'}]}>
        <FontAwesome name='flag-checkered' size={17} color='rgba(255,143,0 ,1)'/>
        {'\n'}Generate
      </Text>
    </TouchableOpacity> : generateStore.generating &&
      <ActivityIndicator style={{
        position: 'absolute',
        bottom: 12,
        right: 7,
        // backgroundColor: 'red',
        width: 100,
        height: 50,
        // backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center'
      }} size="large" color="#444"/>}

  </View>
});


@observer
class GeneratedWorkoutsSlide extends React.Component {
  state = {
    animations: []
  };

  componentWillMount() {
    let animations = generateStore.workoutsTemplatesStore.workouts.map((workout) => new Animated.Value(0));
    this.setState({animations});
  }

  componentDidMount() {
    let sequence = this.state.animations.map((animation) => {
      return Animated.timing(animation, {
        duration: 400,
        toValue: 0.9,
        useNativeDriver: true
      })
    });

    setTimeout(() => {
      Animated.sequence(sequence).start();
    }, 777)
  }

  @observer
  render() {
    return <View style={{paddingTop: 0, paddingBottom: 0, flex: 1, height: '100%'}}>
      <View style={{marginBottom: 60}}>
        <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'center'}}>
          {generateStore.workoutsTemplatesStore.workouts.map((workoutRow, index) => {
            return (
              <MiniWorkoutGenerated
                animation={this.state.animations[index]}
                key={workoutRow.key}
                workoutTemplateStore={workoutRow.workoutStore}
              />
            )
          })}
        </ScrollView>
      </View>

      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 0,
          left: 7,
          // backgroundColor: 'red',
          width: 100,
          height: 50,
          // backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onPress={this.props.onWorkoutsReset}>
        <Text style={[gs.text, {color: 'rgba(255,143,0 ,1)', fontSize: 17, textAlign: 'center'}]}>
          <MaterialIcons name='settings-backup-restore' size={17} color='rgba(255,143,0 ,1)'/>
          {'\n'}Reset
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          position: 'absolute',
          bottom: 0,
          right: 7,
          // backgroundColor: 'red',
          width: 100,
          height: 50,
          // backgroundColor: 'transparent',
          alignItems: 'center',
          justifyContent: 'center'
        }}
        onPress={async () => {
          this.props.transitionFromStart ? this.props.onTransition('Register') : this.props.navigation.goBack();
        }}>
        <Text style={[gs.text, {color: 'rgba(255,143,0 ,1)', fontSize: 17, textAlign: 'center'}]}>
          <FontAwesome name='flag-checkered' size={17} color='rgba(255,143,0 ,1)'/>
          {'\n'}Save
        </Text>
      </TouchableOpacity>
    </View>
  }
}

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  optionStyle: {
    flex: 1,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide4: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15
  },
  slide5: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  arrow: {
    position: 'relative',
    bottom: 30,
    fontSize: 50
  }
});