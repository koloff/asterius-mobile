import * as React from "react";
import {observer} from 'mobx-react';
import {
  Text, TouchableOpacity, View, StyleSheet, Animated, Slider, Modal,
  TouchableWithoutFeedback, Dimensions
} from 'react-native';
import {gs} from "../../globals";
import {PieChart} from "react-native-svg-charts";
import {Circle, G, Line, TSpan} from "react-native-svg";
import * as SVG from 'react-native-svg';
import eatStore from "../../store/eatStore";
import ElevatedView from "../ElevatedView";
import userParametersStore from "../../store/userParametersStore";
import RadioButtons from "../RadioButtons";
import EatPremium from "./EatPremium";
import subscriptionsStore from "../../store/subscriptionsStore";

const goals = [
  'Loose the most fat\nRisk the most muscle',
  'Loose fat\nRisk some muscle',
  'Gain lean muscle\nBalanced',
  'Gain more muscle\nGain some fat',
  'Gain the most muscle\nGain the most fat',
];

const activities = [
  'Sedentary lifestyle\nInfrequent workouts',
  'Lightly active\nFew workouts weekly',
  'Moderately active\nWorkout frequently',
  'Very active\nWorkout frequently',
  'Athlete\nHigh intensity',
];

@observer
export default class EatScreen extends React.Component {
  state = {
    animation: new Animated.Value(0),
    modalVisible: false,
    modalView: ''
  };


  constructor(props) {
    super(props);
    this.loadedGoal = userParametersStore.parameters.goal;
    this.loadedActivity = userParametersStore.parameters.activity;

    this.width = Dimensions.get('window').width;
  }

  componentDidMount() {
    setTimeout(() => {
      Animated.timing(this.state.animation, {
        toValue: 1,
        useNativeDriver: true,
        duration: 333
      }).start();
    }, 100)
  }

  openOptionModal(option) {
    this.setState({
      modalVisible: true
    });
    this.setState({
      modalView: option
    })
  }

