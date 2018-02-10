import React from "react";
import {observer} from "mobx-react";
import {gs} from "../../globals";
import {StyleSheet, Text, TouchableOpacity, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

@observer
export default class MiniWorkoutTitle extends React.Component {

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
          this.props.navigation.navigate('Tweaker', {workoutTemplateStore: this.props.workoutTemplateStore})
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
            this.props.navigation.navigate('Tweaker', {workoutTemplateStore: this.props.workoutTemplateStore})
          }}>
          <Text><Ionicons name='ios-settings' size={21} color='#999'/></Text>
        </TouchableOpacity>
      </View>;
    }
  }

  render() {
    return <View style={{
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
        }]}>{this.props.workoutTemplateStore.name}</Text>
        <Text style={[gs.text, {
          fontSize: 10,
          color: '#999',
          top: -2
        }]}>Estimated {this.props.workoutTemplateStore.workoutDurationText}</Text>
      </View>

      <View style={{
        height: '100%',
        alignSelf: 'flex-end',
      }}>{this.renderButtons()}</View>

    </View>
  }


}