import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity, Modal, Button} from 'react-native';
import {observer} from 'mobx-react';
import {gs} from "../../globals";

import moment from 'moment';

import MusclesModelStore from "../../store/MusclesModelStore";
import {withNavigation} from "react-navigation";
import ElevatedView from "../ElevatedView";

import Ionicons from "react-native-vector-icons/Ionicons";

// @withNavigation
@observer
export default class MiniWorkoutInList extends React.Component {

  componentWillMount() {
    this.workoutTemplateStore = this.props.workoutTemplateStore;
    this.musclesModelStore = new MusclesModelStore(this.workoutTemplateStore);
  }

  @observer
  render() {
    return (
      <View style={{paddingLeft: 5, paddingRight: 5, paddingBottom: 15}}>
        <ElevatedView elevation={3} style={{
          borderColor: '#222',
          borderWidth: StyleSheet.hairlineWidth,
          backgroundColor: '#101010',
        }}>

          <TouchableOpacity
            style={{
              flexDirection: 'row',
              flex: 1,
              width: '100%',
              borderColor: '#222',
              borderBottomWidth: StyleSheet.hairlineWidth,
              // backgroundColor: 'red',
              backgroundColor: '#151515',
            }}
            onPress={() => {
              this.props.navigation.navigate('Tweaker', {workoutTemplateStore: this.props.workoutTemplateStore})
            }}>

            <View style={{padding: 4, paddingLeft: 10, flex: 1, width: '100%', alignItems: 'center'}}>
              <Text style={[gs.text, {
                fontSize: 13,
                color: '#bbb'
              }]}>{this.props.workoutTemplateStore.name}</Text>
              <Text style={[gs.text, {
                fontSize: 10,
                color: '#999',
                top: -2
              }]}>Estimated {this.workoutTemplateStore.workoutDurationText}</Text>
            </View>
          </TouchableOpacity>


          <View style={{
            flexDirection: 'row',
            padding: 0
          }}>

            <View style={{backgroundColor: '#151515', flex: 1, padding: 5, paddingLeft: 12}}>
              <Text style={[gs.text, {color: '#ccc', fontSize: 8, textAlign: 'left'}]}>
                LAST PERFORMED{'\n'}<Text style={{fontSize: 14}}>Not yet</Text>
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('Log', {workoutLogDateStr: this.props.selectedDateStr})
              }}
              style={{backgroundColor: '#151515', padding: 5, paddingLeft: 12}}>
              <Text style={[gs.text, {color: '#FF9800', fontSize: 8, textAlign: 'right'}]}>
                <Ionicons name={'ios-play'} size={8}/>&nbsp;
                PERFORM
                ON{'\n'}<Text style={{fontSize: 14}}>{moment(this.props.selectedDateStr).format('D MMM YYYY')}</Text>
              </Text>
            </TouchableOpacity>


          </View>
        </ElevatedView>


        {/*<Modal*/}
        {/*visible={false}*/}
        {/*transparent={true}*/}
        {/*animationType={'fade'}*/}
        {/*onRequestClose={() => this.closeModal()}*/}
        {/*>*/}
        {/*<View style={styles.modalContainer}>*/}
        {/*<View style={styles.innerContainer}>*/}
        {/*<Text style={[gs.text, gs.shadow]}>Delete {this.workoutTemplateStore.name}?</Text>*/}
        {/*<View style={{flexDirection: 'row', paddingTop: 10}}>*/}
        {/*<View style={{marginRight: 10}}><Button*/}
        {/*color={'red'}*/}
        {/*onPress={() => this.closeModal()}*/}
        {/*title="Delete"*/}
        {/*/></View>*/}
        {/*<View><Button*/}
        {/*onPress={() => this.closeModal()}*/}
        {/*title="Close"*/}
        {/*/></View>*/}
        {/*</View>*/}
        {/*</View>*/}
        {/*</View>*/}
        {/*</Modal>*/}


      </View>
    )
  }
}