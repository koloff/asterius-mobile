import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Animated, Modal, Button} from 'react-native';
import {observer} from 'mobx-react';
import {gs} from "../../globals";

import MusclesModelStore from "../../store/MusclesModelStore";
import MusclesModel from '../muscles/MusclesModel';
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import {withNavigation} from "react-navigation";
import ElevatedView from "../ElevatedView";

@observer
class MiniWorkoutExercise extends React.Component {
  render() {
    return (
      <View style={{width: '100%', marginBottom: 3}}>
        <Text numberOfLines={2} ellipsizeMode={'tail'} style={[gs.text, {fontSize: 10, color: '#999'}]}>
          <Text style={{color: '#FF8F00'}}>{this.props.exerciseStore.sets}×</Text> {this.props.exerciseStore.details.info.name.toUpperCase()}
        </Text>
      </View>
    )
  }
}


// props: workout<Workout>
@observer
@withNavigation
export default class MiniWorkout extends React.Component {
  state = {
    modalVisible: false
  };

  openModal() {
    this.setState({modalVisible: true});
  }

  closeModal() {
    this.setState({modalVisible: false});
  }

  constructor(props) {
    super(props);
    this.workoutTemplateStore = this.props.workoutTemplateStore;
    this.musclesModelStore = new MusclesModelStore(this.workoutTemplateStore);
  }

  @observer
  renderButtons() {
    if (this.props.transitionFromStart) {
      return <TouchableOpacity
        style={{
          backgroundColor: 'transparent',
          width: 95,
          height: '100%',
          justifyContent: 'center',
        }}
        onPress={() => {
          this.props.navigation.navigate('Tweaker', {workoutTemplateStore: this.workoutTemplateStore})
        }}>
        <Text style={[gs.text, {color: '#bbb', fontSize: 15, textAlign: 'center'}]}>
          <Ionicons name='ios-settings' size={15} color='#ccc'/>
          &nbsp;Tweak
        </Text>
      </TouchableOpacity>;
    } else {
      return <View style={{flexDirection: 'row', height: '100%', justifyContent: 'center'}}>
        <TouchableOpacity
          style={{
            backgroundColor: 'transparent',
            height: '100%',
            justifyContent: 'center',
            marginRight: 15
          }}
          onPress={() => {
            this.openModal()
          }
          }>

          <Text><MaterialCommunityIcons name='delete' size={21} color='#999'/></Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: 'transparent',
            height: '100%',
            justifyContent: 'center',
            marginRight: 10
          }}
          onPress={() => {
            this.props.navigation.navigate('Tweaker', {workoutTemplateStore: this.workoutTemplateStore})
          }}>
          <Text><Ionicons name='ios-settings' size={21} color='#999'/></Text>
        </TouchableOpacity>
      </View>;
    }
  }

  @observer
  render() {
    return (
      <Animated.View style={{
        // marginTop: 5,
        // marginBottom: 5,
        padding: 5,
        opacity: this.props.transitionFromStart ? this.props.animation : 1,
      }}>
        <ElevatedView elevation={3} style={{
          borderColor: '#222',
          borderWidth: StyleSheet.hairlineWidth
        }}>
          <View style={{
            flexDirection: 'row',
            flex: 1,
            width: '100%',
            justifyContent: 'flex-end',
            borderColor: '#222',
            borderBottomWidth: StyleSheet.hairlineWidth,
            // backgroundColor: 'red',
            backgroundColor: '#151515',
          }}>

            <View style={{padding: 4, paddingLeft: 10, flex: 1, width: '100%'}}>
              <Text style={[gs.text, {
                fontSize: 13,
                color: '#bbb'
              }]}>{this.workoutTemplateStore.name}</Text>
              <Text style={[gs.text, {
                fontSize: 10,
                color: '#999',
                top: -2
              }]}>Estimated {this.workoutTemplateStore.workoutDurationText}</Text>
            </View>

            <View style={{
              height: '100%',
              alignSelf: 'flex-end',
            }}>{this.renderButtons()}</View>

          </View>

          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 0,
            paddingRight: 7,
            backgroundColor: '#131313',
            borderWidth: 0,
            borderColor: '#171717'
          }}>
            {/*{this.props.mounted ? <MusclesModel*/}
              {/*musclesModelStore={this.musclesModelStore}*/}
              {/*touchable={false}*/}
              {/*scalable={false}*/}
              {/*width={200}*/}
            {/*/> : <View></View>}*/}

            <View style={{flex: 1, paddingLeft: 14}}>
              {this.workoutTemplateStore.exercises.map((exerciseStore) => {
                return (
                  <MiniWorkoutExercise key={exerciseStore.id} exerciseStore={exerciseStore}/>
                )
              })}
            </View>

          </View>
        </ElevatedView>


        <Modal
          visible={this.state.modalVisible}
          transparent={true}
          animationType={'fade'}
          onRequestClose={() => this.closeModal()}
        >
          <View style={styles.modalContainer}>
            <View style={styles.innerContainer}>
              <Text style={[gs.text, gs.shadow]}>Delete {this.workoutTemplateStore.name}?</Text>
              <View style={{flexDirection: 'row', paddingTop: 10}}>
                <View style={{marginRight: 10}}><Button
                  color={'red'}
                  onPress={() => this.closeModal()}
                  title="Delete"
                /></View>
                <View><Button
                  onPress={() => this.closeModal()}
                  title="Close"
                /></View>
              </View>
            </View>
          </View>
        </Modal>


      </Animated.View>
    )
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.8)',
  },
  innerContainer: {
    alignItems: 'center',
  },
});