import * as React from "react";
import {Text, TouchableOpacity, View, Animated, Linking, StyleSheet} from 'react-native';
import {gs} from "../../globals";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import authStore from '../../store/authStore';
import {withNavigation} from 'react-navigation';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import ElevatedView from "../ElevatedView";
import Foundation from "react-native-vector-icons/Foundation";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import Entypo from "react-native-vector-icons/Entypo";
import subscriptionsStore from "../../store/subscriptionsStore";

@withNavigation
export default class SettingsScreen extends React.Component {
  state = {
    opacity: new Animated.Value(0)
  };

  componentDidMount() {
    Animated.timing(this.state.opacity, {toValue: 1, useNativeDriver: true, duration: 333}).start();
  }

  render() {
    return (
      <Animated.View style={{
        opacity: this.state.opacity,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
      }}>


        {/*<ElevatedView elevation={3} style={{*/}
        {/*width: '100%', height: 80, marginBottom: 15, borderRadius: 5, backgroundColor: '#151515',*/}
        {/*borderColor: '#222',*/}
        {/*borderWidth: StyleSheet.hairlineWidth*/}
        {/*}}>*/}
        {/*<TouchableOpacity*/}
        {/*style={{*/}
        {/*flex: 1,*/}
        {/*borderRadius: 5,*/}
        {/*padding: 15,*/}
        {/*justifyContent: 'center'*/}
        {/*}}*/}
        {/*onPress={async () => {*/}
        {/*this.props.navigation.navigate('Principles');*/}
        {/*}}*/}
        {/*>*/}
        {/*<View style={{flexDirection: 'row', alignItems: 'center'}}>*/}
        {/*<Text style={[gs.text, gs.shadow, {fontSize: 21, textAlign: 'left', color: '#ddd'}]}>*/}
        {/*<MaterialCommunityIcons color={'#fff'} size={21} name={'dumbbell'}/> &nbsp;&nbsp;*/}
        {/*</Text>*/}
        {/*<View>*/}
        {/*<Text style={[gs.text, gs.shadow, {fontSize: 21, textAlign: 'left', color: '#ddd'}]}>*/}
        {/*Principles*/}
        {/*</Text>*/}
        {/*<Text style={[gs.text, gs.shadow, {*/}
        {/*textAlign: 'left',*/}
        {/*color: '#999',*/}
        {/*fontSize: 14*/}
        {/*}]}>Learn the most important aspects</Text>*/}
        {/*</View>*/}
        {/*</View>*/}
        {/*</TouchableOpacity>*/}
        {/*</ElevatedView>*/}


        {/*<ElevatedView elevation={3} style={{*/}
        {/*width: '100%', height: 80, marginBottom: 15, borderRadius: 5, backgroundColor: '#151515',*/}
        {/*borderColor: '#222',*/}
        {/*borderWidth: StyleSheet.hairlineWidth*/}
        {/*}}>*/}
        {/*<TouchableOpacity*/}
        {/*style={{*/}
        {/*flex: 1,*/}
        {/*borderRadius: 5,*/}
        {/*padding: 15,*/}
        {/*justifyContent: 'center'*/}
        {/*}}*/}
        {/*onPress={() => {*/}
        {/*this.props.navigation.navigate('PremiumScreen');*/}
        {/*}}*/}
        {/*>*/}
        {/*<View style={{flexDirection: 'row', alignItems: 'center'}}>*/}
        {/*<Text style={[gs.text, gs.shadow, {fontSize: 21, textAlign: 'left', color: '#ddd'}]}>*/}
        {/*<FontAwesome color={'#fff'} size={21} name={'star'}/> &nbsp;&nbsp;*/}
        {/*</Text>*/}
        {/*<View>*/}
        {/*<Text style={[gs.text, gs.shadow, {fontSize: 21, textAlign: 'left', color: '#ddd'}]}>*/}
        {/*Asterius Premium*/}
        {/*</Text>*/}
        {/*<Text style={[gs.text, gs.shadow, {*/}
        {/*textAlign: 'left',*/}
        {/*color: '#999',*/}
        {/*fontSize: 14*/}
        {/*}]}>Get to the next level</Text>*/}
        {/*</View>*/}
        {/*</View>*/}
        {/*</TouchableOpacity>*/}
        {/*</ElevatedView>*/}

        {/*<ElevatedView elevation={3} style={{*/}
        {/*width: '100%', height: 80, marginBottom: 15, borderRadius: 5, backgroundColor: '#151515',*/}
        {/*borderColor: '#222',*/}
        {/*borderWidth: StyleSheet.hairlineWidth*/}
        {/*}}>*/}
        {/*<TouchableOpacity*/}
        {/*style={{*/}
        {/*flex: 1,*/}
        {/*borderRadius: 5,*/}
        {/*padding: 15,*/}
        {/*justifyContent: 'center'*/}
        {/*}}*/}
        {/*onPress={() => {*/}
        {/*if (subscriptionsStore.isSubscribed) {*/}
        {/*Linking.openURL('mailto:asteriusguidance@gmail.com');*/}
        {/*} else {*/}
        {/*this.props.navigation.navigate('PremiumScreen');*/}
        {/*}*/}
        {/*}}*/}
        {/*>*/}
        {/*<View style={{flexDirection: 'row', alignItems: 'center'}}>*/}
        {/*<Text style={[gs.text, gs.shadow, {fontSize: 21, textAlign: 'left', color: '#ddd'}]}>*/}
        {/*<Entypo color={'#fff'} size={21} name={'chat'}/> &nbsp;&nbsp;*/}
        {/*</Text>*/}
        {/*<View>*/}
        {/*<Text style={[gs.text, gs.shadow, {fontSize: 21, textAlign: 'left', color: '#ddd'}]}>*/}
        {/*Fitness guidance*/}
        {/*</Text>*/}
        {/*<Text style={[gs.text, gs.shadow, {*/}
        {/*textAlign: 'left',*/}
        {/*color: '#999',*/}
        {/*fontSize: 14*/}
        {/*}]}>Personal fitness support</Text>*/}
        {/*</View>*/}
        {/*</View>*/}
        {/*</TouchableOpacity>*/}
        {/*</ElevatedView>*/}

        <ElevatedView elevation={3} style={{
          width: '100%', height: 80, marginBottom: 15, borderRadius: 5, backgroundColor: '#151515',
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
              Linking.openURL('mailto:info@getasterius.com');
            }}
          >
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text style={[gs.text, gs.shadow, {fontSize: 21, textAlign: 'left', color: '#ddd'}]}>
                <Entypo color={'#fff'} size={21} name={'chat'}/> &nbsp;&nbsp;
              </Text>
              <View>
                <Text style={[gs.text, gs.shadow, {fontSize: 21, textAlign: 'left', color: '#ddd'}]}>
                  Contact us
                </Text>
                <Text style={[gs.text, gs.shadow, {
                  textAlign: 'left',
                  color: '#999',
                  fontSize: 14
                }]}>Ask us anything, request features</Text>
              </View>
            </View>
          </TouchableOpacity>
        </ElevatedView>


        <ElevatedView elevation={3} style={{
          width: '100%', height: 80, marginBottom: 15, borderRadius: 5, backgroundColor: '#151515',
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
            onPress={async () => {
              await authStore.logout();
            }}
          >
            <Text style={[gs.text, gs.shadow, {fontSize: 21, textAlign: 'left', color: '#ddd'}]}>
              <SimpleLineIcons name='logout' size={21} color='#fff'/> &nbsp;&nbsp;Logout
            </Text>
          </TouchableOpacity>
        </ElevatedView>


      </Animated.View>
    )
  }
}