  render() {
    // noinspection JSSuspiciousNameCombination
    return (
      <Animated.View style={{
        opacity: this.state.animation,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>

        <View style={{
          flex: 1,
          width: '100%',
          height: 130,
          flexDirection: 'row',
          marginBottom: 10,
          position: 'absolute',
          top: 0,
          padding: 20,
        }}>

          <ElevatedView elevation={3} style={{
            flex: 1,
            marginRight: 10,
            borderRadius: 5,
            backgroundColor: '#151515',
            borderColor: '#222',
            borderWidth: StyleSheet.hairlineWidth
          }}>
            <TouchableOpacity
              style={{
                flex: 1,
                borderRadius: 5,
                padding: 15,
                justifyContent: 'center',
              }}
              onPress={() => {
                this.openOptionModal('goal');
              }}
            >
              <View>
                <Text style={[gs.text, gs.shadow, {fontSize: 17, color: '#ddd',}]}>GOAL</Text>
                <Text style={[gs.text, gs.shadow, {
                  color: '#999',
                  fontSize: 11,
                }]}>{goals[userParametersStore.parameters.goal - 1]}</Text>
              </View>
            </TouchableOpacity>
          </ElevatedView>

          <ElevatedView elevation={3} style={{
            flex: 1,
            marginLeft: 10,
            borderRadius: 5,
            backgroundColor: '#151515',
            borderColor: '#222',
            borderWidth: StyleSheet.hairlineWidth
          }}>
            <TouchableOpacity
              style={{
                flex: 1,
                borderRadius: 5,
                padding: 15,
                justifyContent: 'center'
              }}
              onPress={() => {
                this.openOptionModal('activity');
              }}
            >
              <Text style={[gs.text, gs.shadow, {fontSize: 17, textAlign: 'left', color: '#ddd'}]}>LIFESTYLE</Text>
              <Text style={[gs.text, gs.shadow, {
                textAlign: 'left',
                color: '#999',
                fontSize: 11
              }]}>{activities[userParametersStore.parameters.activity - 1]}</Text>
            </TouchableOpacity>
          </ElevatedView>
        </View>


        <View style={{height: this.width, width: this.width, top: 30, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={[gs.text, gs.shadow, {
            position: 'absolute',
            top: (this.width) / 2 - 35,
            fontSize: 29,
            textAlign: 'center'
          }]}>{eatStore.calories}{'\n'}<Text style={{fontSize: 21}}>KCal</Text></Text>
          <PieChart
            style={{height: this.width, width: this.width}}
            data={eatStore.macrosChartData}
            innerRadius={'30%'}
            outerRadius={'40%'}
            labelRadius={this.width / 2 - 50}
            contentInset={{top: 0, left: 0, right: 0, bottom: 0}}
            renderDecorator={({item, pieCentroid, labelCentroid, index}) => (
              <G key={index}>
                <Line
                  x1={labelCentroid[0]}
                  y1={labelCentroid[1]}
                  x2={pieCentroid[0]}
                  y2={pieCentroid[1]}
                  strokeWidth={3}
                  stroke={item.svg.fill}
                />
                <Circle
                  cx={labelCentroid[0]}
                  cy={labelCentroid[1]}
                  r={40}
                  fill={item.svg.fill}
                />
                <SVG.Text
                  fill="white"
                  // fontWeight="bold"
                  // stroke={'rgba(255,255,255,1)'}
                  fontSize="17"
                  fontFamily={'Montserrat'}
                  textAnchor="middle">
                  <TSpan x={labelCentroid[0]} y={labelCentroid[1]}>{item.type}</TSpan>
                  <TSpan x={labelCentroid[0]} y={labelCentroid[1] + 17}>{item.grams + 'g'}</TSpan>
                </SVG.Text>
              </G>
            )}
          />
        </View>

        <Modal
          visible={this.state.modalVisible}
          transparent={true}
          animationType={'fade'}
          onRequestClose={() =>
            this.setState({modalVisible: false})}
        >
          <TouchableWithoutFeedback
            style={{
              flex: 1,
            }}
            onPress={() => {
              console.log('pressed');
              this.setState({modalVisible: false})
            }}
          >
            <View style={{
              flex: 1,
              backgroundColor: 'rgba(0,0,0,0.95)',
              alignItems: 'center',
              justifyContent: 'center'
            }}>


              {this.state.modalView === 'goal' && <RadioButtons
                selected={userParametersStore.parameters.goal}
                onSelectedChange={(value) => {
                  userParametersStore.parameters.goal = value;
                  userParametersStore.setParameterFinish('goal', value);
                }}
                optionStyle={styles.optionStyle}
                style={{width: 200, maxHeight: 500}}>
                <View value={1}>
                  <Text style={[gs.text, styles.optionText]}>Loose the most fat{'\n'}Risk more muscle</Text>
                </View>
                <View value={2}>
                  <Text style={[gs.text, styles.optionText]}>Loose fat{'\n'}Risk some muscle</Text>
                </View>
                <View value={3}>
                  <Text style={[gs.text, styles.optionText]}>Gain lean muscle{'\n'}Balanced</Text>
                </View>
                <View value={4}>
                  <Text style={[gs.text, styles.optionText]}>Gain more muscle{'\n'}Gain some fat</Text>
                </View>
                <View value={5}>
                  <Text style={[gs.text, styles.optionText]}>Gain the most muscle{'\n'}Gain more fat</Text>
                </View>
              </RadioButtons>}

              {this.state.modalView === 'activity' && <RadioButtons
                selected={userParametersStore.parameters.activity}
                onSelectedChange={(value) => {
                  userParametersStore.parameters.activity = value
                  userParametersStore.setParameterFinish('activity', value);
                }}
                optionStyle={styles.optionStyle}
                style={{width: 200, maxHeight: 500}}>
                <View value={1}>
                  <Text style={[gs.text, styles.optionText]}>Sedentary lifestyle{'\n'}Infrequent workouts</Text>
                </View>
                <View value={2}>
                  <Text style={[gs.text, styles.optionText]}>Lightly active{'\n'}Few workouts weekly</Text>
                </View>
                <View value={3}>
                  <Text style={[gs.text, styles.optionText]}>Moderately active{'\n'}Workout frequently</Text>
                </View>
                <View value={4}>
                  <Text style={[gs.text, styles.optionText]}>Very active{'\n'}Workout frequently</Text>
                </View>
                <View value={5}>
                  <Text style={[gs.text, styles.optionText]}>Athlete{'\n'}High intensity</Text>
                </View>

              </RadioButtons>}

            </View>
          </TouchableWithoutFeedback>

        </Modal>



        {!subscriptionsStore.isSubscribed && <EatPremium />}

      </Animated.View>
    )
  }
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1
  },
  optionStyle: {
    backgroundColor: '#222',
    alignItems: 'center',
    justifyContent: 'center'
  },
  optionText: {
    color: '#fff',
    textAlign: 'center'
  }

});